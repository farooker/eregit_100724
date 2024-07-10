<template>
  <v-row dense>
    <!-- {{ steptwoFormDetail }} -->
    <!-- {{ steptwoFormDetail[0]?.search }} -->
    <v-col cols="12"><h2>ที่อยู่สาขา</h2></v-col>
    <v-col cols="12">
      <v-card>
        <v-row dense no-gutters>
          <v-col cols="12">
            <v-card-title>
              <h6>Branch code</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              v-model="data_input_head_comp_branch.info.branch_code"
              dense
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>Branch description</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              v-model="data_input_head_comp_branch.info.branch_desc"
              dense
              variant="outlined"
            ></v-text-field>
          </v-col>

          <!-- <v-col cols="12" v-if="props.typeForm === AccountType.CUSTOMER">
            <v-card-title>
              <h6>Default Branch Code</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              v-model="data_input_head_comp_branch.info.default_branch_code"
              dense
              variant="outlined"
            ></v-text-field>
          </v-col> -->

          <v-col cols="12">
            <v-card-title>
              <h6>Search Term 1 (TH Branch)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              v-model="data_input_head_comp_branch.info.serach_team.th"
              dense
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>Search Term 1 (EN Branch)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              v-model="data_input_head_comp_branch.info.serach_team.en"
              dense
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card>
        <!--Th/////////////////-->
        <AddressInputTH
          class="pr-6"
          :steptwoFormDetail="props.steptwoFormDetail"
          tag-desc="(TH Branch)"
          :is-not-team="true"
          :isDisableAddress="false"
          :address-item="props.addressItem"
          :register-form-detail="props.registerFormDetail"
          :name="props.nameTh"
          :register_type="3"
          :address="props.addressTh"
          @on-input="handleAddressTH"
        />

        <v-col cols="12" class="mt-n1">
          <v-card-title class="ml-n5">
            <h6>จังหวัด</h6>
          </v-card-title>
          <v-autocomplete
            v-model="data_input.province"
            :items="store.provinces"
            item-title="name_th"
            item-value="id"
            density="compact"
            :rules="textRequired"
            variant="outlined"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" class="mt-n7">
          <v-card-title class="ml-n5">
            <h6>เขต/อำเภอ</h6>
          </v-card-title>
          <v-autocomplete
            v-model="data_input.district"
            :items="itemsDistrict"
            :rules="textRequired"
            item-title="name_th"
            item-value="id"
            density="compact"
            variant="outlined"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" class="mt-n7">
          <v-card-title class="ml-n5">
            <h6>แขวง/ตำบล</h6>
          </v-card-title>
          <v-autocomplete
            v-model="data_input.parish"
            :rules="textRequired"
            :items="itemsSubDistrict"
            item-title="name_th"
            item-value="id"
            density="compact"
            variant="outlined"
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
      </v-card>
    </v-col>
    <v-col cols="12">
      <AddressInputEN
        :register_type="2"
        class="pr-6"
        tag-desc="(EN Branch)"
        :is-not-team="true"
        :isDisableAddress="false"
        :steptwoFormDetail="props.steptwoFormDetail"
        :register-form-detail="props.registerFormDetail"
        :is-address-manual="true"
        key-title="name_en"
        :address-item="data_input_head_comp_branch.address_en.location"
        :name="props.nameEn"
        :address="props.addressEn"
        @on-input="handleAddressEN"
      />
      <!-- <v-card>
        <ManaulAddressInputControl
          :address-item="data_input_head_comp_branch.address_en.location"
          class="ma-5"
          tag-desc="(EN Branch)"
          @on-input="handleAddressEN"
        />
      </v-card> -->
    </v-col>
    <v-col cols="12"><CountryInput /></v-col>
    <v-col cols="12" v-for="(item, index) in props.contactItems" :key="index"
      ><ContactInput
        :index="index"
        :name="item.name"
        :email="item.email"
        :phone="item.phone"
        @on-input="handleContact"
    /></v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import { watch, watchEffect } from "vue";

import AddressInputTH from "../controls/AddressInput.vue";
import AddressInputEN from "../controls/AddressInput.vue";
// import ManaulAddressInputControl from "@/components/controls/ManaulAddressInputControl.vue";
import CountryInput from "../controls/CountryInput.vue";
import ContactInput from "../controls/ContactInput.vue";
import AccountType from "@/utils/enum.util";
import { onMounted } from "vue";

import { useMyAddressStore } from "@/stores/addressDataStore";
const store = useMyAddressStore();

const props = defineProps({
  nameEn: String,
  nameTh: String,
  addressEn: String,
  addressTh: String,
  typeForm: {
    type: Number,
    default: AccountType.CUSTOMER, //0-Customer 1-Vender
  },
  branchCode: {
    type: String,
  },
  barnchDesc: {
    type: String,
  },
  addressItem: {
    type: Object,
    default: null,
  },
  contactItems: {
    type: Array,
    default: () => [{ index: 0, name: "", email: "", phone: "" }],
  },
  addressItemEn: {
    type: Object,
    default: null,
  },
  registerFormDetail: {
    type: Object,
    default: () => {},
  },

  steptwoFormDetail: {
    type: Object,
    default: () => {},
  },
});

