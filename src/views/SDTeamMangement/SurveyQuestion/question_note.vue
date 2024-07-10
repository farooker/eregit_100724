<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container>
   <v-card-text>
      <ToolbarSurvey
      :step="stepper.index"
      :is-done="stepper.prevCompleted"
      @prev="stepperPrev"
      @next="stepperNext" />
    </v-card-text>
     <div class="mt-2">
        <v-card elevation="1" color="#FFF1F0">
          <v-card-title class="text-center text-secondary">
            {{ questionTile.title}}
          </v-card-title>
          <v-card-text class="text-secondary">
            {{ questionTile.description }}
          </v-card-text>
        </v-card>
      </div>
    <div v-for="(item, index) in questionSections" :key="index">
        <section v-if="item?.data?.controlType === types.paragraph" class="mt-2">
          <v-card elevation="1"
                  color="item.disabled ? 'grey-lighten-1': ''"
                  :disabled="item.disabled"
                  :variant="item.disabled ? 'tonal':'elevated'">
            <v-card-title>
              {{index+1}}.{{ item?.data?.metaData?.question }}
              <span v-if="item?.data?.metaData?.isRequired" class="text-red">*</span>
            </v-card-title>
            <v-card-text>
              <v-text-field
                  v-model ="item.data.metaData.answer"
                  @input="onParagraphChanged(item.index,item.data.metaData.nextQuestionId,item.data.metaData.answer)"
                  density="compact"
                  variant="outlined">
                </v-text-field>
            </v-card-text>
          </v-card>
        </section>
        <section v-else-if="item?.data?.controlType === types.multichoice" class="mt-2">
          <v-card elevation="1"
          :color="item.disabled ? 'grey-lighten-1': ''"
          :disabled="item.disabled"
          :variant="item.disabled ? 'tonal':'elevated'">
            <v-card-title>
              {{number(index)}}.{{ item?.data?.metaData?.question }}
              <span v-if="item?.data?.metaData?.isRequired" class="text-red">*</span>
            </v-card-title>
            <v-card-text class="pt-8">
              <v-radio-group v-model="item.data.metaData.answer" @input="onRadioChanged(item.index,item?.data?.metaData?.choices,item.data.metaData.answer)">
                  <div v-for="(choice, i) in item.data.metaData.choices"  :key="i">
                      <v-radio :value="choice.id" class="mt-n2">
                          <template v-slot:label>
                            <div v-if="choice.title === isOther" class="pa-1" >
                              <div class="d-flex flex-row  align-center">
                              <span> {{choice.answer}}</span>
                                <v-text-field
                                    v-model="choice.specify"
                                    style="max-width: 500px; min-width: 300px;"
                                    class="mt-5 ml-5"
                                    density="compact"
                                    @input="item.data.metaData.answer = choice.id"
                                    variant="outlined">
                                  </v-text-field>
                              </div>
                            </div>
                            <div v-else class="pa-1">{{choice.answer}}</div>
                          </template>
                    </v-radio>
                    <!-- <v-radio v-else
                        :label="choice.answer"
                        :value="choice.id">
                    </v-radio> -->
                  </div>
              </v-radio-group>
            </v-card-text>
          </v-card>
        </section>
        <section v-else-if="item?.data?.controlType === types.checkbox" class="mt-2">
          <v-card elevation="1"
          :color="item.disabled ? 'grey-lighten-1': ''"
          :disabled="item.disabled"
           :variant="item.disabled ? 'tonal':'elevated'">
            <v-card-title>
              {{number(index)}}.{{ item?.data?.metaData?.question }}
              <span v-if="item?.data?.metaData?.isRequired" class="text-red">*</span>
            </v-card-title>
            <v-card-text class="pt-8">
              <div  v-for="(choice, i) in item?.data?.metaData?.choices"  :key="i">
                <v-checkbox  class="mt-n10"
                            v-model="item.data.metaData.answer"
                            :label="choice.answer"
                            :value="choice.id"
                            @input="onCheckboxChanged(item.index,choice,item.data.metaData.answer)"
                        >
                    <template  v-if="choice.title === isOther" v-slot:label>
                            <div class="d-flex flex-row  align-center">
                            <span> {{choice.answer}}</span>
                              <v-text-field
                                  v-model="choice.specify"
                                  style="max-width: 500px; min-width: 300px;"
                                  class="mt-5 ml-5"
                                  density="compact"
                                  variant="outlined"
                                  @input="onCheckboxInputChanged(item.data.metaData.answer,choice.id)"
                                  >
                                </v-text-field>
                                <!-- @input="onCheckboxOther(item.data.metaData.choices,item.data.metaData.answer,choice.specify)" -->
                            </div>
                    </template>
                  </v-checkbox>
                <!-- <v-checkbox
                  v-if="choice.title === 'chioce'"
                  v-model="item.data.metaData.answer"
                  class="mt-n10"
                  :label="choice.answer"
                  :value="choice.id"
                  @input="onCheckboxChanged(choice,item.data.metaData.answer)"
                  ></v-checkbox> -->
              </div>
            </v-card-text>
          </v-card>
        </section>
        <section v-else-if="item?.data?.controlType === types.dropdown" class="mt-2">
          <v-card elevation="1"
          :color="item.disabled ? 'grey-lighten-1': ''"
          :disabled="item.disabled"
          :variant="item.disabled ? 'tonal':'elevated'">
            <v-card-title>
              {{number(index)}}.{{ item.data.metaData.question }}
              <span v-if="item.data.metaData.isRequired" class="text-red">*</span>
            </v-card-title>
            <v-card-text class="pt-8">
              <v-select
                  v-model="item.data.metaData.answer"
                  variant="outlined"
                  :items="item.data.metaData.choices"
                  item-title="answer"
                  @update:modelValue="onDropdownChanged(item.index,item.data.metaData.choices,item.data.metaData.answer)"
                  item-value="id"></v-select>
            </v-card-text>
          </v-card>
        </section>
        <section v-else-if="item?.data?.controlType === types.uploads" class="mt-2">
          <v-card elevation="1"
          :color="item.disabled ? 'grey-lighten-1': ''"
          :disabled="item.disabled"   :variant="item.disabled ? 'tonal':'elevated'">
            <v-card-title>
              {{number(index)}}.{{ item.data.metaData.question }}
              <span v-if="item.data.metaData.isRequired" class="text-red">*</span>
            </v-card-title>
            <v-card-text class="pt-8">
              <Choosefile
                  descritption=""
                  @input-file="onUploads(item.index,item.data.metaData,$event)"
                  :is-file="item.data.metaData.files"
              />
            </v-card-text>
          </v-card>
        </section>
        <section v-else>None</section>
    </div>
    <v-row dense class="mt-5">
    <v-col cols="12" class="d-flex justify-center">
      <v-btn color="secondary" width="140" class="text-capitalize" rounded @click="handleConfirmCreated">
          <v-icon left>mdi-tag</v-icon>
           เริ่ม
        </v-btn>
    </v-col>
  </v-row>
  </v-container>
