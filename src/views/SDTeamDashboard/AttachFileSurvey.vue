<template>
  <v-container fluid>
    <h2>Attach file survey</h2>
    <v-progress-linear class="rounded-pill" :indeterminate="loading" bg-color="transparent"  color="secondary" />
    <v-card elevation="2" rounded="0" class="rounded-lg mt-3 pa-0">
      <v-row no-gutters dense justify="space-around" v-for="(i, index) in items" :key="index">
        <v-col cols="1" align-self="center" class="pa-1">
          <div class="text-center">
            <v-chip color="secondary">
              {{i.type}}
            </v-chip>
          </div>
        </v-col>
        <v-col cols="4" align-self="center" class="pa-1">
          <strong>{{i.name}}</strong>
        </v-col>
        <v-col cols="1" align-self="center" class="pa-1">
          <strong>{{i.size}} MB</strong>
        </v-col>
        <v-col cols="4" align-self="center" class="pa-1">
          <v-list-item lines="one">
            <v-list-item-title class="font-weight-black text-secondary">{{i.uploaded_email}}</v-list-item-title>
            <v-list-item-subtitle class="font-weight-medium text-black">{{ dateUtils.parseDdMmYyWithTimeAndSeconds(i.uploaded_at)}}</v-list-item-subtitle>
            <template v-slot:prepend>
              <v-avatar color="#E8D5F9">
                <span class="font-weight-black" style="color: #7D31B9;">SP</span>
              </v-avatar>
            </template>
          </v-list-item>
        </v-col>
        <v-col cols="2" align-self="center">
          <div class="text-center">
            <v-btn color="" variant="outlined" rounded size="small" @click="handleExport(i.name,i.type,i.url)">
              <v-icon left>mdi-tray-arrow-down</v-icon>
              Download
            </v-btn>
          </div>

        </v-col>
        <v-col cols="12" align-self="center">
          <v-divider></v-divider>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script setup>
/*eslint-disable no-unused-vars  */
import { ref, onBeforeMount, onMounted } from 'vue';
import rspService from '@/apis/RspService';
import exportService from '@/apis/ExportService';
import dateUtils from '@/utils/dateUtils';
import { useErrorHandlingDialog } from '@/components/dialogs/ExceptionHandleDialogService'
const { handlingErrorsMessage } = useErrorHandlingDialog();

const items = ref([]);
const loading = ref(false);

onMounted(() => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const bp_number = urlParams.get('bp_number');
  const rsp_suvery_id = urlParams.get('rsp_suvery_id');
  getRspSurveyResultDocument(bp_number,rsp_suvery_id);
});


const getRspSurveyResultDocument = async (bp_number,rsp_suvery_id) => {
  try {
    loading.value = true;
    const response = await rspService.getRspSurveyResultDocument(bp_number,rsp_suvery_id);
    if (response.data?.is_success) {
      items.value= response.data?.data?.file
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  } finally {
    loading.value = false;
  }
}

const handleExport =async (name,type,url)=>{
  try {
     await exportService.exportBase64(name,type,url);
  } catch (e) {

    handlingErrorsMessage("unknown", e.message);
  }
}

</script>

