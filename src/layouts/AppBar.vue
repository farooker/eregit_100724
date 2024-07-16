<template>
  <v-app-bar :elevation="2" rounded>
    <v-app-bar-title class="d-flex justify-start">
      <!-- <v-btn icon="mdi mdi-menu"></v-btn
      > -->
      <v-img :width="100" aspect-ratio="16/9" cover src="/frasers.png"></v-img
    ></v-app-bar-title>

    <template v-slot:append>
      <!-- <v-btn>
        <v-badge :content="1" color="secondary">
          <v-icon size="x-large" color="grey">mdi mdi-bell</v-icon>
        </v-badge>
      </v-btn> -->
      <v-btn icon="mdi mdi-cog" color="grey"></v-btn>
      <!-- <v-btn icon="mdi mdi-account"></v-btn> -->
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi mdi-account" v-bind="props" color="grey"></v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :value="index"
            @click="handleSignOut"
          >
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const items = ref(["Logout"]);

const handleSignOut = () => {
  sessionStorage.removeItem("auth_email");
  sessionStorage.removeItem("auth_modules");
  sessionStorage.removeItem("auth_reload");
  router.push({
    name: "SignInPage",
  });
};
</script>

<style scoped>
.v-toolbar {
  border-radius: 0px !important;
}
</style>
