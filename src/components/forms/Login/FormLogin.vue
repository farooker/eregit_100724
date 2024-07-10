<template>
  <v-container fluid style="height: 100vh; display: flex; align-items: center; justify-content: flex-end !important;">
    <v-form ref="registreForm" style="width: 100%; max-width: 600px;">
      <v-card
        class="pa-7"
        border="outlined"
        style="border-radius: 20px; text-align: center;"
      >
        <v-card-item dense>
          <v-row>
            <v-col class="d-flex justify-center">
              <v-img
                style="max-width: 200px"
                class="mt-5"
                src="/frasers.png"
              ></v-img>
            </v-col>
          </v-row>

          <div class="text-center mt-5  ma-5">
            <h1>Supplier Qualification System</h1>
            <h2>เข้าสู่ระบบ</h2>
          </div>

              <v-text-field
                variant="solo"
                label="อีเมล"
                v-model="Form.Email"
                class="ml-2 mr-2"
                :rules="textRequired"
                :error-messages="serverErrorMessages"
                @focus="handleFocus"
              ></v-text-field>


              <v-text-field
                variant="solo"
                :rules="passwordRules"
                label="รหัสผ่าน"
                :disabled="isDisabled"
                class="ml-2 mr-2 mt-3"
                v-model="Form.Password"
                :type="Form.CheckPass ? 'text' : 'password'"
                :error-messages="serverErrorMessagesPassword"
              ></v-text-field>
              <p style="color: red" v-if="customMessageErr">
                {{ customMessageErr }}
              </p>


          <div class="d-flex">
            <v-checkbox
              label="แสดงรหัสผ่าน"
              v-model="Form.CheckPass"
            ></v-checkbox>
            <v-btn
              variant="text"
              @click="handleForgetPassword"
              class="custom-underline mt-2"
              ><h4>ลืมรหัสผ่าน</h4>
            </v-btn>
          </div>

          <div
            class="text-center pb-3 px-2 ma-0"
            dense
            justify="center"
            align="center"
          >
              <v-btn
                size="x-large"
                @click="handleLoginClicked"
                :disabled="isDisabled"
                block
                class="text-capitalize rounded-pill"
                color="red"
              >
              เข้าสู่ระบบ
              </v-btn>

          </div>
        </v-card-item>
      </v-card>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import VerifyService from "@/apis/VerifyService";
const Form = ref({
  Email: "",
  Password: "",
});

const customMessageErr = ref("");

const registreForm = ref(null);
const textRequired = [(v) => !!v || "กรุณากรอกข้อมูลให้ครบถ้วน"];
const passwordRules = [
  (v) => !!v || "กรุณากรอกรหัสผ่าน",
  (v) => v.length >= 8 || "รหัสผ่านไม่ตรงตามเงื่อนไข กรุณาตรวจสอบความยาวตัวอักษร ตัวเลข หรือ สัญลักษณ์",
  (v) => /[A-Z]/.test(v) || "รหัสผ่านไม่ตรงตามเงื่อนไข กรุณาตรวจสอบความยาวตัวอักษร ตัวเลข หรือ สัญลักษณ์",
  (v) => /[a-z]/.test(v) || "รหัสผ่านไม่ตรงตามเงื่อนไข กรุณาตรวจสอบความยาวตัวอักษร ตัวเลข หรือ สัญลักษณ์",
  (v) => /[0-9]/.test(v) || "รหัสผ่านต้องมีอย่างน้อยหนึ่งตัวเลข",
  (v) => /[\W_]/.test(v) || "รหัสผ่านต้องมีอย่างน้อยหนึ่งสัญลักษณ์",
];
const counter = ref(0);

const serverErrorMessages = ref([]);
const serverErrorMessagesPassword = ref([]);
const emit = defineEmits([
  "on-forget-password",
  "on-clicked-login",
  "on-login-success",
  "on-login-failed",
]);

const handleForgetPassword = () => {
  emit("on-forget-password");
};

const totalSeconds = ref(900);
const formattedTime = ref("15:00");
const isDisabled = ref(false);

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return (
    minutes.toString().padStart(2, "0") + ":" + secs.toString().padStart(2, "0")
  );
};

const updateTimers = () => {
  if (totalSeconds.value > 0) {
    isDisabled.value = true;
    setTimeout(() => {
      totalSeconds.value--;
      formattedTime.value = formatTime(totalSeconds.value);
      customMessageErr.value = `กรอกรหัสผ่านไม่ถูกต้องเกินกำหนด สามารถกรอกได้ใหม่อีก (${formattedTime.value}) นาที`;
      updateTimers();
    }, 1000);
  } else {
    counter.value = 0;
    customMessageErr.value = "";
    formattedTime.value = "Time's up!";
    isDisabled.value = false;
  }
};


const onLoadCheckExistingUsername = async () => {
  try {
    const response = await VerifyService.checkExistingUsernam(Form.value.Email);
    if (response.data?.is_success) {
      return true;
    }
    return false;
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      emit("on-login-failed", val?.data.error);
      return false;
    }
    emit("on-login-failed", e.message);
    return false;
  }
};

const handleFocus = () => {
  serverErrorMessages.value = [];
  serverErrorMessagesPassword.value = [];
};

const handleLoginClicked = async () => {
  if (!(await onLoadCheckExistingUsername())) {
    emit("on-login-failed", "ไม่มีบัญชีผู้ใช้ในระบบ กรุณาตรวจสอบอีกครั้ง");
    serverErrorMessages.value.push(
      "ไม่มีบัญชีผู้ใช้ในระบบ กรุณาตรวจสอบอีกครั้ง"
    );
    return;
  }
  const is_valid = await registreForm.value.validate();
  if (!is_valid || !is_valid["valid"]) return;
  await login();
};

const login = async () => {
  try {
    const response = await VerifyService.login(
      Form.value.Email,
      Form.value.Password
    );
    if (response.data?.is_success) {
      emit("on-login-success", Form.value);
    }
  } catch (e) {
    if (e.response) {
      counter.value++;
      if (counter.value == 6) {
        updateTimers();
      }
      const val = e.response.data;
      serverErrorMessagesPassword.value = [val?.data.error];
      emit("on-login-failed", val?.data.error);
      return;
    }
    emit("on-login-failed", e.message);
  }
};
onBeforeMount(() => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  Form.value.Email = urlParams.get("accessible_email");
  console.log(urlParams.get("accessible_email"));
});

</script>

<style scoped>
.custom-underline {
  text-decoration: underline;
  color: black;
}

.v-field{
  box-shadow: rgba(100, 100, 111, 0.2) 0px 0px 6px 0px !important;
}
</style>
