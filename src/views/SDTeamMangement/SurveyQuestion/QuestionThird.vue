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
    <v-card-title class="text-center">
      <b>{{ sectionsHeader.title.split('<br>')[0] }}</b>
    </v-card-title>
    <v-card-title class="text-center mt-n3">
      <b>{{ sectionsHeader.title.split('<br>')[1] }}</b>
    </v-card-title>
    <div class="text-center mt-5">
      <v-row>
        <v-col cols="8" class="d-flex">
          <h3>{{ sectionsTitle }}</h3>
        </v-col>
        <!-- <v-col cols="4" class="d-flex justify-end">
          <v-btn
            color="secondary"
            variant="outlined"
            width="140"
            class="text-capitalize mr-2"
            rounded
          >
            <v-icon left>mdi-share</v-icon>
            ส่งต่อ
          </v-btn>
          <v-btn color="secondary" width="140" class="text-capitalize" rounded>
            <v-icon left>mdi-tag</v-icon>
            Save Darft
          </v-btn>
        </v-col> -->
      </v-row>
    </div>
    <v-form v-model="validateForm" @submit.prevent="handleSubmit">
      <div class="section">
        <QuestionMaster
          :sections="sectionsData"
          @sections="sectionsData = $event"
        />
      </div>
      <v-row dense class="mt-5">
        <v-col cols="12" class="d-flex justify-center">
          <v-btn
            color="secondary"
            width="140"
            variant="outlined"
            class="text-capitalize ma-1"
            rounded
            :disabled="sectionsIndex === 0"
            @click="sectionPrev"
          >
            ย้อนกลับ
          </v-btn>
          <v-btn
            color="secondary"
            width="140"
            class="text-capitalize ma-1"
            rounded
            :loading="loading"
            type="submit"
          >
            {{ sectionLast() ? "ส่ง" : "ต่อไป" }}
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<script setup>
import RspService from "@/apis/RspService";
import QuestionMaster from "@/components/forms/QuestionMaster.vue";
import ConvertUtils from "@/utils/convertUtils";
import ToolbarSurvey from "@/components/items/ToolbarSurvey.vue";
import { ref, onBeforeMount } from "vue";

import { useRouter } from "vue-router";
const router = useRouter();

import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
const { handlingErrorsMessage } = useErrorHandlingDialog();

import { useConfirmationDialog } from "@/components/dialogs/ConfirmationDialogService";
const { showDialog } = useConfirmationDialog();

import { useAlertDialogDialog } from "@/components/dialogs/AlertSuccessDialogService";
const { showAlert } = useAlertDialogDialog();

const sectionsHeader = ref({
  title: "",
  description: "",
});
const sectionsCount = ref(0);
const sectionsIndex = ref(0);
const sectionsItems = ref([]);
const lastIndex = ref(0);

const stepper = ref({
  index: 3,
  prevCompleted: false,
});

const validateForm = ref(null);
const loading = ref(false);
const sectionId = ref(null);
const sectionsTitle = ref(null);
const sectionsData = ref([]);

const p_state = ref(null);
const p_bpNumber = ref(null);
const p_rspSurveyId = ref(null);
const p_rspSurveyResultId = ref(null);
const p_rspActivityStatusId = ref(null);
const p_inprogressSectionId = ref(null);

onBeforeMount(() => {
  const survey_preview_third = sessionStorage.getItem("questionnaire3");
  const parse = JSON.parse(survey_preview_third);
  sectionsHeader.value = parse.nameQuestionnaire;
  sectionsItems.value = parse.createQuestionnaire;
  sectionsCount.value = sectionsItems.value.length;
  sectionsIndex.value = 0;
  lastIndex.value = 0;

  // init
  sectionId.value = sectionsItems.value[sectionsIndex.value].index;
  sectionsTitle.value = sectionsItems.value[sectionsIndex.value].title;
  sectionsData.value = ConvertUtils.questionnaireDisabled(
    sectionsItems.value[sectionsIndex.value].data
  );
  p_rspActivityStatusId.value =
    sectionsItems.value[sectionsIndex.value].rspActivityStatusId;
  p_inprogressSectionId.value =
    sectionsItems.value[sectionsIndex.value].inprogressSectionId;
  //  const validate  =  validateForm.value
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const done = urlParams.get("prev_completed");

  stepper.value.completed = done === "completed" ? true : false;
  p_state.value = urlParams.get("state");
  p_bpNumber.value = urlParams.get("bp_number");
  p_rspSurveyId.value = urlParams.get("rsp_survey_id");
  p_rspSurveyResultId.value = urlParams.get("rsp_survey_result_id");
});


const delay = ms => new Promise(res => setTimeout(res, ms));
const handleSubmit = async () => {
  const validateA  =  validateForm.value
  await delay(100);
  const validateB =  validateForm.value
  if(validateA && validateB){
    handleCreatedSurveyAnswer();
  }

};


