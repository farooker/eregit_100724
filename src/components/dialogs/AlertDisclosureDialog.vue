<template>
  <v-row justify="center">
    <v-dialog v-model="isVisible" width="480" height="300">
      <v-card width="480" height="300">
        <v-card-text class="ma-1">
          <v-row justify="center" class="pt-5">
            <v-icon size="100" color="red"
              >mdi mdi-file-document-check</v-icon
            >
          </v-row>
          <v-row justify="center">
            <v-col cols="12" align-self="center">
              <h3 class="new-line">{{ title }}</h3>
            </v-col>
          </v-row>
          <v-row justify="center" no-gutters>
            <v-col cols="12" align-self="center">
              <p class="new-line sub-title-text">
                {{ message }}
              </p>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="auto">
              <button-control
                color="secondary"
                text="รับทราบ"
                width="100"
                @button-clicked="confirmDialog"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script setup>
import ButtonControl from "../controls/ButtonControl.vue";
import { useAlerDisclosuretDialogDialog } from "@/components/dialogs/AlertDisclosureDialogService.js";

const { isVisible, title, message, confirmDialog } = useAlerDisclosuretDialogDialog();
</script>

<style>
.new-line {
  white-space: pre-line;
  text-align: center;
}
.sub-title-text {
  color: gray;
  font-size: 90%;
}
</style>
