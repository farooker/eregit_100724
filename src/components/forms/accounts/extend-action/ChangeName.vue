<template>
  <!-- บัญชีธนาคาร -->
  <v-container>
    <v-row dense>
      <v-col cols="12"><h2>เปลี่ยนชื่อ</h2></v-col>
      <v-col cols="12">
        <v-card class="">
          <v-row dense no-gutters>
            <v-col cols="12">
              <v-card-title>
                <h6>Business Partner Number</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.partner_number"
                dense
                variant="outlined"
                :rules="required"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>ชื่อเดิม Name (TH)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.name_th_1"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>ชื่อเดิม Name 1 (TH)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.name_th_2"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>ชื่อเดิม Name 2 (TH)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.name_th_3"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>ชื่อเดิม Name 3 (TH)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.name_th_4"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>ชื่อเดิม Name 4 (TH)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.name_th_5"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>ชื่อเดิม Name (EN)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.name_en_1"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>ชื่อเดิม Name 1 (EN)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.name_en_2"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>ชื่อเดิม Name 2 (EN)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.name_en_3"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>ชื่อเดิม Name 3 (EN)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.name_en_4"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>ชื่อเดิม Name 4 (EN)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.name_en_5"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>Search Term 1 (TH)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.search_term_th"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>Search Term 1 (EN)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.search_term_en"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <!-- เว้น -->
            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>ชื่อใหม่ Name 1 (TH)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.new_name_th_1"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>ชื่อใหม่ Name 2 (TH)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.new_name_th_2"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>ชื่อใหม่ Name 3 (TH)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.new_name_th_3"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>ชื่อใหม่ Name 4 (TH)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.new_name_th_4"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>ชื่อใหม่ Name 1 (EN)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.new_name_en_1"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>ชื่อใหม่ Name 2 (EN)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.new_name_en_2"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>ชื่อใหม่ Name 3 (EN)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.new_name_en_3"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>ชื่อใหม่ Name 4 (EN)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.new_name_en_4"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>Search Term 1 (TH) ใหม่</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.new_search_term_th"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>Search Term 1 (EN) ใหม่</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.new_search_term_en"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { ref, watch, watchEffect } from "vue";

const emit = defineEmits(["on-data-update"]);

const required = [(v) => !!v || "กรุณากรอกข้อมูลให้ครบถ้วน"];


const propsVar = defineProps({
  changeNameInfomation: {
    type: Object,
    default: () => {
      return {
        id: null,
        form_number: null,
        business_partner_number: null,
        name_th: null,
        name1_th: null,
        name2_th: null,
        name3_th: null,
        name4_th: null,
        search_term1_th: null,
        name_en: null,
        name1_en: null,
        name2_en: null,
        name3_en: ".",
        name4_en: null,
        search_term1_en: null,
      };
    },
  },
  index: Number,
});

const data_input = ref({
  partner_number: "",
  name_th_1: "",
  name_th_2: "",
  name_th_3: "",
  name_th_4: "",
  name_th_5: "",
  name_en_1: "",
  name_en_2: "",
  name_en_3: "",
  name_en_4: "",
  name_en_5: "",
  new_name_th_1: "",
  new_name_th_2: "",
  new_name_th_3: "",
  new_name_th_4: "",
  new_name_th_5: "",
  new_name_en_1: "",
  new_name_en_2: "",
  new_name_en_3: "",
  new_name_en_4: "",
  new_name_en_5: "",
  search_term_en: "",
  search_term_th: "",
  new_search_term_th: "",
  new_search_term_en: "",
});

watchEffect(() => {
  data_input.value.partner_number =
    propsVar.changeNameInfomation?.business_partner_number;
  data_input.value.name_th_1 = propsVar.changeNameInfomation?.name_th;
  data_input.value.name_th_2 = propsVar.changeNameInfomation?.name1_th;
  data_input.value.name_th_3 = propsVar.changeNameInfomation?.name2_th;
  data_input.value.name_th_4 = propsVar.changeNameInfomation?.name3_th;
  data_input.value.name_th_5 = propsVar.changeNameInfomation?.name4_th;

  data_input.value.search_term_th =
    propsVar.changeNameInfomation?.search_term1_th;

  data_input.value.name_en_1 = propsVar.changeNameInfomation?.name_en;
  data_input.value.name_en_2 = propsVar.changeNameInfomation?.name1_en;
  data_input.value.name_en_3 = propsVar.changeNameInfomation?.name2_en;
  data_input.value.name_en_4 = propsVar.changeNameInfomation?.name3_en;
  data_input.value.name_en_5 = propsVar.changeNameInfomation?.name4_en;

  data_input.value.search_term_en =
    propsVar.changeNameInfomation?.search_term1_en;
});

watch(
  data_input.value,
  () => {
    emit("on-data-update", {
      index: propsVar.index,
      newValue: data_input.value,
    });
  },
  { deep: true, immediate: true }
);
</script>
