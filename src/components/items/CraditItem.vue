<template>
  <v-card>
    <v-card-text>
      <v-row no-gutters class="align-center">
        <v-col cols="12" class="single-line h4">
          <h4>{{ props.title }}</h4>
        </v-col>
        <v-col cols="3" class="text-start">
          <div
            class="text-h5 py-2"
            :style="{
              color: getProgressColor(props.value),
              'font-weight': 'bold',
            }"
          >
            {{ props.value }} %
          </div>
        </v-col>
        <!-- <v-col cols="9" class="text-end d-flex align-center justify-end">
          <div class="text-caption">Average:</div>
          <div
            class="text-caption"
            :style="{ color: getProgressColor(props.value) }"
          >
            {{ props.description }}
          </div>
        </v-col> -->
      </v-row>
      <v-progress-linear
        bg-color="grey"
        :model-value="props.value"
        :color="getProgressColor(props.value)"
        height="10"
      ></v-progress-linear>
    </v-card-text>
  </v-card>
</template>

<script setup>
const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
});

const getProgressColor = (value) => {
  if (value <= 30) {
    return "red";
  } else if (value > 30 && value <= 65) {
    return "#FFB414";
  } else {
    return "green";
  }
};

// const getProgressDesc = (value) =>{
//   if(value <= 30) {

//   }
// }
</script>

<style>
.single-line h4 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
