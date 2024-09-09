<template>
  <v-container>
    <h3>Edit Team</h3>
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
          <v-col cols="12">
            <v-checkbox v-model="dataInput.is_status" label="Status" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted, defineProps, watch } from "vue";
// import ButtonControl from "../controls/ButtonControl.vue";
// import { useRouter } from "vue-router";

import BusinessUnitService from "@/apis/BusinessUnitService";
import CompnayService from "@/apis/CompnayService";
import { reactive } from "vue";

const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
});

const emit = defineEmits(["on-change"]);
// const router = useRouter();

const item_business_unit = ref([]);
const item_companies = ref([]);

const dataInput = reactive({
  business_unit: props.item.business_unit_id,
  company: props.item.company_id,
  name_en: props.item.name_en,
  name_th: props.item.name_th,
  is_status: props.item.is_active,
});

watch(dataInput, (newValues) => {
  emit("on-change", newValues);
});

onMounted(async () => {
  await onLoadedBusinessUnitAll();
  await onLoadedCompanyAll();
});

watch(
  () => props.item,
  (newVal) => {
    dataInput.business_unit = newVal.business_unit_id;
    dataInput.company = newVal.company_id;
    dataInput.name_en = newVal.name_en;
    dataInput.name_th = newVal.name_th;
    dataInput.is_status = newVal.is_active === 0 ? false : true;
  },
  { deep: true }
);

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

// const on_go_to_back = () => {
//   router.go(-1);
// };

// const submit_from_update_team = () => {};
</script>
