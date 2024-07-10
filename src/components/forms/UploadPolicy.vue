<template>
  <v-dialog v-model="dialog" width="850" height="620" persistent>
    <v-card>
      <v-toolbar color="rgba(0, 0, 0, 0)">
        <v-toolbar-title>
         <strong>Uploaded Policy</strong>
        </v-toolbar-title>
        <template v-slot:append>
          <v-btn icon="mdi-close" @click="dialog = false"></v-btn>
        </template>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <div>
          <strong>ชื่อ policy</strong>
        <v-text-field variant="outlined" placeholder="ชื่อ policy" density="compact"></v-text-field>
        </div>
        <Choosefile @input-file="handleOnChangeFile" :is-file="file" title="อัพโหลด policy" list-title="uploaded Files">
        </Choosefile>
      </v-card-text>
      <v-card-actions class="pa-5">
        <v-spacer></v-spacer>
        <v-btn class="rounded-pill" color="secondary" variant="flat" width="120" @click="handleUpload()">
          อัพโหลด
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { ref, computed } from "vue";
import Choosefile from '@/components/forms/Choosefile'
const emit = defineEmits(["visible"]);
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const file = ref(null);
const dialog = computed({
  get() { return props.visible },
  set(value) { emit("visible", value) },
});
const handleOnChangeFile = async (val) => {
  file.value = val;
}
const handleUpload = () => {
  console.log("upload")
}
</script>

