<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <v-app>
    <ExceptionHandleDialog />
    <confirm-dialog />
    <AlertDisclosureDialog />
    <v-app-bar :elevation="2" rounded>
      <v-app-bar-title class="d-flex justify-center">
        <v-img
          :width="100"
          aspect-ratio="16/9"
          cover
          src="/frasers.png"
        ></v-img>
      </v-app-bar-title>
    </v-app-bar>
    <v-main class="d-flex align-center justify-center">
      <v-container fluid>
        <div v-if="term_condition_id !== current_term_condition_id">
          <v-card-text>
            <div class="d-flex align-center pdf-container">
              <PDF :src="fileBase64" class="pdf-viewer"></PDF>
            </div>
          </v-card-text>
          <v-row align="center" dense class="mt-5" justify="center">
            <v-col cols="auto" class="d-flex align-center mt-n5">
              <input type="checkbox" id="agree" v-model="agreed" class="custom-checkbox mr-2" />
              <h3  for="agree"
                >ข้าพเจ้าได้อ่านและยอมรับข้อกำหนดและเงื่อนไข</h3
              >
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
        </div>
        <div v-else-if="privacy_policy_id !== current_privacy_id">
          <v-card-text>
            <!-- <h6>Policy</h6> -->
            <div class="d-flex align-center pdf-container">
              <PDF :src="fileBase64Policy" class="pdf-viewer"></PDF>
            </div>
          </v-card-text>
          <v-row align="center" dense class="mt-5" justify="center">
            <v-col cols="auto" class="d-flex align-center mt-n5">
              <input type="checkbox" id="agree" v-model="agreed2" class="custom-checkbox mr-2"/>
              <h3 for="agree"
                >ข้าพเจ้าได้อ่านและยอมรับข้อกำหนดและเงื่อนไข</h3
              >
            </v-col>
          </v-row>
          <v-row align="center" dense class="mt-5" justify="center">
            <v-col cols="auto" class="d-flex align-center mt-n5">
              <v-btn
                class="text-capitalize"
                :disabled="!agreed2"
                @click="handleConfirmPolicy"
                rounded
                density="compact"
                style="background-color: #ed1c24"
                height="30"
              >
                <span class="text-white text-subtitle-1">รับทราบ</span>
              </v-btn>
            </v-col>
          </v-row>
        </div>
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
import { useSessionInfoStore } from "@/stores/papdStore";
import { useRouter } from "vue-router";
const store = useSessionInfoStore();
const router = useRouter();
const { handlingErrorsMessage } = useErrorHandlingDialog();
const user_id = ref("");
// const url_song = ref("");
const agreed = ref(false);
// const song = ref(false);

const agreed2 = ref(false);
const fileBase64 = ref(null);
const fileBase64Policy = ref(null);
const pdf_url = ref(null);
let current_view = ref(1);

//1
const term_condition_id = ref(null);
const term_is_accepted = ref(null);
//2
const current_term_condition_id = ref(null);
const current_term_condition_url = ref(null);
//3
const privacy_policy_id = ref(null);
const privacy_is_accepted = ref(null);
//4
const current_privacy_id = ref(null);
const current_privacy_url = ref(null);
// const is_term_condition = ref(false);

onBeforeMount(async () => {
  //   let user_id = sessionStorage.getItem("userId");
  user_id.value = sessionStorage.getItem("userId");
  console.log("Userrrrr", user_id.value);
  //   console.log(auth_email);
});
onMounted(async () => {
  await getRspPolicyState();
  // console.log("term_condition_id.value",term_condition_id.value)
  // console.log("current_term_condition_id.value", current_term_condition_id.value)
  // if (term_condition_id !== current_term_condition_id) {
  await getTermbyId(user_id.value);
  await getCurrentTermsAll();
  await getPrivacyPolicybyId(user_id.value);
  await getCurrentPrivacyPolicyAll();
  // current_view.value ++
  store.getsessionlinkstore();
  console.log("ommount", store.sessionInfo);
  // }
  if (
    term_condition_id.value == current_term_condition_id.value &&
    privacy_policy_id.value == current_privacy_id.value
  ) {
    console.log("coditionTerm");
    switch (store.sessionInfo.actions) {
      case 1:
        router.push({ name: store.sessionInfo.link_to });
        break;
      case 2:
        router.push({
          name: store.sessionInfo.link_to,
          query: { form_number: store.sessionInfo.data },
        });
        break;
      case 3:
        router.push({
          name: store.sessionInfo.link_to,
          query: { form_number: store.sessionInfo.data },
        });
        break;
      case 4:
        router.push({
          name: store.sessionInfo.link_to,
          query: { form_number: store.sessionInfo.data },
        });
        break;
    }
  }

  // if (term_condition_id.value !== current_term_condition_id.value) {

  // }

  //   await getCurrentTerms();
  getUrlArraybuffer();
  getUrlArraybufferpolicy();
});

