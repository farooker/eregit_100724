<template>
  <v-menu v-model="menu" :close-on-content-click="false" location="end">
    <template v-slot:activator="{ props }">
      <v-text-field :value="`${prop.from?prop.from:'start date'} - ${prop.to?prop.to:'end date'}`" readonly density="compact" variant="outlined" :placeholder="prop.placeholder"
        append-inner-icon="mdi-calendar-month" v-bind="props">
      </v-text-field>
    </template>
    <v-card>
      <v-card-item>
        <v-row dense>
          <v-col cols="6">
            <v-date-picker
            hide-header v-model="date_from"></v-date-picker>
          </v-col>
          <v-divider vertical inset></v-divider>
          <v-col cols="6">
            <v-date-picker hide-header v-model="date_to"></v-date-picker>
          </v-col>
        </v-row>
      </v-card-item>
    </v-card>
  </v-menu>
</template>
<script setup>

// eslint-disable-next-line no-unused-vars
import { ref, defineProps, watch } from 'vue';

const emit = defineEmits(["from","to"]);
const menu = ref(false);
const date_from = ref(null)
const date_to = ref(null)
const prop = defineProps({
  from: {
    type: String,
    default: null
  },
  to: {
    type: String,
    default: null
  },
  placeholder: {
    type: String,
    default: 'Active Date'
  }
});
watch(date_from, (newValue) => {
  if (newValue) {
    var formattedDateString = formatted(date_from.value);
    emit("from", formattedDateString)
    var diff_day =  differenceDays();
    if(diff_day > 0){
      menu.value = false
    }
  }
});
watch(date_to, (newValue) => {
  if (newValue) {
    var formattedDateString = formatted(date_to.value);
    emit("to", formattedDateString)
    var diff_day =  differenceDays();
    if(diff_day > 0){
      menu.value = false
    }
  }
});
const formatted = (date) => {
  if (date === null || date === undefined || date === '') {
    return "";
  }
  var originalDate = new Date(date);
  var year = originalDate.getFullYear();
  var month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
  var day = originalDate.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}
const differenceDays = () => {
  const date1 = new Date(date_from.value);
  const date2 = new Date(date_to.value);
  const differenceInMilliseconds = date2 - date1;
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
  return differenceInDays;
}

</script>
