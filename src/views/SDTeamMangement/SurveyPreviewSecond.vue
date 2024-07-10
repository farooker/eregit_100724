<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container>
   <v-card-text>
      <ToolbarPreview />
    </v-card-text>
    <div class="text-center mt-5">
      <v-col cols="12" class="d-flex justify-end">
        <v-btn color="secondary" variant="outlined" width="140" class="text-capitalize mr-2" rounded>
          <v-icon left>mdi-share</v-icon>
          ส่งต่อ
        </v-btn>
        <v-btn color="secondary" width="140" class="text-capitalize" rounded>
          <v-icon left>mdi-tag</v-icon>
          Save Darft
        </v-btn>
      </v-col>
    </div>
     <div class="mt-2">
        <v-card elevation="1" color="#FFF1F0">
          <v-card-title class="text-center text-secondary">
            {{items.first.title}}
          </v-card-title>
          <v-card-text class="text-secondary">
            {{ items.first.description }}
          </v-card-text>
        </v-card>
      </div>
    <div v-for="(item, index) in items.second" :key="index">
      <div v-if="item?.data?.controlType === 'Paragraph'" class="mt-2">
        <v-card elevation="1">
          <v-card-title>
            {{index+1}}.{{ item?.data?.metaData?.question }}
            <span v-if="item?.data?.metaData?.isRequired" class="text-red">*</span>
          </v-card-title>
          <v-card-text>
          {{item?.data?.metaData?.answer}}
            <v-text-field
                density="compact"
                variant="outlined">
              </v-text-field>
          </v-card-text>
        </v-card>
      </div>
      <div v-else-if="item?.data?.controlType === 'Multichoice'" class="mt-2">
        <v-card elevation="1">
          <v-card-title>
            {{convertNo(index)}}.{{ item?.data?.metaData?.question }}
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
            {{convertNo(index)}}.{{ item?.data?.metaData?.question }}
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
            {{convertNo(index)}}.{{ item.data.metaData.question }}
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
            {{convertNo(index)}}.{{ item.data.metaData.question }}
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
      <v-btn color="secondary" width="140" class="text-capitalize" rounded>
          <v-icon left>mdi-tag</v-icon>
           เริ่ม
        </v-btn>
    </v-col>
  </v-row>
  </v-container>
</template>
<script setup>
import Choosefile from '@/components/forms/Choosefile'
import ToolbarPreview from '@/components/items/ToolbarPreview.vue'
import { ref, onBeforeMount } from 'vue';

const items = ref([]);
onBeforeMount(() => {
  const step2_surveys = sessionStorage.getItem("survey_preview");
  items.value = JSON.parse(step2_surveys);
});
const convertNo =(index) =>{
  return index +1
}

</script>
