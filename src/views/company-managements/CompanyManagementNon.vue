<template>
  <v-app>
    <alert-success-dialog />
    <v-app-bar :elevation="2" rounded>
      <v-app-bar-title class="d-flex justify-center">
        <v-img
          :width="100"
          aspect-ratio="16/9"
          cover
          src="/frasers.png"
        ></v-img>
      </v-app-bar-title>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi mdi-account" v-bind="props" color="grey"></v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :value="index"
            @click="handleSignOut"
          >
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <div class="box-froms">
          <div class="d-flex align-center flex-column pa-6 mb-5 mt-5">
            <v-btn-toggle v-model="toggle" divided>
              <v-btn
                prepend-icon="mdi mdi-domain"
                width="300"
                :class="{ ' btn-active': toggle === 0 }"
                >ข้อมูลคู่ค้า</v-btn
              >
              <v-btn
                prepend-icon="mdi mdi-file-document-check-outline"
                width="300"
                :class="{ ' btn-active': toggle === 1 }"
                >นโยบาย RSP</v-btn
              >
              <v-btn
                prepend-icon="mdi mdi-list-box-outline"
                width="300"
                :class="{ ' btn-active': toggle === 2 }"
                >แบบสำรวจ</v-btn
              >
              <v-btn
                prepend-icon="mdi mdi-laptop-account"
                width="300"
                :class="{ ' btn-active': toggle === 3 }"
                >การฝึกอบรม</v-btn
              >
            </v-btn-toggle>
          </div>
          <v-row dense>
            <v-col cols="12" class="">
              <StepperControl
                class="mb-5"
                style="margin-top: 30px"
                v-show="step !== 4"
                :titles="['ประเภทคู่ค้า', 'ข้อมูลคู่ค้า', 'เอกสารแนบ']"
                :current-step-number="step"
              />
              <h1 v-if="step === 4" style="color: red; text-align: center">
                *กรุณาตรวจสอบข้อมูลก่อนส่ง*
              </h1>
              <PartnersRegister
                :tax-payer-id-number="company_info.taxpayer_number_id"
                :is-vender="isVender"
                :is-hide-button="isHideButton"
                :business-partner-type="
                  company_info.business_partner_role?.id.toString()
                "
                v-show="step == 1 || step == 4"
                class=""
                @on-is-natural="handleIsNaturalPerson"
                @on-button-cancel-click="handleReverse"
                @on-button-ok-click="handleNext"
                @on-input="handlePartnerRegisterInput"
              />
              <PartnersInfo
                :is-vender="isVender"
                :is-natural-person="isIsNaturalPerson"
                :company-name-en="company_info.name_en"
                :company-name-th="company_info.name_th"
                :is-hide-button="isHideButton"
                v-show="step == 2 || step == 4"
                class=""
                @on-button-cancel-click="handleReverse"
                @on-button-ok-click="handleNext"
                @on-input="handlePartnerInfoInput"
              />
              <!-- <AttacheDocument
                class=""
                v-show="step == 3 || step == 4"
                :is-hide-button="isHideButton"
                :businessPartnerRoleId=""
                :businessPartnerTypeId=""
                :isVatRegistered=""
                :isFilledBookBank=""
                :companyIds=""
                @on-button-cancel-click="handleReverse"
                @on-button-ok-click="handleNext"
                @on-input-files="handleInputDocuments"
              /> -->
              <AttacheDocument
                v-if="step == 3 || step == 4"
                class=""
                :business-partner-role-id="
                  company_info.business_partner_role.id
                "
                :is-vat-registered="
                  dataForm.partnerRegister.register.is_vat_registered
                "
                :business-partner-type-id="
                  dataForm.partnerRegister.register.business_partner_type
                "
                :company-ids="company_info.company.map((el) => el.id)"
                :is-filled-book-bank="
                  dataForm.partnerInfo.bank_info.acc_number.length != 0
                "
                :is-hide-button="isHideButton"
                @on-button-cancel-click="handleReverse"
                @on-button-ok-click="handleNext"
                @on-input-files="handleInputDocuments"
                @remove-file="handleFileRemoved"
              />
            </v-col>
            <v-col
              cols="6"
              class="d-flex justify-end mt-5 mb-5"
              v-if="isHideButton"
            >
              <ButtonControl
                color="black"
                text="แก้ไข"
                @button-clicked="handleButtonClick"
              />
            </v-col>
            <v-col
              cols="6"
              class="d-flex justify-start mt-5 mb-5"
              v-if="isHideButton"
            >
              <ButtonControl text="ส่ง" @button-clicked="handleButtonSend" />
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted, ref } from "vue";
import StepperControl from "@/components/controls/StepperControl.vue";
import AttacheDocument from "@/components/forms/companies/AttacheDocument.vue";
import PartnersInfo from "@/components/forms/companies/PartnersInfo.vue";
import PartnersRegister from "@/components/forms/companies/PartnersRegister.vue";
import { watch } from "vue";

