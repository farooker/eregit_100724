<template>
  <v-row>
    <!-- {{ bp_type_selection }} -->
    <v-col cols="12"><h2>ข้อมูลคู่ค้า</h2></v-col>
    <v-col cols="12">
      <v-card>
        <v-row dense>
          <v-col cols="12">
            <v-card-title>
              <h6>Business partner</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              v-model="data_input.main_data.business_partner"
              variant="outlined"
              readonly
              bg-color="rgb(223 223 223 / 30%)"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            class="mt-n7"
            v-if="props.register_type == AccountType.AccountType.CUSTOMER"
          >
            <v-card-title>
              <h6>Customer number</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              v-model="data_input.main_data.vender_number"
              variant="outlined"
              readonly
              bg-color="rgb(223 223 223 / 30%)"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            class="mt-n7"
            v-if="props.register_type != AccountType.AccountType.CUSTOMER"
          >
            <v-card-title>
              <h6>Vendor number</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              v-model="data_input.main_data.vender_number"
              variant="outlined"
              readonly
              bg-color="rgb(223 223 223 / 30%)"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="mt-n7">
            <v-card-title>
              <h6>Business partner group</h6>
            </v-card-title>
            <v-select
              class="ml-6 mr-6"
              v-model="data_input.main_data.business_partner_gruop_selection"
              :items="displayItemsBusinessPartnerGroup"
              item-title="displayName"
              :rules="textRequired"
              item-value="id"
              density="compact"
              variant="outlined"
            ></v-select>
          </v-col>

          <v-col cols="12" class="mt-n7">
            <v-card-title>
              <h6>Business partner category</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              :rules="textRequired"
              density="compact"
              dense
              v-model="data_input.main_data.business_partner_catega"
              variant="outlined"
              readonly
              bg-color="rgb(223 223 223 / 30%)"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="mt-n7">
            <v-card-title>
              <h6>Business partner role</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              :rules="textRequired"
              density="compact"
              dense
              v-model="data_input.main_data.business_partner_role"
              variant="outlined"
              readonly
              bg-color="rgb(223 223 223 / 30%)"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="mt-n7">
            <v-card-title>
              <h6>BP type</h6>
            </v-card-title>
            <v-select
              class="ml-6 mr-6"
              :rules="textRequired"
              v-model="data_input.main_data.bp_type_selection"
              :items="itemsAccountBusinessPartnerType"
              item-title="name"
              item-value="id"
              density="compact"
              variant="outlined"
            ></v-select>
          </v-col>

          <v-col cols="12" class="mt-n7">
            <v-card-title>
              <h6>Natural person</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              v-model="data_input.main_data.naturel_person"
              variant="outlined"
              readonly
              bg-color="rgb(223 223 223 / 30%)"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="mt-n7">
            <v-card-title>
              <h6>Tax category</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              v-model="data_input.main_data.tax_catega"
              variant="outlined"
              readonly
              bg-color="rgb(223 223 223 / 30%)"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="mt-n7">
            <v-card-title>
              <h6>Tax number</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              v-model="data_input.main_data.tax_number"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="mt-n7">
            <v-card-title>
              <h6>Tax type</h6>
            </v-card-title>
            <v-select
              class="ml-6 mr-6"
              :rules="textRequired"
              v-model="data_input.main_data.tax_type_selection"
              :items="taxType"
              item-title="title"
              item-value="id"
              density="compact"
              variant="outlined"
            ></v-select>
          </v-col>

          <v-col cols="12" class="mt-n7">
            <v-card-title>
              <h6>Industry</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              v-model="data_input.main_data.indutry"
              variant="outlined"
              readonly
              bg-color="rgb(223 223 223 / 30%)"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="mt-n7">
            <v-card-title>
              <h6>Trading partner</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              v-model="data_input.main_data.tarding_partner"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="mt-n7">
            <v-card-title>
              <h6>Valid from</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              :rules="textRequired"
              dense
              v-model="data_input.main_data.valid_from"
              variant="outlined"
              readonly
              bg-color="rgb(223 223 223 / 30%)"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="mt-n7">
            <v-card-title>
              <h6>Valid to</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              :rules="textRequired"
              dense
              v-model="data_input.main_data.valid_to"
              variant="outlined"
              readonly
              bg-color="rgb(223 223 223 / 30%)"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card>
        <v-row dense>
          <v-col cols="12">
            <v-card-title>
              <h6>Company code</h6>
            </v-card-title>
            <v-autocomplete
              class="ml-6 mr-6"
              v-model="data_input.other.company_code"
              :rules="textRequired"
              :items="itemsCompany"
              closable-chips
              item-title="displayName"
              item-value="custom_id"
              density="compact"
              multiple
              chips
              variant="outlined"
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" class="mt-n7">
            <v-card-title>
              <h6>Bank country</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              v-model="data_input.other.bank_country"
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="mt-n7">
            <v-card-title>
              <h6>Bank key</h6>
            </v-card-title>
            <v-select
              class="ml-6 mr-6"
              v-model="data_input.other.bank_key"
              :items="displayItemsBankKey"
              item-value="id"
              item-title="displayName"
              density="compact"
              variant="outlined"
            ></v-select>
          </v-col>

          <v-col cols="12" class="mt-n7">
            <v-card-title>
              <h6>Bank branch</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              v-model="data_input.other.bank_branch"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="mt-n7">
            <v-card-title>
              <h6>Bank account</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              v-model="data_input.other.bank_account"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="mt-n7">
            <v-card-title>
              <h6>Account holder</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              v-model="data_input.other.bank_hoder"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import CompnayService from "@/apis/CompnayService";
