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
    <v-row class="mt-5">
      <v-col cols="8" class="d-flex" />
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

    <v-form v-model="validateForm" @submit.prevent="handleSubmit">
      <div class="mt-2">
        <v-card elevation="1" color="#FFF1F0">
          <v-card-title class="text-center text-secondary">
            {{ questionTile?.title.split('<br>')[0] }}
            <!-- {{ "ไทย<br>eng".split('<br>')[0] }} -->
          </v-card-title>
          <v-card-title class="text-center text-secondary mt-n5 mb-5">
            {{ questionTile?.title.split('<br>')[1] }}
            <!-- {{ "ไทย<br>eng".split('<br>')[1] }} -->
          </v-card-title>
          <v-card-text class="text-secondary description">
            {{ questionTile?.description }}
          </v-card-text>
        </v-card>
      </div>
      <div class="mt-5">{{ name }}</div>
      <div class="section">
        <QuestionMaster
          :sections="questionSections"
          @sections="questionSections = $event"
        />
      </div>
      <v-row dense class="mt-5">
        <v-col cols="12" class="d-flex justify-center">
          <v-btn
            color="secondary"
            width="140"
            class="text-capitalize"
            type="submit"
            rounded
            :loading="loading"
          >
            ต่อไป
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
import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
import { useConfirmationDialog } from "@/components/dialogs/ConfirmationDialogService";
import { ref, onBeforeMount } from "vue";

const { handlingErrorsMessage } = useErrorHandlingDialog();
// eslint-disable-next-line no-unused-vars
const { showDialog } = useConfirmationDialog();

import { useRouter } from "vue-router";
const router = useRouter();

const stepper = ref({
  index: 3,
  prevCompleted: false,
});
const validateForm = ref(null);
const loading = ref(false);
const questionSections = ref([]);
const questionTile = ref({});
const name = ref(null);

const p_state = ref(null);
const p_bpNumber = ref(null);
const p_rspSurveyId = ref(null);
const p_rspSurveyResultId = ref(null);
const p_rspActivityStatusId = ref(null);
const p_inprogressSectionId = ref(null);

onBeforeMount(() => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const before = urlParams.get("prev_completed");

  stepper.value.completed = before === "completed" ? true : false;
  p_state.value = urlParams.get("state");
  p_bpNumber.value = urlParams.get("bp_number");
  p_rspSurveyId.value = urlParams.get("rsp_survey_id");
  p_rspSurveyResultId.value = urlParams.get("rsp_survey_result_id");
  // console.log(p_bpNumber.value);
  // console.log(p_rspSurveyId.value);

  const info = sessionStorage.getItem("questionnaire2");
  if (info !== null) {
    const question = JSON.parse(info);
    p_rspActivityStatusId.value = question.rspActivityStatusId;
    p_inprogressSectionId.value = question.inprogressSectionId;
    name.value = question.name;
    questionTile.value = question.nameQuestionnaire;
    questionSections.value = ConvertUtils.questionnaireDisabled(
      question.createQuestionnaire
    );
  }
});

const handleSubmit = async () => {
  if (validateForm.value) {
    const answersFormat = await ConvertUtils.questionnaireAnswer(
      questionSections.value
    );
    handleCreatedSurveyAnswer(answersFormat);
  }
};

const handleCreatedSurveyAnswer = async (answers) => {
  try {
    loading.value = true;
    const response = await RspService.createRspSurveyAnswer(
      p_rspSurveyResultId.value,
      answers
    );
    const { is_success } = response.data;
    if (is_success) {
      const updated = await handleUpdatedSurveyResult();
      if (updated.is_success) {
        stepperNext();
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
const handleUpdatedSurveyResult = async () => {
  const payload = {
    bp_number: p_bpNumber.value,
    rsp_survey_id: Number(p_rspSurveyId.value),
    rsp_activity_status_id: p_rspActivityStatusId.value,
    inprogress_section_id: p_inprogressSectionId.value,
  };
  try {
    const response = await RspService.updateRspSurveyResult(payload);
    return response.data;
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    console.log(e.message);
    handlingErrorsMessage("unknown", e.message);
  }
};
const stepperPrev = () => {
  const prevCompleted = stepper.value.completed ? "completed" : "incompleted";
  const url = `/SDTeamMangement/Survey/Document/1?prev_completed=${prevCompleted}&state=${p_state.value}&bp_number=${p_bpNumber.value}&rsp_survey_id=${p_rspSurveyId.value}`;
  router.push(url);
};
const stepperNext = () => {
  const prevCompleted = stepper.value.completed ? "completed" : "incompleted";
  const url = `/SDTeamMangement/Survey/Questionnaire/3?prev_completed=${prevCompleted}&state=${p_state.value}&bp_number=${p_bpNumber.value}&rsp_survey_id=${p_rspSurveyId.value}&rsp_survey_result_id=${p_rspSurveyResultId.value}`;
  router.push(url);
};
</script>

<style scoped>
.description {
  text-indent: 1.5em; /* Adjust the value as needed */
}
</style>
