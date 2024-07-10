<template>
  <div>
    <h2>History Log</h2>
    <v-card class="mx-auto elevation-1 mt-10 rounded-lg" color="secondary">
      <v-card-item>
        <v-row align-center>

          <v-col cols="3">
            <strong>Date and Time</strong>
          </v-col>
          <v-col cols="3">
            <strong> User</strong>
          </v-col>
          <v-col cols="3">
            <strong>Change action</strong>
          </v-col>
          <v-col cols="3">
            <strong>Changed by</strong>
          </v-col>
        </v-row>
      </v-card-item>
    </v-card>
    <v-card class="mx-auto elevation-1 mt-5" color="#FFFFFF" style="max-height: 600px;overflow-y: auto;">
      <div v-for="n in 3" :key="n">
        <v-card-item>
          <v-row align-center>

            <v-col cols="3">
              <strong>12/12/2556 14:200:30</strong>
            </v-col>
            <v-col cols="3">
              <strong>test@gmail.com</strong>
            </v-col>
            <v-col cols="3">
              <strong>Update status to</strong>
              &nbsp;
              <strong class="text-red">Admin</strong>
            </v-col>
            <v-col cols="3">
              <strong class="text-red-darken-4">Freelance@gmail.com</strong>
            </v-col>
          </v-row>
        </v-card-item>
        <v-divider></v-divider>
      </div>
    </v-card>
    <div class="text-center">
      <v-btn  to="/UserManagement"  rounded class="mt-10" color="black" >
        <strong>ย้อนกลับ</strong>
      </v-btn>
    </div>
  </div>
</template>

<script setup>
//import { ref } from 'vue';
</script>