import OtherService from "@/apis/OtherService";
import PartnerServive from "@/apis/PartnerServive";
import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
import AccountType from "@/utils/enum.util";
import { onMounted, defineProps, watchEffect } from "vue";
import { computed, watch, ref } from "vue";
const { handlingErrorsMessage } = useErrorHandlingDialog();

const props = defineProps({
  register_type: {
    type: Number,
  },
  isNaturePerson: {
    type: Boolean,
    default: true,
  },
  isBusinessPartnerTypeId: {
    type: String,
    default: null,
  },
  isRegisteredVat: {
    type: Boolean,
    default: false,
  },
  bankInfoObj: {
    type: Object,
    default: () => {
      return {
        acc_name_en: "Acc Name",
        bank_name: "Bank Name",
        bank_branch: "Bank Branch",
        acc_number: "Acc Number",
        bank_key: "",
      };
    },
  },
  registerFormDetail: {
    type: Object,
    default: () => {},
  },
  taxCetagory: {
    type: String,
  },
  companyIdSelect: {
    type: Array,
  },
  taxNumber: String,
});

const textRequired = [(v) => !!v || "กรุณากรอกข้อมูลให้ครบถ้วน"];
const emit = defineEmits(["on-input"]);

const taxType = [
  { id: "01", title: "01 VAT" },
  { id: "02", title: "02 Non-VAT" },
];

const data_input = ref({
  main_data: {
    business_partner: null,
    vender_number: null,
    business_partner_gruop_selection: null,
    business_partner_catega: "2",
    business_partner_role:
      props.register_type != AccountType.AccountType.CUSTOMER
        ? "FLVN00X"
        : "FLCU00",
    bp_type_selection: Number(
      props.registerFormDetail?.account_information_form
        ?.account_business_partner_type_id ?? null
    ),
    naturel_person: props.isNaturePerson ? "X" : null,
    tax_catega: props.taxCetagory,
    tax_number: "",
    tax_type_selection: props.isRegisteredVat ? "01 VAT" : "02 Non-VAT",
    indutry: null,
    tarding_partner: null,
    valid_from: "01.01.1900",
    valid_to: "31.12.9999",
  },
  other: {
    company_code: props.companyIdSelect,
    bank_country: "TH",
    bank_key: Number(props.bankInfoObj?.bank_name),
    bank_branch: props.bankInfoObj?.bank_branch,
    bank_account: props.bankInfoObj?.acc_number,
    bank_hoder: null,
  },
});

watchEffect(() => {
  data_input.value.main_data.tax_catega = props.taxCetagory;
  data_input.value.main_data.tax_number = props.taxNumber;
  data_input.value.main_data.business_partner_gruop_selection =
    props.registerFormDetail?.account_information_form
      ?.business_partner_group_id ?? null;
  data_input.value.main_data.tarding_partner =
    props.registerFormDetail?.account_information_form?.trading_partner ?? null;
  data_input.value.main_data.business_partner =
    props.registerFormDetail?.account_information_form
      ?.business_partner_number ?? null;

  if (props.register_type != AccountType.AccountType.CUSTOMER) {
    data_input.value.main_data.vender_number =
      props.registerFormDetail?.account_information_form?.vendor_number ?? null;
  }
  if (props.register_type == AccountType.AccountType.CUSTOMER) {
    data_input.value.main_data.vender_number =
      props.registerFormDetail?.account_information_form?.customer_number ??
      null;
  }

  data_input.value.main_data.indutry =
    props.registerFormDetail?.account_information_form?.industry ?? null;
});

