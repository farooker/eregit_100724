<template>
  <v-app>
    <confirm-dialog />
    <exception-handle-dialog />
    <template-dialog />
    <alert-success-dialog />
    <default-bar />
    <default-drawer />
    <default-content />
    <share-activity-dialog />
    <failed-dialog />
    <alert-image-dialog />
    <AlertDisclosureDialog />
  </v-app>
</template>

<script setup>
import DefaultBar from "./AppBar.vue";
import DefaultContent from "./AppContent.vue";
import DefaultDrawer from "./AppDrawer.vue";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog.vue";
import TemplateDialog from "@/components/dialogs/TemplateDialog.vue";
import ExceptionHandleDialog from "@/components/dialogs/ExceptionHandleDialog.vue";
import AlertSuccessDialog from "@/components/dialogs/AlertSuccessDialog.vue";
import AlertDisclosureDialog from "@/components/dialogs/AlertDisclosureDialog.vue";
import FailedDialog from "@/components/dialogs/FailedDialog.vue";
import ShareActivityDialog from "@/components/dialogs/ShareActivityDialog.vue";

import AlertImageDialog from "@/components/dialogs/AlertImageDialog.vue";
import { useMyAddressStore } from "@/stores/addressDataStore.js";
import { onMounted } from "vue";
// import { useAlerDisclosuretDialogDialog } from "@/components/dialogs/AlertDisclosureDialogService";

const store = useMyAddressStore();
// import { useAlerDisclosuretDialogDialog } from "@/components/dialogs/AlertDisclosureDialogService";
// const { showAlertDisclosure } = useAlerDisclosuretDialogDialog();

onMounted(async () => {
  await store.getProvince();
  // await showAlertDisclosure(
  //   "กรุณาตรวจสอบข้อมูล",
  //   "หากข้อมูลครบถ้วนถูกต้องให้กด ดำนินการต่อ \nหากพบปัญหากรุณาติดต่อทาง Frasers Property Thailand",
  //   // "หากพบปัญหากรุณาติดต่อทาง Frasers Property Thailand"
  // );
});
</script>
