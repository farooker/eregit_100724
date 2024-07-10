<template>
  <div>
    <ChangeInformation
      v-if="current_view === 1"
      :DataInfo="businessPartnerChangInfo"
      @on-next="handle_update_step"
    />
    <FormInformation
      v-if="current_view === 2"
      :IsAccount="options.selectedBank"
      :IsChangename="options.selectedChangeName"
      :IsBrnch="options.selectedBranch"
      :IsAddress="options.selectedAddress"
      :IsContact="options.selectedContact"
      @on-button-ok-click="handleFormInformationCommit"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import ChangeInformation from "@/components/forms/partnerlist/SelectChangInfo.vue";
import FormInformation from "./FormInformation.vue";
import { useRoute } from "vue-router";
import PartnerServive from "@/apis/PartnerServive";
import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
const { handlingErrorsMessage } = useErrorHandlingDialog();

// const router = useRouter();
const route = useRoute();
const businessPartnerChangInfo = ref({});
const bp_number = route.query.bp_number;

let current_view = ref(1);
let options = reactive({
  selectedBank: "",
  selectedChangeName: "",
  selectedBranch: "",
  selectedAddress: "",
  selectedContact: "",
});

onMounted(async () => {
  await getBusinessPartnerInfo(bp_number);
});

const getBusinessPartnerInfo = async (bp_number) => {
  try {
    const response = await PartnerServive.getBusinessPartnerChangInfo(
      bp_number
    );
    if (response.data?.is_success) {
      businessPartnerChangInfo.value = response.data.data;
      console.log("infodata", businessPartnerChangInfo.value);
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
const handle_update_step = (option_items) => {
  options = option_items;
  // console.log("options", options)
  current_view.value++;
};

const dataBodyChangInfo = ref({
  bp_number: null,
  changed_part_id: null,
  change_bank_information: [
    {
      bank_account_name: null,
      bank_id: null,
      bank_branch: null,
      bank_account_number: null,
      remark: null,
    },
  ],
  change_name_information: [
    {
      name_th: null,
      name_en: null,
    },
  ],
  add_branch_information: [
    {
      branch_code: null,
      business_partner_role_id: null,
      address_th: null,
      province_th_id: null,
      district_th_id: null,
      subdistrict_th_id: null,
      postal_code_th_id: null,
      address_en: null,
      province_en: null,
      district_en: null,
      subdistrict_en: null,
      postal_code_en_id: null,
      country: null
  }],
  //mapping
  change_contact_information: [
    {
      branch_code: null,
      business_partner_name: null,
      name: null,
      mobile_number: null,
      email: null,
      remark: null,
    }
  ],

  change_address_information: [
    {
      branch_code: null,
      address_th: null,
      province_th_id: null,
      district_th_id: null,
      subdistrict_th_id: null,
      postal_code_th_id: null,
      address_en: null,
      province_en: null,
      district_en: null,
      subdistrict_en: null,
      postal_code_en_id: null,
      country: null

    }
  ]


});
const handleFormInformationCommit = async (data) => {
  console.log("handleFormInformationCommit", data);
  dataBodyChangInfo.value.bp_number = route.query?.bp_number ?? null;
  dataBodyChangInfo.value.changed_part_id = "1,2";
  if (data.info_account) {
    dataBodyChangInfo.value.change_bank_information[0].bank_account_name =
      data.info_account.account_name_en;
    dataBodyChangInfo.value.change_bank_information[0].bank_id =
      data.info_account.bank;
    dataBodyChangInfo.value.change_bank_information[0].bank_branch =
      data.info_account.branch_account;
    dataBodyChangInfo.value.change_bank_information[0].bank_account_number =
      data.info_account.account_number;
    dataBodyChangInfo.value.change_bank_information[0].remark = "";
  }
  if (data.info_change_name) {
    dataBodyChangInfo.value.change_name_information[0].name_th =
      data.info_change_name.name_th;
    dataBodyChangInfo.value.change_name_information[0].name_en =
      data.info_change_name.name_en;
  }
    if (data.info_barnch) {
    dataBodyChangInfo.value.add_branch_information[0].branch_code =
      data.info_barnch.branch_code;

    dataBodyChangInfo.value.add_branch_information[0].business_partner_role_id =
      data.info_barnch.radio_1;
    dataBodyChangInfo.value.add_branch_information[0].address_th =
      data.info_barnch.address.th.address

    //province
    dataBodyChangInfo.value.add_branch_information[0].province_th_id =
    data.info_barnch.address.th.info.province

    dataBodyChangInfo.value.add_branch_information[0].district_th_id =
    data.info_barnch.address.th.info.district

    dataBodyChangInfo.value.add_branch_information[0].subdistrict_th_id =
    data.info_barnch.address.th.info.parish

    dataBodyChangInfo.value.add_branch_information[0].postal_code_th_id =
    data.info_barnch.address.th.info.zip_code

    //provineEn
        dataBodyChangInfo.value.add_branch_information[0].address_en =
      data.info_barnch.address.en.address

        dataBodyChangInfo.value.add_branch_information[0].province_en =
    data.info_barnch.address.en.info.province

        dataBodyChangInfo.value.add_branch_information[0].district_en =
    data.info_barnch.address.en.info.district

        dataBodyChangInfo.value.add_branch_information[0].subdistrict_en =
    data.info_barnch.address.en.info.parish

        dataBodyChangInfo.value.add_branch_information[0].postal_code_en_id =
    data.info_barnch.address.en.info.zip_code

  }
  //เปลี่ยนที่อยู่
      if (data.info_adress){
        dataBodyChangInfo.value.change_address_information[0].branch_code =
      data.info_adress.branch_code
        dataBodyChangInfo.value.change_address_information[0].address_th =
      data.info_adress.address.th.address
        dataBodyChangInfo.value.change_address_information[0].province_th_id =
      data.info_adress.address.th.info.province
        dataBodyChangInfo.value.change_address_information[0].district_th_id =
      data.info_adress.address.th.info.district
        dataBodyChangInfo.value.change_address_information[0].subdistrict_th_id =
      data.info_adress.address.th.info.parish
        dataBodyChangInfo.value.change_address_information[0].postal_code_th_id =
      data.info_adress.address.th.info.zip_code
        dataBodyChangInfo.value.change_address_information[0].address_en =
      data.info_adress.address.en.address
        dataBodyChangInfo.value.change_address_information[0].province_en =
      data.info_adress.address.en.info.province
        dataBodyChangInfo.value.change_address_information[0].district_en =
      data.info_adress.address.en.info.district
        dataBodyChangInfo.value.change_address_information[0].subdistrict_en =
      data.info_adress.address.en.info.parish
        dataBodyChangInfo.value.change_address_information[0].postal_code_en_id =
      data.info_adress.address.en.info.zip_code
        dataBodyChangInfo.value.change_address_information[0].country = "";
    }
    if (data.info_contact){
        dataBodyChangInfo.value.change_contact_information[0].branch_code =
      data.info_contact.value.branch_code

        dataBodyChangInfo.value.change_contact_information[0].business_partner_name =
      data.info_contact.value.business_partner_name

      dataBodyChangInfo.value.change_contact_information[0].mobile_number
      data.info_contact.value.email

      dataBodyChangInfo.value.change_contact_information[0].remark = "";
    }


  try {
  const response = await PartnerServive.createChangInfo(
    dataBodyChangInfo.value

    );
    if (response.data?.is_success) {
      // handleToComapnyProfile(response.data.data?.form_number);
      window.alert(response.data.message);
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
