<template>
  <v-btn flat size="large" rounded :color="color" @click="handleItemClick(props.id)">
    <v-icon v-if="props.icon">{{ props.icon }}</v-icon>
    {{ props.text }}
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
