<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <v-container fluid>
    <v-card-text>
      <ToolbarSurvey
        :step="stepper.index"
        :is-done="stepper.prevCompleted"
        @prev="stepperPrev"
        @next="stepperNext"
      />
    </v-card-text>
    <v-card-text>
      <div v-if="done" class="d-flex flex-row-reverse mb-5">
        <v-btn
          class="me-2 text-none"
          color="secondary"
          prepend-icon="mdi-download"
          variant="flat"
          height="40"
          rounded
          @click="handleDowload"
        >
          Download
        </v-btn>
        <!-- <v-btn
          class="me-2 text-none"
          color="secondary"
          prepend-icon="mdi-reply-outline"
          variant="outlined"
          height="40"
          rounded
          @click="handleShareActivity"
        >
          ส่งต่อ
        </v-btn> -->
      </div>
      <div v-else class="d-flex flex-row-reverse mb-5">
        <!-- <v-btn
          class="me-2 text-none"
          color="secondary"
          prepend-icon="mdi-download"
          variant="flat"
          height="40"
          rounded
          @click="handleDowload"
        >
          Download
        </v-btn> -->
        <v-btn
          class="me-2 text-none"
          color="secondary"
          prepend-icon="mdi-reply-outline"
          variant="outlined"
          height="40"
          rounded
          @click="handleShareActivity"
        >
          ส่งต่อ
        </v-btn>
      </div>
      <div class="d-flex align-center pdf-container">
        <PDF :src="fileBase64" class="pdf-viewer"></PDF>
      </div>
    </v-card-text>
    <v-bottom-navigation
      :active="!done"
      v-show="!done"
      height="100"
      bg-color="rgba(0, 0, 0, 0.8)"
    >
      <v-container>
        <v-form ref="registerAccept" class="mt-n10">
          <v-row align="center" justify="center">
            <v-col cols="1" class="d-flex align-center">
              <b class="text-white text-subtitle-1">ชื่อข้าพเจ้า</b>
            </v-col>
            <v-col cols="3" class="d-flex align-center mt-5">
              <v-radio-group
                v-model="input_data.prefixName"
                :rules="textRequired"
                inline
              >
                <v-radio
                  label="นาย"
                  value="นาย"
                  class="text-white text-subtitle-1"
                ></v-radio>
                <v-radio
                  label="นาง"
                  value="นาง"
                  class="text-white text-subtitle-1"
                ></v-radio>
                <v-radio
                  label="นางสาว"
                  value="นางสาว"
                  class="text-white text-subtitle-1"
                ></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="2" class="d-flex align-center mt-5">
              <v-text-field
                :rules="textRequired"
                style="width: 300px"
                density="compact"
                bg-color="white"
                variant="outlined"
                v-model="input_data.firstname"
              >
              </v-text-field>
            </v-col>
            <v-col cols="1" class="d-flex align-center">
              <b class="text-white text-subtitle-1">นามสกุล</b>
            </v-col>
            <v-col cols="2" class="d-flex align-center mt-5">
              <v-text-field
                v-model="input_data.lastname"
                :rules="textRequired"
                style="width: 300px"
                density="compact"
                bg-color="white"
                variant="outlined"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3" class="d-flex align-center">
              <b class="text-white text-subtitle-1"
                >รับทราบและจะดำเนินการตามที่ระบุ</b
              >
            </v-col>
          </v-row>
          <v-row align="center" dense class="mt-n3" justify="center">
            <v-col cols="auto" class="d-flex align-center mt-n5">
              <v-btn
                class="text-capitalize"
                @click="handleConfirm"
                rounded
                density="compact"
                style="background-color: #ed1c24"
                height="30"
              >
                <span class="text-white text-subtitle-1"> รับทราบ</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-bottom-navigation>
  </v-container>
</template>
<script setup>
import PDF from "pdf-vue3";
//import pdf from 'vue-pdf'
//import file from "@/assets/base64.json";
import { Base64 } from "js-base64";
import { saveAs } from "file-saver";
import ToolbarSurvey from "@/components/items/ToolbarSurvey.vue";
import { useConfirmationDialog } from "@/components/dialogs/ConfirmationDialogService";

import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const { showDialog } = useConfirmationDialog();
import { ref, onBeforeMount, onMounted } from "vue";

