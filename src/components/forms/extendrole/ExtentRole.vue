<template>

  <v-container>
  <div class="text-center">
    <h1 class="pa-5">Extend Role</h1>
        </div>
    <v-container>

           <h2>Vendor > Customer</h2>
      <v-card class="pa-5">
      <v-card-text>
      <v-row no-gutters dense>
                <v-card-title>
            <h5>เลือกสาขาที่ต้องการ</h5>
          </v-card-title>
          <v-col cols="12">
              <v-select
                class="ml-6 mr-6"
                chips
                v-model="data_input.company_data.data"
                :items="items_company_data"
                multiple
                density="compact"
                variant="outlined"
              ></v-select>
          </v-col>
           </v-row>
          </v-card-text>
      </v-card>
    </v-container>


    <v-container class="pa-5 ma-5">
      <v-row justify="center" align="center">
        <!-- ปุ่มยกเลิก -->
        <v-btn color="black" @click="dialog = false" class="ma-0 pa-0 mr-7">
          ยกเลิก
        </v-btn>
        <!-- ปุ่มตกลง -->
        <v-btn color="red" @click="handleConfirm" class="ma-0 pa-0 mr-7">
          ตกลง
        </v-btn>
      </v-row>
    </v-container>
  </v-container>
</template>
<script setup>
import { ref } from "vue";
const items_company_data = [
  { id: 0, title: "2000-บริษัททรัพย์ภักดี จำกัด" },
  { id: 1, title: "2500-บริษัทสีลม คอร์ปอเชั่น จำกัด" },
];

const data_input = ref({
  company_data: {
    is_other: false,
    data: null,
    other: null,
  },
});
</script>
