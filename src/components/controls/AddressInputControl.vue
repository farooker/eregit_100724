<template>
  <v-row dense>
    <v-col cols="12" class="mt-n1">
      <v-card-title class="ml-n5">
        <h6>จังหวัด {{ props.tagDesc }}</h6>
      </v-card-title>
      <v-autocomplete
        v-model="data_input.province"
        :items="store.provinces"
        :item-title="props.keyTitle"
        :item-value="props.keyValue"
        density="compact"
        :rules="textRequired"
        variant="outlined"
        :readonly="props.isDisableAddress"
        :bg-color="bgColor"
      ></v-autocomplete>
    </v-col>

    <v-col cols="12" class="mt-n7">
      <v-card-title class="ml-n5">
        <h6>เขต/อำเภอ {{ props.tagDesc }}</h6>
      </v-card-title>
      <v-autocomplete
        v-model="data_input.district"
        :items="itemsDistrict"
        :rules="textRequired"
        :item-title="props.keyTitle"
        :item-value="props.keyValue"
        density="compact"
        variant="outlined"
        :readonly="props.isDisableAddress"
        :bg-color="bgColor"
      ></v-autocomplete>
    </v-col>

    <v-col cols="12" class="mt-n7">
      <v-card-title class="ml-n5">
        <h6>แขวง/ตำบล {{ props.tagDesc }}</h6>
      </v-card-title>
      <v-autocomplete
        v-model="data_input.parish"
        :rules="textRequired"
        :items="itemsSubDistrict"
        :item-title="props.keyTitle"
        :item-value="props.keyValue"
        density="compact"
        variant="outlined"
        :readonly="props.isDisableAddress"
        :bg-color="bgColor"
      ></v-autocomplete>
    </v-col>

    <v-col cols="12" class="mt-n7">
      <v-card-title class="ml-n5">
        <h6>รหัสไปรษณีย์</h6>
      </v-card-title>
      <v-text-field
        v-model="data_input.zip_code_value"
        item-title="code"
        :rules="textRequired"
        item-value="id"
        density="compact"
        dense
        disabled
        variant="outlined"
        readonly
        bg-color="#dfdfdf"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, defineProps, watch, computed, watchEffect } from "vue";
import { onMounted } from "vue";
import { useMyAddressStore } from "@/stores/addressDataStore";

const store = useMyAddressStore();

const emit = defineEmits(["on-input"]);

const textRequired = [(v) => !!v || "กรุณากรอกข้อมูลให้ครบถ้วน"];

const props = defineProps({
  tagDesc: {
    type: String,
    default: "(TH)",
  },
  keyValue: {
    type: String,
    default: "id",
  },
  keyTitle: {
    type: String,
    default: "name_th",
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

onMounted(async () => {});

const data_input = ref({
  province: props.addressItem.province,
  district: props.addressItem.district,
  parish: props.addressItem.parish,
  zip_code: props.addressItem.zip_code,
  zip_code_value: "",
});

const itemsDistrict = ref([]);
const itemsSubDistrict = ref([]);
const itemsPostCode = ref([]);

// const itemsDistrict = computed(() => {
//   return store.districts.filter(
//     (el) => el.province.id == data_input.value.province
//   );
// });

// const itemsSubDistrict = computed(() => {
//   const result = store.subDistricts.filter(
//     (el) => el.district.id == data_input.value.district
//   );
//   return result;
// });

watch(
  () => data_input.value.province,
  async () => {
    if (data_input.value.province) {
      console.log("Proveic Change");
      await store.getDistrict(data_input.value.province);
      itemsDistrict.value = store.districts;
      data_input.value.district = null;
      data_input.value.parish = null;
      itemsSubDistrict.value = [];
    }
  },
  { deep: true, immediate: false }
);

watch(
  () => data_input.value.district,
  async (newdata, oledata) => {
    if (data_input.value.district) {
      await store.getSubDistrict(data_input.value.district);
      itemsSubDistrict.value = store.subDistricts;

      console.log("District Change");
    }
    if (oledata) {
      data_input.value.parish = null;
    }
  },
  { deep: true, immediate: true }
);

watch(
  () => data_input.value.parish,
  async () => {
    if (data_input.value.parish) {
      await store.getPostCode(data_input.value.parish);
      itemsPostCode.value = store.postCodes;
      data_input.value.zip_code = itemsPostCode.value[0]?.id;
      data_input.value.zip_code_value = itemsPostCode.value[0]?.code;
      console.log("SubDistrict Change");
      // console.log(JSON.stringify(itemsPostCode.value[0]?.id));
      // console.log(JSON.stringify(itemsPostCode.value));
    }
  },
  { deep: true, immediate: true }
);

const bgColor = computed(() => {
  return props.isDisableAddress ? "#dfdfdf" : "white";
});

watchEffect(async () => {
  data_input.value = props.addressItem;
  await store.getDistrict(data_input.value.province);
    itemsDistrict.value = store.districts;
  data_input.value.zip_code = props.addressItem.zip_code;
  if (data_input.value.parish) await store.getPostCode(data_input.value.parish);
  itemsPostCode.value = store.postCodes;
  data_input.value.zip_code_value = itemsPostCode.value[0]?.code;
});

watch(
  data_input.value,
  (newValue) => {
    emit("on-input", newValue);
  },
  { deep: false, immediate: false }
);
</script>
