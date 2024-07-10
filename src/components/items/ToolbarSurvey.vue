<style>
.progress_bar {
  border-bottom: 3px solid red;
  background-color: rgba(255, 0, 0, 0.05);
}
</style>
<template>
  <v-row class="elevation-3 mt-5" style="background-color: white">
    <!--  stap 1 -->
    <v-col
      v-if="step > step1.No"
      cols="3"
      align="center"
      class="pa-3"
      @click="prev(props.isDone)"
    >
      <div>
        <v-icon icon="mdi-check-circle" color="green"> </v-icon>
        <span class="text-grey">{{ step1.title }}</span>
      </div>
    </v-col>
    <v-col
      v-if="step === step1.No"
      cols="3"
      align="center"
      class="pa-3 progress_bar"
    >
      <div>
        <v-icon :icon="step1.icon" color="red"> </v-icon>
        <span class="text-red">{{ props.title }}</span>
      </div>
    </v-col>

    <v-col
      v-if="step < step1.No"
      cols="3"
      align="center"
      class="pa-3"
      @click="next(props.isDone)"
    >
      <div>
        <v-icon :icon="step1.icon" color="grey"></v-icon>
        <span class="text-grey">{{ props.title }}</span>
      </div>
    </v-col>
    <v-divider vertical></v-divider>
    <!--  stap 2 -->
    <v-col
      v-if="step > step2.No"
      cols="3"
      align="center"
      class="pa-3"
      @click="prev(props.isDone)"
    >
      <div>
        <v-icon icon="mdi-check-circle" color="green"> </v-icon>
        <span class="text-grey">{{ step2.title }}</span>
      </div>
    </v-col>
    <v-col
      v-if="step === step2.No"
      cols="3"
      align="center"
      class="pa-3 progress_bar"
    >
      <div>
        <v-icon :icon="step2.icon" color="red"> </v-icon>
        <span class="text-red">{{ step2.title }}</span>
      </div>
    </v-col>

    <v-col
      v-if="step < step2.No"
      cols="3"
      align="center"
      class="pa-3"
      @click="next(props.isDone)"
    >
      <div>
        <v-icon :icon="step2.icon" color="grey"></v-icon>
        <span class="text-grey">{{ step2.title }}</span>
      </div>
    </v-col>
    <v-divider vertical></v-divider>
    <!--  stap 3 -->
    <v-col
      v-if="step > step3.No"
      cols="3"
      align="center"
      class="pa-3"
      @click="prev(props.isDone)"
    >
      <div>
        <v-icon icon="mdi-check-circle" color="green"> </v-icon>
        <span class="text-grey">{{ step3.title }}</span>
      </div>
    </v-col>
    <v-col
      v-if="step === step3.No"
      cols="3"
      align="center"
      class="pa-3 progress_bar"
    >
      <div>
        <v-icon :icon="step3.icon" color="red"> </v-icon>
        <span class="text-red">{{ step3.title }}</span>
      </div>
    </v-col>

    <v-col
      v-if="step < step3.No"
      cols="3"
      align="center"
      class="pa-3"
      @click="next(props.isDone)"
    >
      <div>
        <v-icon :icon="step3.icon" color="grey"></v-icon>
        <span class="text-grey">{{ step3.title }}</span>
      </div>
    </v-col>
    <v-divider vertical></v-divider>
    <!--  stap 4 -->
    <v-col
      v-if="step > step4.No"
      cols="3"
      align="center"
      class="pa-3"
      @click="prev(props.isDone)"
    >
      <div>
        <v-icon icon="mdi-check-circle" color="green"> </v-icon>
        <span class="text-grey">{{ step4.title }}</span>
      </div>
    </v-col>
    <v-col
      v-if="step === step4.No"
      cols="3"
      align="center"
      class="pa-3 progress_bar"
    >
      <div>
        <v-icon :icon="step4.icon" color="red"> </v-icon>
        <span class="text-red">{{ step4.title }}</span>
      </div>
    </v-col>

    <v-col
      v-if="step < step4.No"
      cols="3"
      align="center"
      class="pa-3"
      @click="next(props.isDone)"
    >
      <div>
        <v-icon :icon="step4.icon" color="grey"></v-icon>
        <span class="text-grey">{{ step4.title }}</span>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
const emit = defineEmits(["prev", "next"]);
import { defineProps } from "vue";
const props = defineProps({
  step: {
    type: Number,
    default: 0,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
});

const step1 = {
  No: 1,
  title: "ข้อมูลคู่ค้า",
  icon: "mdi-office-building",
};
const step2 = {
  No: 2,
  title: "นโยบาย RSP",
  icon: "mdi-file-sign",
};
const step3 = {
  No: 3,
  title: "แบบสำรวจ",
  icon: "mdi-list-box-outline",
};
const step4 = {
  No: 4,
  title: "การเรียนรู้",
  icon: "mdi-laptop-account",
};

const prev = (done) => {
  if (done) {
    emit("prev");
  }
};
const next = (done) => {
  if (done) {
    emit("next");
  }
};
</script>
