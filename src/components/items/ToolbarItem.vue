<style>
   .progress_bar {
    border-bottom: 3px solid red;
    background-color: rgba(255, 0, 0, 0.05)
   }

</style>

<template>
  <v-row class="elevation-3 mt-5" style="background-color: white;">
    <v-col  cols="3" align="center" class="pa-3"  @click="prev">
      <div>
        <v-icon icon="mdi-check-circle" color="green"> </v-icon>
        <span class="text-grey">{{props.title}}</span>
      </div>
    </v-col>
    <v-col  cols="3" align="center" class="pa-3  progress_bar">
      <div>
        <v-icon :icon="props.icon" color="red"> </v-icon>
        <span class="text-red">{{props.title}}</span>
      </div>
    </v-col>

    <v-col  cols="3" align="center" class="pa-3" @click="next">
      <div>
          <v-icon :icon="props.icon" color="grey"></v-icon>
          <span class="text-grey">{{props.title}}</span>
      </div>
    </v-col>
    <!-- <v-divider vertical></v-divider>
    <v-col class="pa-3" cols="3" align="center">
      <v-icon icon="mdi-check-circle" color="green"></v-icon>
      นโยบาย RSP
    </v-col>
    <v-divider vertical></v-divider>
    <v-col class="pa-3" cols="3" align="center"
      style="border-bottom: 3px solid red;  background-color: rgba(255, 0, 0, 0.05);">
      <v-icon icon="mdi-list-box" color="red"></v-icon>
      <span class="text-red">แบบสำรวจ</span>
    </v-col>
    <v-divider vertical></v-divider>
    <v-col class="pa-3" cols="3" align="center">
      <v-icon icon="mdi-laptop-account" color="grey"></v-icon>
      <span class="text-grey">การเรียนรู้</span>
    </v-col> -->
  </v-row>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  title: {
    type: String,
    default: 'Text',
  },
  icon: {
    type: String,
    default: 'mdi-list-box',
  },
  disabled: {
    type: Boolean,
    default: true,
  }
 });
const prev = ()=>{
  console.log('prev')
}
 const next = () =>{
  console.log('Next')
 }

</script>
