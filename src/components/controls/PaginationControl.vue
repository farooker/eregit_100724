<template>
  <div class="text-center">
      <v-pagination
          v-model="offset"
          :length="props.length" :total-visible="7"
          density="compact"
          class="custom-pagination"
        />
    </div>
</template>

<script setup>
import { defineProps,computed } from 'vue';

const emit = defineEmits(["value"]);
const props = defineProps({
  value: {
    type: Number,
    default: 1
  },
  length:{
    type:  Number,
    default: 15
  }
});

const offset = computed({
  get() { return props.value },
  set(val) { emit("value", val) },
});
</script>

<style>

.custom-pagination .v-pagination__prev .v-btn,
.custom-pagination .v-pagination__next .v-btn{
  background-color: red;
}

.custom-pagination .v-pagination__prev .v-btn__content,
.custom-pagination .v-pagination__next .v-btn__content{
  color: white;
}

.custom-pagination .v-btn {
  color:  black;
}

.custom-pagination .v-pagination__item--is-active .v-btn {
  color: red;
  border: 1px solid red;
}

</style>
