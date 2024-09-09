<template>
  <v-card class="mx-auto elevation-1 mt-10 rounded-lg" color="secondary">
    <v-card-item>
      <v-row align-center>
        <v-col cols="2" align-self="center" class="d-flex align-center">
          <v-btn @click="toggleIcon" variant="plain" class="pa-0">
            <v-icon v-if="isUpIcon">{{ upIcon }}</v-icon>
            <v-icon v-else>{{ downIcon }}</v-icon>
          </v-btn>
          <span
            ><h5 class="ml-n5">{{ props.headers[0] }}</h5></span
          >
        </v-col>
        <v-col cols="2" align-self="center">
          <h5>{{ props.headers[1] }}</h5>
        </v-col>
        <v-col cols="6" align-self="center">
          <h5>{{ props.headers[2] }}</h5>
        </v-col>
        <v-col cols="2" align-self="center">
          <h5>{{ props.headers[3] }}</h5>
        </v-col>
      </v-row>
    </v-card-item>
  </v-card>
  <v-card
    class="mx-auto elevation-1 mt-5"
    color="#FFFFFF"
    style="max-height: 600px; overflow-y: auto"
  >
    <div v-for="(item, index) in props.desserts" :key="index">
      <v-card-item>
        <v-row align-center justify="center">
          <v-col cols="2" align-self="center">
            <strong>{{
              utils.parseDdMmYyWithTimeAndSeconds(item.created_at)
            }}</strong>
          </v-col>
          <v-col cols="2" align-self="center">
            <strong>{{ item.type }}</strong>
          </v-col>
          <v-col cols="6" align-self="center">
            <strong>{{ item.changed_field }} to</strong>
            &nbsp;
            <strong class="text-red">{{ item.changed_value }}</strong>
          </v-col>
          <v-col cols="2" align-self="center">
            <strong class="text-red-darken-4">{{ item.user_email }}</strong>
          </v-col>
        </v-row>
      </v-card-item>
      <v-divider></v-divider>
    </div>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import utils from "../../utils/dateUtils";

const props = defineProps({
  headers: {
    type: Array,
    default: () => ["Date and Time", "Role", "Action", "Change by"],
  },
  desserts: {
    type: Array,
    default: () => [
      {
        created_at: "2023-10-04T15:40:00",
        type: "Roles",
        changed_field: "Changed field",
        changed_value: "Changed value",
        user_email: "User email",
      },
    ],
  },
});

const emit = defineEmits(["on-sort"]);

const isUpIcon = ref(true);
const upIcon = ref("mdi-chevron-up");
const downIcon = ref("mdi-chevron-down");
// const items_history = ref(props.desserts);

const toggleIcon = () => {
  isUpIcon.value = !isUpIcon.value;
  if (isUpIcon.value) {
    emit("on-sort", "desc");
  } else {
    emit("on-sort", "asc");
  }
};
</script>
