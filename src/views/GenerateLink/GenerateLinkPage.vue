<template>
  <v-container>
    <div class="box-froms">
      <h1 class="py-5">Create Form</h1>
      <!-- </v-container> -->
      <div>
        <v-card class="pa-5">
          <v-card-title style="padding: 0">
            <h5>ต้องการลงทะเบียนแบบใด</h5>
          </v-card-title>
          <v-radio-group v-model="input_data.radio_1" color="red">
            <v-radio label="Vendor" :value="1"></v-radio>
            <!-- <v-radio label="Customer" :value="2"></v-radio> -->
            <v-radio label="Vendor & Customer" :value="3"></v-radio>
          </v-radio-group>
        </v-card>
      </div>

      <div class="pt-5" v-if="input_data.radio_1 === 1">
        <v-card class="pa-5">
          <div class="mb-1">ต้องการแก้ไขข้อมูลแบบใดบ้าง</div>

          <v-radio-group v-model="input_data.radio_2" color="red">
            <v-radio label="ส่ง Email ให้ Vendor กรอกเอง" :value="1"></v-radio>
            <v-radio label="กรอกข้อมูลให้ Vendor" :value="2"></v-radio>
            <v-radio label="Vendor พนักงาน" :value="3"></v-radio>
          </v-radio-group>
        </v-card>
      </div>

      <div class="pt-5" v-if="input_data.radio_1 === 3">
        <v-card class="pa-5">
          <div class="mb-1">ต้องการแก้ไขข้อมูลแบบใดบ้าง</div>
          <v-radio-group v-model="input_data.radio_2" color="red">
            <v-radio label="ส่ง Email ให้ Vendor กรอกเอง" :value="6"></v-radio>
            <v-radio label="กรอกข้อมูลให้ Vendor" :value="7"></v-radio>
            <v-radio label="Vendor พนักงาน" :value="8"></v-radio>
          </v-radio-group>
        </v-card>
      </div>

      <!-- <div class="pt-5" v-if="input_data.radio_1 === 2">
        <v-card class="pa-5">
          <div class="mb-1">ต้องการแก้ไขข้อมูลแบบใด</div>
          <v-radio-group v-model="input_data.radio_2" color="red">
            <v-radio label="กรอกข้อมูลให้ Customer" :value="4"></v-radio>
            <v-radio label="พนักงานเป็น Customer" :value="5"></v-radio>
          </v-radio-group>
        </v-card>
      </div> -->

      <!--customer 1 กรอกข้อมูลให้ customer -->
      <div v-if="input_data.radio_2 === 4 && input_data.radio_1 === 2">
        <h2 class="py-5">กรอกข้อมูลให้ Customer</h2>
        <CustomerData
          :businessPartnerRoleId="input_data.radio_1"
          @form-update="handleCustomer"
          @on-to-company-profile="handleToSaveCustomer"
        />
      </div>

      <!--customer 2 พนักงานเป็น customer -->
      <div v-if="input_data.radio_2 === 5 && input_data.radio_1 === 2">
        <h2 class="py-5">พนักงานเป็น Customer</h2>
        <CustomerData
          :businessPartnerRoleId="input_data.radio_1"
          @form-update="handleCustomer"
          @on-to-company-profile="handleToSaveCustomer"
        />
      </div>

      <!--vendor 1 ส่ง Email ให้ Vendor กรอกเอง  VENDOR-->
      <div v-if="input_data.radio_2 === 1 && input_data.radio_1 === 1">
        <h2 class="my-5">ส่ง Email ให้ Vendor กรอกเอง</h2>
        <EmailVendor
          :businessPartnerRoleId="input_data.radio_1"
          @form-update="handleEmailVendor"
          @on-to-company-profile="handleToSaveEmailAndComapnyProfile"
        />
      </div>

      <!--vendor 2 กรอกข้อมูลให้ Vendor กรอกเอง-->
      <div v-if="input_data.radio_2 === 2 && input_data.radio_1 === 1">
        <h2 class="py-5">กรอกข้อมูลให้ Vendor</h2>
        <FillinVendor
          :businessPartnerRoleId="input_data.radio_1"
          @form-update="handleFillinVendor"
          @on-to-company-profile="handleToSaveFillinVendor"
        />
      </div>

      <!--vendor 3 พนักงานเป็น Vendor กรอกเอง-->
      <div v-if="input_data.radio_2 === 3 && input_data.radio_1 === 1">
        <h2 class="py-5">Vendor พนักงาน</h2>
        <EmployeeVendor
          :businessPartnerRoleId="input_data.radio_1"
          @form-update="handleVenderFormInput"
          @on-to-company-profile="handleToSaveCustomerVendor"
        />
      </div>

      <!--vendor&&customer 1 ส่ง Email ให้ Vendor กรอกเอง-->
      <div v-if="input_data.radio_2 === 6 && input_data.radio_1 === 3">
        <h2 class="py-5">ส่ง Email ให้ Vendor กรอกเอง</h2>
        <EmailVendor
          :businessPartnerRoleId="input_data.radio_1"
          @form-update="handleEmailVendor"
          @on-to-company-profile="handleToSaveEmailAndComapnyProfile"
        />
      </div>

      <!--vendor 2 กรอกข้อมูลให้ Vendor กรอกเอง-->
      <div v-if="input_data.radio_2 === 7 && input_data.radio_1 === 3">
        <h2 class="py-5">กรอกข้อมูลให้ Vendor</h2>
        <FillinVendor
          :businessPartnerRoleId="input_data.radio_1"
          @form-update="handleFillinVendor"
          @on-to-company-profile="handleToSaveFillinVendor"
        />
      </div>

      <!--vendor 3 พนักงานเป็น Vendor กรอกเอง-->
      <div v-if="input_data.radio_2 === 8 && input_data.radio_1 === 3">
        <h2 class="py-5">Vendor พนักงาน</h2>
        <EmployeeVendor
          :businessPartnerRoleId="input_data.radio_1"
          @form-update="handleVenderFormInput"
          @on-to-company-profile="handleToSaveCustomerVendor"
        />
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CustomerData from "@/components/forms/GenaralLink/CustomerData.vue";
import EmailVendor from "@/components/forms/GenaralLink/EmailVendor.vue";
import FillinVendor from "@/components/forms/GenaralLink/FillinVendor.vue";
import PaymentTermService from "@/apis/PaymentTermService";
import PartnerServive from "@/apis/PartnerServive";
import EmployeeVendor from "@/components/forms/GenaralLink/employeeVendor.vue";
import { useRoute, useRouter } from "vue-router";

