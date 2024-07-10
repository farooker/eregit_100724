<template>
  <!-- <v-container fluid> -->
  <div style="background-color: lightgrey">
  <v-row align="center">
    <v-col cols="6">
      <v-row no-gutters>
        <v-col
          class="d-flex"
          cols="12"
          style="
            height: 100vh;
            background-image: url('/BG2-02.png');
            background-size: cover;
            background-position: center;
          "
        >
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="6">
      <NewPassword class="d-flex justify-center"/>
    </v-col>
  </v-row>
  <!-- <FormLogin /> -->
  <!-- </v-container> -->
  <ConfirmDialog />
  <TemplateDialog />
  <ExceptionHandleDialog />
  <AlertSuccessDialog />
  </div>
</template>
<script setup>
// import { ref, onBeforeMount,computed } from 'vue';
import NewPassword from "@/components/forms/Login/FormNewPassword.vue";
import ConfirmDialog from '@/components/dialogs/ConfirmDialog.vue';
import TemplateDialog from '@/components/dialogs/TemplateDialog.vue';
import ExceptionHandleDialog from '@/components/dialogs/ExceptionHandleDialog.vue';
import AlertSuccessDialog from '@/components/dialogs/AlertSuccessDialog.vue'
</script>
<style scoped>
.imagebackground {
  background: url("../../../public/login.png") no-repeat center center fixed !important;
  background-size: cover;
}
</style>
