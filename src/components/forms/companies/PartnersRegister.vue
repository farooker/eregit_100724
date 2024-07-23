<template>
  <div >
  <v-form ref="formPartnerRegister">
    <!-- {{ isVender }} -->
    <v-row dense>
      <v-col cols="12"><h2>1. ประเภทคู่ค้า</h2></v-col>
      <v-col cols="12">
        <v-card class="pa-6">
          <v-row dense>
            <v-col cols="12">
              <v-radio-group
                :rules="radioRules"
                v-model="dataInput.register.business_partner_type"
              >
                <v-radio
                  v-for="(item, index) in itemPartnerType"
                  :label="item.name_th"
                  :value="item.id.toString()"
                  :key="index"
                ></v-radio>
                <!-- <div class="d-flex align-center">
                  <v-radio value="0" label="อื่น"></v-radio>
                  <v-text-field
                    v-if="dataInput.register.business_partner_type === '0'"
                    variant="outlined"
                    dense
                    :rules="
                      dataInput.register.business_partner_type == 0
                        ? textRequired
                        : [() => true]
                    "
                    v-model="otherBusinessType.name_th"
                    density="compact"
                    style="margin-left: -12px; margin-right: 6; flex-grow: 9"
                  ></v-text-field>
                </div> -->
              </v-radio-group>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-row dense text-align="center">
            <v-col cols="3" class="d-flex align-center">
              <h4 class="ml-5">
                {{
                  is_natural_person
                    ? "เลขประจำตัวประชาชน"
                    : "เลขประจำตัวผู้เสียภาษีอากร"
                }}
              </h4>
            </v-col>
            <v-col cols="7" class="d-flex align-center">
              <ThaiIdInputControlTaxPayerIdNumber
                v-if="!is_natural_person"
                :initial-otp-value="dataInput.register.taxpayer_id_number"
                class="mt-5"
                @on-input="handleTaxPayerThaiId"
              />
              <!--              <ThaiIdInputControlTaxPayerIdNumber
                v-if="!is_natural_person"
                :initial-otp-value="
                  dataInput.register.business_register_type.toString()
                "
                class="mt-5"
                @on-input="handleTaxPayerThaiId"
              />-->
              <ThaiIdInputControlTaxRegisId
                v-if="is_natural_person"
                :initial-otp-value="dataInput.register.taxpayer_id_number"
                class="mt-5"
                @on-input="handleTaxRegisThaiId"
              />

            </v-col>
          </v-row>
        </v-card>
      </v-col>


      <v-col cols="12">
        <v-card class="pa-6">
          <v-row dense>
            <v-col cols="12">
              <v-radio-group
                v-model="dataInput.register.is_vat_registered"
                :rules="radioRules"
              >
                <v-radio label="จดทะเบียนภาษีมูลค่าเพิ่ม" value="1"></v-radio>
                <v-radio-group
                  :disabled="isDisableBranch"
                  v-model="dataInput.register.is_head_office"
                  class="ml-8"
                  :rules="
                    dataInput.register.is_head_office != '1' &&
                    dataInput.register.is_vat_registered != '0'
                      ? textRequired
                      : [() => true]
                  "
                >
                  <v-radio value="1" label="สำนักงานใหญ่"></v-radio>
                  <div class="d-flex align-center box">
                    <v-radio value="0" label="สาขาที่"></v-radio>
                    <v-text-field
                      v-if="dataInput.register.is_head_office === '0'"
                      v-model="dataInput.register.branch_code"
                      variant="outlined"
                      dense
                      :rules="
                        dataInput.register.is_head_office != '1' &&
                        dataInput.register.is_vat_registered != '0'
                          ? textRequired
                          : [() => true]
                      "
                      density="compact"
                    ></v-text-field>
                  </div>
                </v-radio-group>
                <v-radio
                  value="0"
                  label="ไม่จดทะเบียนภาษีมูลค่าเพิ่ม"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" v-if="isVender">
        <v-card class="pa-6">
          <v-card-title>
            <h6>ประเภทธุรกิจ</h6>
          </v-card-title>
          <v-row dense>
            <v-col cols="12">
              <v-select
                :items="itemCompanyCatagory"
                item-title="name_th"
                item-value="id"
                v-model="dataInput.register.company_category"
                density="compact"
                variant="outlined"
                placeholder="เลือกคำตอบ"
                :rules="isVender ? textRequired : [() => true]"
              ></v-select>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" v-if="isVender">
        <v-card class="pa-6">
          <v-card-title>
            <h6>ประเภทสินค้าและบริการ</h6>
          </v-card-title>
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                density="compact"
                :rules="isVender ? textRequired : [() => true]"
                v-model="dataInput.register.product_category"
                variant="outlined"
                placeholder="เช่น งานสี งานไฟฟ้า งานประปา อื่นๆ"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" v-if="!isVender">
        <v-card class="pa-6">
          <v-card-title>
            <h6>ประเภทของลูกค้า</h6>
          </v-card-title>
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                v-model="dataInput.register.customer_category"
                :rules="!isVender ? textRequired : [() => true]"
                density="compact"
                variant="outlined"
                placeholder="เช่น เช่า Office เช่า Plaza"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="6" class="d-flex justify-end mt-5" v-if="!isHideButton">
        <ButtonControl
          color="black"
          style=" height: 35px;
            min-width: 100px;
            background-color: white !important;
            color: #ed1c24 !important;
            border: 1px solid #ed1c24;"
          text="ย้อนกลับ"
          @button-clicked="handleReverse"
        />
      </v-col>
      <v-col cols="6" class="d-flex justify-start mt-5" v-if="!isHideButton">
        <ButtonControl text="ถัดไป"
        style="min-width: 100px; height: 35px; " @button-clicked="handleNext" />
      </v-col>
    </v-row>
  </v-form>
