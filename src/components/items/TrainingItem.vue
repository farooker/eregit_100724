<template>
  <v-card class="mx-auto rounded-lg" elevation="5" height="135">
    <v-card-text>
      <v-card-title class="font-weight-black">
        Training
      </v-card-title>
      <v-skeleton-loader v-if="props.loading" class="mx-auto" width="100%" type="list-item-two-line"></v-skeleton-loader>
      <v-card-actions v-else>
        <h1 class="text-cyan-accent-4 pl-2" style="font-size: 55px;">{{ value }}</h1>
        &nbsp;
        &nbsp;
        <span class="font-weight-black text-cyan-accent-4">vendors</span>
        <v-spacer></v-spacer>
        <v-chip color="cyan-accent-4" label>
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

