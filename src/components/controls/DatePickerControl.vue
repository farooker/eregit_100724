<template>
  <v-menu v-model="dropdown" :close-on-content-click="false" location="end">
    <template v-slot:activator="{ props }">
      <v-text-field :value="prop.date" readonly density="compact" :disabled="disabled" variant="outlined" :placeholder="prop.placeholder"
        append-inner-icon="mdi-calendar-month" v-bind="props">
      </v-text-field>
    </template>
    <v-card>
      <v-card-item>
          <v-date-picker hide-header v-model="date_selected"></v-date-picker>
      </v-card-item>
    </v-card>
  </v-menu>
</template>
<script setup>

// eslint-disable-next-line no-unused-vars
import { ref, defineProps, watch } from 'vue';
import dateUtils from "@/utils/dateUtils";
const emit = defineEmits(["date"]);
const dropdown = ref(false);
const date_selected = ref(null)
const prop = defineProps({
  date: {
    type: String,
    default: null
  },
  placeholder: {
    type: String,
    default: 'Active Date'
  },
  disabled: {
    type: Boolean,
    default: false
  }
});
watch(date_selected, (newValue) => {
  if (newValue) {
    var dateFormat = formatted(date_selected.value);
    emit("date", dateFormat)
    dropdown.value = false;
  }
});
const formatted = (_date) => {
  if (_date === null || _date === undefined || _date === '') {
    return null;
  }
  return dateUtils.parseDdMmYyyy(_date);
}
</script>