const getUrlArraybuffer = async () => {
  try {
    const response = await axios({
      method: "get",
      responseType: "arraybuffer",
      url: current_term_condition_url.value,
    });
    const base64 = arrayBufferToBase64(response.data);
    fileBase64.value = base64;
  } catch (e) {
    handlingErrorsMessage("Failed to load PDF", e.message);
  }
};

const getUrlArraybufferpolicy = async () => {
  try {
    const response = await axios({
      method: "get",
      responseType: "arraybuffer",
      url: current_privacy_url.value,
    });
    const base64 = arrayBufferToBase64(response.data);
    fileBase64Policy.value = base64;
  } catch (e) {
    handlingErrorsMessage("Failed to load PDF", e.message);
  }
};
//api1
const getTermbyId = async () => {
  try {
    const response = await TermService.getTermsConditionsbyId(user_id.value);
    if (response.data?.is_success) {
      if (response.data.data) {
        // console.log("termm1111");
        const termData = response.data.data[0];
        // console.log("t", termData);
        term_condition_id.value = termData?.terms_and_conditions?.id ?? null;
        // console.log("term_condition_id.value", term_condition_id.value);
        term_is_accepted.value = termData?.is_accepted ?? null;
        // term_condition_id.value = response.data.data
        // term_is_accepted.value = response.data.data.is_accepted;

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
      //   if (response.data?.data && response.data.data.length > 0) {
      // console.log("ifffffffff");
      // pdf_url.value = response.data.data[0]?.file_url;
      current_term_condition_id.value = response?.data?.data?.id ?? null;
      // console.log("current_term_condition_id", current_term_condition_id.value);
      current_term_condition_url.value = response?.data?.data?.data ?? null;
      //   }
    } else {
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
      if (response.data.data) {
        const policyData = response.data.data[0];
        privacy_policy_id.value = policyData?.privacy_policy?.id ?? null;
        // console.log("policyData", policyData.privacy_policy.id);
        privacy_is_accepted.value = policyData?.is_accepted ?? null;
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
      if (response.data.data) {
        // pdf_url.value = response.data.data[0]?.file_url;
        current_privacy_id.value = response.data.data.id;
        current_privacy_url.value = response.data.data.data;
      }
    } else {
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
const createTermandConditionAcceptance = async () => {
  try {
    const response = await TermService.createTermandConditionAcceptance(
      current_term_condition_id.value
    );
    if (response.data?.is_success) {
      // rsp_survey_result_id.value = response.data.data.id;
      console.log("Save == True");
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

//create222
const createPrivacyPolicyAcceptance = async () => {
  try {
    const response = await TermService.createPrivacyPolicyAcceptance(
      current_privacy_id.value
    );
    if (response.data?.is_success) {
      // rsp_survey_result_id.value = response.data.data.id;
      // console.log("Save 222");
      //   switch (store.sessionInfo.actions) {
      //   case 1:
      //     router.push({ name: store.sessionInfo.link_to });
      //     break;
      //   case 2:
      //     router.push({
      //       name: store.sessionInfo.link_to,
      //       query: store.sessionInfo.data,
      //     });
      //     break;
      //     case 3:
      //     router.push({
      //       name: store.sessionInfo.link_to,
      //       query: store.sessionInfo.data,
      //     });
      //     break;
      //     case 4:
      //     router.push({
      //       name: store.sessionInfo.link_to,
      //       query: store.sessionInfo.data,
      //     });
      //     break;
      // }
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

const arrayBufferToBase64 = (buffer) => {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  bytes.forEach((item) => {
    binary += String.fromCharCode(item);
  });
  return window.btoa(binary);
};

const handleConfirm = async () => {
  console.log("coditionTermbrfor", store.sessionInfo);
  // alert("Proceeding to the next step");
  // console.log("term_condition_id.value",term_condition_id.value)
  // console.log("current_term_condition_id.value", current_term_condition_id.value)
  if (term_condition_id.value !== current_term_condition_id.value) {
    console.log("term_condition_id.value", term_condition_id.value);
    console.log(
      "current_term_condition_id.value",
      current_term_condition_id.value
    );
    try {
      const response = await TermService.createTermandConditionAcceptance(
        current_term_condition_id.value
      );
      if (response.data?.is_success) {
        // location.reload();
        // current_view.value++;
        // console.log("ooooooooooo", store.sessionInfo);
        // console.log("term_condition_id.value", term_condition_id.value)
        // console.log("current_term_condition_id.value", current_term_condition_id.value)
        if (privacy_policy_id.value == current_privacy_id.value) {
          store.getsessionlinkstore();
          console.log("coditionTerm", store.sessionInfo);
          switch (store.sessionInfo.actions) {
            case 1:
              router.push({ name: store.sessionInfo.link_to });
              break;
            case 2:
              router.push({
                name: store.sessionInfo.link_to,
                query: { form_number: store.sessionInfo.data },
              });
              break;
            case 3:
              router.push({
                name: store.sessionInfo.link_to,
                query: { form_number: store.sessionInfo.data },
              });
              break;
            case 4:
              router.push({
                name: store.sessionInfo.link_to,
                query: { form_number: store.sessionInfo.data },
              });
              break;
          }
        } else {
          location.reload();
          store.getsessionlinkstore();
        }
      }
    } catch (e) {
      if (e.response && e.response.data) {
        // current_view.value == 2;
        // console.log("oooooooocathooo");
        const val = e.response.data;
        handlingErrorsMessage(val.message, val?.data?.error);
        return;
      }
      handlingErrorsMessage("unknown", e.message);
    }
  }
};

const handleConfirmPolicy = async () => {
  console.log("term_condition_id.value", term_condition_id.value);
  console.log(
    "current_term_condition_id.value",
    current_term_condition_id.value
  );
  if (privacy_policy_id?.value !== current_privacy_id.value) {
    try {
      const response = await TermService.createPrivacyPolicyAcceptance(
        current_privacy_id.value
      );
      if (response.data?.is_success) {
        if (term_condition_id.value == current_term_condition_id.value) {
          store.getsessionlinkstore();
          console.log("coditionTerm", store.sessionInfo);
          switch (store.sessionInfo.actions) {
            case 1:
              router.push({ name: store.sessionInfo.link_to });
              break;
            case 2:
              router.push({
                name: store.sessionInfo.link_to,
                query: { form_number: store.sessionInfo.data },
              });
              break;
            case 3:
              router.push({
                name: store.sessionInfo.link_to,
                query: { form_number: store.sessionInfo.data },
              });
              break;
            case 4:
              router.push({
                name: store.sessionInfo.link_to,
                query: { form_number: store.sessionInfo.data },
              });
              break;
          }
        }
      }
    } catch (e) {
      if (e.response && e.response.data) {
        // current_view.value == 2;
        const val = e.response.data;
        handlingErrorsMessage(val.message, val?.data?.error);
        return;
      }
      // handlingErrorsMessage("unknown", e.message);
    }
  } else {
    current_view.value++;
  }
};
// const handleConfirm = async () => {
//   // alert("Proceeding to the next step");
//   // console.log("term_condition_id.value",term_condition_id.value)
//   // console.log("current_term_condition_id.value", current_term_condition_id.value)
//   if (term_condition_id.value !== current_term_condition_id.value) {
//     console.log("term_condition_id.value", term_condition_id.value);
//     console.log(
//       "current_term_condition_id.value",
//       current_term_condition_id.value
//     );
//     try {
//       const response = await TermService.createTermandConditionAcceptance(
//         current_term_condition_id.value
//       );
//       if (response.data?.is_success) {
//         set_term.value = true;
//       }
//     } catch (e) {
//       if (e.response && e.response.data) {
//         set_term.value = true;
//         const val = e.response.data;
//         handlingErrorsMessage(val.message, val?.data?.error);
//         return;
//       }
//       handlingErrorsMessage("unknown", e.message);
//     } finally {
//       set_term.value = true;
//     }
//   } else {
//     set_term.value = true;
//   }

//   if (privacy_policy_id !== current_privacy_id) {
//     try {
//       const response = await TermService.createPrivacyPolicyAcceptance(
//         current_privacy_id.value
//       );
//       if (response.data?.is_success) {
//         set_policy.value = true;
//       }
//     } catch (e) {
//       if (e.response && e.response.data) {
//         const val = e.response.data;
//         handlingErrorsMessage(val.message, val?.data?.error);
//         return;
//       }
//       handlingErrorsMessage("unknown", e.message);
//     } finally {
//       set_term.value = true;
//     }
//   } else {
//     set_policy.value = true;
//   }
// };
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
  margin-top: 0;
}
.pdf-viewer {
  width: 70%;
  height: 100%;
}

.custom-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
