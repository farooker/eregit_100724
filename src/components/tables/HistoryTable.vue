<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12">
        <v-card color="secondary">
          <v-card-item>
            <v-row align="center" justify="start">
              <v-col
                v-for="(header, index) in props.headers"
                :key="header.key"
                :cols="header.width"
              >
                <h5 v-if="index != 0">{{ header.text }}</h5>
                <v-btn v-else @click="toggleIcon" variant="text">
                  <v-icon v-if="isUpIcon">{{ upIcon }}</v-icon>
                  <v-icon v-else>{{ downIcon }}</v-icon>
                  <h5>{{ header.text }}</h5>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col>
        <v-row
          v-for="(row, index) in props.desserts"
          :key="index"
          class="border-bottom"
          justify="center"
          style="margin-left: 1px; margin-right: 1px; background-color: white"
        >
          <v-col
            v-for="(col, index) in Object.keys(row)"
            :key="index"
            :cols="props.headers[index]?.width"
            align-self="center"
          >
            <strong class="truncate-text">{{ row[col] }}</strong>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["on-sort"]);

const props = defineProps({
  headers: {
    type: Array,
    default: () => [
      { key: "name", text: "Role Name", width: 2 },
      { key: "description", text: "Description" },
      { key: "date", text: "Date" },
      { key: "time", text: "Time" },
      { key: "status", text: "Status" },
    ],
  },
  desserts: {
    type: Array,
    default: () => [
      {
        name: "Admin",
        description: "Administrator",
        date: "2021-01-02",
        time: "11:01:52",
        status: "Active",
      },
    ],
  },
});

const isUpIcon = ref(true);
const upIcon = ref("mdi-chevron-up");
const downIcon = ref("mdi-chevron-down");

const toggleIcon = () => {
  isUpIcon.value = !isUpIcon.value;
  if (isUpIcon.value) {
    emit("on-sort", "desc");
  } else {
    emit("on-sort", "asc");
  }
};
</script>

<style>
.border-bottom {
  border-bottom: 1px solid #e0e0e0;
}

.truncate-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  width: 100%;
}

</style>
