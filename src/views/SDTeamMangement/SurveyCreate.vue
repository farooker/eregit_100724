<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container>
    <div style="margin-left: 150px; margin-right: 150px">
      <h2>Mangement > Survey</h2>
      <!-- <v-stepper
      v-model="stepper"
      alt-labels
      elevation="0"
      bg-color="transparent"
    >
      <v-stepper-header>
        <v-stepper-item
          value="1"
          color="secondary"
          class="text-secondary font-weight-medium"
          >ชื่อแบบสอบถาม</v-stepper-item
        >
        <v-divider></v-divider>
        <v-stepper-item
          value="2"
          color="secondary"
          class="text-secondary font-weight-medium"
          >คำถามเพิ่มเติม</v-stepper-item
        >
        <v-divider></v-divider>
        <v-stepper-item
          value="3"
          color="secondary"
          class="text-secondary font-weight-medium"
          >สร้างแบบสอบถาม</v-stepper-item
        >
        <v-divider></v-divider>
        <v-stepper-item
          value="4"
          color="secondary"
          class="text-secondary font-weight-medium"
          >สร้างเกณฑ์การประเมิน</v-stepper-item
        >
      </v-stepper-header>
    </v-stepper> -->
      <v-col color="12" style="margin-left: 150px; margin-top: 0px">
        <StepperControl
          :currentStepNumber="stepper"
          :titles="[
            'ชื่อแบบสอบถาม',
            'คำถามเพิ่มเติม',
            'สร้างแบบสอบถาม',
            'สร้างเกณฑ์การประเมิน',
          ]"
        />
      </v-col>
      <v-col cols="12" class="d-flex justify-end">
        <v-btn
          color="secondary"
          variant="outlined"
          width="140"
          class="text-capitalize mr-2"
          rounded
          @click="
            stepper === 2
              ? previewSecond()
              : stepper === 3
              ? previewThird()
              : null
          "
        >
          <v-icon left>mdi-tag</v-icon>
          Preview
        </v-btn>
        <v-btn color="secondary" width="140" class="text-capitalize" rounded>
          <v-icon left>mdi-tag</v-icon>
          Save Darft
        </v-btn>
      </v-col>
      <div v-show="stepper === 1">
        <v-row justify="end" class="mt-2 mb-2"> </v-row>
        <v-card class="elevation-1">
          <v-card-text>
            <v-form ref="form">
              <v-row no-gutters dense>
                <v-col>
                  <h4>ชื่อแบบสอบถาม</h4>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    variant="outlined"
                    placeholder="ชื่อแบบสอบถาม"
                    density="compact"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters dense>
                <v-col>
                  <h4>คำอธิบาย</h4>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    variant="outlined"
                    placeholder="คำอธิบาย"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </div>
      <div v-show="stepper === 2">
        <v-form ref="suveyOtherQuestion">
          <SuveyOtherQuestion @on-data-input="handleItemSuevayOhterUpdate" />
        </v-form>
      </div>
      <div v-show="stepper === 3">
        <SurveyQuestion
          ref="suveyQuestion"
          @on-data-input="handleItemSuevayQuestionUpdate"
        />
      </div>
      <div v-show="stepper === 4">
        <v-form ref="suveyScoreMgmt">
          <SuveyScoreManament />
        </v-form>
      </div>
      <div class="text-center mt-5">
        <v-btn
          rounded
          variant="outlined"
          class="ma-2"
          color="secondary"
          style="width: 100px"
          @click="back"
        >
          <strong>ย้อนกลับ</strong>
        </v-btn>
        <v-btn
          rounded
          class="ma-2"
          color="secondary"
          style="width: 100px"
          @click="next"
        >
          <strong>ต่อไป</strong>
        </v-btn>
      </div>
    </div>
  </v-container>
</template>
<script setup>
import StepperControl from "@/components/controls/StepperControl.vue";
import SurveyQuestion from "@/views/SDTeamMangement/Survey/SurveyQuestion.vue";
import SuveyOtherQuestion from "@/views/SDTeamMangement/Survey/SuveyOtherQuestion.vue";
import SuveyScoreManament from "@/views/SDTeamMangement/Survey/SuveyScoreManament.vue";
import { ref } from "vue";

import { useRouter } from "vue-router";
const router = useRouter();

const stepper = ref(1);

const suveyOtherQuestion = ref();
const suveyQuestion = ref();
const suveyScoreMgmt = ref();

const itemQuestion = ref([]);
const itemOtherQuest = ref([]);

