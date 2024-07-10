<template>
  <v-card width="auto">
    <v-card-item>
      <v-row dense>
        <v-col cols="6">
          <h5>เกณฑ์การวัดขั้นต่ำ</h5>
          <v-text-field density="compact" variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="6">
          <h5>ตัววัด</h5>
          <v-text-field density="compact" variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="12">
          <h5>คำอธิบาย</h5>
          <v-textarea density="compact" variant="outlined"></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <Choosefile
            title="อัพโหลดรูปภาพ"
            list-title="Upload Picture"
            icon="mdi mdi-tooltip-image"
            :is-file="on_recieved_file"
            accept=".jpg, .jpeg, .png"
            descritption="อัพโหลดเฉพาะ JPEG, JPG (.jpg), PNG (.png) จำนวน 1 ไฟล์เท่านั้น"
            @input-file="on_recieved_file = $event"
          />
        </v-col>
      </v-row>
    </v-card-item>
    <v-card-actions flat size="small"  class="justify-end ma-5">
      <v-btn
            color="secondary"
            min-width="92"
            rounded
            variant="outlined"
            prepend-icon="mdi mdi-plus"
            density="comfortable"
          >
            <h4>Preview  </h4>
          </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import Choosefile from "./Choosefile.vue";

const on_recieved_file = ref(null);
</script>
