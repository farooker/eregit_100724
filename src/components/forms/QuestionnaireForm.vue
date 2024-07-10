<template>
    <div v-for="(item, index) in Questionnaire" :key="index">
        <div v-if="item?.data?.controlType === 'Paragraph'" class="mt-2">
          <v-card elevation="1">
            <v-card-title>
              {{onIndex(index)}}.{{ item?.data?.metaData?.question }}
              <span v-if="item?.data?.metaData?.isRequired" class="text-red">*</span>
            </v-card-title>
            <v-card-text>
              <v-text-field
                  v-model ="item.data.metaData.answer"
                  density="compact"
                  variant="outlined">
                </v-text-field>
            </v-card-text>
          </v-card>
        </div>
        <div v-else-if="item?.data?.controlType === 'Multichoice'" class="mt-2">
          <v-card elevation="1">
            <v-card-title>
              {{onIndex(index)}}.{{ item?.data?.metaData?.question }}
              <span v-if="item?.data?.metaData?.isRequired" class="text-red">*</span>
            </v-card-title>
            <v-card-text class="pt-8">
              <v-radio-group v-model="item.data.metaData.answer">
                  <div v-for="(choice, i) in item?.data?.metaData?.choices"  :key="i">
                      <v-radio v-if="choice.title === 'other'" :value="choice.specify" class="mt-n2">
                          <template v-slot:label>
                            <div v-if="choice.title === 'other'" class="pa-1" >
                              <div class="d-flex flex-row  align-center">
                              <span> {{choice.answer}}</span>
                                <v-text-field
                                    v-model="choice.specify"
                                    style="max-width: 500px; min-width: 300px;"
                                    class="mt-5 ml-5"
                                    density="compact"
                                    @input="item.data.metaData.answer = choice.specify"
                                    variant="outlined">
                                  </v-text-field>
                              </div>
                            </div>
                            <div v-else class="pa-1">{{choice.answer}}</div>
                          </template>
                    </v-radio>
                    <v-radio v-else
                        :label="choice.answer"
                        :value="choice.answer">
                    </v-radio>
                  </div>

              </v-radio-group>
            </v-card-text>
          </v-card>
        </div>
        <div v-else-if="item?.data?.controlType === 'Checkbox'" class="mt-2">
          <v-card elevation="1">
            <v-card-title>
              {{onIndex(index)}}.{{ item?.data?.metaData?.question }}
              <span v-if="item?.data?.metaData?.isRequired" class="text-red">*</span>
            </v-card-title>
            <v-card-text class="pt-8">
              <div  v-for="(choice, i) in item?.data?.metaData?.choices"  :key="i">
                <v-checkbox v-model="item.data.metaData.answer" :value="choice.specify"
                    v-if="choice.title === 'other'" class="mt-n10">
                    <template v-slot:label>
                            <div class="d-flex flex-row  align-center">
                            <span> {{choice.answer}}</span>
                              <v-text-field
                                  v-model="choice.specify"
                                  style="max-width: 500px; min-width: 300px;"
                                  class="mt-5 ml-5"
                                  density="compact"
                                  @input="onCheckboxOther(item.data.metaData.choices,item.data.metaData.answer,choice.specify)"
                                  variant="outlined">
                                </v-text-field>
                            </div>
                    </template>
                  </v-checkbox>
                <v-checkbox
                  v-if="choice.title === 'chioce'"
                  v-model="item.data.metaData.answer"
                  class="mt-n10"
                  :label="choice.answer"
                  :value="choice.answer"
                ></v-checkbox>
              </div>
            </v-card-text>
          </v-card>
        </div>
        <div v-else-if="item?.data?.controlType === 'Dropdown'" class="mt-2">
          <v-card elevation="1">
            <v-card-title>
              {{onIndex(index)}}.{{ item.data.metaData.question }}
              <span v-if="item.data.metaData.isRequired" class="text-red">*</span>
            </v-card-title>
            <v-card-text class="pt-8">
              <v-select
                  v-model="item.data.metaData.answer"
                  variant="outlined"
                  :items="item.data.metaData.choices"
                  item-title="answer"
                  item-value=""></v-select>
            </v-card-text>
          </v-card>
        </div>
        <div v-else-if="item?.data?.controlType === 'Uploads'" class="mt-2">
          <v-card elevation="1">
            <v-card-title>
              {{onIndex(index)}}.{{ item.data.metaData.question }}
              <span v-if="item.data.metaData.isRequired" class="text-red">*</span>
            </v-card-title>
            <v-card-text class="pt-8">
              <Choosefile
                  descritption=""
                  @input-file="item.data.metaData.files = $event"
                  :is-file="item.data.metaData.files"
              />
            </v-card-text>
          </v-card>
        </div>
        <div v-else>None</div>
    </div>
</template>
<script setup>
import Choosefile from '@/components/forms/Choosefile'
// eslint-disable-next-line no-unused-vars
import { ref, onBeforeMount , computed } from 'vue';
const emit = defineEmits(["sections"]);
const props = defineProps({
  sections: {
    type: Array,
    default: ()=>[],
  }
});

const onIndex =(index) =>{
  return index +1
}
const onCheckboxOther = (choices,answer,value) =>{
  if(answer.length === 0){
    answer[0] = value;
   return;
  }
  const checked  =  Array.from(choices, (x) => x.title ==='other' ?   x.specify : x.answer)
  for (let i = 0; i < answer.length; i++) {
    const find = checked.find((element) => element === answer[i]);
    if(!find) {
      answer[i] = value;
      return;
    }
  }
  answer.push(value) ;
}
const Questionnaire = computed({
    get() {  return props.sections },
    set(val) { emit("sections", val) },
});

</script>

