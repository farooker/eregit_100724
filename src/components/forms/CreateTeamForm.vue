<template>
  <v-container>
    <h3>Create Team</h3>
    <v-card>
      <v-card-text>
        <v-row no-gutters dense>
          <v-col cols="12"><h4>Business Unit</h4></v-col>
          <v-col cols="12">
            <v-select
              v-model="dataInput.business_unit"
              density="compact"
              :items="item_business_unit"
              item-title="name_en"
              item-value="id"
              variant="outlined"
              :rules="[(v) => !!v || 'Business Unit is required']"
              placeholder="เลือก Business Unit"
            ></v-select>
          </v-col>
          <v-col cols="12"><h4>Company</h4></v-col>
          <v-col cols="12">
            <v-select
              v-model="dataInput.company"
              density="compact"
              :items="item_companies"
              item-title="name_en"
              :rules="[(v) => !!v || 'Company is required']"
              item-value="id"
              variant="outlined"
              placeholder="เลือก Company"
            ></v-select>
          </v-col>
          <v-col cols="12"><h4>Name TH</h4></v-col>
          <v-col cols="12">
            <v-text-field
              variant="outlined"
              v-model="dataInput.name_th"
              placeholder="กรอกชื่อภาษาไทย"
              :rules="[(v) => !!v || 'Name TH is required']"
              density="compact"
            ></v-text-field>
          </v-col>
          <v-col cols="12"><h4>Name EN</h4></v-col>
          <v-col cols="12">
            <v-text-field
              variant="outlined"
              v-model="dataInput.name_en"
              placeholder="กรอกชื่อภาษาอังกฤษ"
              :rules="[(v) => !!v || 'Name EN is required']"
              density="compact"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { reactive } from "vue";

import BusinessUnitService from "@/apis/BusinessUnitService";
import CompnayService from "@/apis/CompnayService";
import { watch } from "vue";

const emit = defineEmits(["on-change"]);

const item_business_unit = ref([]);
const item_companies = ref([]);

const dataInput = reactive({
  business_unit: null,
  company: null,
  name_en: null,
  name_th: null,
  is_status: true,
});

watch(dataInput, (newValue) => {
  emit("on-change", newValue);
});

onMounted(() => {
  onLoadedBusinessUnitAll();
  onLoadedCompanyAll();
});

const onLoadedBusinessUnitAll = async () => {
  try {
    const response = await BusinessUnitService.getBusinesUnitAll();
    if (response.data?.is_success) {
      item_business_unit.value = response.data.data;
    }
  } catch (error) {
    // Failed
  }
};

const onLoadedCompanyAll = async () => {
  try {
    const response = await CompnayService.getCompanyAll();
    if (response.data?.is_success) {
      item_companies.value = response.data.data;
    }
  } catch (error) {
    // Failed
  }
};
</script>