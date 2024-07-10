<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <!-- <div style="background-color: lightgrey"></div> -->
  <v-container style="height: 100vh">
    <v-row align-content="center" class="fill-height" justify="center">
      <v-col class="text-center" cols="12">
        <h2>Authorization</h2>
      </v-col>
      <v-col cols="3">
        <v-progress-linear
          color="secondary"
          height="10"
          indeterminate
          rounded
        ></v-progress-linear>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
// eslint-disable-next-line no-unused-vars
import { ref, onMounted, watch } from "vue";
import VerifyService from "@/apis/VerifyService";
import { useRouter } from "vue-router";
import Navigation from "@/router/navigation";
import { useSessionInfoStore } from "@/stores/sessionInfoStore";

const router = useRouter();
const store = useSessionInfoStore();

onMounted(() => {
  let auth_email = sessionStorage.getItem("auth_email");
  console.log(auth_email);
  handleAuthorization(auth_email);
});

const handleAuthorization = async (email) => {
  try {
    const response = await VerifyService.getAuthenInfo(email);
    if (response.data?.is_success) {
      // result
      console.log("authen", response.data.data[0]);
      const authInfo = response.data.data[0];
      // console.log("authenisactive", authInfo.is_active);
      if (!authInfo.is_active) {
        router.push("/Error?err=EXP_FORM");
        return;
      }
      sessionStorage.setItem("userId", authInfo.id);
      sessionStorage.setItem("bp_numbers", authInfo.bp_number);

      const modulesId = Array.from(authInfo.modules, (x) => x.id);
      store.sessionInfo = authInfo;

      const modulesJson = JSON.stringify(modulesId);
      sessionStorage.setItem("auth_modules", modulesJson);

      const current = sessionStorage.getItem("auth_reload");
      if (current) {
        router.push(current);
        return;
      }
      // console.log("modulesIdfff", modulesId[0])
      handlePushDefualt(modulesId[0]);

    }
  } catch (e) {
    router.push("/Error?err=NOT_FOUND");
  }
};

// eslint-disable-next-line no-unused-vars
const handlePushDefualt = (id) => {
  const root = Navigation.find((_) => _.id === id);
  console.log(root);
  if (!root) {
    router.push("/Error?err=NOT_FOUND");
    return;
  }
  router.push(root.path);
};
</script>