const textRequired = [(v) => !!v || "กรุณากรอกข้อมูลให้ครบถ้วน"];
const emit = defineEmits(["on-input"]);

const data_input = ref({
  province: props.registerFormDetail?.account_information_form
    ?.branch_province_th_id ??null
    ? props.registerFormDetail?.account_information_form?.branch_province_th_id ?? null
    : props.addressItem?.province?? null,
  district: props.registerFormDetail?.account_information_form
    ?.branch_distict_th_id ?? null
    ? props.registerFormDetail?.account_information_form?.branch_distict_th_id ?? null
    : props.addressItem?.district ?? null,
  parish: props.registerFormDetail?.account_information_form
    ?.branch_subdisticte_th_id ?? null
    ? props.registerFormDetail?.account_information_form?.branch_subdisticte_th_id ?? null
    : props.addressItem.parish ?? null,
  zip_code: props.registerFormDetail?.account_information_form
    ?.branch_postal_code_th_id ?? null
    ? props.registerFormDetail?.account_information_form?.branch_postal_code_th_id ?? null
    : props.addressItem?.zip_code ?? null,
  zip_code_value: "",
});

const itemsDistrict = ref([]);
const itemsSubDistrict = ref([]);
const itemsPostCode = ref([]);

const data_input_head_comp_branch = ref({
  address_th: {
    location: props.addressItem ?? null,
  },
  address_en: {
    location: null,
  },
  info: {
    branch_code: props.branchCode,
    branch_desc:
      props.branchCode === "00000"
        ? "สำนักงานใหญ่"
        : props.branchCode === "NVAT"
        ? "NVAT"
        : props.barnchDesc,
    default_branch_code: "",
    serach_team: {
      th:
        props.branchCode === "00000"
          ? "สำนักงานใหญ่"
          : props.branchCode === "NVAT"
          ? "NVAT"
          : props.barnchDesc,
      en:
        props.branchCode === "00000"
          ? "Head office"
          : props.branchCode === "NVAT"
          ? "NVAT"
          : props.barnchDesc,
    },
  },
  contacts: props.contactItems,
});

watchEffect(async () => {
  data_input.value.zip_code = props.addressItem.zip_code;
  if (data_input.value.province)
    await store.getDistrict(data_input.value.province);
  itemsDistrict.value = store.districts;
  if (data_input.value.parish) await store.getPostCode(data_input.value.parish);
  itemsPostCode.value = store.postCodes;
  data_input.value.zip_code_value = itemsPostCode.value[0]?.code;

  if (props.registerFormDetail?.account_information_form?.branch_province_en ?? null) {
    data_input_head_comp_branch.value.address_en.location.province =
      props.registerFormDetail.account_information_form.branch_province_en;
    data_input_head_comp_branch.value.address_en.location.district =
      props.registerFormDetail.account_information_form.branch_distict_en;
    data_input_head_comp_branch.value.address_en.location.parish =
      props.registerFormDetail.account_information_form.branch_subdisticte_en;
    data_input_head_comp_branch.value.address_en.location.zip_code =
      props.registerFormDetail.account_information_form.branch_postal_code_en_id;
    data_input_head_comp_branch.value.address_en.location.zip_code_value =
      props.registerFormDetail.account_information_form.branch_postal_code_en_id;
  } else {
    data_input_head_comp_branch.value.address_en.location = props.addressItemEn;
  }
});

onMounted(() => {
  emit("on-input", data_input_head_comp_branch.value);
});

// const handleAddressTH = (data_obj) => {
//   data_input_head_comp_branch.value.address_th = data_obj;
//   // data_input_head_comp_branch.value.address_en = data_obj;
// };

const handleAddressEN = (data_obj) => {
  data_input_head_comp_branch.value.address_en = data_obj;
};

const handleAddressTH = (data_obj) => {
  data_input_head_comp_branch.value.address_th.location = data_obj;
};

const handleContact = (data_obj) => {
  data_input_head_comp_branch.value.contacts[data_obj.index] = data_obj;
};

watch(
  () => data_input.value.province,
  async () => {
    if (data_input.value.province) {
      console.log("Proveic Change");
      data_input.value.district = null;
      data_input.value.parish = null;
      await store.getDistrict(data_input.value.province);
      itemsDistrict.value = store.districts;
      itemsSubDistrict.value = [];

      data_input_head_comp_branch.value.address_th.location = data_input.value;
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
      data_input_head_comp_branch.value.address_th.location = data_input.value;
    }
    if (oledata) {
      data_input.value.parish = null;

      //
    }
    // data_input.value.parish = null;
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
      data_input_head_comp_branch.value.address_th.location = data_input.value;
      // console.log(JSON.stringify(itemsPostCode.value[0]?.id));
      // console.log(JSON.stringify(itemsPostCode.value));
    }
  },
  { deep: true, immediate: true }
);

watch(data_input_head_comp_branch.value, (newValue) => {
  emit("on-input", newValue);
});
</script>

<style scoped>
:deep(.v-field) {
  border-radius: 10px !important;
  border: 1px solid #ededed !important;
  -webkit-border-radius: 10px !important;
  -moz-border-radius: 10px !important;
  -ms-border-radius: 10px !important;
  -o-border-radius: 10px !important;
}
</style>
