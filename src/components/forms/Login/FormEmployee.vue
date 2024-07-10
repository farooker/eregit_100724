<template>
  <v-container>
    <v-card
      class="pa-7"
      border="outlined"
      style="border-radius: 20px"
      width="700"
      height="500"
    >
      <v-card-item dense>
        <v-row align="center">
          <v-col class="d-flex justify-center">
            <!-- <v-img
              aspect-ratio="16/9"
              cover
              prepend-icon="mdi mdi-information-outline"
                width="100"
                src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
              ></v-img> -->
            <v-img
              style="max-width: 200px"
              class="mt-5"
              src="/frasers.png"
            ></v-img>
          </v-col>
        </v-row>

        <div class="text-center mt-5 pa-5 ma-5">
          <h1>Supplier Qualification System</h1>
          <h1>For FPT Member</h1>
        </div>


        <v-row class="text-center pa-5 ma-0" dense justify="center" align="center">
          <v-col cols="12">
            <!-- Set cols to 12 to take up the full width of the row -->
            <v-btn
            size="x-large"
              to="/BusinessPartner/CreateBusinessPartner"
              block
              class="text-capitalize rounded-pill"
              color="red"
            >
              <!-- <v-icon>mdi-plus</v-icon> -->
              เข้าสู่ระบบ
            </v-btn>
          </v-col>
        </v-row>
      </v-card-item>
    </v-card>
  </v-container>
</template>
<script setup>
// import { ref } from "vue";
// const Form = ref({
//   Email: "",
//   NewPassword: "",
//   ConPassword: "",
//   CheckPass: "",
// });
</script>
