<template>
  <v-container fluid style="height: 100vh; display: flex; align-items: center;">
    <v-card
      class="pa-7"
      border="outlined"
      style="width: 100%; max-width: 600px; border-radius: 20px"
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

        <div class="text-center mt-5 ma-5">
          <h1>Supplier Qualification System</h1>
          <v-card-title>
            <p>กรอกรหัสยืนยัน</p>
          </v-card-title>
        </div>
        <div class="text-center mt-5 pa-5 ma-5">
          <v-card-title>
            <p>กรุณากรอกรหัสยืนยันตัวตนที่ส่งให้ทางอีเมล</p>
          </v-card-title>
          <v-card-title>
            <h4>รหัสจะหมดอายุภายใน ({{ formattedTime }}) นาที</h4>
          </v-card-title>
        </div>
        <v-otp-input length="6" v-model="data_input"></v-otp-input>
        <div class="text-center py-3" style="color: gray;">
          <span>ref.code: {{ props.refCode }}</span>
        </div>

        <v-row
          class="text-center ma-0 px-2"
          dense
          justify="center"
          align="center"
        >
          <v-col cols="12">
            <v-btn
              size="x-large"
              block
              class="text-capitalize rounded-pill"
              style="background-color:#ED1C29 ; color: #fff;"
              :disabled="isDisabled"
              @click="handleVertifyOTP"
            >
              {{ buttonTimeOut }}
            </v-btn>
          </v-col>
        </v-row>

        <div class="text-center mt-5 ma-5">
          <span :class="{ 'text-red': isAlert }" class="underline-on-hover">
            {{ decscription }}
          </span>
          <span class="custom-underline" style="cursor: pointer;">
            <a @click="sendEmailAgain"> ส่งอีเมลใหม่อีกครั้ง</a>
          </span>
        </div>
      </v-card-item>
    </v-card>
  </v-container>
</template>

<script setup>
import VerifyService from "@/apis/VerifyService";
import { String } from "core-js";
import { computed, onMounted, ref } from "vue";

const props = defineProps({
  refCode: String,
  exp: String,
  expiredSeconds: Number,
  email: String,
  needLogin: {
    type: Boolean,
    default: true,
  },
});

const counter = ref({
  dateExp: "",
  secord: 300,
});
const data_input = ref("");
const timeLeft = ref("");
const buttonTimeOut = ref("ยืนยัน");
const decscription = ref("หากไม่ได้รับรหัสผ่านยืนยัน (OTP) ");
const isAlert = ref(false);

const emit = defineEmits([
  "on-vertify",
  "on-try-agine",
  "on-vertfy-success",
  "on-vertify-failed",
]);

const handleVertifyOTP = async () => {
  if (isDisabled.value) {
    emit("on-try-agine");
  } else {
    await vertifyOtpCode();
  }
};

const sendEmailAgain = () => {
  emit("on-try-agine");
};

const isDisabled = computed(() => {
  return data_input.value.length !== 6;
});

function updateTimer() {
  const endDate =
    new Date(counter.value.dateExp).getTime() + counter.value.secord * 1000;

  const now = new Date().getTime();
  const distance = endDate - now;

  if (distance < 0) {
    clearInterval(interval);
    timeLeft.value = "Time's up!";
  } else {
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    timeLeft.value = minutes + "m " + seconds + "s ";
  }
}
const interval = setInterval(updateTimer, 1000);

/******************************** */
const totalSeconds = ref(counter.value.secord);
const formattedTime = ref("05:00");

// Format the time from total seconds to mm:ss
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return (
    minutes.toString().padStart(2, "0") + ":" + secs.toString().padStart(2, "0")
  );
};

const updateTimers = () => {
  if (totalSeconds.value > 0) {
    setTimeout(() => {
      totalSeconds.value--;
      formattedTime.value = formatTime(totalSeconds.value);
      updateTimers();
    }, 1000);
  } else {
    formattedTime.value = "Time's up!";
    isDisabled.value = false;
    buttonTimeOut.value = "ส่งรหัสใหม่อีกครั้ง";
  }
};

onMounted(() => {
  counter.value.dateExp = props.exp;
  counter.value.secord = props.expiredSeconds;
  // updateTimer();
  updateTimers();
});

const vertifyOtpCode = async () => {
  try {
    const response = await VerifyService.getVertifyOTP(
      data_input.value,
      props.refCode
    );
    if (response.data?.is_success) {
      isAlert.value = false;
      decscription.value = "หากไม่ได้รับรหัสผ่านยืนยัน (OTP) ";
      if (props.needLogin) {
        await login();
      } else {
        emit("on-vertfy-success");
      }
    } else {
      throw new Error('Unknown error from server');
    }
  } catch (e) {
    isAlert.value = true;
    if (e.response && e.response.data) {
      const errorMessage = e.response.data.data.error;
      if (errorMessage === "Invalid Incorrect username or password..") {
        decscription.value = "รหัสยืนยันไม่ถูกต้อง กรุณากรอกใหม่ หรือ";
      } else {
        decscription.value = errorMessage;
      }
      emit("on-vertify-failed", errorMessage);
    } else {
      decscription.value = e.message || "เกิดข้อผิดพลาดในการติดต่อกับเซิร์ฟเวอร์";
      emit("on-vertify-failed", e.message);
    }
  }
};

const login = async () => {
  try {
    const response = await VerifyService.login(
      props.email,
      localStorage.getItem("temp_new_register")
    );
    if (response.data?.is_success) {
      emit("on-vertfy-success");
    }
  } catch (e) {
    isAlert.value = true;
    if (e.response) {
      const val = e.response.data;
      decscription.value = val?.data.error;
      emit("on-vertify-failed", val?.data.error);
      return;
    }
    decscription.value = e.message;
    emit("on-vertify-failed", e.message);
  }
};
</script>


<style scoped>
.custom-underline {
  text-decoration: underline;
  color: black;
}

.underline-on-hover a:hover {
  text-decoration: underline;
  cursor: pointer;
}

.text-red {
  color: red;
}

.v-btn--disabled.v-btn--variant-elevated {
  background-color: #D3D3D3 !important;
}

.v-field {
  box-shadow: rgba(99, 99, 99, 0.2) 1px 4px 10px 0px !important;
  border-radius: 10px !important;
  border: 1px solid #ededed !important;
  -webkit-border-radius: 10px !important;
  -moz-border-radius: 10px !important;
  -ms-border-radius: 10px !important;
  -o-border-radius: 10px !important;
}

</style>