</template>
<script setup>
import Choosefile from '@/components/forms/Choosefile'
import RspService from '@/apis/RspService';
import ToolbarSurvey from '@/components/items/ToolbarSurvey.vue'
import { useErrorHandlingDialog } from '@/components/dialogs/ExceptionHandleDialogService'
import { useConfirmationDialog } from '@/components/dialogs/ConfirmationDialogService'
import { ref, onBeforeMount } from 'vue';


const { handlingErrorsMessage } = useErrorHandlingDialog();
const { showDialog } = useConfirmationDialog();

import { useRouter } from "vue-router";
const router = useRouter();

const stepper = ref({
  index : 3,
  prevCompleted : true
});
const isOther = 'other';
const types =ref({
  paragraph : 'Paragraph',
  multichoice : 'Multichoice',
  checkbox : 'Checkbox',
  dropdown : 'Dropdown',
  uploads : 'Uploads',
});


const questionSections = ref([]);
const questionTile = ref({});
const state = ref(null);
const bp_number = ref(null);
const rsp_survey_id = ref(null);



onBeforeMount(() => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  state.value = urlParams.get('state')
  bp_number.value = urlParams.get('bp_number')
  rsp_survey_id.value = urlParams.get('rsp_survey_id')



  const formQuestion = sessionStorage.getItem("questionnaire2");
  const question =  JSON.parse(formQuestion);
  // console.log(question)
  questionTile.value = question.nameQuestionnaire
  questionSections.value = question.createQuestionnaire;

  const nextQuestionId = [];
  questionSections.value.forEach(item => {
    // console.log(item.disabled)
    switch(item.data.controlType){
      case 'Paragraph' :
      nextQuestionId.push(item.data.metaData.nextQuestionId)
           //console.log(item.data.metaData.nextQuestionId)
      break;
      case 'Multichoice' :
          //console.log(Array.from(item.data.metaData.choices, (x) => x.nextQuestionId))
          nextQuestionId.push(...Array.from(item.data.metaData.choices, (x) => x.nextQuestionId))
      break
      case 'Checkbox' :
          //console.log(Array.from(item.data.metaData.choices, (x) => x.nextQuestionId))
          nextQuestionId.push(...Array.from(item.data.metaData.choices, (x) => x.nextQuestionId))
      break
      case 'Dropdown' :
          //console.log(Array.from(item.data.metaData.choices, (x) => x.nextQuestionId))
          nextQuestionId.push(...Array.from(item.data.metaData.choices, (x) => x.nextQuestionId))
      break
      case 'Uploads' :
      nextQuestionId.push(item.data.metaData.nextQuestionId)
          //console.log(item.data.metaData.nextQuestionId)
      break
    }
  });
  for (let index = 0; index < nextQuestionId.length; index++) {
    if(nextQuestionId[index] !== 0){
      const nextId = nextQuestionId[index];
      //console.log(nextQuestionId[index])
       questionSections.value.forEach(item => {
        if(item.id === nextId){
          item.disabled = true;
         }
       });

    }
  }

  console.log(questionSections.value)
});

