<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container>
    <v-card-text>
      <ToolbarPreview />
    </v-card-text>
    <div class="text-center mt-5">
      <v-row>
        <v-col cols="8" class="d-flex">
          <h3>{{ convertNo(item_display?.id) }}.{{ item_display?.title }}</h3>
        </v-col>
        <v-col cols="4" class="d-flex justify-end">
          <v-btn color="secondary" variant="outlined" width="140" class="text-capitalize mr-2" rounded>
            <v-icon left>mdi-share</v-icon>
            ส่งต่อ
          </v-btn>
          <v-btn color="secondary" width="140" class="text-capitalize" rounded>
            <v-icon left>mdi-tag</v-icon>
            Save Darft
          </v-btn>
        </v-col>
      </v-row>

    </div>

    <div v-for="(item, index) in item_display?.data" :key="index">
      <div v-if="item?.data?.controlType === 'Paragraph'" class="mt-2">
        <v-card elevation="1">
          <v-card-title>
            {{ index + 1 }}.{{ item?.data?.metaData?.question }}
            <span v-if="item?.data?.metaData?.isRequired" class="text-red">*</span>
          </v-card-title>
          <v-card-text>
            {{ item?.data?.metaData?.answer }}
          </v-card-text>
        </v-card>
      </div>
      <div v-else-if="item?.data?.controlType === 'Multichoice'" class="mt-2">
        <v-card elevation="1">
          <v-card-title>
            {{ convertNo(index) }}.{{ item?.data?.metaData?.question }}
            <span v-if="item?.data?.metaData?.isRequired" class="text-red">*</span>
          </v-card-title>
          <v-card-text class="pt-8">
            <v-checkbox v-for="(answer, i) in item?.data?.metaData?.answers" :key="i" class="mt-n11"
              :label="answer.answer" :value="answer.answer"></v-checkbox>
          </v-card-text>
        </v-card>
      </div>
      <div v-else-if="item?.data?.controlType === 'Checkbox'" class="mt-2">
        <v-card elevation="1">
          <v-card-title>
            {{ convertNo(index) }}.{{ item?.data?.metaData?.question }}
            <span v-if="item?.data?.metaData?.isRequired" class="text-red">*</span>
          </v-card-title>
          <v-card-text class="pt-8">
            <v-radio-group>
              <v-radio v-for="(answer, i) in item?.data?.metaData?.answers" :key="i" :label="answer.answer"
                :value="answer.answer"></v-radio>
            </v-radio-group>
          </v-card-text>
        </v-card>
      </div>
      <div v-else-if="item?.data?.controlType === 'Dropdown'" class="mt-2">
        <v-card elevation="1">
          <v-card-title>
            {{ convertNo(index) }}.{{ item.data.metaData.question }}
            <span v-if="item.data.metaData.isRequired" class="text-red">*</span>
          </v-card-title>
          <v-card-text class="pt-8">
            <v-select variant="outlined" :items="item.data.metaData.answers" item-title="answer"
              item-value=""></v-select>
          </v-card-text>
        </v-card>
      </div>
      <div v-else-if="item?.data?.controlType === 'Uploads'" class="mt-2">
        <v-card elevation="1">
          <v-card-title>
            {{ convertNo(index) }}.{{ item.data.metaData.question }}
            <span v-if="item.data.metaData.isRequired" class="text-red">*</span>
          </v-card-title>
          <v-card-text class="pt-8">
            <Choosefile descritption="" />
          </v-card-text>
        </v-card>
      </div>
      <div v-else>None</div>
    </div>
    <v-row dense class="mt-5">
      <v-col cols="12" class="d-flex justify-center">
        <v-btn color="secondary" width="140" variant="outlined" class="text-capitalize ma-1" rounded @click="handleProv">
          ย้อนกลับ
        </v-btn>
        <v-btn v-if="convertNo(item_index) === items.length" color="secondary" width="140" class="text-capitalize ma-1" rounded @click="handleSendQuestion">
          ส่งแบบสอบถาม
        </v-btn>
        <v-btn v-else color="secondary" width="140" class="text-capitalize ma-1" rounded @click="handleNext">
          ต่อไป
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import Choosefile from '@/components/forms/Choosefile'
import ToolbarPreview from '@/components/items/ToolbarPreview.vue'
import { ref, onBeforeMount } from 'vue';

import { useConfirmationDialog } from '@/components/dialogs/ConfirmationDialogService'
const { showDialog } = useConfirmationDialog();

import { useAlertDialogDialog } from "@/components/dialogs/AlertSuccessDialogService";
const { showAlert } = useAlertDialogDialog();

const item_count = ref(0);
const item_index = ref(0)
const item_display = ref([]);
const items = ref([]);
onBeforeMount(() => {
  const survey_preview_third = sessionStorage.getItem("survey_preview_third");
  items.value = JSON.parse(survey_preview_third);
  item_count.value = items.value.length;
  item_index.value = 0;
  item_display.value = items.value[item_index.value]
});
const convertNo = (index) => {
  return Number(index) + 1
}

const handleProv =()=>{
  if(item_index.value  > 0){
   item_index.value = item_index.value  - 1 ;
   item_display.value = items.value[item_index.value]
  }
}
const handleNext =()=>{
  if(item_index.value < items.value.length){
   item_index.value = item_index.value  + 1 ;
   item_display.value = items.value[item_index.value]
  }
}
const handleSendQuestion = async () =>{
  const confirmed = await showDialog("ยืนยันการส่งแบบสอบถาม",'กรุณาตรวจสอบ\nคลิกปุ่ม"ตกลง"เพื่อดำเนินการ');
  if (confirmed) {
    // window.alert("Cancel");
    handleAlertSuccessfully();
  } else {
    window.alert("Cancel");
  }
}

const handleAlertSuccessfully = async () => {
  const confirmed = await showAlert(
    "ส่งแบบสอบถามเรียบร้อย",
    "ขอบคุณที่ให้ความร่วมมือในการทำแบบสอบถามคุณสามารถทราบคะแนนในหน้าถัดไป"
  );
  if (confirmed) {
    // router.push('/SDTeamMangement/RspPolicies');
  }
};
</script>
