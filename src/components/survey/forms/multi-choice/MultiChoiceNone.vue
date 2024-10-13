<template>
  <v-row
    style="background-color: white; border-radius: 10px"
    dense
    align="center"
    class="mt-2"
  >
    <v-col cols="10">
      <v-text-field
        placeholder="กรุณากรอกคำถาม"
        variant="outlined"
        v-model="metaData.question"
        required
        :rules="[(v) => !!v || 'Required.']"
        density="compact"
      ></v-text-field>
    </v-col>
    <v-col cols="12" v-for="(item, index) in metaData.choices" :key="index">
      <v-row dense v-if="item.title === 'chioce'">
        <v-col cols="1" class="d-flex justify-end"
          ><v-icon>mdi mdi-radiobox-blank</v-icon></v-col
        >
        <v-col cols="9">
          <div>
            <v-text-field
              class="centered-placeholder"
              placeholder="ตัวเลือก"
              variant="outlined"
              required
              :rules="[(v) => !!v || 'Required.']"
              v-model="item.answer"
              density="compact"
            >
              <template v-slot:append>
                <v-icon @click="onIconClick(index)" color="red">
                  mdi mdi-close-circle
                </v-icon>
              </template>
            </v-text-field>
          </div>
        </v-col>
        <v-col cols="2">
          <v-select
            label="ทำข้อต่อไป"
            :items="propsVar.items_selection"
            v-model="item.nextQuestion"
            density="compact"
            variant="outlined"
          >
          </v-select>
        </v-col>
      </v-row>
      <v-row dense v-if="item.title === 'other'">
        <v-col cols="1" class="d-flex justify-end"> อื่นๆ</v-col>
        <v-col cols="9">
          <v-text-field
            class="centered-placeholder"
            placeholder="ตัวเลือกอื่นๆ"
            required
            :rules="[(v) => !!v || 'Required.']"
            variant="outlined"
            v-model="item.answer"
            density="compact"
          >
            <template v-slot:append>
              <v-icon @click="onIconClick(index)" color="red">
                mdi mdi-close-circle
              </v-icon>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="2">
          <v-select
            label="ทำข้อต่อไป"
            :items="propsVar.items_selection"
            v-model="item.nextQuestion"
            density="compact"
            variant="outlined"
          >
          </v-select>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" class="d-flex">
      <a>
        <p class="clickable-underline" @click="addChoice()">เพิ่มตัวเลือก</p>
      </a>
      <p class="clickable-underline mr-1 ml-1 custom-grey">หรือ</p>
      <a>
        <p class="clickable-underline custom-red" @click="addOther()">
          เพิ่มอื่นๆ
        </p>
      </a>
    </v-col>
    <v-divider></v-divider>
    <v-col cols="6" class="d-flex justify-start">
      <v-checkbox
        v-model="metaData.isRequired"
        hide-spin-buttons
        hide-details
        class="pa-0 ma-0"
        label="Require"
      ></v-checkbox>
    </v-col>
    <v-col cols="6" class="d-flex justify-end">
      <v-btn
        prepend-icon="mdi mdi-delete-outline"
        variant="outlined"
        rounded
        @click="$emit('on-remove')"
      >
        Delete
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, watch, defineEmits } from "vue";

const propsVar = defineProps({
  metaDataMultiChoiceNone: {
    type: Object,
    default: () => {
      return {
        question: "",
        isRequired: false,
        choices: [],
      };
    },
  },
  items_selection: {
    type: Array,
    default: () => [1, 2, 3, 4],
  },
});

let metaData = ref(propsVar.metaDataMultiChoiceNone);

const addChoice = () => {
  metaData.value.choices.push({
    title: "chioce",
    isChecked: false,
    answer: "",
    nextQuestion: "",
  });
};

const addOther = () => {
  metaData.value.choices.push({
    title: "other",
    isChecked: false,
    specify: "",
    answer: "",
    nextQuestion: "",
  });
};

const onIconClick = (index) => {
  metaData.value.choices.splice(index, 1);
};

const emit = defineEmits(["on-update", "on-remove"]);

watch(metaData.value, (newValue) => {
  // emit("on-update", { multi_chioce_none: newValue });
  emit("on-update", newValue);
  // console.log(JSON.stringify({ multi_chioce_none: newValue }));
});
</script>

<style>
.custom-red {
  color: red;
}
.custom-grey {
  color: grey;
}

.clickable-underline {
  text-decoration: underline;
  cursor: pointer;
}
</style>
