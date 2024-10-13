<template>
  <v-row
    style="background-color: white; border-radius: 10px"
    dense
    align="center"
  >
    <v-col cols="10">
      <v-text-field
        placeholder="กรุณากรอกคำถาม"
        variant="outlined"
        v-model="metaData.question"
        required
        :rules="[(v) => !!v || 'Required.']"
        density="compact"
      ></v-text-field>
    </v-col>
    <v-col cols="10">
      <v-text-field
        variant="outlined"
        v-model="metaData.answer"
        placeholder="คำตอบ"
        required
        density="compact"
      ></v-text-field>
    </v-col>
    <v-divider></v-divider>
    <v-col cols="6" class="d-flex justify-start">
      <v-checkbox
        v-model="metaData.isRequire"
        hide-spin-buttons
        hide-details
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

const propsVar = defineProps({
  metaDataParagrahpNone: {
    type: Object,
    default: () => {
      return {
        question: "",
        answer: "",
        isRequire: false,
      };
    },
  },
});

let metaData = ref(propsVar.metaDataParagrahpNone);
const emit = defineEmits(["on-update", "on-remove"]);

watch(metaData.value, (newValue) => {
  // emit("on-update", { paragraph_none: newValue });
  emit("on-update", newValue);
  // console.log(JSON.stringify({ paragraph_none: newValue }));
});
</script>
