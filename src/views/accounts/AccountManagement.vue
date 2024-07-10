<template>
  <v-container fluid>
    <v-tabs v-model="tab" color="secondary">
      <v-tab
        v-for="(tabs, index) in items"
        :key="index"
        class="text-capitalize"
      >
        {{ tabs.title }}
      </v-tab>
    </v-tabs>
    <v-divider></v-divider>
    <new-task v-if="tab === 0" />
    <daft-task v-if="tab === 1" />
    <export-task v-if="tab === 2" />
    <archive-task v-if="tab === 3" />
    <reject-task v-if="tab === 4" />
  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import ArchiveTask from "@/views/accounts/acc-tabs/ArchiveTask.vue";
import DaftTask from "@/views/accounts/acc-tabs/DaftTask.vue";
import ExportTask from "@/views/accounts/acc-tabs/ExportTask.vue";
import NewTask from "@/views/accounts/acc-tabs/NewTask.vue";
import RejectTask from "@/views/accounts/acc-tabs/RejectTask.vue";

const items = ref([
  { title: "New Tasks", icon: "mdi-account-outline" },
  { title: "Draft", icon: "mdi-link-variant" },
  {
    title: "Ready to export",
    icon: "mdi-link-variant",
  },
  { title: "Archive", icon: "mdi-link-variant" },
  { title: "Reject", icon: "mdi-link-variant" },
]);

const route = useRoute();
const tab = ref(items.value[0]);

onMounted(() => {
  switch (route.query.path) {
    case "ArchiveTask":
      tab.value = 3;
      break;
    case "DaftTask":
      tab.value = 1;
      break;
    case "ExportTask":
      tab.value = 2;
      break;
    case "NewTask":
      tab.value = 0;
      break;
    case "RejectTask":
      tab.value = 4;
      break;
  }
});

</script>