import GenerateLinkTermService from "@/apis/GeneralLinkService";
import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
const { handlingErrorsMessage } = useErrorHandlingDialog();

const route = useRoute();
const router = useRouter();

const input_data = ref({
  radio_1: null,
  radio_2: "",
  radio_3: "",

  //dataBodyEmailVendor
  formemail: {
    company_data: {
      data: [],
    },
    email: "",
    term_data: {
      data: "",
      other: "",
    },
  },

  //dataBodyFillin
  formfillinvendor: {
    company_data: {
      data: [],
    },
    email: "",
    term_data: {
      data: "",
      other: "",
    },
  },
  //handleEmployeeVender
  formVender: {
    company_data: {
      data: [],
    },
    email: "",
    employee_data: {
      data: [],
    },
    term_data: {
      data: "",
      other: "",
    },
  },
  //formcustomer
  formCustomer: {
    company_data: {
      data: [],
    },
    term_data: {
      data: "",
      other: "",
    },
  },
});

const dataBodyCusstomer = ref({
  taxpayer_number_id: null,
  name_th: null,
  name_en: null,
  form_status_id: null,
  business_partner_role_id: null,
  fill_type_id: null,
  company_id: null,
  payment_term_id: null,
  registered_user_email: "1",
});

const dataBodyFillinVendor = ref({
  taxpayer_number_id: null,
  name_th: null,
  name_en: null,
  form_status_id: null,
  business_partner_role_id: null,
  fill_type_id: null,
  company_id: null,
  payment_term_id: null,
  registered_user_email: null,
});

const dataBodyEmployee = ref({
  taxpayer_number_id: null,
  name_th: null,
  name_en: null,
  form_status_id: null,
  business_partner_role_id: null,
  fill_type_id: null,
  company_id: null,
  payment_term_id: null,
  registered_user_email: null,
});

const dataBodyEmailVendor = ref({
  taxpayer_number_id: null,
  name_th: null,
  name_en: null,
  form_status_id: null,
  business_partner_role_id: null,
  fill_type_id: null,
  company_id: null,
  payment_term_id: null,
  registered_user_email: null,
});

