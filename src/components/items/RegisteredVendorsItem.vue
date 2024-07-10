<template>
  <v-card class="mx-auto rounded-lg" elevation="5" height="135">
    <v-card-text>
      <v-card-title class="font-weight-black">
        Registered Vendors
      </v-card-title>
      <v-skeleton-loader v-if="props.loading" class="mx-auto" width="100%"  type="list-item-two-line"></v-skeleton-loader>
      <v-card-actions v-else>
        <h1 class="text-secondary font-weight-black pl-2" style="font-size: 55px;">
          {{ value }}
        </h1>
        &nbsp;
        &nbsp;
        <span class="text-secondary font-weight-black">vendors</span>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>
<script setup>
/*eslint-disable no-unused-vars  */
import { defineProps } from 'vue';
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  value: {
    type: Number,
    default: 0,
  }
});

</script>

