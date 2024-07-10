<template>
  <v-container fluid>
    <div class="pa-7 ma-9">
      <v-card rounded class="mx-auto pa-4">
        <v-card-title class="d-flex align-center justify-center">
          <v-row dense no-gutters class="mb-4">
            <v-col cols="12" class="text-center mb-5">
              <h3>แบบรายงานและเปิดเผยความขัดแย้งและผลประโยชน์</h3>
            </v-col>
            <v-row justify="center" align="center">
              <v-col cols="12" class="text-center mb-4">
                <h4>สำหรับบุคคลหรือนิติบุคคลที่เข้ามาก่อนิติสัมพันธ์</h4>
              </v-col>
            </v-row>

            <v-col cols="12">
              <v-row justify="center" align="center">
                <h4>Conflict of Interest Disclosure Form for vendor</h4>
              </v-row>
            </v-col>
          </v-row>
        </v-card-title>

        <v-row dense no-gutters class="ma-8 pa-8"

                    v-for="(item, index) in input_data.items_contects"
                    :key="index"
        >
          <!-- <h4 class="ml-">บรรทัดสอง</h4> -->
          <v-col cols="1" class="">
            <v-card-title>
              <h6>ชื่อ</h6>
            </v-card-title>
            <!-- <h4 class="ml-">เลขประจำผู้เสียภาษีอากร</h4> -->
          </v-col>
          <v-col cols="2">
            <v-radio-group v-model="item.select_title" inline color="red">
              <v-radio label="นาย" value="นาย"></v-radio>
              <v-radio label="นาง" value="นาง"></v-radio>
              <v-radio label="นางสาว" value="นางสาว"></v-radio>
            </v-radio-group>
          </v-col>

          <v-col cols="4">
            <v-text-field
              class="ml-"
              density="compact"
              dense
              variant="outlined"
              v-model="item.firstname"
            ></v-text-field>
          </v-col>
          <v-col cols="1" class="">
            <v-card-title>
              <h6>นามสกุล</h6>
            </v-card-title>
          </v-col>
          <v-col cols="4">
            <v-text-field
              class=""
              density="compact"
              dense
              variant="outlined"
              v-model="item.lastname"
            ></v-text-field>
          </v-col>






          <v-col cols="1" class="">
            <v-card-title>
              <h6>ตำแหน่ง</h6>
            </v-card-title>
          </v-col>
          <v-col cols="3">
            <v-text-field
              class=""
              density="compact"
              dense
              variant="outlined"
              v-model="input_data.lastname"
            ></v-text-field>
          </v-col>

          <v-col cols="1" class="">
            <v-card-title>
              <h6>หน่วยงาน</h6>
            </v-card-title>
          </v-col>
          <v-col cols="3">
            <v-text-field
              class=""
              density="compact"
              dense
              variant="outlined"
              v-model="input_data.lastname"
            ></v-text-field>
          </v-col>
          <v-col cols="1" class="">
            <v-card-title>
              <h6>เกี่ยวข้องเป็น</h6>
            </v-card-title>
          </v-col>
          <v-col cols="3">
            <v-text-field
              class=""
              density="compact"
              dense
              variant="outlined"
              v-model="input_data.lastname"
            ></v-text-field>
          </v-col>
        </v-row>
                          <ButtonControl
                    icon="mdi mdi-plus"
                    text="เพิ่ม"
                    @button-clicked="handleAddNewContact"
                  />

        <div v-if="input_data.radio == 1">
          <h1>popopopopo</h1>
        </div>
      </v-card>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import ButtonControl from "@/components/controls/ButtonControl.vue";
const input_data = ref({
  radio: null,
  select_title: null,
  company_name: "",
  items_contects: [],
  taxpayer_id_number: "",
  firstname: "",
  lastname: "",
});

const handleAddNewContact = () => {
  input_data.value.items_contects.push({
    firstname: "",
    select_title: "",
    lastname: "",
  });
};
</script>
