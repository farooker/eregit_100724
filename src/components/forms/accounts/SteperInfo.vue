<template>
  <v-app-bar class="custom-app-bar">
    <v-row dense>
      <v-col color="12" style="margin-left: 150px; margin-top: 45px">
        <StepperControl :currentStepNumber="step" />
      </v-col>
    </v-row>
  </v-app-bar>
  <div>
    <!-- {{ props.registerFormDetail.account_information_form.account_business_partner_type_id }} -->
    <v-row dense>
      <v-col cols="12">
        <v-form ref="formOne">
          <StepOne
            :register-form-detail="props.registerFormDetail"
            :isRegisteredVat="
              tempRegisterInfo?.tax_register?.type == '1' ? true : false
            "
            :bankInfoObj="tempRegisterInfo?.bank_info"
            :isBusinessPartnerTypeId="
              tempRegisterInfo?.customer_type_data?.data.toString()
            "
            :isNaturePerson="is_natural_person"
            :taxCetagory="tax_cetagory"
            :companyIdSelect="
              tempRegisterInfo?.company_data?.data.map((el) => el.id)
            "
            :register_type="tempRegisterInfo.type_register"
            v-show="step === 1"
            :taxNumber="tempRegisterInfo.thai_people_id"
            @on-input="handleStepOneChanged"
          />
        </v-form>
      </v-col>
      <v-col cols="12">
        <v-form ref="formTwo">
          <StepTwo
            :register-form-detail="props.registerFormDetail"
            :register_type="1"
            :address-item="tempRegisterInfo.customer_info?.th?.info"
            :contactItems="tempRegisterInfo?.items_contects"
            :addressItemEn="tempRegisterInfo?.customer_info?.en?.info"
            :taxPayerIdNumber="tempRegisterInfo?.thai_people_id"
            :nameEn="
              is_natural_person
                ? tempRegisterInfo?.customer_info?.en?.pserson.name
                : tempRegisterInfo?.customer_info?.en?.company_name
            "
            :nameTh="
              is_natural_person
                ? tempRegisterInfo.customer_info?.th.pserson.name
                : tempRegisterInfo.customer_info?.th.company_name
            "
            :addressEn="tempRegisterInfo?.customer_info?.en?.address"
            :addressTh="tempRegisterInfo?.customer_info?.th?.address"
            v-show="step === 2"
            @on-input="handleStepTwoChanged"
          />
        </v-form>
      </v-col>
      <v-col cols="12">
        <v-form ref="formThree">
          <StepThree
            :register-form-detail="props.registerFormDetail"
            :steptwoFormDetail="input_data.step_two"
            :register_type="1"
            :address-item="input_data.step_two?.address_th?.location"
            :address-item-en="input_data.step_two?.address_en?.location"
            :type-form="props.typeForm"
            :contactItems="tempRegisterInfo.items_contects"
            :branchCode="
              tempRegisterInfo?.tax_register?.type == 0
                ? 'NVAT'
                : tempRegisterInfo?.tax_register?.branch_code
            "
            v-show="step === 3"
            @on-input="handleStepThreeChanged"
          />
        </v-form>
      </v-col>
      <v-col cols="12">
        <v-form ref="formFour">
          <StepFour
            :register-form-detail="props.registerFormDetail"
            :type-form="props.typeForm"
            :compCode="
              props.registerInfo?.company_data?.data.map(
                (el) => el.company_code
              )
            "
            :BusinessPartnerGroup="
              input_data.step_one?.main_data?.business_partner_gruop_selection
            "
            :bpType="input_data.step_one?.main_data?.bp_type_selection"
            v-show="step === 4"
            @on-input="handleStepFourChanged"
          />
        </v-form>
      </v-col>
      <v-col cols="6" class="d-flex justify-end">
        <ButtonControl
          v-show="is_revers_form_hide"
          color="black"
          text="ย้อนกลับ"
          @button-clicked="handleReverse"
        />
      </v-col>
      <v-col cols="6" class="d-flex justify-start">
        <ButtonControl :text="button_name" @button-clicked="handleNext" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref } from "vue";

