<template>
<v-container>

    <v-card class="mt-9 pt-9" >
          <v-toolbar color="rgba(0, 0, 0, 0)">
        <v-toolbar-title>
         <strong>แนบเอกสารเพิ่มเติม</strong>
        </v-toolbar-title>
        <!-- <template v-slot:append>
          <v-btn icon="mdi-close" @click="dialog = false"></v-btn>
        </template> -->
      </v-toolbar>
    <div class="pa-9">
        <ChooseMultiFiles
          :max-file="10"
          icon="mdi mdi-file-document"
          @input-files="handleInputFiles"
        />
        </div>
    <v-row justify="end" class="mt-2 mb-2">
      <v-col cols="2">
        <v-card-actions class="pa-5">
        <v-spacer></v-spacer>
        <!-- <v-btn class="rounded-pill" color="secondary" variant="flat" width="120" @click="handleUpload()">
          อัพโหลด
        </v-btn> -->

        <v-spacer></v-spacer>
      </v-card-actions>
     </v-col>
    </v-row>
  </v-card>

</v-container>


</template>
<script setup>
import ChooseMultiFiles from "../ChooseMultiFiles.vue";
// import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
// import { onMounted, ref } from "vue";
// const { handlingErrorsMessage } = useErrorHandlingDialog();

const emit = defineEmits([
  "on-input-files",
]);

const handleInputFiles = (files) => {
  emit("on-input-files", files);
};





</script>