//customer
const handleCustomer = (value) => {
  // console.log("arrry", value);
  input_data.value.formCustomer = value;
  dataBodyCusstomer.value.taxpayer_number_id =
    route.query?.taxpayer_id_number ?? null;
  dataBodyCusstomer.value.name_th = route.query?.name_th ?? null;
  dataBodyCusstomer.value.form_status_id = 1;
  dataBodyCusstomer.value.business_partner_role_id =
    input_data.value?.radio_1 ?? null;
  dataBodyCusstomer.value.fill_type_id = input_data.value.radio_2 ?? null;

  if (
    input_data.value.formCustomer?.company_data?.data &&
    Array.isArray(input_data.value.formCustomer?.company_data?.data)
  )
    dataBodyCusstomer.value.company_id =
      input_data.value.formCustomer?.company_data?.data.join(",");

  dataBodyCusstomer.value.payment_term_id =
    input_data.value.formCustomer.term_data?.data ?? null;
  dataBodyCusstomer.value.registered_user_email = "1";

  console.warn(JSON.stringify(dataBodyCusstomer.value));
};
//employeevendor
const handleVenderFormInput = (value) => {
  // console.log(";pioop", value);
  input_data.value.formVender = value;
  dataBodyEmployee.value.taxpayer_number_id =
    route.query?.taxpayer_id_number ?? null;
  dataBodyEmployee.value.name_th = route.query?.name_th ?? null;
  dataBodyEmployee.value.form_status_id = 1;
  dataBodyEmployee.value.business_partner_role_id =
    input_data.value?.radio_1 ?? null;
  dataBodyEmployee.value.fill_type_id = input_data.value.radio_2 ?? null;

  if (
    input_data.value.formVender?.company_data?.data &&
    Array.isArray(input_data.value.formVender?.company_data?.data)
  )
    dataBodyEmployee.value.company_id =
      input_data.value.formVender?.company_data?.data.join(",");

  dataBodyEmployee.value.payment_term_id =
    input_data.value.formVender.term_data?.data ?? null;
  dataBodyEmployee.value.employee_type_id =
    input_data.value?.formVender.employee_data.data.join(",");

  dataBodyEmployee.value.registered_user_email = "aaa";
  // console.warn(JSON.stringify(dataBodyEmployee.value));
};

//fillinVendor
const handleFillinVendor = (value) => {
  console.log(
    JSON.stringify(
      "emit",
      input_data.value.formfillinvendor?.company_data?.data
    )
  );
  console.log(value.email);
  input_data.value.formfillinvendor = value;
  dataBodyFillinVendor.value.taxpayer_number_id =
    route.query?.taxpayer_id_number ?? null;

  dataBodyFillinVendor.value.name_th = route.query?.name_th ?? null;

  dataBodyFillinVendor.value.form_status_id = 1;

  dataBodyFillinVendor.value.business_partner_role_id =
    input_data.value?.radio_1 ?? null;

  dataBodyFillinVendor.value.fill_type_id = input_data.value.radio_2 ?? null;

  if (
    input_data.value.formfillinvendor?.company_data?.data &&
    Array.isArray(input_data.value.formfillinvendor?.company_data?.data)
  )
    dataBodyFillinVendor.value.company_id =
      input_data.value.formfillinvendor?.company_data?.data.join(",");

  dataBodyFillinVendor.value.payment_term_id =
    input_data.value.formfillinvendor.term_data?.data ?? null;

  dataBodyFillinVendor.value.registered_user_email =
    input_data.value.formfillinvendor.email ?? null;
  // "prakan.0039@gmail.com";

  // console.log(JSON.stringify("ooopop", dataBodyFillinVendor.value));
};

//emailvendor
const handleEmailVendor = (value) => {
  console.log(value);
  input_data.value.formemail = value;
  dataBodyEmailVendor.value.taxpayer_number_id =
    route.query?.taxpayer_id_number ?? null;
  dataBodyEmailVendor.value.name_th = route.query?.name_th ?? null;
  dataBodyEmailVendor.value.form_status_id = 1;
  dataBodyEmailVendor.value.business_partner_role_id =
    input_data.value?.radio_1 ?? null;
  dataBodyEmailVendor.value.fill_type_id = input_data.value.radio_2 ?? null;

  if (
    input_data.value.formemail?.company_data?.data &&
    Array.isArray(input_data.value.formemail?.company_data?.data)
  )
    dataBodyEmailVendor.value.company_id =
      input_data.value.formemail?.company_data?.data.join(",");

  dataBodyEmailVendor.value.payment_term_id =
    input_data.value.formemail.term_data?.data ?? null;
  dataBodyEmailVendor.value.registered_user_email =
    input_data.value.formemail.email ?? null;

  // console.log(JSON.stringify("handleEmailVendor", dataBodyEmailVendor.value));
};

