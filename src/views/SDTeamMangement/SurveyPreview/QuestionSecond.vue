<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container>
   <v-card-text>
    <ToolbarSurvey
      :step="stepper.index"
      :is-done="stepper.prevCompleted"
      />
    </v-card-text>
     <div class="mt-2">
        <v-card elevation="1" color="#FFF1F0">
          <v-card-title class="text-center text-secondary">
            {{ questionnaireName?.title}}
          </v-card-title>
          <v-card-text class="text-secondary">
            {{ questionnaireName?.description }}
          </v-card-text>
        </v-card>
      </div>
      <div class="preview-questionnaire">
         <QuestionnaireForm  :sections ="questionnaireForm"/>
      </div>
  </v-container>
</template>
<script setup>
import ToolbarSurvey from '@/components/items/ToolbarSurvey.vue'
import QuestionnaireForm from '@/components/forms/QuestionnaireForm.vue'
import { ref, onBeforeMount } from 'vue';

const questionnaireName = ref({});
const questionnaireForm = ref([]);

const stepper = ref({
  index : 3,
  prevCompleted : false
});
onBeforeMount(() => {
  const info = sessionStorage.getItem("preview_question_second");
  const preview =  JSON.parse(info);
  questionnaireName.value = preview.nameQuestionnaire
  questionnaireForm.value = preview.createQuestionnaire
});



</script>