// watch(
//   () => props.taxCetagory,
//   (newValue, oldValue) => {
//     console.log("myProp มีการเปลี่ยนแปลง", newValue, oldValue);
//   }
// );

const displayItemsBusinessPartnerGroup = computed(() => {
  return itemsBusinessPartnerGroup.value.map((item) => ({
    ...item,
    displayName: `${item.code} - ${item.name}`,
  }));
});

// get-account-business-partner-types -> /v1/master/get-account-business-partner-types SONG API
// const itemsAccountBusinessPartnerType = ref([
//   {
//     id: "4",
//     code: "0004",
//     name: "Embassy",
//   },
//   {
//     id: "3",
//     code: "0003",
//     name: "Government",
//   },
//   {
//     id: "2",
//     code: "0002",
//     name: "Corporate",
//   },
//   {
//     id: "1",
//     code: "0001",
//     name: "Person/ Group of Person",
//   },
// ]);

onMounted(async () => {
  await getBusinessPartnerGroupAll();
  await getAccounrBusinessPartnerTypeAll();
  await getCompanies();
  await getBanks();
  emit("on-input", data_input.value);
  if (props.bankInfoObj?.bank_name) {
    const result = itemsBank.value.find(
      (el) => el.id == props.bankInfoObj?.bank_name
    );
    if (result) data_input.value.other.bank_hoder = result.abbreviation;
    console.log("propone", props.bankInfoObj.bank_key);
  }
});

const itemsCompany = ref([]);
const itemsBank = ref([]);
const itemsBusinessPartnerGroup = ref([]);
const itemsAccountBusinessPartnerType = ref([]);

// watch (
//   ()=> data_input.value.other.bank_key,
//   (newValue) => {
//     const result = itemsBank.value.find(
//       (el) => el.bank_key == newValue

//     );
//     if (result) data_input.value.other.bank_key = result.abbreviation;
//   }
// )
watch(
  () => data_input.value.other.bank_key,
  (newValue) => {
    const result = itemsBank.value.find((el) => el.id == newValue);
    if (result) data_input.value.other.bank_hoder = result.abbreviation;
  },
  { deep: true }
);
const getBusinessPartnerGroupAll = async () => {
  try {
    const response = await PartnerServive.getBusinessPartnerGroupAll();
    if (response.data?.is_success) {
      itemsBusinessPartnerGroup.value = response.data.data;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  }
};

const getAccounrBusinessPartnerTypeAll = async () => {
  try {
    const response = await PartnerServive.getAccounrBusinessPartnerTypeAll();
    if (response.data?.is_success) {
      itemsAccountBusinessPartnerType.value = response.data.data;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  }
};

const getCompanies = async () => {
  try {
    const response = await CompnayService.getCompanyAll();
    if (response.data?.is_success) {
      itemsCompany.value = response.data.data.map((item) => ({
        ...item,
        displayName: `${item.company_code} - ${item.name_th}`,
        custom_id: { id: item.id, company_code: item.company_code },
      }));
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  }
};

const displayItemsBankKey = computed(() => {
  return itemsBank.value.map((item) => ({
    ...item,
    displayName: `${item.bank_key}: ${item.name_th}: ${item.abbreviation}`,
  }));
});

const getBanks = async () => {
  try {
    const response = await OtherService.getBanksAll();
    if (response.data?.is_success) {
      itemsBank.value = response.data.data;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  }
};
// data_input.value.main_data.business_partner_gruop_selection == 0
//   ? null
//   : data_input.value.main_data.business_partner_gruop_selection;
watch(
  data_input.value,
  (newValue) => {
    emit("on-input", newValue);
  },
  { deep: true }
);
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

:deep(.v-chip__content) {
  margin-top: 3px;
}

:deep(.mdi-close-circle::before) {
  content: "\F0156";
  color: red;
}
</style>

// data_input.value.main_data.business_partner_gruop_selection == 0 // ? null //
: data_input.value.main_data.business_partner_gruop_selection;
