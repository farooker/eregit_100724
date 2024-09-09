<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container>
    <h2>DashBoard</h2>
    <div class="mt-5">
      <div
        v-if="
          businessPartnerFormBpNumber?.business_partner_type?.do_rsp_activity ??
          null
        "
      >
        <v-row>
          <v-col cols="auto">
            <h3 class="mt-3" style="color: #9e9e9e">Profile</h3>Profile
          </v-col>
          <v-col cols="12">
            <v-divider class="mt-3 mb-2 mt-8 mr-5 mb-6"></v-divider>
          </v-col>
        </v-row>
      </div>

      <div v-else>
        <v-row>
          <v-col cols="auto">
            <h3 class="mt-3" style="color: #9e9e9e">My Tasks</h3>
          </v-col>
          <v-col cols="12">
            <v-divider class="mt-3 mb-2 mt-8 mr-5 mb-6"></v-divider>
          </v-col>
        </v-row>
      </div>

      <div class="mt-5">
        <v-skeleton-loader v-if="infoActive.loading" type="list-item-two-line" />
        <ItemVendorDashBoard
          :businessPartnerFormBpNumber="businessPartnerFormBpNumber"
          :businessPartnerProfile="businessPartnerProfile"
          :checkItemDashboard="checkItemDashboard"
          class="mt-3"
          :bpnumber="bp_num"
          color-card-alert="error"
        />
      </div>
      <!-- <v-divider class="mt-3 mb-3"></v-divider> -->
    </div>
  </v-container>    
</template>
<script setup>
import { ref, onMounted, onBeforeMount } from "vue";
// eslint-disable-next-line no-unused-vars

import ItemVendorDashBoard from "@/components/items/ItemVandorDashboard.vue";
import { useConfirmationDialog } from "@/components/dialogs/ConfirmationDialogService";
import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
import VerifyService from "@/apis/VerifyService";
import UserService from "@/apis/UserService";
import PartnerServive from "@/apis/PartnerServive";

// import { useAlerDisclosuretDialogDialog } from "@/components/dialogs/AlertDisclosureDialogService";
// const { showAlertDisclosure } = useAlerDisclosuretDialogDialog();
// import { useAlertDialogDialog } from "@/components/dialogs/AlertSuccessDialogService";
// const { showAlert } = useAlertDialogDialog();

// eslint-disable-next-line no-unused-vars
const { handlingErrorsMessage } = useErrorHandlingDialog();
// eslint-disable-next-line no-unused-vars
const { showDialog } = useConfirmationDialog();

import { useRouter } from "vue-router";
const router = useRouter();

// const menus = ref([]);
const businessPartnerFormBpNumber = ref({});
const detailFormBpNumber = ref({});
const businessPartnerProfile = ref({});
const bp_num = ref("");

const checkItemDashboard = ref({
  taxpayerNumberId: "",
  contactOwner: "",
  created: "",
  userEmail: "",
  created_userId: "",
  do_rsp_activity: ""
});

// const successfulTime = ref({
//   rsp_survey: null,
//   rsp_sign: null
// });

const is_successfully = ref(false);
// const menus_index = ref(0);
onMounted(async () => {
  //  sessionStorage.setItem("bp_numbers", JSON.stringify([]));
  //  console.log("bp_numbers", bp_numbers)
  // await onLoadBusinessPartnerByBpNumber();
  await onLoadBusinessPartnerByBpNumberCondition1();
  if (!is_successfully.value) {
    await onLoadBusinessPartnerByBpNumberCondition2();
  }

  // await getProfileForm();
});

const handleAuthorization = async email => {
  try {
    const response = await VerifyService.getAuthenInfo(email);
    if (response.data?.is_success) {
      // console.log("response.data?.is_success", response.data?.is_success)
      // console.log("response.data?.is_disclosure", (response.data.data[0].is_disclosure))
      // console.log("response.data?.bp_number", (response.data?.data[0]?.bp_number))
      if (response.data.data[0].is_disclosure) return;
      //  router.push("/Error?err=NOT_FOUND1111");/
    }
    router.push("/Error?err=NOT_FOUND");
  } catch (e) {
    router.push("/Error?err=NOT_FOUND");
  }
};

// const getRspVendorSatus = async tax => {
//   try {
//     const response = await RspService.getRspVendorSatus("tax_id", tax);
//     if (response.data?.is_success) {
//       if (response.data.data && response.data.data.length > 0) {
//         const rspData = response.data.data;
//         successfulTime.value.rsp_survey = rspData?.survey?.completed_at ?? null;
//         successfulTime.value.rsp_sign = rspData?.policy?.completed_at ?? null;
//       } else {
//         successfulTime.value.rsp_survey = null;
//         successfulTime.value.rsp_sign = null;
//       }
//     }
//   } catch (e) {
//     if (e.response) {
//       const val = e.response.data;
//       handlingErrorsMessage(val.message, val?.data.error);
//       return;
//     }
//     handlingErrorsMessage("unknown", e.message);
//   }
// };

