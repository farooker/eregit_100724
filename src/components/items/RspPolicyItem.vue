<template>
  <v-card class="mx-auto rounded-lg" elevation="5" height="135">
    <v-card-text>
      <v-card-title class="font-weight-black">
        RSP Policy
      </v-card-title>
      <v-skeleton-loader v-if="props.loading" class="mx-auto" width="100%"  type="list-item-two-line"></v-skeleton-loader>
      <v-card-actions v-else>
        <h1 class="pl-2 text-teal-darken-3" style="font-size: 55px;">
          {{ value }}
        </h1>
        &nbsp;
        &nbsp;
        <span class="font-weight-black text-teal-darken-3">vendors</span>
        <v-spacer></v-spacer>
        <v-chip color="teal-darken-3" label>
          <span class="font-weight-black">{{ percent }}%</span>
        </v-chip>
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
  },
  percent: {
    type: Number,
    default: 0,
  }
});

</script>