</div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import ButtonControl from "@/components/controls/ButtonControl.vue";
import ThaiIdInputControlTaxPayerIdNumber from "../../controls/ThaiIdInputControl";
import ThaiIdInputControlTaxRegisId from "../../controls/ThaiIdInputControl";
import { watch } from "vue";
import { computed } from "vue";
import CompnayService from "@/apis/CompnayService";
import BusinessRegisterTypeService from "@/apis/BusinessRegisterTypeService";
import PartnerServive from "@/apis/PartnerServive";
import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
import { onMounted } from "vue";
const { handlingErrorsMessage } = useErrorHandlingDialog();

const props = defineProps({
  isVender: {
    type: Boolean,
    default: false,
  },
  taxPayerIdNumber: {
    type: String,
  },
  isHideButton: {
    type: Boolean,
    default: false,
  },
  businessPartnerType: {
    type: String,
  },
});

// const rest = ref();

watchEffect(async () => {
  if (props.taxPayerIdNumber) {
    // rest.value = props.taxPayerIdNumber;
    console.log(props.taxPayerIdNumber);
    await getTaxBusinessRegisterTypeByTaxPayerId();
  }
  if (props.businessPartnerType)
    dataInput.value.register.business_partner_type =
      props.businessPartnerType.toString();
});

onMounted(async () => {
  await getBusinessPartnerType();
  await getCompaniesCategories();
  // await getTaxBusinessRegisterTypeByTaxPayerId();
});

const emit = defineEmits([
  "on-is-natural",
  "on-button-ok-click",
  "on-button-cancel-click",
  "on-input",
]);

const is_natural_person = computed(() => {
  return dataInput.value.register.business_partner_type == 1;
});

// const is_service_government = computed(() => {
//   return dataInput.value.register.business_partner_type == 3;
// });

const is_other_comp_catagory = ref(false);

const is_other_business_partner_type = computed(() => {
  return dataInput.value.register.business_partner_type == 0;
});

const isDisableBranch = computed(() => {
  if (dataInput.value.register.is_vat_registered == 0) {
    return true;
  }
  return false;
});

const radioRules = [(v) => !!v || "กรุณาเลือก 1 อัน"];
const textRequired = [(v) => !!v || "กรุณากรอกข้อมูลให้ครบถ้วน"];

const formPartnerRegister = ref(null);
const dataInput = ref({
  register: {
    business_partner_type: "",
    taxpayer_id_number: "",
    is_vat_registered: "",
    is_head_office: "",
    branch_code: "",
    company_category: "",
    customer_category: "",
    product_category: "",
    business_register_type: "",
  },
});

const otherCompCatagory = ref({
  name_en: "",
  name_th: "",
});

const otherBusinessType = ref({
  name_en: "",
  name_th: "",
});

const itemPartnerType = ref([]);
const itemCompanyCatagory = ref([]);
const taxBusinessRegisterType = ref({});

watch(
  () => dataInput.value.register.is_vat_registered,
  () => {
    if (dataInput.value.register.is_vat_registered == 0) {
      dataInput.value.register.is_head_office = "";
    }
  }
);

watch(
  () => dataInput.value.register.company_category,
  () => {
    if (dataInput.value.register.company_category == 29) {
      //อื่นๆ คือ ID 29 เพื่อให้แสดงช่อง text field
      is_other_comp_catagory.value = true;
    } else {
      is_other_comp_catagory.value = false;
    }
  }
);

