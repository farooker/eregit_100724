<template>
  <div>
    <!-- {{ items }} -->
    <v-card class="mx-auto elevation-1" color="secondary">
      <v-card-item>
        <v-row align-center>
          <v-col cols="2">
            <strong>No.</strong>
          </v-col>
          <v-col cols="3">
            <strong>Vendor Number</strong>
          </v-col>
          <v-col cols="3">
            <strong>Vendor Email</strong>
          </v-col>
          <v-col cols="3">
            <strong>Contact Owner</strong>
          </v-col>
        </v-row>
      </v-card-item>
    </v-card>
    <v-card class="mx-auto elevation-1 mt-5" :style="`max-height: ${height}px;overflow-y: auto;`">
      <div v-for="(item,index) in props.items" :key="index">
          <v-row no-gutters>
            <v-col cols="2" class="pa-3">
              <span>{{index+1}}</span>
            </v-col>

            <v-divider vertical></v-divider>
            <v-col cols="3" class="pa-3" >
               <!-- vendor_number -->
              <span class="pl-1">{{item.vendor_number}}</span>
            </v-col>

            <v-divider vertical></v-divider>
            <v-col cols="3" class="pa-3">
              <!-- vendor_email -->
              <span  class="pl-1">{{item.vendor_email}}</span>
            </v-col>

            <v-divider vertical></v-divider>
            <v-col cols="3" class="pa-3" >
              <!-- contact_owner -->
              <span  class="pl-1">{{item.contact_owner}}</span>
            </v-col>

          </v-row>
        <v-divider></v-divider>
      </div>
  </v-card>
  </div>
</template>
<script setup>
import { defineProps } from 'vue';
// import validate from "@/utils/validateUtils";
const props = defineProps({
  items: {
    type: Array,
    default: ()=> []
  },
  companyCode: {
    type: Array,
    default: ()=> []
  },
  height: {
    type: Number,
    default: 400
  }
});
</script>
