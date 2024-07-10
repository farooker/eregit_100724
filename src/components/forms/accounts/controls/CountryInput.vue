<template>
  <v-card>
    <v-row dense>
      <v-col cols="12">
        <v-card-title>
          <h6>Country</h6>
        </v-card-title>
        <v-text-field
          class="ml-6 mr-6"
          density="compact"
          dense
          :rules="textRequired"
          v-model="data_input.country"
          variant="outlined"
        ></v-text-field>
      </v-col>
      <v-col cols="12" class="mt-n7">
        <v-card-title>
          <h6>Language</h6>
        </v-card-title>
        <v-text-field
          class="ml-6 mr-6"
          density="compact"
          dense
          v-model="data_input.language"
          variant="outlined"
          readonly
          bg-color="#dfdfdf"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { onMounted } from "vue";
import { ref, watch } from "vue";

const emit = defineEmits(["on-input"]);

const textRequired = [(v) => !!v || "กรุณากรอกข้อมูลให้ครบถ้วน"];

const data_input = ref({
  country: "",
  language: "",
});

onMounted(() => {
  data_input.value.country = 'TH'
  data_input.value.language = 'EN'
})

watch(data_input.value, (newValue) => {
  emit("on-input", newValue);
});
</script>