const { showShareActivityDialog } = useShareActivityDialog();

const done = ref(false);
// const prefixName = ref(null);
const fileBase64 = ref(null);

const input_data = ref({
  prefixName: null,
  firstname: "",
  lastname: "",
});

import axios from "axios";
import { useShareActivityDialog } from "@/components/dialogs/ShareActivityDialogService";
import RspService from "@/apis/RspService";
import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";

const textRequired = [(v) => !!v || "กรุณากรอกข้อมูลให้ครบถ้วน"];
const { handlingErrorsMessage } = useErrorHandlingDialog();

const stepper = ref({
  index: 2,
  prevCompleted: true,
});
const state = ref(null);
const bp_number = ref(null);
const registerAccept = ref(null);
// const rsp_survey_id = ref(null);
// const isHide = ref(false);

onBeforeMount(() => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const doneParam = urlParams.get("prev_completed");
  stepper.value.completed = doneParam === "completed" ? true : false;
  done.value = stepper.value.completed;
  state.value = urlParams.get("state");
  bp_number.value = urlParams.get("bp_number");
  // rsp_survey_id.value = urlParams.get("rsp_survey_id");
  // if (urlParams.get("isHide") == 1) isHide.value = true;
});

onMounted(() => {
  getUrlArraybuffer();
});

const getUrlArraybuffer = async () => {
  const response = await axios({
    method: "get",
    responseType: "arraybuffer",
    url: sessionStorage.getItem("file_url"), // /*"https://uwaterloo.ca/onbase/sites/ca.onbase/files/uploads/files/sampleunsecuredpdf.pdf"*/,
  });
  // sessionStorage.getItem("file_url")
  // sessionStorage.removeItem("file_url");
  var base64 = arrayBufferToBase64(response.data);
  fileBase64.value = base64;
};

const arrayBufferToBase64 = (buffer) => {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  bytes.forEach((item) => {
    binary += String.fromCharCode(item);
  });
  return window.btoa(binary);
};
const handleShareActivity = async () => {
  const result = await showShareActivityDialog(bp_number.value);
  if (result && result.email) {
    // call api share activity
    console.log(result);
  }
};
const handleDowload = () => {
  const { value } = fileBase64;
  const decode = Base64.toUint8Array(value);
  const blob = new Blob([decode], { type: "application/pdf" });

  saveAs(blob, bp_number.value + ".pdf");
};
const stepperPrev = () => {
  console.log("prev");
};
const stepperNext = () => {
  console.log("next");
  router.push(
    `/SDTeamMangement/Survey/Questionnaire/1?prev_completed=completed&state=created&bp_number=${bp_number.value}`
  );
};

const handleConfirm = async () => {
  const is_valid = await registerAccept.value.validate();
  if (!is_valid || !is_valid["valid"]) return;
  const confirmed = await showDialog(
    "ยืนยันการรับทราบเอกสาร?",
    'กรุณาตรวจสอบข้อมูล คุณไม่สามารถกลับมาแก้ไขได้อีก\nคลิกปุ่ม "ตกลง" เพื่อดำเนินการ'
  );
  if (confirmed) {
    try {
      const response = await RspService.createAcceptRspPolicy({
        bp_number: route.query?.bp_number ?? null,
        rsp_policy_id: Number(route.query?.rsp_survey_id),
        Title: input_data.value.prefixName,
        firstname: input_data.value.firstname,
        lastname: input_data.value.lastname,
      });
      if (response.data?.is_success) {
        console.log(response.data?.is_success);
        router.push(
          `/SDTeamMangement/Survey/Questionnaire/1?prev_completed=completed&state=created&bp_number=${bp_number.value}`
        );
      }
    } catch (e) {
      if (e.response && e.response.data) {
        const val = e.response.data;
        handlingErrorsMessage(val.message, val?.data?.error);
        return;
      }
      handlingErrorsMessage("unknown", e.message);
    }
    console.log("Confirm");
  }
};
</script>

<style scoped>
.pdf-container {
  width: 100%; /* Adjust the width as needed */
  height: 100vh; /* Adjust the height as needed */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -50px;
}
.pdf-viewer {
  width: 50%; /* Adjust the width as needed */
  height: 90%; /* Adjust the height as needed */
}
</style>
