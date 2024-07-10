<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app>
    <v-app-bar :elevation="2" rounded>
      <v-app-bar-title class="d-flex justify-center">
        <v-img
          :width="100"
          aspect-ratio="16/9"
          cover
          src="/frasers.png"
        ></v-img>
      </v-app-bar-title>
    </v-app-bar>
    <v-main class="d-flex align-center justify-center" style="height: 100vh">
      <div class="text-center">
        <!-- <v-row justify="center" class="pt-5"> -->
        <v-col cols="auto">
          <v-icon size="100" color="green">mdi mdi-check-circle</v-icon>
          <!-- </v-row> -->
        </v-col>
        <v-col cols="auto">
          <v-card-title>
            <h4>ขอบคุณสำหรับการดำเนินการ</h4>
          </v-card-title>
        </v-col>
        <v-col cols="auto">
          <v-btn color="red" @click="logout" size="large"
            >ออกจากระบบบ</v-btn
          >
        </v-col>
      </div>
    </v-main>
  </v-app>
</template>
 
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
 
function logout() {
  sessionStorage.removeItem("auth_email");
  sessionStorage.removeItem("auth_modules");
  sessionStorage.removeItem("auth_reload");
  router.push({
    name: "SignInPage",
  });
}
</script>
 
<style>
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
 
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>