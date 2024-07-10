<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container fluid>
    <h2>Documents</h2>
    <v-row>
      <v-col :cols="tab === 1 ? 12 : 10">
        <v-tabs v-model="tab" color="secondary">
          <v-tab
            v-for="(tabs, index) in menus"
            :key="index"
            class="text-capitalize"
          >
            {{ tabs.title }}
          </v-tab>
        </v-tabs>
      </v-col>
      <v-col v-if="tab != 1" cols="2">
        <v-btn
          class="me-2 text-none"
          block
          color="secondary"
          variant="flat"
          rounded
          @click="getExportRspPolicyByVendor()"
        >
          <v-icon left class="mr-3">mdi-text-box-check</v-icon>
          Export report
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-progress-linear
          class="rounded-pill"
          :indeterminate="loading"
          bg-color="transparent"
          color="secondary"
        />
      </v-col>
    </v-row>
    <v-tabs-items>
      <v-tab-item>
        <v-card
          elevation="2"
          rounded="0"
          class="rounded-lg mt-3"
          v-for="(i, index) in items"
          :key="index"
        >
          <v-card-item class="ma-0">
            <v-row v-if="tab === 1" no-gutters dense justify="space-around">
              <v-col cols="1" align-self="center" class="pa-1">
                <v-icon color="secondary" size="40" class="ml-3 mr-3"
                  >mdi-text-box-check</v-icon
                >
              </v-col>
              <v-col cols="4" align-self="center" class="pa-1">
                <strong>
                  {{ i.rsp_survey?.name.split('<br>')[0] }}
                </strong>
                <strong class="text-grey">
                  ({{ i.rsp_survey?.version }})
                </strong>
              </v-col>
              <v-divider vertical class="ma-2"></v-divider>
              <v-col cols="3" align-self="center" class="pa-1">
                <strong>Complated by</strong>
                <br />
                <strong class="text-secondary">{{
                  i.updated_user_id.email
                }}</strong>
                <strong class=""
                  >:
                  {{
                    i.updated_at
                      ? dateUtils.parseDdMmYyWithTimeAndSeconds(i.updated_at)
                      : "-"
                  }}</strong
                >
              </v-col>
              <v-col v-if="tab === 1" cols="3" align-self="center" class="pa-1">
                <v-btn
                  class="me-2 text-none"
                  color="secondary"
                  :to="`/SDTeamDashboard/AttachFileSurvey?bp_number=${i.bp_number}&rsp_suvery_id=${i.rsp_survey?.id}`"
                  variant="outlined"
                  rounded
                >
                  Attach File Survey
                </v-btn>
                <v-btn
                  class="me-2 text-none"
                  color="secondary"
                  variant="flat"
                  rounded
                  @click="getExportRspSurveyByVendor(i?.rsp_survey?.id, bp_number)"
                >
                  Export Result
                </v-btn>
              </v-col>
            </v-row>
            <v-row v-else no-gutters dense justify="space-around">
              <v-col cols="1" align-self="center" class="pa-1">
                <v-icon color="secondary" size="40" class="ml-3 mr-3"
                  >mdi-text-box-check</v-icon
                >
              </v-col>
              <v-col cols="4" align-self="center" class="pa-1">
                <strong>
                  {{ i.rsp_policy?.name }}
                </strong>
                <strong class="text-grey">
                  ({{ i.rsp_policy?.version }})
                </strong>
              </v-col>
              <v-divider vertical class="ma-2"></v-divider>
              <v-col cols="6" align-self="center" class="pa-1">
                <strong>Complated by</strong>
                <br />
                <strong class="text-secondary">{{ i.updated_user.email }}</strong>
                <strong class=""
                  >:
                  {{
                    dateUtils.parseDdMmYyWithTimeAndSeconds(i.updated_at)
                  }}</strong
                >
              </v-col>
            </v-row>
          </v-card-item>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>
<script setup>
/*eslint-disable no-unused-vars  */
import { ref, onBeforeMount, onMounted, watch } from "vue";
import rspService from "@/apis/RspService";
import exportService from "@/apis/ExportService";
import dateUtils from "@/utils/dateUtils";
import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
const { handlingErrorsMessage } = useErrorHandlingDialog();

const tab = ref(0);
const menus = ref([]);
const items = ref([]);
const loading = ref(false);
const bp_number = ref(null);

watch(tab, (newValue) => {
  switch (newValue) {
    case 0:
      items.value = [];
      getRspPolicyResults(bp_number.value);
      break;

    case 1:
      items.value = [];
      getRspSurveyResults(bp_number.value);
      break;
  }
});
onBeforeMount(() => {
  menus.value = [
    { title: "RSP Policy", icon: "mdi-account-outline" },
    { title: "Survey", icon: "mdi-link-variant" },
  ];
});
onMounted(() => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  bp_number.value = urlParams.get("bp_number");

  getRspPolicyResults(bp_number.value);
});

const getRspPolicyResults = async (bp_number) => {
  try {
    loading.value = true;
    const response = await rspService.getRspPolicyResults(bp_number);
    if (response.data?.is_success) {
      items.value = response.data?.data;
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
const getRspSurveyResults = async (bp_number) => {
  try {
    loading.value = true;
    const response = await rspService.getRspSurveyResults(bp_number);
    if (response.data?.is_success) {
      items.value = response.data?.data;
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

const getExportRspPolicyByVendor = async () => {
  try {
    const response = await rspService.getExportRspPolicyByVendor(
      bp_number.value
    );
    if (response.data?.is_success) {
      const file_url = response.data?.data?.file_url;
      if (file_url && file_url != "") {
        const spl = file_url.split(".");
        await exportService.exportBase64(
          `policy-${bp_number.value}`,
          spl[spl.length - 1],
          file_url
        );
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
const getExportRspSurveyByVendor = async (rsp_survey_id, bp_number) => {
  try {
    const response = await rspService.getExportRspSurveyByVendor(
      rsp_survey_id,
      bp_number
    );
    if (response.data?.is_success) {
      const file_url = response.data?.data?.file_url;
      if (file_url && file_url != "") {
        const spl = file_url.split(".");
        await exportService.exportBase64(
          `survey-${rsp_survey_id}`,
          spl[spl.length - 1],
          file_url
        );
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
</script>