const sectionLast = () => {
  const index = sectionsIndex.value + 1;
  const max = sectionsItems.value.length;
  return index >= max;
};
// eslint-disable-next-line no-unused-vars
const sectionNext = () => {
  sectionsItems.value[sectionsIndex.value].data = sectionsData.value;
  if (sectionsIndex.value < sectionsItems.value.length) {
    sectionsIndex.value = sectionsIndex.value + 1;
    sectionId.value = sectionsItems.value[sectionsIndex.value].index;
    sectionsTitle.value = sectionsItems.value[sectionsIndex.value].title;

    p_rspActivityStatusId.value =
      sectionsItems.value[sectionsIndex.value].rspActivityStatusId;
    p_inprogressSectionId.value =
      sectionsItems.value[sectionsIndex.value].inprogressSectionId;

    if (sectionsIndex.value > lastIndex.value) {
      lastIndex.value = sectionsIndex.value;
      const data = sectionsItems.value[sectionsIndex.value].data;
      sectionsData.value = ConvertUtils.questionnaireDisabled(data);
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
      return;
    }
    if (sectionsIndex.value <= lastIndex.value) {
      const data = sectionsItems.value[sectionsIndex.value].data;
      sectionsData.value = data;
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
      return;
    }
  }
};
const sectionPrev = () => {
  if (sectionsIndex.value > 0) {
    sectionsIndex.value = sectionsIndex.value - 1;
    sectionId.value = sectionsItems.value[sectionsIndex.value].index;
    sectionsTitle.value = sectionsItems.value[sectionsIndex.value].title;
    const data = sectionsItems.value[sectionsIndex.value].data;
    sectionsData.value = data;
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }
};

// eslint-disable-next-line no-unused-vars
const handleCreatedSurveyAnswer = async () => {
  try {
    loading.value = true;
    const answersFormat = await ConvertUtils.questionnaireAnswer(
      sectionsData.value
    );
    const response = await RspService.createRspSurveyAnswer(
      p_rspSurveyResultId.value,
      answersFormat
    );
    const { is_success } = response.data;
    if (is_success) {
      const updated = await handleUpdatedSurveyResult();
      if (updated.is_success) {
        const section_last = sectionLast();
        if (section_last) {
          handleSendQuestion();
        } else {
          sectionNext();
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
  } finally {
    loading.value = false;
  }
};
// eslint-disable-next-line no-unused-vars
// const handleUpdatedSurveyAnswer = async () => {
//   try {
//     loading.value = true;
//     const answersFormat = await ConvertUtils.questionnaireAnswer(
//       sectionsData.value
//     );
//     const response = await RspService.createRspSurveyAnswer(
//       p_rspSurveyId.value,
//       answersFormat
//     );
//     const { is_success } = response.data;
//     if (is_success) {
//       const updated = await handleUpdatedSurveyResult();
//       if (updated.is_success) {
//         const section_last = sectionLast();
//         if (section_last) {
//           handleSendQuestion();
//         } else {
//           sectionNext();
//         }
//       }
//     }
//   } catch (e) {
//     if (e.response) {
//       const val = e.response.data;
//       handlingErrorsMessage(val.message, val?.data.error);
//       return;
//     }
//     handlingErrorsMessage("unknown", e.message);
//   } finally {
//     loading.value = false;
//   }
// };

const handleUpdatedSurveyResult = async () => {
  try {
    const payload = {
      bp_number: p_bpNumber.value,
      rsp_survey_id: Number(p_rspSurveyId.value),
      rsp_activity_status_id: p_rspActivityStatusId.value,
      inprogress_section_id: p_inprogressSectionId.value,
    };
    const response = await RspService.updateRspSurveyResult(payload);
    return response.data;
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  }
};

const handleSendQuestion = async () => {
  try {
    const confirmed = await showDialog(
      "ยืนยันการส่งแบบสำรวจ",
      'กรุณาตรวจสอบข้อมูลให้ถูกต้อง\nคลิกปุ่ม"ตกลง"เพื่อดำเนินการ'
    );
    if (confirmed) {
      const response = await RspService.completeRspSurvey(
        p_bpNumber.value,
        p_rspSurveyId.value
      );
      const { is_success } = response.data;
      if (is_success) {
        handleAlertSuccessfully();
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
const handleAlertSuccessfully = async () => {
  const confirmed = await showAlert(
    "ส่งแบบสำรวจเรียบร้อยแล้ว",
    "ขอขอบคุณสำหรับการตอบแบบสำรวจ\nการประเมินด้านความยั่งยืนของคู่ค้าในครั้งนี้"
  );
  if (confirmed) {
    router.push(
      `/CreditScorePage?prev_completed=completed&state=${p_state.value}&bp_number=${p_bpNumber.value}&&rsp_survey_id=${p_rspSurveyId.value}`
    );
  }
};
const stepperPrev = () => {
  const prevCompleted = stepper.value.completed ? "completed" : "incompleted";
  const url = `/SDTeamMangement/Survey/Document/1?prev_completed=${prevCompleted}&state=${p_state.value}&bp_number=${p_bpNumber.value}&rsp_survey_id=${p_rspSurveyId.value}&rsp_survey_result_id=${p_rspSurveyResultId.value}`;
    router.push(url);
};
const stepperNext = () => {
  console.log("next");
};
</script>
