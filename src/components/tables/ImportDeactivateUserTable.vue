<template>
  <div>
    <v-card class="mx-auto elevation-1" color="secondary">
      <v-card-item>
        <v-row align-center>
          <v-col cols="1">
            <strong>No.</strong>
          </v-col>
          <v-col cols="11">
            <strong>Email</strong>
          </v-col>
        </v-row>
      </v-card-item>
    </v-card>
    <v-card class="mx-auto elevation-1 mt-5" :style="`max-height: ${height}px;overflow-y: auto;`">
      <div v-for="(item,index) in props.items" :key="index">
          <v-row no-gutters>
            <v-col cols="1" class="pa-3">
              <span>{{index+1}}</span>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="11" class="pa-3" :style="validate.isValidEmail(item.email) ? '' : 'border: 2px solid red;'">
               <!-- Email -->
              <span class="pl-1">{{item.email}}</span>
            </v-col>
          </v-row>
        <v-divider></v-divider>
      </div>
  </v-card>
  </div>
</template>
<script setup>
import { defineProps } from 'vue';
import validate from "@/utils/validateUtils";
const props = defineProps({
  items: {
    type: Array,
    default: ()=> []
  },
  height: {
    type: Number,
    default: 400
  }
});
</script>
