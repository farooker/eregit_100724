<template>
  <v-container fluid style="height: 100vh; display: flex; align-items: center">
    <v-card
      class="px-5 py-5"
      border="outlined"
      style="width: 100%; max-width: 600px; border-radius: 20px"
    >
      <v-form v-model="validateForm">
        <v-card-item dense>
          <div class="d-flex justify-center">
            <!-- <v-img
              aspect-ratio="16/9"
              cover
              prepend-icon="mdi mdi-information-outline"
                width="100"
                src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
              ></v-img> -->
            <v-img
              style="max-width: 200px"
              class="mt-5"
              src="/frasers.png"
            ></v-img>
          </div>

          <div class="text-center mt-5 ma-5">
            <h1>Supplier Qualification System</h1>
            <v-card-title>
              <h3 class="mb-5">ลืมรหัสผ่าน</h3>
            </v-card-title>
          </div>
          <div class="text-center mt-5 ma-5 ">
            <h3>ระบบจะทำการส่ง Email ไปยัง</h3>
          </div>
          <v-text-field
            v-model="email"
            class="mx-2"
            variant="outlined"
            placeholder="Email"
          :rules="emailRules"
            :error-messages="serverErrorMessages"
            @focus="handleFocus"
          ></v-text-field>
          <v-row
            class="text-center pa-0 ma-0"
            dense
            justify="center"
            align="center"
          >
            <v-col cols="12">
              <v-btn
                size="x-large"
                block
                class="text-capitalize rounded-pill mt-3"
                color="secondary"
                :disabled="isDisabled"
                :loading="loading"
                @click="sendEmail"
              >
                {{ sendAgain ? "ส่งใหม่อีกครั้ง" : "ส่ง" }}
              </v-btn>
            </v-col>
          </v-row>
          <div v-if="sendAgain"  class="text-center mt-8 ml-5 mr-5">
            <span class="underline-on-hover text-secondary">
              ระบบทำการส่งอีเมลให้อีกครั้งแล้ว
            </span>
          </div>
          <div class="text-center mt-0 ml-5 mr-5">
            <span>กรุณาคลิก Link ในอีเมล เพื่อทำการตั้งรหัสใหม่</span>
          </div>
        </v-card-item>
      </v-form>
    </v-card>
  </v-container>
</template>
<script setup>
import { ref,watch } from "vue";
//import { useRouter } from 'vue-router';
import verifyService from "@/apis/VerifyService";

import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
const { handlingErrorsMessage } = useErrorHandlingDialog();
import VerifyService from "@/apis/VerifyService";

const email = ref(null);
const loading = ref(false);
const sendAgain = ref(false);
const validateForm = ref(null);
// const rulesValid = ref({
//   email: [
//     (v) => !!v || "กรุณากรอกข้อมูลให้ครบ",
//     (v) => /^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(v) || "email ไม่ถูกต้อง",
//   ],
// });
const isDisabled = ref(true);
const serverErrorMessages = ref([]);
// const textRequired = [(v) => !!v || "กรุณากรอกข้อมูลให้ครบถ้วน"];
const emailRules = [
  (v) => !!v || "กรุณากรอกข้อมูลให้ครบ",
  (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Email format ไม่ถูกต้อง",
];
// const serverErrorMessagesPassword = ref([]);
const handleFocus = () => {
  serverErrorMessages.value = [];
};
const emit = defineEmits([
  "on-forget-password",
  "on-clicked-login",
  "on-login-success",
  "on-login-failed",
]);

const validateFormState = () => {
  isDisabled.value = !validateForm.value;
};

watch(email, validateFormState);
const sendEmail = async () => {
  if (validateForm.value ) {
    if (!(await onLoadCheckExistingUsername())) {
    emit("on-login-failed", "ไม่มีบัญชีผู้ใช้ในระบบ กรุณาตรวจสอบอีกครั้ง");
    serverErrorMessages.value.push(
      "ไม่มีบัญชีผู้ใช้ในระบบ กรุณาตรวจสอบอีกครั้ง"
    );
    return;
  }
    try {
      loading.value = true;
      const response = await verifyService.forgetPassword(email.value);
      if (response.data?.is_success) {
        sendAgain.value = true;
      }
    } catch (e) {
      if (e.response) {
        const val = e.response?.data;
        handlingErrorsMessage(val.message, val.data?.error);
        return;
      }
      handlingErrorsMessage("unknown", e.message);
    } finally {
      loading.value = false;
    }
  }
};

// const handleLoginClicked = async () => {
//   if (!(await onLoadCheckExistingUsername())) {
//     emit("on-login-failed", "ไม่มีบัญชีผู้ใช้ในระบบ กรุณาตรวจสอบอีกครั้ง");
//     serverErrorMessages.value.push(
//       "ไม่มีบัญชีผู้ใช้ในระบบ กรุณาตรวจสอบอีกครั้ง"
//     );
//     return;
//   }
// };

const onLoadCheckExistingUsername = async () => {
  try {
    const response = await VerifyService.checkExistingUsernam(email.value);
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
</script>
