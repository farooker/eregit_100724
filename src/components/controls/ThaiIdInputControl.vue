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
import { ref, watch } from "vue";

const props = defineProps({
  initialOtpValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["on-input"]);

const otpLength = 13;
const otp = ref(Array.from(props.initialOtpValue.padEnd(otpLength, "")));
const otpRefs = ref([]);

watch(
  () => props.initialOtpValue,
  (newValue) => {
    otp.value = Array.from(newValue.padEnd(otpLength, ""));
  }
);

const handleKeyUp = (event, index) => {
  if (event.key === "Backspace" && index > 1) {
    otpRefs.value[index - 2].focus();
  }
  if (event.key !== "Backspace" && index < otpLength && otpRefs.value[index]) {
    otpRefs.value[index].focus();
  }
  emit("on-input", otp.value.join(""))
};

watch(
  otp.value,
  () => {
    console.log(otp.value.join(""));
    emit("on-input", otp.value.join(""));
  },
  { deep: true, immediate: true }
);
</script>

<style>
.otp-inputs {
  display: flex;
  justify-content: space-between;
}
.otp-field {
  text-align: center;
  text-justify: center;
  margin-left: 5px;
}
</style>