onBeforeMount(async () => {
  let auth_email = sessionStorage.getItem("auth_email");
  bp_num.value = sessionStorage.getItem("bp_numbers");
  console.log("bp_numberdashboard", bp_num.value);
  console.log(auth_email);
  handleAuthorization(auth_email);
});

const infoActive = ref({
  loading: false,
  items: [],
  state: "active",
  offset: 1,
  limit: 10,
  page: 1,
  pageSize: 1
});

const onLoadBusinessPartnerByBpNumberCondition1 = async () => {
  try {
    const response = await PartnerServive.getBusinessPartnerByBpNumber(
      bp_num.value
    );

    if (response.data?.is_success) {
      // businessPartnerFormBpNumber.value = response?.data?.data?? null;
      is_successfully.value = response.data?.is_success;
      checkItemDashboard.value.taxpayerNumberId =
        response.data?.data?.taxpayer_id_number ?? null;

      checkItemDashboard.value.contactOwner =
        response.data?.data?.contact_owner_user?.email ?? null;

      checkItemDashboard.value.created =
        response.data?.data?.created_at ?? null;

      checkItemDashboard.value.created_userId =
        response.data?.data?.created_user_id ?? null;

      checkItemDashboard.value.do_rsp_activity =
        response.data?.data?.business_partner_type?.do_rsp_activity ?? null;
    }

    if (checkItemDashboard.value?.created_userId) {
      console.log("checkItemDashboard.value?.created_userId",checkItemDashboard.value?.created_userId)
      const emailrespone = await UserService.getUserById(
        checkItemDashboard.value?.created_userId ?? null
      );
      if (emailrespone.data?.is_success) {
        checkItemDashboard.value.userEmail =
          emailrespone.data?.data?.email ?? null;
      }
    }
  } catch (e) {
    if (e.response) {
      // const val = e.response.data;
      // handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    // handlingErrorsMessage("unknown", e.message);
  }
};

const onLoadBusinessPartnerByBpNumberCondition2 = async () => {
  try {
    const responeformdetail = await PartnerServive.getRegisterFormDetail(
      bp_num.value
    );

    if (responeformdetail.data?.is_success) {
      is_successfully.value = responeformdetail.data?.is_success;
      detailFormBpNumber.value = responeformdetail?.data?.data ?? null;

      checkItemDashboard.value.taxpayerNumberId =
        detailFormBpNumber?.value?.business_partner_register_form
          ?.taxpayer_number_id ?? null;

      checkItemDashboard.value.created =
        detailFormBpNumber?.value?.account_information_form?.created_at ?? null;

      checkItemDashboard.value.created_userId =
        detailFormBpNumber?.value?.account_information_form?.created_user_id ??
        null;

      checkItemDashboard.value.do_rsp_activity =
        detailFormBpNumber?.value?.business_partner_profile_form
          ?.business_partner_type.do_rsp_activity ?? null;
      // checkItemDashboard.value.userEmail = detailFormBpNumber.value.business_partner_register_form.registered_user_email
      // }

      console.log(
        " checkItemDashboard.value.taxpayerNumberId",
        detailFormBpNumber.value.business_partner_profile_form
          .business_partner_type.do_rsp_activity
      );
    }

    if (checkItemDashboard.value.created_userId) {
      const contactrespone = await UserService.getUserById(
        checkItemDashboard.value.created_userId
      );
      if (contactrespone.data?.is_success) {
        checkItemDashboard.value.contactOwner =
          contactrespone?.data?.data?.email ?? null;

        checkItemDashboard.value.userEmail =
          contactrespone?.data?.data?.email ?? null;
      }
    }

    // console.log("onLoadBusinessPartnerByBpNumberCondition2", checkItemDashboard.value)
  } catch (e) {
    if (e.response) {
      // const val = e.response.data;
      // handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    // handlingErrorsMessage("unknown", e.message);
  }
};

// const handleAlertSuccessfully = async () => {
//   const confirmed = await showAlert(
//     "ขอบคุณสำหรับการดำเนินการ",
//     "กรุณาเข้าระบบใหม่อีกครั้งเพื่อทำกิจกรรมด้าน ESG"
//   );
//   if (confirmed) {
//     sessionStorage.removeItem("auth_email");
//     sessionStorage.removeItem("auth_modules");
//     sessionStorage.removeItem("auth_reload");
//     router.push({
//       name: "SignInPage",
//     });
//   }
// };
</script>