watchEffect(() => {
  if (props.taxPayerIdNumber)
    dataInput.value.register.taxpayer_id_number =
      props.taxPayerIdNumber.padStart(13, "0");
});

watch(
  () => is_natural_person.value,
  (newValue) => {
    dataInput.value.register.taxpayer_id_number =
      props.taxPayerIdNumber.padStart(13, "0");

    // if (!newValue) {
    //   if (taxBusinessRegisterType.value?.id)
    //     dataInput.value.register.business_register_type =
    //       taxBusinessRegisterType.value?.id?.toString().padStart(13, "0");
    //   dataInput.value.register.taxpayer_id_number = "";
    // } else if (props.taxPayerIdNumber) {
    //   dataInput.value.register.business_register_type = "";
    //   dataInput.value.register.taxpayer_id_number =
    //     props.taxPayerIdNumber.padStart(13, "0");
    // } else {
    //   dataInput.value.register.business_register_type = "";
    //   dataInput.value.register.taxpayer_id_number = "0000000000000";
    // }
    emit("on-is-natural", newValue);
  },
  { deep: true }
);

// watch(
//   () => is_service_government.value,
//   (newValue) => {
//     if (newValue) {
//       dataInput.value.register.taxpayer_id_number = "";
//       dataInput.value.register.business_register_type = "";
//     }
//   },
//   { deep: true }
// );

const getCompaniesCategories = async () => {
  try {
    const response = await CompnayService.getCompanyCategoriesAll();
    if (response.data?.is_success) {
      const sortedData = response.data.data.sort((a, b) => a.id - b.id);

      // Find the index of the "อื่นๆ" (Other) option
      const otherIndex = sortedData.findIndex(
        (item) => item.name_th === "อื่นๆ"
      );

      // If the "อื่นๆ" (Other) option exists, move it to the last position
      if (otherIndex !== -1) {
        const otherItem = sortedData.splice(otherIndex, 1)[0];
        sortedData.push(otherItem);
      }

      itemCompanyCatagory.value = sortedData;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
  }
};

const getTaxBusinessRegisterTypeByTaxPayerId = async () => {
  try {
    const response =
      await BusinessRegisterTypeService.getBusinessRegisterTypeByTaxpayer(
        props.taxPayerIdNumber
      );
    if (response.data?.is_success) {
      taxBusinessRegisterType.value = response.data.data;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
  }
};

const getBusinessPartnerType = async () => {
  try {
    const response = await PartnerServive.getPartnerTypeAll();
    if (response.data?.is_success) {
      itemPartnerType.value = response.data.data;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
  }
};

const handleTaxPayerThaiId = (id) => {
  dataInput.value.register.taxpayer_id_number = id;
  console.log(id);
};

const handleTaxRegisThaiId = (id) => {
  dataInput.value.register.taxpayer_id_number = id;
  console.log(id);
};

watch(dataInput.value, (newValue) => {
  emit("on-input", newValue);
});

const handleReverse = () => {
  emit("on-button-cancel-click");
};

const createBusinessPartnerType = async () => {
  try {
    const response = await PartnerServive.createBusinessPartnerType(
      otherBusinessType.value.name_th,
      otherBusinessType.value.name_en,
      is_natural_person.value
    );
    if (response.data?.is_success) {
      dataInput.value.register.business_partner_type = response.data.data?.id;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data?.error);
    }
  }
};

const createComapnyCetagory = async () => {
  try {
    const response = await CompnayService.createCompanyGetagory(
      otherCompCatagory.value.name_th,
      otherCompCatagory.value.name_th
    );
    if (response.data?.is_success) {
      dataInput.value.register.company_category = response.data.data?.id;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data?.error);
    }
  }
};

const handleNext = async () => {
  const is_valid = await formPartnerRegister.value.validate();
  if (is_valid && is_valid["valid"]) {
    if (is_other_business_partner_type.value) {
      await createBusinessPartnerType();
    }
    if (is_other_comp_catagory.value) {
      await createComapnyCetagory();
    }
    emit("on-button-ok-click");
  } else {
    console.log("Partner Register Invalid!!!");
  }
};
</script>


<style scoped>

:deep(.v-text-field .v-field) {
  border-radius: 10px !important;
}

:deep(.v-input__details ){
  padding: 0px !important;
    margin-left: 10px !important;
    margin-top: -7px !important;
}



.box {
position: relative;
}

.box :deep(.v-text-field .v-field) {
width: 300px;
    position: absolute;
    left: 100px;
    top: -2px;
    flex-grow: 9;
    max-width: 300px;
}


</style>
