<template>
  <v-container>
    <v-row justify="center" align="center">
      <h1 class="pa-5">Extend Company</h1>
    </v-row>

    <v-container>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h5>สำหรับบริษัท</h5>
          </v-card-title>
          <v-row dense>
            <v-col cols="12">
              <v-autocomplete
                class="ml-6 mr-6"
                chips
                v-model="data_input.company_data.data"
                closable-chips
                :items="items_company_data"
                multiple
                density="compact"
                variant="outlined"
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
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


<style scoped>
:deep(.v-text-field .v-field) {
  border-radius: 10px !important;

}

:deep(.v-chip--variant-tonal .v-chip__underlay) {
  background-color: #ed1c24 !important;

}

:deep(.v-chip.v-chip--density-default) {
  border: 1px solid #ed1c24 !important;
}
</style>
