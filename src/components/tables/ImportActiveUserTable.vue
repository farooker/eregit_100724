<template>
  <div>
    <v-card class="mx-auto elevation-1" color="secondary">
      <v-card-item>
        <v-row align-center>
          <v-col cols="1">
            <strong>No.</strong>
          </v-col>
          <v-col cols="2">
            <strong>Email</strong>
          </v-col>
          <v-col cols="2">
            <strong>User type</strong>
          </v-col>
          <v-col cols="2">
            <strong>Company</strong>
          </v-col>
          <v-col cols="2">
            <strong>Role</strong>
          </v-col>
          <v-col cols="2">
            <strong>Team</strong>
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
            <v-col cols="2" class="pa-3" :style="validate.isValidEmail(item.email) ? '' : 'border: 2px solid red;'">
               <!-- Email -->
              <span class="pl-1">{{item.email}}</span>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="2" class="pa-3">
              <!-- User Type -->
              <span  class="pl-1">{{item.member_type}}</span>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="2" class="pa-3" :style="companyCode.includes(String(item.company_code)) ? '' : 'border: 2px solid red;'">
              <!-- Company -->
              <span  class="pl-1">{{item.company_code}}</span>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="2" class="pa-3" :style="validate.isValidRole(item.role) ? '' : 'border: 2px solid red;'">
              <!-- Role -->
              <span  class="pl-1">{{item.role}}</span>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="2" class="pa-3">
             <!-- Team -->
              <span  class="pl-1">{{item.team}}</span>
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
