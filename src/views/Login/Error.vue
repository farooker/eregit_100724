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
        <v-icon size="100" icon="mdi-alert-outline"></v-icon>
        <h1>{{ errDesc.title }}</h1>
        <p>{{ errDesc.desc }}</p>
        <v-col cols="auto">
          <v-btn color="red" @click="handleToBack" size="small"
            >กลับไปหน้าหลัก</v-btn
          >
        </v-col>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
const router = useRouter();

const route = useRoute();
const err = route.query.err;

const errDesc = ref({
  title: "",
  desc: "",
});

const handleToBack = () => {
  router.push({
    name: "SignInPage",
  });
};

onMounted(() => {
  if (err == "NOT_FOUND") {
    errDesc.value = {
      title: "ขออภัยไม่พบรายการที่ต้องการ",
      desc: "กรุณาตรวจสอบใหม่อีกครั้ง",
    };
  }

  if (err == "EXP_FORM") {
    errDesc.value = {
      title: "ระยะเวลาทำฟอร์มของคุณหมดอายุ",
      desc: "กรุณาติดต่อ Frasers Propoty Thailand เพื่อทำรายการใหม่",
    };
  }

  if (err == "EXP_SING_UP") {
    errDesc.value = {
      title: "ระยะเวลาในการรีเซ็ตรหัสผ่านของคุณหมดอายุกรุณาทำรายการใหม่อีกครั้ง",
      desc: "กรุณาติดต่อ Frasers Propoty Thailand เพื่อทำรายการใหม่",
    };
  }

  if (err == "NOT_MODULES") {
    errDesc.value = {
      title: "คุณไม่มีสิทธิ์การใช้งานระบบ FPT-SQS ",
      desc: "หากท่านต้องการใช้งานกรุณาติดต่อ th.fpt.sqs.support@frasersproperty.com",
    };
  }
  // sessionStorage.removeItem('auth_email');
  //sessionStorage.removeItem('auth_modules');
});
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
