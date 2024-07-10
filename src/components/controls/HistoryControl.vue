<template>
  <v-row  no-gutters>
    <v-col cols="12" class="d-flex justify-end">
      <a>
        <p
          class="custom-font-size clickable-underline"
          @click="handleItemClick"
        >
          History Logs
        </p>
      </a>
    </v-col>
  </v-row>
</template>

<script setup>
const emit = defineEmits(["link-clicked"]);
import { defineProps } from 'vue';
const props = defineProps({
  id: {
    type: String,
    default: null
  },
});

const handleItemClick = () => {
  emit("link-clicked", props.id);
};
</script>

<style>
.custom-font-size {
  font-size: 12px;
}

.clickable-underline {
  text-decoration: underline;
  cursor: pointer;
}
</style>
