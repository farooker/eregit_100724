<template>
  <v-container>
    <div class="otp-inputs">
      <v-text-field
        v-for="n in otpLength"
        :key="n"
        class="otp-field"
        v-model="otp[n - 1]"
        maxlength="1"
        @keyup="handleKeyUp($event, n)"
        :ref="(el) => (otpRefs[n - 1] = el)"
        variant="outlined"
        dense
        density="compact"
      ></v-text-field>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["on-input"]);

const otpLength = 6;
const otp = ref(Array(otpLength).fill(""));
const otpRefs = ref([]);

const handleKeyUp = (event, index) => {
  if (event.key === "Backspace" && index > 1) {
    otpRefs.value[index - 2].focus();
  }
  if (event.key !== "Backspace" && index < otpLength && otpRefs.value[index]) {
    otpRefs.value[index].focus();
  }
  emit("on-input", otp.value.join(""))
};
</script>

<style>
.otp-inputs {
  display: flex;
  justify-content: space-between;
}
.otp-field {
  text-align: center;
  margin-left: 5px;
}
</style>
