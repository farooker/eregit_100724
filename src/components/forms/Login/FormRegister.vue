<template>
  <v-container fluid style="height: 100vh; display: flex; align-items: center; justify-content: flex-end !important;">
    <v-form ref="registreForm" style="width: 100%; max-width: 600px;">
      <v-card
        class="pa-7"
        border="outlined"
        style="border-radius: 20px"
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
            <h1>การสร้างบัญชี</h1>
          </div>
          <v-row no-gutters>
            <!-- <v-col><h2>อีเมล</h2></v-col> -->
            <v-col cols="12">
              <v-text-field
                variant="solo"
                class="ml-2 mr-2"
                v-model="Form.Email"
                bg-color="gray"
                :rules="textRequired"
                placeholder="อีเมล"
                :error-messages="errMsg"
                @focus="handleFocus"
              ></v-text-field>
            </v-col>

        <h2 class="my-3">สร้างรหัสผ่านใหม่</h2>
            <v-col cols="12">
              <div class="d-flex position-relative">
                <v-text-field
                variant="solo"
                placeholder="สร้างรหัสผ่านใหม่"
                v-model="Form.NewPassword"
                class="ml-2 mr-2"
                :type="visible ? 'text' : 'password'"
                bg-color="gray"
                :rules="rulesValid.newPassword"
              >
              </v-text-field>
              <div class="tooltip" style="cursor: pointer;">
                <v-tooltip v-model="show" location="top">
                <template v-slot:activator="{ props }">
                  <div icon v-bind="props">
                    <v-icon color="grey-lighten-1">
                      mdi-information-slab-circle
                    </v-icon>
                  </div>
                </template>
                <span class="text-detile">
                  <ul>
                    <li>ต้องมีความยาวอย่างน้อย 8 ตัวอักษร</li>
                    <li>ต้องประกอบไปด้วย ตัวอักษรพิมพ์ใหญ่ ตัวอักษรพิมพ์เล็ก ตัวเลขและสัญลักษณ์ผสมกัน</li>
                  </ul>
                </span>
              </v-tooltip>
              </div>

              </div>
            </v-col>

            <v-col cols="12">
              <v-text-field
                variant="solo"
                rounded="5"
                class="ml-2 mr-2 mt-3"
                placeholder="ยืนยันรหัสผ่านใหม่"
                :type="visible ? 'text' : 'password'"
                v-model="Form.ConPassword"
                bg-color="gray"
                :rules="rulesValid.conPassword"
              ></v-text-field>
            </v-col>

            <v-col cols="8">
              <v-checkbox label="แสดงรหัสผ่าน" v-model="visible"></v-checkbox>
            </v-col>
          </v-row>

          <v-row
            class="text-center pa-5 ma-0"
            dense
            justify="center"
            align="center"
          >
            <v-col cols="12">
              <v-btn
                size="x-large"
                block
                class="text-capitalize rounded-pill"
                color="red"
                @click="handleRegister"
              >
                สร้างบัญชี
              </v-btn>
            </v-col>
          </v-row>
        </v-card-item>
      </v-card>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, watchEffect } from "vue";

import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
import VerifyService from "@/apis/VerifyService";
const { handlingErrorsMessage } = useErrorHandlingDialog();



const props = defineProps({
  email: String,
});

const textRequired = [(v) => !!v || "กรุณากรอกข้อมูลให้ครบถ้วน"];
const rulesValid = ref({
  newPassword: [
    (v) => !!v || "กรุณากรอกข้อมูลให้ครบ",
    (v) => v.length >= 8 || "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร",
    (v) =>
      /[A-Z]/.test(v) || "รหัสผ่านต้องมีอักษรตัวพิมพ์ใหญ่อย่างน้อยหนึ่งตัว",
    (v) =>
      /[a-z]/.test(v) || "รหัสผ่านต้องมีอักษรตัวพิมพ์เล็กอย่างน้อยหนึ่งตัว",
    (v) => /[0-9]/.test(v) || "รหัสผ่านต้องมีอย่างน้อยหนึ่งตัวเลข",
    (v) => /[\W_]/.test(v) || "รหัสผ่านต้องมีอย่างน้อยหนึ่งสัญลักษณ์",
  ],
  conPassword: [
    (v) => !!v || "กรุณากรอกข้อมูลให้ครบ",
    (v) => v === Form.value.NewPassword || "รหัสผ่านไม่ตรงกัน",
    (v) => !!v || "กรุณากรอกรหัสผ่าน",
    (v) => v.length >= 8 || "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร",
    (v) =>
      /[A-Z]/.test(v) || "รหัสผ่านต้องมีอักษรตัวพิมพ์ใหญ่อย่างน้อยหนึ่งตัว",
    (v) =>
      /[a-z]/.test(v) || "รหัสผ่านต้องมีอักษรตัวพิมพ์เล็กอย่างน้อยหนึ่งตัว",
    (v) => /[0-9]/.test(v) || "รหัสผ่านต้องมีอย่างน้อยหนึ่งตัวเลข",
    (v) => /[\W_]/.test(v) || "รหัสผ่านต้องมีอย่างน้อยหนึ่งสัญลักษณ์",
  ],
});

const registreForm = ref(null);
const errMsg = ref([]);
const Form = ref({
  Email: "",
  NewPassword: "",
  ConPassword: "",
});
const visible = ref(false);
const show = ref(false);
const emit = defineEmits(["on-register"]);

const handleFocus = () => {
  errMsg.value = [];
};

const handleRegister = async () => {
  if (Form.value.ConPassword != Form.value.NewPassword) {
    handlingErrorsMessage(
      "Data input wrong",
      "Please checking password and confirm password not match"
    );
    return;
  }
  const is_valid = await registreForm.value.validate();
  if (!is_valid || !is_valid["valid"]) return;
  if (await onLoadCheckExistingUsername()) {
    errMsg.value = "Email is ready, Please change username";
    handlingErrorsMessage(
      "Exiting username",
      "Email is ready, Please change username"
    );
    return;
  }
  emit("on-register", Form.value);
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
      return false;
    }
    return false;
  }
};

watchEffect(() => {
  Form.value.Email = props.email;
});
</script>

<style>
.custom-underline {
  text-decoration: underline;
  color: black;
}

.tooltip {
  position: absolute;
    right: 20px;
    top: 15px;
}

.text-detile {
  padding: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.text-detile ul {
  margin: 0;
  padding: 0;
  list-style-position: inside;
}

</style>
