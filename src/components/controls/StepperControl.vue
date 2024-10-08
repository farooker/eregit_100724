<template>
  <div class="stepper">
    <div v-for="step in totalSteps" :key="step" class="step-container">
      <div class="step" :class="getStepClass(step)">
        <div class="step-number">{{ step }}</div>
        <div class="step-title">{{ getStepTitle(step) }}</div>
      </div>
      <div
        v-if="step < totalSteps"
        class="line"
        :class="{ 'line-active': step < currentStep }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { ref, watch } from "vue";

const props = defineProps({
  currentStepNumber: {
    type: Number,
    default: 0,
  },
  titles: {
    type: Array,
    default: () => [
      "ข้อมูลคู่ค้า",
      "ที่อยู่สำนักงานใหญ่",
      "ที่อยู่สาขา",
      "ข้อมูลเพิ่มเติม",
    ],
  },
});

const currentStep = ref(props.currentStepNumber);
const itemsTitle = reactive(props.titles)
const totalSteps = 4;

watch(props, (newValue) => {
  currentStep.value = newValue.currentStepNumber;
});

const getStepClass = (step) => ({
  "step-active": step === currentStep.value,
  "step-completed": step < currentStep.value,
  "step-inactive": step > currentStep.value,
});

const getStepTitle = (step) => {
  return itemsTitle[step - 1];
};
</script>

<style scoped>
.stepper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-container {
  display: flex;
  align-items: center;
  flex-grow: 0.1;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: -80px;
  margin-right: -50px;
  position: relative;
}

.step-number {
  background-color: lightgray;
  color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-completed .step-title {
  color: red;
}

.step-active .step-title {
  color: red;
}

.step-active .step-number {
  background-color: red;
}

.step-completed .step-number {
  background-color: red;
}

.step-inactive .step-number {
  background-color: lightgray;
}

.line {
  height: 5px;
  background-color: lightgray;
  flex-grow: 1;
  margin-top: -25px;
}

.line-active {
  background-color: red;
}
</style>