import AlertSuccessDialog from "@/components/dialogs/AlertSuccessDialog.vue";
import { useAlertDialogDialog } from "@/components/dialogs/AlertSuccessDialogService";
const { showAlert } = useAlertDialogDialog();

import ButtonControl from "@/components/controls/ButtonControl.vue";
import PartnerServive from "@/apis/PartnerServive";

import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
const { handlingErrorsMessage } = useErrorHandlingDialog();
import { useRouter, useRoute } from "vue-router";
import { useMyAddressStore } from "@/stores/addressDataStore";

const store = useMyAddressStore();

const router = useRouter();
const route = useRoute();

const step = ref(1);
const isHideButton = ref(false);
const formNumberOnUrl = ref(route.query.form_number);
const company_info = ref({});
const isVender = ref(true);
// const toggle = ref(0);

const dataForm = ref({
  partnerRegister: {
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
  },
  partnerInfo: {
    partner_info: {
      th: {
        gender: "",
        name_th: "",
        address_th: "",
        info: {
          province: null,
          district: null,
          parish: null,
          zip_code: null,
        },
      },
      en: {
        gender: "",
        name_en: "",
        address_en: "",
        info: {
          province: null,
          district: null,
          parish: null,
          zip_code: null,
        },
      },
    },
    items_contects: [],
    bank_info: {
      id: "",
      acc_name_en: "",
      bank_name: "",
      bank_branch: "",
      acc_number: "",
    },
  },
  partnerDocs: {},
});

const createBusinessPartnerProfileBody = ref({
  name_th: "",
  name_en: "",
  form_number: formNumberOnUrl.value,
  business_partner_type_id: "",
  business_register_type_id: "",
  is_vat_registered: false,
  is_head_office: false,
  branch_code: "",
  company_category_id: "",
  product_category: "",
  customer_category: "",
  address_th: "",
  province_th_id: "",
  district_th_id: "",
  subdistrict_th_id: "",
  postal_code_th_id: "",
  address_en: "",
  province_en: "",
  district_en: "",
  subdistrict_en: "",
  postal_code_en_id: "",
  contact_name_1: "",
  contact_mobile_number_1: "",
  contact_email_1: "",
  contact_name_2: "",
  contact_mobile_number_2: "",
  contact_email_2: "",
  contact_name_3: "",
  contact_mobile_number_3: "",
  contact_email_3: "",
  bank_account_name: "",
  bank_id: "",
  bank_branch: "",
  bank_account_number: "",
  gender: "",
  taxpayer_id_number: "",
});

const createDocumentBody = ref([]);
const items = ref(["Logout"]);

const handleSignOut = () => {
  sessionStorage.removeItem("auth_email");
  // sessionStorage.removeItem("auth_modules");
  sessionStorage.removeItem("auth_reload");
  router.push({
    name: "SignInPage",
  });
};

const handlePartnerInfoInput = (data) => {
  dataForm.value.partnerInfo = data;
  // console.log(JSON.stringify(dataForm.value.partnerInfo));
};

const handlePartnerRegisterInput = (data) => {
  dataForm.value.partnerRegister = data;
};

const encodeFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target.result);
    };
    reader.onerror = (e) => {
      reject(e);
    };
    reader.readAsDataURL(file);
  });
};

const handleFileRemoved = async (documents) => {
  createDocumentBody.value = [];
  dataForm.value.partnerDocs = documents;
  for (let index = 0; index < dataForm.value.partnerDocs.length; index++) {
    const el = dataForm.value.partnerDocs[index];
    if (
      !createDocumentBody.value.some((doc) => doc.document_name === el.name)
    ) {
      const base64String = await encodeFile(el);
      createDocumentBody.value.push({
        document_name: el.name,
        data: base64String.split(",")[1],
      });
    }
  }
};

