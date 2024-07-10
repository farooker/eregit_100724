<template>
  <div v-for="(item, index) in questionSections" :key="index">
    <section v-if="item?.data?.controlType === types.paragraph" class="mt-2">
      <v-card
        elevation="1"
        v-show="!item.disabled"
        :color="item.disabled ? 'grey-lighten-1' : ''"
        :disabled="item.disabled"
        :variant="item.disabled ? 'tonal' : 'elevated'"
      >
        <p class="pa-2">
          {{ item?.data?.metaData?.question }}
          <span v-if="item?.data?.metaData?.isRequired" class="text-red"
            >*</span
          >
        </p>
        <v-card-text>
          <v-text-field
            v-model="item.data.metaData.answer"
            @input="
              onParagraphChanged(
                item.index,
                item.data.metaData.nextQuestionId,
                item.data.metaData.answer
              )
            "
            density="compact"
            :rules="
              item?.data?.metaData?.isRequired && !item.disabled
                ? rules.paragraph
                : ''
            "
            variant="outlined"
          >
          </v-text-field>
        </v-card-text>
      </v-card>
    </section>
    <section
      v-else-if="item?.data?.controlType === types.multichoice"
      class="mt-2"
    >
      <v-card
        elevation="1"
        v-show="!item.disabled"
        :color="item.disabled ? 'grey-lighten-1' : ''"
        :disabled="item.disabled"
        :variant="item.disabled ? 'tonal' : 'elevated'"
      >
        <p class="pa-2">
          {{ item?.data?.metaData?.question }}
          <span v-if="item?.data?.metaData?.isRequired" class="text-red"
            >*</span
          >
        </p>
        <v-card-text class="pt-8">
          <v-radio-group
            v-model="item.data.metaData.answer"
            :rules="
              item?.data?.metaData?.isRequired && !item.disabled
                ? rules.radio
                : ''
            "
            @input="
              onRadioChanged(
                item.index,
                item?.data?.metaData?.choices,
                item.data.metaData.answer
              )
            "
          >
            <div v-for="(choice, i) in item.data.metaData.choices" :key="i">
              <v-radio :value="choice.id" class="mt-n2">
                <template v-slot:label>
                  <div v-if="choice.title === isOther" class="pa-1">
                    <div class="d-flex flex-row align-center">
                      <p>{{ choice.answer }}</p>
                      <v-text-field
                        v-model="choice.specify"
                        style="max-width: 500px; min-width: 300px"
                        class="mt-5 ml-5"
                        density="compact"
                        @input="item.data.metaData.answer = choice.id"
                        variant="outlined"
                      >
                      </v-text-field>
                    </div>
                  </div>
                  <div v-else class="pa-1">{{ choice.answer }}</div>
                </template>
              </v-radio>
            </div>
          </v-radio-group>
        </v-card-text>
      </v-card>
    </section>
    <section
      v-else-if="item?.data?.controlType === types.checkbox"
      class="mt-2"
    >
      <v-card
        elevation="1"
        v-show="!item.disabled"
        :color="item.disabled ? 'grey-lighten-1' : ''"
        :disabled="item.disabled"
        :variant="item.disabled ? 'tonal' : 'elevated'"
      >
        <p class="pa-2">
          {{ item?.data?.metaData?.question }}
          <span v-if="item?.data?.metaData?.isRequired" class="text-red"
            >*</span
          >
        </p>
        <v-card-text class="pt-8">
          <div v-for="(choice, i) in item?.data?.metaData?.choices" :key="i">
            <!-- {{ item.data.metaData.answer }} -->
            <v-checkbox
              class="mt-n1"
              v-model="item.data.metaData.answer"
              :label="choice.answer"
              :value="choice.id"
              multiple
              :rules="
                item?.data?.metaData?.isRequired &&
                !item.disabled &&
                i == item?.data?.metaData?.choices.length - 1
                  ? rules.checked
                  : ''
              "
              @input="
                onCheckboxChanged(
                  item.index,
                  choice,
                  item.data.metaData.answer,
                  item?.data?.metaData?.choices
                )
              "
            >
              <template v-if="choice.title === isOther" v-slot:label>
                <div class="d-flex flex-row align-center">
                  <p>{{ choice.answer }}</p>
                  <v-text-field
                    v-model="choice.specify"
                    style="max-width: 500px; min-width: 300px"
                    class="mt-5 ml-5"
                    density="compact"
                    variant="outlined"
                    @input="
                      onCheckboxInputChanged(
                        item.data.metaData.answer,
                        choice.id
                      )
                    "
                  >
                  </v-text-field>
                </div>
              </template>
            </v-checkbox>

            <!-- <v-checkbox
              v-else
              class="mt-n1"
              v-model="item.data.metaData.answer"
              :label="choice.answer"
              :value="choice.id"
              multiple
              @input="
                onCheckboxChanged(
                  item.index,
                  choice,
                  item.data.metaData.answer,
                  item?.data?.metaData?.choices
                )
              "
            >
              <template v-if="choice.title === isOther" v-slot:label>
                <div class="d-flex flex-row align-center">
                  <p>{{ choice.answer }}</p>
                  <v-text-field
                    v-model="choice.specify"
                    style="max-width: 500px; min-width: 300px"
                    class="mt-5 ml-5"
                    density="compact"
                    variant="outlined"
                    @input="
                      onCheckboxInputChanged(
                        item.data.metaData.answer,
                        choice.id
                      )
                    "
                  >
                  </v-text-field>
                </div>
              </template>
            </v-checkbox> -->

            <!--
            <v-checkbox
              v-else
              class="mt-n1"
              v-model="item.data.metaData.answer"
              :label="choice.answer"
              :value="choice.id"
              @input="
                onCheckboxChanged(
                  item.index,
                  choice,
                  item.data.metaData.answer,
                  item?.data?.metaData?.choices
                )
              "
            >
              <template v-if="choice.title === isOther" v-slot:label>
                <div class="d-flex flex-row align-center">
                  <p>{{ choice.answer }}</p>
                  <v-text-field
                    v-model="choice.specify"
                    style="max-width: 500px; min-width: 300px"
                    class="mt-5 ml-5"
                    density="compact"
                    variant="outlined"
                    @input="
                      onCheckboxInputChanged(
                        item.data.metaData.answer,
                        choice.id
                      )
                    "
                  >
                  </v-text-field>
                </div>
              </template>
            </v-checkbox> -->
          </div>
        </v-card-text>
      </v-card>
    </section>
    <section
      v-else-if="item?.data?.controlType === types.dropdown"
      class="mt-2"
    >
      <v-card
        elevation="1"
        v-show="!item.disabled"
        :color="item.disabled ? 'grey-lighten-1' : ''"
        :disabled="item.disabled"
        :variant="item.disabled ? 'tonal' : 'elevated'"
      >
        <p class="pa-2">
          {{ item?.data?.metaData?.question }}
          <span v-if="item?.data?.metaData?.isRequired" class="text-red"
            >*</span
          >
        </p>
        <v-card-text class="pt-8">
          <v-select
            v-model="item.data.metaData.answer"
            variant="outlined"
            :items="item.data.metaData.choices"
            item-title="answer"
            :rules="
              item?.data?.metaData?.isRequired && !item.disabled
                ? rules.selected
                : ''
            "
            @update:modelValue="
              onDropdownChanged(
                item.index,
                item.data.metaData.choices,
                item.data.metaData.answer
              )
            "
            item-value="id"
          ></v-select>
        </v-card-text>
      </v-card>
    </section>
    <section v-else-if="item?.data?.controlType === types.uploads" class="mt-2">
      <v-card
        elevation="1"
        v-show="!item.disabled"
        :color="item.disabled ? 'grey-lighten-1' : ''"
        :disabled="item.disabled"
        :variant="item.disabled ? 'tonal' : 'elevated'"
      >
        <p class="pa-2">
          {{ item?.data?.metaData?.question }}
          <span v-if="item?.data?.metaData?.isRequired" class="text-red"
            >*</span
          >
        </p>
        <v-card-text class="pt-8">
          <Choosefile
            accept=""
            icon="mdi mdi-file-document"
            descritption="โปรดตรวจสอบให้แน่ว่าไฟล์ซึ่งจะถูกอัพโหลดประกอบด้วยข้อมูลส่วนบุคคลที่จำเป็น ตามที่ระบุไว้ในนโยบายความเป็นส่วนตัวของ FTP เท่านั้น"
            @input-file="onUploads(item.index, item.data.metaData, $event)"
            :is-file="item.data.metaData.files"
          />
        </v-card-text>
      </v-card>
    </section>
    <section v-else>None</section>
  </div>
