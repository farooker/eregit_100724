<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <v-app>
    <ExceptionHandleDialog />
    <confirm-dialog />
    <AlertDisclosureDialog />
    <v-app-bar :elevation="2" rounded>
      <v-app-bar-title class="d-flex justify-center">
        <v-img :width="100" aspect-ratio="16/9" cover src="/frasers.png"></v-img>
      </v-app-bar-title>
    </v-app-bar>
    <v-main class="d-flex align-center justify-center">
      <v-container fluid>
        <!-- {{ pdf_url }} -->
          <!-- {{ CurrentTerms }} -->
        <v-card-text>
          <div class="d-flex align-center pdf-container">
            <PDF :src="fileBase64" class="pdf-viewer"></PDF>
          </div>
        </v-card-text>
        <v-row align="center" dense class="mt-5" justify="center">
          <v-col cols="auto" class="d-flex align-center mt-n5">
            <input type="checkbox" id="agree" v-model="agreed" />
            <label for="agree">ข้าพเจ้าได้อ่านและยอมรับข้อกำหนดและเงื่อนไข</label>
          </v-col>
        </v-row>
        <v-row align="center" dense class="mt-5" justify="center">
          <v-col cols="auto" class="d-flex align-center mt-n5">
            <v-btn
              class="text-capitalize"
              :disabled="!agreed"
              @click="handleConfirm"
              rounded
              density="compact"
              style="background-color: #ed1c24"
              height="30"
            >
              <span class="text-white text-subtitle-1">รับทราบ</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
  
  <script setup>
import PDF from "pdf-vue3";
import { ref, onMounted, onBeforeMount } from "vue";
import axios from "axios";
import RspService from "@/apis/RspService";
import TermService from "@/apis/TermCondition";
import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";

const { handlingErrorsMessage } = useErrorHandlingDialog();
const user_id = ref("");
const url_song = ref("");
  const agreed = ref(false);
const fileBase64 = ref(null);
const pdf_url = ref(null);
const termandconFormId = ref({});
const CurrentTerms = ref({});

const PrivacyPolicybyId = ref({});
const CurrentPrivacy = ref({});

onBeforeMount(async () => {
  //   let user_id = sessionStorage.getItem("userId");
  user_id.value = sessionStorage.getItem("userId");
  console.log("Userrrrr", user_id.value);
  //   console.log(auth_email);
});
onMounted(async () => {
  await getRspPolicyState();
  await getTermbyId(user_id.value);
  await getCurrentTermsAll();
  await getPrivacyPolicybyId(user_id.value);
  await getCurrentPrivacyPolicyAll();

//   await getCurrentTerms();
  getUrlArraybuffer();
});

const getUrlArraybuffer = async () => {
  try {
    const response = await axios({
      method: "get",
      responseType: "arraybuffer",
      url: pdf_url.value
    });
    const base64 = arrayBufferToBase64(response.data);
    fileBase64.value = base64;
  } catch (e) {
    handlingErrorsMessage("Failed to load PDF", e.message);
  }
};
//api1
const getTermbyId = async () => {
  try {
    const response = await TermService.getTermsConditionsbyId(user_id.value);
    if (response.data?.is_success) {
      if (response.data.data && response.data.data.length == 0) {
        termandconFormId.value = response.data.data
        // is_can_do_next_step.value = true;
        // is_progress.value = true;
        return;
      }
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data?.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  } finally {
    // is_progress.value = true;
  }
};
//api2
const getCurrentTermsAll = async () => {
  try {
    const response = await TermService.getCurrentTermsAll();
    if (response.data?.is_success) {
        console.log("response.data?.data",response.data?.data)
    //   if (response.data?.data && response.data.data.length > 0) {
        console.log("ifffffffff")
        // pdf_url.value = response.data.data[0]?.file_url;
        CurrentTerms.value = response?.data?.data ??null
    //   }
    }
    else {
        const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data?.error);
      return;   
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data?.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  }
};
//api3
const getPrivacyPolicybyId = async () => {
  try {
    const response = await TermService.getPrivacyPolicybyId(user_id.value);
    if (response.data?.is_success) {
      if (response.data.data && response.data.data.length == 0) {
        PrivacyPolicybyId.value = response.data.data
        // is_can_do_next_step.value = true;
        // is_progress.value = true;
        return;
      }
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data?.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  } finally {
    // is_progress.value = true;
  }
};
//4
const getCurrentPrivacyPolicyAll = async () => {
  try {
    const response = await TermService.getCurrentPrivacyPolicyAll();
    if (response.data?.is_success) {
      if (response.data?.data && response.data.data.length > 0) {
        // pdf_url.value = response.data.data[0]?.file_url;
        CurrentPrivacy.value = response.data.data
      }
    }
    else {
        const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data?.error);
      return;   
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data?.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  }
};

//create111
// const createTermandConditionAcceptance = async () => {
//   try {
//     const response = await TermService.createRspSurveyResult(
//       user_id.value,
//       rsp_survey_id.value
//     );
//     if (response.data?.is_success) {
//       rsp_survey_result_id.value = response.data.data.id;
//     }
//   } catch (e) {
//     if (e.response) {
//       const val = e.response.data;
//       handlingErrorsMessage(val.message, val?.data?.error);
//       return;
//     }
//     handlingErrorsMessage("unknown", e.message);
//   }
// };

//create111
// const createPrivacyPolicyAcceptance = async () => {
//   try {
//     const response = await TermService.createRspSurveyResult(
//       user_id.value,
//       rsp_survey_id.value
//     );
//     if (response.data?.is_success) {
//       rsp_survey_result_id.value = response.data.data.id;
//     }
//   } catch (e) {
//     if (e.response) {
//       const val = e.response.data;
//       handlingErrorsMessage(val.message, val?.data?.error);
//       return;
//     }
//     handlingErrorsMessage("unknown", e.message);
//   }
// };

//testPDF
const getRspPolicyState = async () => {
  try {
    const response = await RspService.getRspPolicyState("active");
    if (response.data?.is_success) {
      if (response.data?.data && response.data.data.length > 0) {
        pdf_url.value = response.data.data[0]?.file_url;
      }
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data?.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  }
};

const arrayBufferToBase64 = buffer => {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  bytes.forEach(item => {
    binary += String.fromCharCode(item);
  });
  return window.btoa(binary);
};

const handleConfirm = () => {
  alert("Proceeding to the next step");
};
</script>
  
  <style scoped>
.pdf-container {
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
}

.pdf-card-text {
  margin-top: 0; /* Remove margin to move it up */
}
.pdf-viewer {
  width: 70%;
  height: 100%;
}
</style>
  