const handleInputDocuments = async (documents) => {
  createDocumentBody.value = [];
  dataForm.value.partnerDocs = documents;
  for (let index = 0; index < dataForm.value.partnerDocs.length; index++) {
    const el = dataForm.value.partnerDocs[index];
    if (
      !createDocumentBody.value.some((doc) => doc.document_name === el.name)
    ) {
      const base64String = await encodeFile(el);
      createDocumentBody.value.push({
        document_name: el.name,
        data: base64String.split(",")[1],
      });
    }
  }
};
const handleButtonClick = () => {
  step.value = 1;
  isHideButton.value = false;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const handleNext = async () => {
  if (step.value < 4) {
    step.value++;
  }
  if (step.value === 4) {
    if (
      await showAlert(
        "กรุณาตรวจสอบข้อมูลอีกครั้ง",
        "ตรวจสอบข้อมูลของท่าน\nเป็นครั้งสุดท้ายก่อนกดส่งข้อมูล"
      )
    ) {
      isHideButton.value = true;
      scrollToTop();
    }
  }
};

const handleReverse = () => {
  if (step.value > 1) {
    step.value--;
  }
};

onMounted(async () => {
  await onLoadBusinessPartnerByFormNumber();
  await store.getProvince();
});

watch(
  dataForm.value,
  (newValue) => {
    createBusinessPartnerProfileBody.value.business_partner_type_id = Number(
      newValue.partnerRegister.register.business_partner_type
    );

    createBusinessPartnerProfileBody.value.business_register_type_id = Number(
      newValue.partnerRegister.register.business_partner_type
    );

    createBusinessPartnerProfileBody.value.taxpayer_id_number =
      newValue?.partnerRegister?.register?.taxpayer_id_number ?? null;

    if (createBusinessPartnerProfileBody.value.taxpayer_id_number == "")
      createBusinessPartnerProfileBody.value.taxpayer_id_number = null;

    createBusinessPartnerProfileBody.value.is_vat_registered =
      newValue.partnerRegister.register.is_vat_registered == "1" ? true : false;

    createBusinessPartnerProfileBody.value.is_head_office =
      newValue.partnerRegister.register.is_head_office == "1" ? true : false;

    createBusinessPartnerProfileBody.value.branch_code =
      newValue.partnerRegister.register.branch_code;

    createBusinessPartnerProfileBody.value.company_category_id =
      newValue.partnerRegister.register.company_category;

    // if (createBusinessPartnerProfileBody.value.company_category_id == "")
    //   createBusinessPartnerProfileBody.value.company_category_id = 0;

    createBusinessPartnerProfileBody.value.product_category =
      newValue.partnerRegister.register.product_category;

    ////////////

    createBusinessPartnerProfileBody.value.address_th =
      newValue.partnerInfo.partner_info.th.address_th;

    createBusinessPartnerProfileBody.value.province_th_id =
      newValue.partnerInfo.partner_info.th.info.province;

    createBusinessPartnerProfileBody.value.district_th_id =
      newValue.partnerInfo.partner_info.th.info.district;

    createBusinessPartnerProfileBody.value.subdistrict_th_id =
      newValue.partnerInfo.partner_info.th.info.parish;

    createBusinessPartnerProfileBody.value.postal_code_th_id =
      newValue.partnerInfo.partner_info.th.info.zip_code;

    ///////////
    createBusinessPartnerProfileBody.value.address_en =
      newValue.partnerInfo.partner_info.en.address_en;

    createBusinessPartnerProfileBody.value.province_en =
      newValue.partnerInfo.partner_info.en.info.province;

    createBusinessPartnerProfileBody.value.district_en =
      newValue.partnerInfo.partner_info.en.info.district;

    createBusinessPartnerProfileBody.value.subdistrict_en =
      newValue.partnerInfo.partner_info.en.info.parish;

    createBusinessPartnerProfileBody.value.postal_code_en_id =
      newValue.partnerInfo.partner_info.th.info.zip_code;

    /////////
    createBusinessPartnerProfileBody.value.bank_account_name =
      newValue.partnerInfo.bank_info.acc_name_en;

    createBusinessPartnerProfileBody.value.bank_account_number =
      newValue.partnerInfo.bank_info.acc_number;

    createBusinessPartnerProfileBody.value.bank_branch =
      newValue.partnerInfo.bank_info.bank_branch;

    createBusinessPartnerProfileBody.value.bank_id =
      newValue.partnerInfo.bank_info.bank_name;

    createBusinessPartnerProfileBody.value.name_th = `${newValue.partnerInfo.partner_info.th.gender}${newValue.partnerInfo.partner_info.th.name_th}`;
    createBusinessPartnerProfileBody.value.name_en = `${newValue.partnerInfo.partner_info.en.gender}${newValue.partnerInfo.partner_info.en.name_en}`;

    createBusinessPartnerProfileBody.value.taxpayer_id_number =
      newValue.partnerRegister.register.taxpayer_id_number;
  },
  { deep: true }
);

const onCreatePartnerDocumentUploads = async () => {
  try {
    const response = await PartnerServive.createUploadDocuments(
      formNumberOnUrl.value,
      createDocumentBody.value
    );
    if (response.data.is_success) return true;
    return false;
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return false;
    }
    handlingErrorsMessage("unknown", e.message);
    return false;
  }
};

