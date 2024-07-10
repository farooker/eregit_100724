<template>
  <v-btn flat size="small" rounded :color="color" @click="handleItemClick(props.id)">
    <v-icon v-if="props.icon" size="large">{{ props.icon }}</v-icon>
    <p style="margin-top: 3px;">{{ props.text }}</p>
  </v-btn>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  icon: {
    type: String,
    default: null
  },
  text: {
    type: String,
    default: 'None'
  },
  id: {
    type: String,
    default: null
  },
  color:{
    type: String,
    default: 'secondary'
  }
});

const emit = defineEmits(['button-clicked']);

const handleItemClick = (id) => {
  emit('button-clicked', id);
};
</script>


<!-- +mdi mdi-plus -->
