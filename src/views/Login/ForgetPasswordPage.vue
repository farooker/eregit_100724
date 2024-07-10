<template>
  <!-- <v-container fluid> -->
  <div style="background-color: #EDEDEE">
    <div
      class="d-flex"
      style="
        background-image: url('/otp01.png');
        background-size: contain;
        background-position: left center;
        background-repeat: no-repeat;
      "
    >
    <FormForgetPassword class="d-flex justify-center" />
  </div>
    <!-- <FormLogin /> -->
    <!-- </v-container> -->
  </div>
</template>
<script setup>
// import { ref, onBeforeMount,computed } from 'vue';
import FormForgetPassword from "@/components/forms/Login/FormForgetPassword.vue";
</script>

<style scoped>
.imagebackground {
  background: url("../../../public/login.png") no-repeat left center fixed !important;
  background-size: cover;
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