const number =(index) =>{
  return index +1
}
const onParagraphChanged=(index,nextId,val)=>{
  if(nextId !== 0){
    if(val.length > 0){
      isDisabled(index,nextId,false)
    }else{
      isDisabled(index,nextId,true)
    }
  }
}
// eslint-disable-next-line no-unused-vars
const onRadioChanged=(index,choices,val)=>{

  const  opened = ()=>{
    const selected = choices.find(_=>_.id === val);
    if(selected.nextQuestionId !== 0 && selected.nextQuestionId !== undefined){
      isDisabled(index,selected.nextQuestionId,false)
      return  selected.nextQuestionId;
    }
    return selected.nextQuestionId
  }
  const closed =(nextId)=>{
    const close =  choices.filter(_=>_.nextQuestionId !== nextId && _.nextQuestionId !== 0);
    if(close.length){
        close.forEach(item => {
          isDisabled(index,item.nextQuestionId,true)
        });
    }
  }

  const actionNextId =  opened()
  if(actionNextId !== undefined){
    closed(actionNextId)
  }


}
// eslint-disable-next-line no-unused-vars
const onCheckboxChanged=(index,selected,val)=>{
  const checked = val.includes(selected.id)
  if(checked){
    isDisabled(index,selected.nextQuestionId,false)
    return;
  }
  isDisabled(index,selected.nextQuestionId,true)
}
const onCheckboxInputChanged=(checked,val)=>{
  const index = checked.findIndex((i) => i === val);
  if(index === -1){
    checked.push(val)
    return;
  }
  checked[index] =  val;
}
// eslint-disable-next-line no-unused-vars
const onDropdownChanged=(index,choices,val)=>{

  choices.forEach(selected => {
    if(selected.id === val){
      isDisabled(index,selected.nextQuestionId,false)
    }else{
      if(selected.nextQuestionId !== 0){
        isDisabled(index,selected.nextQuestionId,true)
      }
    }

  });
}
const onUploads = (index,metaData,file)=>{
  metaData.files = file
  console.log(metaData.nextQuestionId)
  if(metaData.nextQuestionId !== 0){
    isDisabled(index,metaData.nextQuestionId,true)
  }
}


