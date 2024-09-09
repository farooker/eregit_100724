<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <v-chip v-if="props.value" color="green" label class="font-weight-bold">
      <v-icon>mdi-circle-medium</v-icon>
      Active
    </v-chip>
    <v-chip v-else color="secondary" label class="font-weight-bold">
      <v-icon>mdi-circle-medium</v-icon>
      Inactive
    </v-chip>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
});
</script>
