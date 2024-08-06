<template>
  <v-row dense>
    <v-col cols="12" class="mt-n1">
      <v-card-title class="ml-n5">
        <h6>จังหวัด {{ props.tagDesc }}</h6>
      </v-card-title>
      <v-text-field
        v-model="data_input.province"
        density="compact"
        :rules="textRequired"
        variant="outlined"
        :readonly="props.isDisableAddress"
        :bg-color="bgColor"
      ></v-text-field>
    </v-col>

    <v-col cols="12" class="mt-n7">
      <v-card-title class="ml-n5">
        <h6>เขต/อำเภอ {{ props.tagDesc }}</h6>
      </v-card-title>
      <v-text-field
        v-model="data_input.district"
        density="compact"
        :rules="textRequired"
        variant="outlined"
        :readonly="props.isDisableAddress"
        :bg-color="bgColor"
      ></v-text-field>
    </v-col>

    <v-col cols="12" class="mt-n7">
      <v-card-title class="ml-n5">
        <h6>แขวง/ตำบล {{ props.tagDesc }}</h6>
      </v-card-title>
      <v-text-field
        v-model="data_input.parish"
        density="compact"
        :rules="textRequired"
        variant="outlined"
        :readonly="props.isDisableAddress"
        :bg-color="bgColor"
      ></v-text-field>
    </v-col>

    <v-col cols="12" class="mt-n7">
      <v-card-title class="ml-n5">
        <h6>รหัสไปรษณีย์</h6>
      </v-card-title>
      <v-text-field
        v-model="data_input.zip_code_value"
        :rules="textRequired"
        density="compact"
        dense
        variant="outlined"
        readonly
        bg-color="rgb(223 223 223 / 30%)"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script setup>
import OtherService from "@/apis/OtherService";
import { ref, watch, watchEffect, computed } from "vue";

const textRequired = [(v) => !!v || "กรุณากรอกข้อมูลให้ครบถ้วน"];

const emit = defineEmits(["on-input"]);

const props = defineProps({
  tagDesc: {
    type: String,
    default: "(EN)",
  },
  isDisableAddress: {
    type: Boolean,
    default: false,
  },
  addressItem: {
    type: Object,
    default: () => {
      return {
        province: null,
        district: null,
        parish: null,
        zip_code: null,
        zip_code_value: null,
      };
    },
  },
});

const bgColor = computed(() => {
  return props.isDisableAddress ? "#dfdfdf" : "white";
});
const data_input = ref({
  province: props.addressItem?.province,
  district: props.addressItem?.district,
  parish: props.addressItem?.parish,
  zip_code: props.addressItem?.zip_code,
  zip_code_value: props.addressItem?.zip_code_value,
});

const tempZipcode = ref(null);
const getPostCodeById = async (id) => {
  try {
    const response = await OtherService.getPostalCodeById(id);
    if (response.data.is_success) {
      return response.data.data.code;
    }
    return "";
  } catch (error) {
    // console.error(error);
  }
};

watchEffect(async () => {
  data_input.value = props.addressItem;
  if (
    props.addressItem?.zip_code &&
    props.addressItem?.zip_code != "" &&
    tempZipcode.value === null
  ) {
    tempZipcode.value = props.addressItem?.zip_code;
    const code = await getPostCodeById(tempZipcode.value);
    data_input.value.zip_code_value = code ? code : props.addressItem?.zip_code;
  }
});

watch(
  () => data_input.value,
  (newValue) => {
    emit("on-input", newValue);
  },
  { deep: true, immediate: false }
);
</script>
