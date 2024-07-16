<template>
  <v-container style="padding: auto" fluid>
    <v-card-text>
      <ToolbarSurvey
        :step="stepper.index"
        :is-done="stepper.prevCompleted"
        @prev="stepperPrev"
        @next="stepperNext"
      />
    </v-card-text>
    <v-card>
      <v-card-item class="ml-15">
        <v-row dense class="mt-5">
          <v-col cols="6">
            <h2>Responsible sourcing policy</h2>
            <h3>นโยบายการจัดซื้อจัดจ้างอย่างรับผิดชอบ</h3>
            <br />
            <h5>บริษัท เฟรเซฮร์ส พร็อพเพอร์ตี้ ขอสื่อสารนโยบายจัดซื้อจัดจ้าง</h5>
            <h5>
              อย่างรับผิดชอบ
              ซึ่งได้จัดทำขึ้นและยึดถือเป็นความยั่งยืนในการกิจกรรม
            </h5>
            <h5>
              ดำเนินงาน ต่อผู้มีส่วนเกี่ยวข้องต่างๆขององค์กร อันรวมถึงคู่ค้า ผู้ขาย
            </h5>
            <h5>
              และผู้รับเหมาช่วงของเรา
              ซึ่งได้ทางเรามีความคาดหวังที่จะขยายความยั่งยืน
            </h5>
            <h5>ในการดำเนินงานนี้ ไปยังคู่ของเราต่อไป</h5>
            <br />
            <h5>
              ทางเราจึงขอให้ท่านรับทราบและศึกษานโยบายการจัดจ้างอย่างรับผิดชอบนี้
            </h5>
            <h5 style="color: red" v-show="is_progress && is_can_do_next_step">
              สามารถส่งต่อ Email หรือ Link ให้ผู้ร่วมงานอื่นรับผิดชอบได้
            </h5>
            <br />
            <br />
          </v-col>
          <v-col cols="6" class="d-flex align-center jusityfy-start">
            <img
              src="../../../assets/normal_image_survay.jpg"
              aspect-ratio="4/3"
              cover
              width="600"
              height="450"
            />
          </v-col>
        </v-row>
        <div v-show="is_progress">
          <v-row dense class="mt-5" v-if="is_can_do_next_step">
            <v-col cols="auto" class="d-flex justify-center">
              <v-btn
                color="secondary"
                width="140"
                class="text-capitalize"
                variant="outlined"
                rounded
                @click="next"
              >
                ส่งต่อ
              </v-btn>
            </v-col>
            <v-col cols="auto" class="d-flex justify-center">
              <v-btn
                color="secondary"
                width="140"
                class="text-capitalize"
                rounded
                @click="now(false)"
              >
                ทำเลย
              </v-btn>
            </v-col>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn
                width="140"
                class="text-capitalize"
                rounded
                variant="text"
                @click="later"
              >
                ทำภายหลัง >>
              </v-btn>
            </v-col>
          </v-row>
          <v-row style="margin-top: -10%; margin-bottom: 15%" v-else>
            <v-col>
              <v-icon color="green">mdi mdi-check-circle</v-icon>
              <span style="font-weight: bold; color: green"
                >บริษัทของท่านทำกิจกรรมนี้เรียบร้อยแล้ว</span
              >
            </v-col>
          </v-row>
        </div>
      </v-card-item>
    </v-card>
  </v-container>
</template>
<script setup>
// import RspService from '@/apis/RspService';
import RspService from "@/apis/RspService";
import ToolbarSurvey from "@/components/items/ToolbarSurvey.vue";
import { ref, onBeforeMount, onMounted } from "vue";

import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
const { handlingErrorsMessage } = useErrorHandlingDialog();

const { showShareActivityDialog } = useShareActivityDialog();

import { useRouter } from "vue-router";
import { useShareActivityDialog } from "@/components/dialogs/ShareActivityDialogService";
const router = useRouter();

const stepper = ref({
  index: 2,
  prevCompleted: true,
});
const state = ref(null);
const bp_number = ref(null);
const rsp_survey_id = ref(null);
const is_can_do_next_step = ref(false);
const is_progress = ref(false);

onBeforeMount(() => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const done = urlParams.get("prev_completed");

  stepper.value.completed = done === "completed" ? true : false;
  state.value = urlParams.get("state");
  bp_number.value = urlParams.get("bp_number");
  // rsp_survey_id.value = urlParams.get("rsp_survey_id");
});

onMounted(async () => {
  await getRspSurveysActive();
  await getRspPolicyState();
  await getRspPolicyResults(bp_number.value, rsp_survey_id.value);
});

const getRspSurveysActive = async () => {
  try {
    const response = await RspService.getRspSurveysActive();
    if (response.data?.is_success) {
      if (response.data?.data && response.data.data.length > 0) {
        rsp_survey_id.value = response.data.data[0].id;
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

const createRspActivitySkippedLog = async () => {
  try {
    await RspService.createRspActivityLog(bp_number.value, 1, true);
    router.push(
      `/SDTeamMangement/Survey/Questionnaire/1?prev_completed=completed&state=created&bp_number=${bp_number.value}`
    );
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data?.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  }
};

const getRspPolicyState = async () => {
  try {
    const response = await RspService.getRspPolicyState("active");
    if (response.data?.is_success) {
      if (response.data?.data && response.data.data.length > 0)
        sessionStorage.setItem("file_url", response.data.data[0]?.file_url);
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

const getRspPolicyResults = async (bp_number, rsp_policy_id) => {
  try {
    const response = await RspService.getRspPolicyResults(
      bp_number,
      rsp_policy_id
    );
    if (response.data?.is_success) {
      if (response.data.data && response.data.data.length == 0) {
        is_can_do_next_step.value = true;
        is_progress.value = true;
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
    is_progress.value = true;
  }
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

const next = async () => {
  const result = await showShareActivityDialog(bp_number.value);
  if (result && result.email) {
    // call api share activity
    console.log(result);
  }
};

const now = (isHide) => {
  if (isHide) {
    router.push(
      `/SDTeamMangement/Survey/Document/2?prev_completed=completed&state=created&bp_number=${bp_number.value}&rsp_survey_id=${rsp_survey_id.value}`
    );
  } else {
    router.push(
      `/SDTeamMangement/Survey/Document/2?prev_completed=notcompleted&state=created&bp_number=${bp_number.value}&rsp_survey_id=${rsp_survey_id.value}`
    );
  }
};
const later = async () => {
  await createRspActivitySkippedLog();
};
</script>
