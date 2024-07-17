<template>
  <ExceptionHandleDialog />
  <div style="background-color: #ededee">
    <div
      class="d-flex"
      style="
        background-image: url('/otp01.png');
        background-size: contain;
        background-position: left center;
        background-repeat: no-repeat;
      "
    >
      <FormInputOtp
        :refCode="itemOTP.reference_code"
        :exp="itemOTP.expired_at"
        :expired-seconds="itemOTP.expired_seconds"
        :email="email"
        :needLogin="false"
        class="d-flex justify-center"
        @on-try-agine="handleTryAgine"
        @on-vertfy-success="handleVertifySuccess"
        @on-vertify-failed="handleVertiFailed"
      />
    </div>
  </div>
</template>

<script setup>
import FormInputOtp from "@/components/forms/Login/FormInputOtp.vue";
import VerifyService from "@/apis/VerifyService";
import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
const { handlingErrorsMessage } = useErrorHandlingDialog();
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import ExceptionHandleDialog from "@/components/dialogs/ExceptionHandleDialog.vue";
const router = useRouter();
import { useSessionInfoStore } from "@/stores/papdStore";
const store = useSessionInfoStore();

const route = useRoute();
const email = route.query.email;
const form_number = route.query.form_number;
const to = route.query.to;

const itemOTP = ref({});

onMounted(async () => {
  await getOptByEmail();
});

const handleTryAgine = async () => {
  window.location.reload();
};

const getOptByEmail = async () => {
  try {
    const response = await VerifyService.getOTP(email, "signup");
    if (response.data?.is_success) {
      itemOTP.value = response.data.data;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  }
};

const handleVertifySuccess = async () => {
  await signup();
};

const handleVertiFailed = (message) => {
  handlingErrorsMessage("Error", message);
};

const handleAuthorization = async (email) => {
  try {
    const response = await VerifyService.getAuthenInfo(email);
    if (response.data?.is_success) {
      console.log("authen", response.data.data[0]);
      const authInfo = response.data.data[0];
      console.log("authenisactive", authInfo.is_active);
      if (!authInfo.is_active) {
        router.push("/Error?err=EXP_FORM");
        return;
      }
      sessionStorage.setItem("userId", authInfo.id);
      const modulesId = Array.from(authInfo.modules, (x) => x.id);

      const modulesJson = JSON.stringify(modulesId);
      sessionStorage.setItem("auth_modules", modulesJson);
    }
  } catch (e) {
    router.push("/Error?err=NOT_FOUND");
  }
};

const signup = async () => {
  try {
    const response = await VerifyService.signUp(
      email,
      localStorage.getItem("temp_new_register"),
      form_number
    );
    if (response.data?.is_success) {
      localStorage.removeItem("temp_new_register");
      if (form_number && to) {
        // sessionStorage.removeItem("auth_modules");
        await handleAuthorization(email);
        store.setsessionlinkstore(2, form_number, to);
        // router.push({
        //   name: to,
        //   query: { form_number: form_number },
        // });\
        router.push({
          name: "TermCondition",
        });
      } else {
        // router.push("/Authorization");
        store.setsessionlinkstore(1, null, "AuthorizationPage");
        router.push({
          name: "TermCondition",
        });
      }
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  }
};
</script>

<style scoped>
.imagebackground {
  background: url("../../../public/login.png") no-repeat center center fixed !important;
  background-size: cover;
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
