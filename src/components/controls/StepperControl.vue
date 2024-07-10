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
      "ที่อยู่",
      "ที่อยู่สาขา",
      "ข้อมูลเพิ่มเติม",
    ],
  },
});

const currentStep = ref(props.currentStepNumber);
const itemsTitle = reactive(props.titles);
const totalSteps = itemsTitle.length;

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
  margin-left: 132px;
}

.step-container {
  display: flex;
  align-items: center;
  position: relative;
  width: 200px;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
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
  z-index: 2;
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

.step-container:not(:last-child) .step::after {
  content: '';
    position: absolute;
    top: 30%;
    left: 60%;
    transform: translateY(-50%);
    width: 100%;
    width: 210px;
    height: 5px;
    background-color: lightgray;
    z-index: 0;
}

.step-container:not(:last-child) .step-active::after{
  background-color: lightgray;
}
.step-container:not(:last-child) .step-completed::after {
  background-color: red;
}
</style>
