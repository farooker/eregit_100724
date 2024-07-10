<template>
  <v-menu v-model="menu" :close-on-content-click="false" location="end">
    <template v-slot:activator="{ props }">
      <v-text-field  :value="value" readonly density="compact" variant="outlined" :placeholder="placeholder"
        append-inner-icon="mdi-calendar-month" v-bind="props">
      </v-text-field>
    </template>

    <v-card>
      <v-date-picker v-model="date"></v-date-picker>
    </v-card>
  </v-menu>
</template>
<script setup>

// eslint-disable-next-line no-unused-vars
import { ref, defineProps, watch } from 'vue';

const emit = defineEmits(["value"]);
const menu = ref(false);
const date = ref(null)

const props = defineProps({
  value: {
    type: String,
    default: null
  },
  placeholder: {
    type: String,
    default: 'Active Date'
  }
});

watch(menu, (newValue) => {
  if (newValue) {
    date.value = props.newValue;
  }
});
watch(date, (newValue) => {
  if(newValue){
    var originalDate = new Date(date.value);
    var year = originalDate.getFullYear();
    var month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
    var day = originalDate.getDate().toString().padStart(2, '0');
    var formattedDateString = `${year}-${month}-${day}`;
    emit("value", formattedDateString)
    menu.value = false
  }

});

</script>