import StepperControl from "../../controls/StepperControl";
import ButtonControl from "../../controls/ButtonControl";
import StepOne from "../../forms/accounts/vender-customer/StepOne.vue";
import StepTwo from "../../forms/accounts/vender-customer/StepTwo.vue";
import StepThree from "../../forms/accounts/vender-customer/StepThree.vue";
import StepFour from "../../forms/accounts/vender-customer/StepFour.vue";
import AccountType from "@/utils/enum.util";
import { computed } from "vue";

const emit = defineEmits(["on-data-commit", "on-input", "on-reverse-form"]);

const props = defineProps({
  typeForm: {
    type: Number,
    default: AccountType.CUSTOMER, //0-Customer 1-Vender
  },
  registerInfo: {
    type: Object,
    default: null,
  },
  registerFormDetail: {
    type: Object,
    default: () => {},
  },
});

const step = ref(1);
const formOne = ref(null);
const formTwo = ref(null);
const formThree = ref(null);
const formFour = ref(null);
const button_name = ref("ต่อไป");

const tempRegisterInfo = ref({ ...props.registerInfo });

const is_natural_person = computed(() => {
  return tempRegisterInfo.value.customer_type_data?.data == 1;
});
const tax_cetagory = computed(() => {
  console.log(tempRegisterInfo.value);
  return tempRegisterInfo.value.thai_people_id ? "TH3" : null;
});

const input_data = ref({
  step_one: {},
  step_two: {},
  step_three: {},
  step_four: {},
});

const is_revers_form_hide = computed(() => {
  if (step.value === 1) return false;
  return true;
});

const handleNext = async () => {
  if (step.value === 1) {
    const is_valid = await formOne.value.validate();
    console.log("step is_valid : ", is_valid["valid"]);
    if (is_valid["valid"]) step.value++;
    return;
  }

  if (step.value === 2) {
    const is_valid = await formTwo.value.validate();
    console.log("step is_valid : ", is_valid["valid"]);
    if (is_valid["valid"]) step.value++;
    return;
  }

  if (step.value === 3) {
    const is_valid = await formThree.value.validate();
    console.log("step is_valid : ", is_valid["valid"]);
    if (is_valid["valid"]) step.value++;
    return;
  }

  if (step.value === 4) {
    const is_valid = await formFour.value.validate();
    console.log("step is_valid : ", is_valid["valid"]);

    if (is_valid && is_valid["valid"]) {
      emit("on-data-commit", input_data.value);
    }
    button_name.value = "เสร็จ";
  }
};

const handleReverse = () => {
  if (step.value == 1) {
    emit("on-reverse-form");
    return;
  }
  if (step.value > 1) {
    step.value--;
  }
};

const handleStepOneChanged = (data_obj) => {
  input_data.value.step_one = data_obj;
  emit("on-input", input_data.value);
};

const handleStepTwoChanged = (data_obj) => {
  input_data.value.step_two = data_obj;
  emit("on-input", input_data.value);
  console.log("STEP_TWO", JSON.stringify(input_data.value.step_two));
};

const handleStepThreeChanged = (data_obj) => {
  input_data.value.step_three = data_obj;
  emit("on-input", input_data.value);
  console.log("STEP_THREE", JSON.stringify(input_data.value.step_three));
};

const handleStepFourChanged = (data_obj) => {
  input_data.value.step_four = data_obj;
  emit("on-input", input_data.value);
};
</script>

<style scoped>
.custom-app-bar {
  top: 180px !important;
  z-index: 1004 !important;
  transform: translateY(0%) !important;
  left: 56px !important;
  width: calc(100% - 56px) !important;
  box-shadow: none !important;
  background-color: #f7f7f6;
  height: 100px;
  position: fixed;
}
</style>