const mock_step2 = {
   nameQuestionnaire : {
        title: "แบบสำรวจด้านความยังยืนคู่ค้า 2023",
        description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!",
    },
    createQuestionnaire :[
        {
          id: 3,
          index: 1,
          typeQuestionCard: "None",
          data: {
            controlType: "Paragraph",
            metaData: {
              question: "แบบสำรวจด้านความยังยืนคู่ค้า 2023",
              answer:"",
              isRequired: true,
            },
          },
        },
        {
          id: 3,
          index: 2,
          typeQuestionCard: "None",
          data: {
            controlType: "Multichoice",
            metaData: {
              question: "Multichoice",
              isRequired: true,
              answer :null,
              choices: [
                {
                  title: "chioce",
                  answer: "ตอบ-1",
                  nextQuestion: 1,
                },
                {
                  title: "chioce",
                  answer: "ตอบ-2",
                  nextQuestion: 3,
                },
                {
                  title: "other",
                  answer: "เพิมเติม",
                  specify :"",
                  nextQuestion: "",
                },
              ],
            },
          },
        },
        {
          id: 3,
          index: 3,
          typeQuestionCard: "None",
          data: {
            controlType: "Checkbox",
            metaData: {
              question: "Checkbox",
              isRequired: true,
              answer :[],
              choices: [
                {
                  title: "chioce",
                  answer: "ตอบ-1",
                },
                {
                  title: "chioce",
                  answer: "ตอบ-2",
                },
                {
                  title: "other",
                  answer: "เพิมเติม",
                  specify :""
                },
              ],
            },
          },
        },
        {
          id: 3,
          index: 4,
          typeQuestionCard: "None",
          data: {
            controlType: "Dropdown",
            metaData: {
              question: "Dropdown",
              isRequired: true,
              answer :null,
              choices: [
                {
                  answer: "item-1",
                  nextQuestion: 2,
                },
                {
                  answer: "item-2",
                  nextQuestion: 2,
                },
              ],
            },
          },
        },
        {
          id: 3,
          index: 5,
          typeQuestionCard: "None",
          data: {
            controlType: "Uploads",
            metaData: {
              question: "Uploads files",
              isRequired: true,
              files: null,
            },
          },
        },
      ]
}

const mock_preview_third = {
  nameQuestionnaire : {
        title: "แบบสำรวจด้านความยังยืนคู่ค้า 2023",
        description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!",
    },
  createQuestionnaire :[
          {
            id: "0",
            title: "header",
            data: [
              {
                id: "0",
                index: 1,
                typeQuestionCard: "Align",
                data: {
                  controlType: "Multichoice",
                  metaData: {
                    question: "Radio",
                    isRequired: true,
                    totalScore: 15,
                    answer: null,
                    choices: [
                      {
                        title: "chioce",
                        isAlign: true,
                        score: "10",
                        answer: "chioce-1",
                        nextQuestion: 2,
                      },
                      {
                        title: "chioce",
                        isAlign: false,
                        score: "15",
                        answer: "chioce-2",
                        nextQuestion: 2,
                      },
                      {
                        title: "other",
                        isAlign: true,
                        score: "10",
                        answer: "ระบุ",
                        specify :"",
                        nextQuestion: 2,
                      },
                    ],
                  },
                },
              },
              {
                id: "1",
                index: 2,
                typeQuestionCard: "None",
                data: {
                  controlType: "Paragraph",
                  metaData: {
                    question: "Paragraph",
                    answer: "",
                    isRequire: true,
                  },
                },
              },
              {
                id: "2",
                index: 3,
                typeQuestionCard: "Align",
                data: {
                  controlType: "Checkbox",
                  metaData: {
                    question: "Checkbox",
                    isRequired: true,
                    isAlign: true,
                    totalScore: 25,
                    answer :[],
                    choices: [
                      {
                        title: "chioce",
                        score: "10",
                        answer: "chioce-1",
                        isAlign: true,
                      },
                      {
                        title: "chioce",
                        score: "15",
                        answer: "chioce-2",
                        isAlign: false,
                      },
                      {
                        title: "other",
                        score: "15",
                        answer: "เพิมเติม",
                        specify :"",
                        isAlign: false,
                      },
                    ],
                  },
                },
              },
              {
                id: "3",
                index: 4,
                typeQuestionCard: "None",
                data: {
                  controlType: "Uploads",
                  metaData: {
                    question: "File",
                    isRequire: false,
                    files: null
                  },
                },
              },
            ],
          },
          {
            id: "1",
            title: "header+",
            data: [
              {
                id: "0",
                index: 1,
                typeQuestionCard: "Align",
                data: {
                  controlType: "Multichoice",
                  metaData: {
                    question: "Multichoice",
                    isRequired: false,
                    totalScore: 15,
                    answer : null,
                    choices: [
                      {
                        title: "chioce",
                        isAlign: true,
                        score: "15",
                        answer: "Multichoice",
                        nextQuestion: 2,
                      },
                      {
                        title: "other",
                        isAlign: false,
                        answer: "เพิมเติม",
                        specify :"",
                        nextQuestion: "",
                      },
                    ],
                  },
                },
              },
            ],
          },
        ]
}



const handleItemSuevayOhterUpdate = (data) => {
  itemOtherQuest.value = data;
};

const handleItemSuevayQuestionUpdate = (data) => {
  itemQuestion.value = data;
};

const next = () => {
  if (stepper.value < 4) stepper.value++;
};

const back = () => {
  if (stepper.value > 1) stepper.value--;
};
const previewSecond = () => {
  const jsonArray = JSON.stringify(mock_step2);
  sessionStorage.setItem("preview_question_second", jsonArray);
  router.push("/SDTeamMangement/Survey/Preview/QuestionSecond");
};
const previewThird = () => {
  const jsonArray = JSON.stringify(mock_preview_third);
  sessionStorage.setItem("preview_question_third", jsonArray);
  router.push("/SDTeamMangement/Survey/Preview/QuestionThird");
};
</script>
