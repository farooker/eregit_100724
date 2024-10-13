<template>
  <v-row dense>
    <v-col cols="12" v-for="(item, index) in 1" :key="index">
      <credit-score-management />
    </v-col>
    <v-col cols="12">
      <v-btn
        prepend-icon="mdi mdi-plus"
        color="secondary"
        min-width="92"
        rounded
        variant="outlined"
      >
        เพิ่ม
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import CreditScoreManagement from "../../components/forms/CreditScoreManagement.vue";
</script>
