<template>
  <div style="background-color: rgb(237, 237, 238)">
    <ExceptionHandleDialog />
    <div
      align="center"
      style="
        height: 100vh;
        background-image: url('/BG2-02.png');
        background-size: contain;
        background-position: left center;
        background-repeat: no-repeat;
      "
    >
    <FormRegister
      class="d-flex justify-center"
      @on-register="handleRegisterByEmail"
      :email="email"
    />
  </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import FormRegister from "@/components/forms/Login/FormRegister.vue";
import ExceptionHandleDialog from "@/components/dialogs/ExceptionHandleDialog.vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();

const route = useRoute();
const form_number = route.query.form_number;
const to = route.query.to;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const email = urlParams.get("email");
const dataInputRegister = ref({
  Email: email,
  NewPassword: "",
  ConPassword: "",
});
const handleRegisterByEmail = async (newValue) => {
  dataInputRegister.value = newValue;
  localStorage.setItem(
    "temp_new_register",
    dataInputRegister.value.NewPassword
  );
  sessionStorage.setItem("auth_email", dataInputRegister.value.Email);
  if (form_number && to) {
    router.push({
      name: "SignUpOtpPage",
      query: { email: dataInputRegister.value.Email, form_number, to },
    });
  } else {
    router.push({
      name: "SignUpOtpPage",
      query: { email: dataInputRegister.value.Email },
    });
  }
};
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