// eslint-disable-next-line no-unused-vars
const isDisabled = (index,nextQuestionId,disabled)=>{

  const questionVisible = (nextId,nextIndex)=>{
  questionSections.value.forEach(item => {
       if(item.id === nextId && item.index == nextIndex){
        item.disabled = disabled;
       }
    })
  }

  const  questionIndex = (afterIndex)=>{
    questionSections.value.forEach(item => {
      const actived = afterIndex.includes(item.index)
      if(actived){
        questionVisible(nextQuestionId,item.index)
      }
    });
  }


 const indexAll =  Array.from(questionSections.value, (x) => x.index);
 let resultIndex = indexAll.indexOf(index);
 let newIndex = indexAll.slice(resultIndex + 1);
 questionIndex(newIndex)

}
















const formatAnswers = async () =>{
      const question =questionSections.value;
      const  answers = []
      for (let i = 0; i < question.length; i++) {
        switch(question[i].data.controlType){
          case 'Paragraph' :
          answers.push({
            question_id: question[i].id,
            answer: question[i].data.metaData.answer
          })
          break;
          case 'Multichoice' :
          answers.push({
            question_id: question[i].id,
            answer: question[i].data.metaData.answer
          })
          break;
          case 'Checkbox' : {
              const checkboxs =   question[i].data.metaData.answer;
              if(checkboxs.length === 0){
                answers.push({
                      question_id: question[i].id,
                      answer: null
                })
              }else{
                checkboxs.forEach(item => {
                answers.push({
                        question_id: question[i].id,
                        answer: item
                    })
                });
              }
          }
          break;
          case 'Dropdown' :
            answers.push({
              question_id: question[i].id,
              answer: question[i].data.metaData.answer
            })
          break;
          case 'Uploads' :{
            const file =  question[i].data.metaData.files;
            answers.push({
                question_id: question[i].id,
                answer: (file) ? await getBase64(file) : null,
            })
          }
          break;
        }
      }
    return answers;

}
const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

const handleConfirmCreated = async () => {
    const confirmed = await showDialog('ยืนยันการการส่งแบบสอบถาม', 'กรุณาตรวจสอบคลิกปุ่ม "ตกลง" เพื่อดำเนินการ');
    if (confirmed) {
        // eslint-disable-next-line no-unused-vars
        const answersFormat = await formatAnswers();
        switch(state.value){
          case  "created" :
          handleCreatedSurveyAnswer(answersFormat)
          break;
          case  "updated" :
          handleUpdatedSurveyAnswer(answersFormat)
          break;
    }

  }
};

// eslint-disable-next-line no-unused-vars
const handleCreatedSurveyAnswer = async (answers) => {
  try {
    console.log("created")
    const response =  await RspService.createRspSurveyAnswer(3,answers)
    console.log(response)
  }
  catch (e) {
      if (e.response) {
        const val = e.response.data
        handlingErrorsMessage(val.message, val?.data.error);
        return;
      }
      handlingErrorsMessage("unknown", e.message);
    }
};
// eslint-disable-next-line no-unused-vars
const handleUpdatedSurveyAnswer = async (answers) => {
  try {
    console.log("updated")
    handleUpdatedSurveyResult();
  }
  catch (e) {
      if (e.response) {
        const val = e.response.data
        handlingErrorsMessage(val.message, val?.data.error);
        return;
      }
      handlingErrorsMessage("unknown", e.message);
    }
};

// eslint-disable-next-line no-unused-vars
const handleUpdatedSurveyResult = async () => {
  const payload = {
      bp_number: bp_number.value,
      rsp_survey_id: rsp_survey_id.value,
      rsp_activity_status_id: 1,
      inprogress_section_id: 1,
    }
    console.log(payload)

  // try {
  //   // eslint-disable-next-line no-unused-vars
  //   const response = await RspService.updateRspSurveyResult();
  // }
  // catch (e) {
  //     if (e.response) {
  //       const val = e.response.data
  //       handlingErrorsMessage(val.message, val?.data.error);
  //       return;
  //     }
  //     handlingErrorsMessage("unknown", e.message);
  //   }
};
const  stepperPrev = () => {
  console.log('prev')
  router.push("/SDTeamMangement/Survey/Document/1?prev_completed=completed&state=created&bp_number=11&&rsp_survey_id=11");
}
const  stepperNext = ()=>  {
  console.log("next")
}
</script>

