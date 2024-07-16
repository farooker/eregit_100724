<template>
  <ExceptionHandleDialog />
  <div style="background-color: lightgrey">
    <v-row align="center">
      <v-col cols="6">
        <v-row no-gutters>
          <v-col
            class="d-flex"
            cols="12"
            style="
              height: 100vh;
              background-image: url('/otp01.png');
              background-size: cover;
              background-position: center;
            "
          >
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6">
        <FormInputOtp
          :refCode="itemOTP.reference_code"
          :exp="itemOTP.expired_at"
          :expired-seconds="itemOTP.expired_seconds"
          :email="email"
          class="d-flex justify-center"
          @on-try-agine="handleTryAgine"
          @on-vertfy-success="handleVertifySuccess"
        />
      </v-col>
    </v-row>
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
import { useSessionInfoStore } from "@/stores/papdStore";

const store = useSessionInfoStore();

const route = useRoute();
const router = useRouter();
const email = route.query.email;
const form_number = route.query.form_number;
const itemOTP = ref({});

onMounted(async () => {
  await getOptByEmail();
});

const handleTryAgine = async () => {
  window.location.reload();
};

const handleVertifySuccess = async () => {
  localStorage.removeItem("temp_new_register");
  // sessionStorage.removeItem("auth_modules");
  await handleAuthorization(email);
  store.setsessionlinkstore(4,form_number,"NonDisclosure")
  // router.push({
  //   name: "NonDisclosure",
  //   query: { form_number: form_number },
  // });
    router.push({
    name: "TermCondition",
  });
};

// const handleVertiFailed = (message) => {
//   handlingErrorsMessage("Error", message);
// };

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

const handleAuthorization = async (email) => {
  try {
    const response = await VerifyService.getAuthenInfo(email);
    console.log("responeauthen",response.data?.is_success)
    if (response.data?.is_success) {

      console.log("authen", response.data.data[0]);
      const authInfo = response.data.data[0];
      const modulesId = Array.from(authInfo.modules, (x) => x.id);
      const modulesJson = JSON.stringify(modulesId);
      sessionStorage.setItem("auth_modules", modulesJson);
      console.log("authenisactive", authInfo.is_active);
      if (!authInfo.is_active) {
        router.push("/Error?err=EXP_FORM");
        return;
      }
      sessionStorage.setItem("userId", authInfo.id);
    }
  } catch (e) {
    router.push("/Error?err=NOT_FOUND");
  }
};
</script>

<style scoped>
.imagebackground {
  background: url("../../../public/login.png") no-repeat center center fixed !important;
  background-size: cover;
}
</style>
