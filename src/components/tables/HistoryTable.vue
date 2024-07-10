<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12">
        <v-card color="secondary">
          <v-card-item>
            <v-row align="center" justify="start">
              <v-col
                v-for="header in props.headers"
                :key="header.key"
                :cols="header.width"
              >
                <h5>{{ header.text }}</h5>
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
          style="margin-left: 1px; margin-right: 1px; background-color: white"
        >
          <v-col
            v-for="(col, index) in Object.keys(row)"
            :key="index"
            :cols="props.headers[index]?.width"
          >
            <p>{{ row[col] }}</p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
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
</script>

<style>
.border-bottom {
  border-bottom: 1px solid #e0e0e0; /* Adjust color and thickness as needed */
}
</style>
