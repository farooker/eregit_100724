<template>
  <ExceptionHandleDialog />
  <div style="background-color: #EDEDEE">
    <div

      style="
        height: 100vh;
        background-image: url('/BG2-02.png');
        background-size: contain;
        background-position: left center;
        background-repeat: no-repeat;
      "
    >
      <FormLogin
        class="d-flex justify-center"
        @on-forget-password="handleForgetPassword"
        @on-login-success="handleLoginSuccessfully"
        @on-login-failed="handleLoginFailed"
      />
    </div>
  </div>
</template>



<script setup>
import { onMounted, ref } from "vue";
import FormLogin from "@/components/forms/Login/FormLogin.vue";
import { useRouter, useRoute } from "vue-router";
import VerifyService from "@/apis/VerifyService";
import ExceptionHandleDialog from "@/components/dialogs/ExceptionHandleDialog.vue";

const router = useRouter();
const route = useRoute();
const dataInput = ref({
  Email: "",
  Password: "",
});

const email = route.query.email;
const code = route.query.code;

const handleForgetPassword = () => {
  router.push({
    name: "ForgetPasswordPage",
  });
};

onMounted(async () => {
  if (email && code) await handleVertifyUrl();
});

const handleVertifyUrl = async () => {
  try {
    const response = await VerifyService.verifyUrl(email, code);
    if (response.data?.is_success) {
      await checkedUserExits();
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.status;
      if (val === 400) {
        router.push({
          name: "ErrorPage",
          query: { err: "EXP_FORM" },
        });
      } else if (val === 404) {
        router.push({
          name: "ErrorPage",
          query: { err: "NOT_FOUND" },
        });
      }
    }
  }
};

const checkedUserExits = async () => {
  try {
    await VerifyService.checkExistingUsernam(email);
  } catch (e) {
    const val = e.response.status;
    if (val === 404) {
      router.push({
        name: "SignUpPage",
      });
    }
  }
};

const handleLoginSuccessfully = (dataInputLogin) => {
  dataInput.value = dataInputLogin;
  localStorage.setItem("temp_new_register", dataInput.value.Password);
  sessionStorage.setItem("auth_email", dataInput.value.Email);
  router.push({
    name: "LoginOtpPage",
    query: { email: dataInput.value.Email },
  });
};

// const handleLoginFailed = (message) => {
//   handlingErrorsMessage("Error", message);
// };
</script>


<style scoped>
.imagebackground {
  background: url("../../../public/login.png") no-repeat left center fixed !important;
  background-size: contain;
}

:deep(.v-field) {
  box-shadow: rgba(99, 99, 99, 0.2) 1px 4px 10px 0px !important;
  border-radius: 10px !important;
  border: 1px solid #ededed !important;
  -webkit-border-radius: 10px !important;
  -moz-border-radius: 10px !important;
  -ms-border-radius: 10px !important;
  -o-border-radius: 10px !important;
}
</style>


