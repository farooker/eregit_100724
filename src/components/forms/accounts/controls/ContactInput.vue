<template>
  <v-card>
    <v-row dense>
      <v-col cols="12">
        <v-card-title>
          <h6>ชื่อผู้ติดต่อ {{ props.index + 1 }}</h6>
        </v-card-title>
        <v-text-field
          class="ml-6 mr-6"
          density="compact"
          dense
          v-model="data_input.name"
          variant="outlined"
        ></v-text-field>
      </v-col>

      <v-col cols="12" class="mt-n7">
        <v-card-title>
          <h6>Telephone {{ props.index + 1 }}</h6>
        </v-card-title>
        <v-text-field
          class="ml-6 mr-6"
          density="compact"
          dense
          v-model="data_input.phone"
          variant="outlined"
        ></v-text-field>
      </v-col>

      <v-col cols="12" class="mt-n7">
        <v-card-title>
          <h6>Email {{ props.index + 1 }}</h6>
        </v-card-title>
        <v-text-field
          class="ml-6 mr-6"
          density="compact"
          dense
          v-model="data_input.email"
          variant="outlined"
        ></v-text-field>
      </v-col>

      <!-- <v-col cols="12">
        <v-card-title>
          <h6>ชื่อผู้ติดต่อ 2</h6>
        </v-card-title>
        <v-text-field
          class="ml-6 mr-6"
          density="compact"
          dense
          v-model="data_input.user_two.name"
          variant="outlined"
        ></v-text-field>
      </v-col>

      <v-col cols="12" class="mt-n7">
        <v-card-title>
          <h6>Telephone 2</h6>
        </v-card-title>
        <v-text-field
          class="ml-6 mr-6"
          density="compact"
          dense
          v-model="data_input.user_two.telephone"
          variant="outlined"
        ></v-text-field>
      </v-col>

      <v-col cols="12" class="mt-n7">
        <v-card-title>
          <h6>Email 2</h6>
        </v-card-title>
        <v-text-field
          class="ml-6 mr-6"
          density="compact"
          dense
          v-model="data_input.user_two.email"
          variant="outlined"
        ></v-text-field>
      </v-col> -->
    </v-row>
  </v-card>
</template>

<script setup>
import { ref, watch } from "vue";

const emit = defineEmits(["on-input"]);

const props = defineProps({
  index: Number,
  name: String,
  phone: String,
  email: String,
});

const data_input = ref({
  index: props.index,
  name: props.name,
  phone: props.phone,
  email: props.email,
});

// const data_input = ref({
//   user_one: {
//     name: "",
//     telephone: "",
//     email: "",
//   },
//   user_two: {
//     name: "",
//     telephone: "",
//     email: "",
//   },
// });

watch(data_input.value, (newValue) => {
  emit("on-input", newValue);
});
</script>