</template>
<script setup>
import Choosefile from "@/components/forms/ChoosefileQuestion.vue";
// eslint-disable-next-line no-unused-vars
import { ref, onBeforeMount, computed } from "vue";
const emit = defineEmits(["sections"]);
const props = defineProps({
  sections: {
    type: Array,
    default: () => [],
  },
});

const isOther = "other";
const types = ref({
  paragraph: "Paragraph",
  multichoice: "Multichoice",
  checkbox: "Checkbox",
  dropdown: "Dropdown",
  uploads: "Uploads",
});

const rules = ref({
  checked: [(v) => (!!v && v.length > 0) || "กรุณากรอกข้อมูล"],
  radio: [(v) => !!v || "กรุณากรอกข้อมูล"],
  selected: [(v) => !!v || "กรุณากรอกข้อมูล"],
  paragraph: [(v) => !!v || "กรุณากรอกข้อมูล"],
});

const questionSections = computed({
  get() {
    return props.sections;
  },
  set(val) {
    emit("sections", val);
  },
});

const onParagraphChanged = (index, nextId, val) => {
  if (nextId !== 0) {
    if (val.length > 0) {
      isDisabled(index, nextId, false);
    } else {
      isDisabled(index, nextId, true);
    }
  }
};
// eslint-disable-next-line no-unused-vars
const onRadioChanged = (index, choices, val) => {
  // other change defualt
  const other = choices.find((_) => _.title === "other");
  if (other !== undefined && other.id !== val) {
    const index = choices.findIndex((x) => x.id === other.id);
    choices[index].specify = null;
  }

  const opened = () => {
    const selected = choices.find((_) => _.id === val);

    if (
      selected.nextQuestionId !== 0 &&
      selected.nextQuestionId !== undefined
    ) {
      isDisabled(index, selected.nextQuestionId, false);
      return selected.nextQuestionId;
    }
    return selected.nextQuestionId;
  };
  const closed = (nextId) => {
    const close = choices.filter(
      (_) => _.nextQuestionId !== nextId && _.nextQuestionId !== 0
    );
    if (close.length) {
      close.forEach((item) => {
        isDisabled(index, item.nextQuestionId, true);
      });
    }
  };

  const actionNextId = opened();
  if (actionNextId !== undefined) {
    closed(actionNextId);
  }
};
// eslint-disable-next-line no-unused-vars
const onCheckboxChanged = (index, selected, val, choices) => {
  const checked = val.includes(selected.id);
  if (checked) {
    isDisabled(index, selected.nextQuestionId, false);
    return;
  }
  const answerAudit = choices.filter((i) => val.includes(i.id));
  const answerDuplicate = answerAudit.filter(
    (i) => i.nextQuestionId === selected.nextQuestionId
  );
  if (answerDuplicate.length === 0) {
    isDisabled(index, selected.nextQuestionId, true);
  }
};
const onCheckboxInputChanged = (checked, val) => {
  const index = checked.findIndex((i) => i === val);
  if (index === -1) {
    checked.push(val);
    return;
  }
  checked[index] = val;
};
// eslint-disable-next-line no-unused-vars
const onDropdownChanged = (index, choices, val) => {
  choices.forEach((selected) => {
    if (selected.id === val) {
      isDisabled(index, selected.nextQuestionId, false);
    } else {
      if (selected.nextQuestionId !== 0) {
        isDisabled(index, selected.nextQuestionId, true);
      }
    }
  });
};
const onUploads = (index, metaData, file) => {
  metaData.files = file;
  //console.log(metaData.nextQuestionId);
  if (metaData.nextQuestionId !== 0) {
    isDisabled(index, metaData.nextQuestionId, true);
  }
};

// eslint-disable-next-line no-unused-vars
const isDisabled = (index, nextQuestionId, disabled) => {
  const questionVisible = (nextId, nextIndex) => {
    questionSections.value.forEach((item) => {
      if (item.id === nextId && item.index == nextIndex) {
        item.disabled = disabled;
      }
    });
  };

  const questionIndex = (afterIndex) => {
    questionSections.value.forEach((item) => {
      const actived = afterIndex.includes(item.index);
      if (actived) {
        questionVisible(nextQuestionId, item.index);
      }
    });
  };

  const indexAll = Array.from(questionSections.value, (x) => x.index);
  let resultIndex = indexAll.indexOf(index);
  let newIndex = indexAll.slice(resultIndex + 1);
  questionIndex(newIndex);
};
</script>