onMounted(async () => {
  console.warn(route.query.taxpayer_id_number);
  console.warn(route.query.name_th);
  // await handleCreatedForm();
});

//custom
const handleToSaveCustomer = async () => {
  // console.log("cus", input_data.value.formCustomer.term_data.other);
  // console.log("pay_id", dataBodyCusstomer.value.payment_term_id);
  try {
    if (input_data.value.formCustomer.term_data.other)
      dataBodyCusstomer.value.payment_term_id = await createPaymentTerm(
        input_data.value.formCustomer.term_data.other
      );
    const response = await GenerateLinkTermService.createGeneraleLink(
      dataBodyCusstomer.value
    );
    if (response.data?.is_success) {
      handleToComapnyProfile(response.data.data?.form_number);
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

//fillin
const handleToSaveFillinVendor = async () => {
  // console.log("ssss", input_data.value.formfillinvendor.term_data.other)
  // console.log("vsdrgioushiufh", dataBodyFillinVendor.value.payment_term_id)
  try {
    if (input_data.value.formfillinvendor.term_data.other)
      dataBodyFillinVendor.value.payment_term_id = await createPaymentTerm(
        input_data.value.formfillinvendor.term_data.other
      );

    // console.log("ssss", input_data.value.formfillinvendor.term_data.other)
    const response = await GenerateLinkTermService.createGeneraleLink(
      dataBodyFillinVendor.value
    );
    if (response.data?.is_success) {
      handleToComapnyProfile(response.data.data?.form_number);
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

const handleToSaveEmailAndComapnyProfile = async () => {
  // console.log("ssss", input_data.value.formemail.term_data.other);
  // console.log("vsdrgioushiufh", dataBodyEmailVendor.value.payment_term_id);
  try {
    if (input_data.value.formemail.term_data.other)
      dataBodyEmailVendor.value.payment_term_id = await createPaymentTerm(
        input_data.value.formemail.term_data.other
      );
    const response = await GenerateLinkTermService.createGeneraleLink(
      dataBodyEmailVendor.value
    );
    if (response.data?.is_success) {
      const responsedisclosure = await PartnerServive.ShareRegisterForm(
        response.data.data.form_number,
        response.data.data.registered_user_email
      );
      if (responsedisclosure.data?.is_success) {
        if (input_data.value.radio_2 === 1 || input_data.value.radio_2 === 6) {
          router.push({
            path: "/BusinessPartner/BusinessPartnerList",
          });
        } else {
          handleToLogOutProfile(response.data.data?.form_number);
        }
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

const createPaymentTerm = async (other) => {
  try {
    const response = await PaymentTermService.createPaymentTerm(
      input_data.value.radio_1,
      "00000",
      other
    );
    if (response.data?.is_success) {
      return response.data.data?.id;
    }
  } catch (e) {
    return null;
  }
};

const handleToSaveCustomerVendor = async () => {
  // console.log("em", input_data.value.formVender.term_data.other);
  // console.log("pay_id", dataBodyEmployee.value.payment_term_id);
  try {
    if (input_data.value.formVender.term_data.other)
      dataBodyEmployee.value.payment_term_id = await createPaymentTerm(
        input_data.value.formVender.term_data.other
      );

    const response = await GenerateLinkTermService.createGeneraleLink(
      dataBodyEmployee.value
    );
    if (response.data?.is_success) {
      handleToComapnyProfile(response.data.data?.form_number);
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
const handleToComapnyProfile = (form_number) => {
  console.warn(form_number);
  router.push({
    path: "/CompanyManagement",
    query: { form_number: form_number },
  });
};

const handleToLogOutProfile = () => {
  // console.warn(form_number);
  // debugger;
  router.push({
    path: "/LogOut",
    // query: { form_number: form_number },
  });
};
</script>

<style scoped>
@media (min-width: 992px) {
  .box-froms {
    margin-left: 150px;
    margin-right: 150px;
  }
}

:deep(.v-chip__content) {
  margin-top: 3px;
}

:deep(.mdi-close-circle::before) {
  content: "\F0156";
  color: red;
}
</style>
