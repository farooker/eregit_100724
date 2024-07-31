<template>
  <!-- permanent -->
  <v-navigation-drawer rail v-model="isOpen" expand-on-hover>
    <v-list dense color="secondary">
      <nav-item
        v-for="(item, index) in menus"
        :key="index"
        :go-to="item.path"
        :is-active="isActive(item.path)"
        :icon="item.icon"
        :id="item.id"
        :title="item.title"
      ></nav-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import NavItem from "../components/items/NavItem.vue";
import Navigation from "@/router/navigation";
import { useSessionInfoStore } from "@/stores/sessionInfoStore";
const store = useSessionInfoStore();

import { useRouter } from "vue-router";
const router = useRouter();

const isOpen = ref(true);
const route = useRoute();

const isActive = (path) => {
  // console.log(route.path.split("/")[1]);
  // console.log(path.split("/")[1]);
  // console.log(route.path === path);
  // if(route.path === path) return true
  // return false;
  if (route.path.split("/")[1] == path.split("/")[1]) return true;
  return false;
};
const menus = computed(() => {
  const modules = store.sessionInfo?.modules;
  if (modules) {
    const route = modules.map((x) => {
      const menu = Navigation.find((item) => item.id === x.id);

      if (!menu) {
        return {
          id: 0,
          title: "-",
          icon: "mdi-help",
          isActive: false,
          path: "#",
        };
      }

      return menu;
    });
    return route.filter((_) => _.id !== 0);
  }
  return [];
});

onMounted(() => {
  const modules = store.sessionInfo?.modules;
  if (modules === null || modules === undefined || modules === "") {
    const currentUrl = router.currentRoute.value.fullPath;
    sessionStorage.setItem("auth_reload", currentUrl);
    router.push("/Authorization");
  }
});
</script>
