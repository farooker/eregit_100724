<template>
  <v-row justify="center">
    <v-dialog v-model="isVisible" width="450" height="320">
      <v-card  color="secondary">
        <v-card-text class="ma-5">
          <v-row justify="center" class="pt-5">
            <v-icon size="100">mdi mdi-alert-circle-outline</v-icon>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" align-self="center">
              <h3 class="new-line">{{ title }}</h3>
            </v-col>
          </v-row>
          <v-row justify="center" no-gutters>
            <v-col cols="12" align-self="center">
              <p class="new-line">
                {{ message }}
              </p>
            </v-col>
          </v-row>
          <v-row justify="center">
              <v-spacer></v-spacer>
              <button-control
                color="white"
                text="ตกลง"
                width="100"
                @button-clicked="confirmDialog"
              />
              <v-spacer></v-spacer>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script setup>
import ButtonControl from "../controls/ButtonControl.vue";
// eslint-disable-next-line no-unused-vars
import { useValidDialog } from "@/components/dialogs/TemplateDialogService";


const { isVisible,title, message, confirmDialog } = useValidDialog();
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
