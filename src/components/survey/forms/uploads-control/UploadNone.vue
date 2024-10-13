<template>
  <v-row
    style="background-color: white; border-radius: 10px"
    dense
    align="center"
    class="mt-2"
  >
    <v-col cols="10">
      <v-text-field
        placeholder="กรุณากรอกคำถาม"
        variant="outlined"
        required
        :rules="[(v) => !!v || 'Required.']"
        v-model="metaData.question"
        density="compact"
      ></v-text-field>
    </v-col>
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
    <v-divider></v-divider>
    <v-col cols="6" class="d-flex justify-start">
      <v-checkbox
        v-model="metaData.isRequire"
        class="pa-0 ma-0"
        label="Require"
      ></v-checkbox>
    </v-col>
    <v-col cols="6" class="d-flex justify-end">
      <v-btn
        prepend-icon="mdi mdi-delete-outline"
        variant="outlined"
        rounded
        @click="$emit('on-remove')"
      >
        Delete
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, watch, defineEmits } from "vue";
import Choosefile from "../../../forms/Choosefile.vue";

const propsVar = defineProps({
  metaDataUploadNone: {
    type: Object,
    default: () => {
      return {
        question: "",
        isRequire: false,
        files: [],
      };
    },
  },
});

let metaData = ref(propsVar.metaDataUploadNone);

const on_recieved_file = ref(null);

const emit = defineEmits(["on-update", "on-remove"]);

watch(metaData.value, (newValue) => {
  // emit("on-update", { upload_file_none: newValue });
  emit("on-update", newValue);
  // console.log(JSON.stringify({ upload_file_none: newValue }));
});

watch(on_recieved_file, (newValue) => {
  metaData.value.files[0] = newValue;
});
</script>