const onSumbitDataInsert = async () => {
  console.log("onSumbitDataInsert", company_info.value.fill_type.id);
  try {
    // if (
    //   company_info.value.fill_type.id === 1 ||
    //   company_info.value.fill_type.id === 6
    // ) {
    router.push({
      name: "NonDisclosure",
      query: { form_number: formNumberOnUrl.value },
    });
    // }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
    }
    handlingErrorsMessage("unknown", e.message);
  }
};

const onCreateBusinessPartnerProfileForm = async () => {
  try {
    createBusinessPartnerProfileBody.value.bank_id = Number(
      createBusinessPartnerProfileBody.value.bank_id
    );
    for (let i = 0; i < dataForm.value.partnerInfo.items_contects.length; i++) {
      const el = dataForm.value.partnerInfo.items_contects[i];
      createBusinessPartnerProfileBody.value[`contact_name_${i + 1}`] =
        el.contact_name;
      createBusinessPartnerProfileBody.value[`contact_email_${i + 1}`] =
        el.contact_email;
      createBusinessPartnerProfileBody.value[`contact_mobile_number_${i + 1}`] =
        el.contact_mobile_number;
    }

    const response = await PartnerServive.createBusinessPartnerProfileForm(
      createBusinessPartnerProfileBody.value
    );
    if (response.data.is_success) {
      router.push({
        name: "NonDisclosure",
        query: { form_number: formNumberOnUrl.value },
      });
      if (createDocumentBody.value.length > 0) {
        if (await onCreatePartnerDocumentUploads()) {
          await onSumbitDataInsert();
        } else {
          await onSumbitDataInsert();
        }
      } else {
        await onSumbitDataInsert();
      }
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

const onLoadBusinessPartnerByFormNumber = async () => {
  try {
    const response = await PartnerServive.getBusinessPartnerRegisterForm(
      formNumberOnUrl.value
    );
    if (response.data.is_success) {
      company_info.value = response.data.data;
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

// const handleItemsContactInput = (newValue) => {
//   for (let i = 0; i < newValue.length; i++) {
//     const el = newValue[i];

//     createBusinessPartnerProfileBody.value[`contact_name_${i + 1}`] =
//       el.contact_name;
//     createBusinessPartnerProfileBody.value[`contact_email_${i + 1}`] =
//       el.contact_email;
//     createBusinessPartnerProfileBody.value[`contact_mobile_number_${i + 1}`] =
//       el.contact_mobile_number;
//   }
// };

const isIsNaturalPerson = ref(false);
const handleIsNaturalPerson = (value) => {
  isIsNaturalPerson.value = value;
};
const handleButtonSend = async () => {
  await onCreateBusinessPartnerProfileForm();
};
</script>

<style scoped>
.btn-active {
  background-color: rgb(var(--v-theme-secondary), 0.1);
  color: rgb(var(--v-theme-secondary)) !important;
  border-bottom-color: red;
  border-bottom-width: 2px;
}

@media (min-width: 992px) {
  .box-froms {
    margin-left: 150px;
    margin-right: 150px;
  }
}

.v-main {
  background-color: #f7f7f6 !important;
}
</style>
