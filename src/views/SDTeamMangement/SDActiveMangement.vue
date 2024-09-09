<template>
  <v-container fluid>
    <h2>SD Active Mangement</h2>
    <v-card elevation="2" rounded="0" class="rounded-lg mt-3" v-for="(i, index) in item" :key="index" :to="i.path">
        <v-card-item class="ma-0">
          <v-row no-gutters dense justify="space-around">
            <v-col cols="12" align-self="center" class="pa-1">
              <v-icon color="secondary" size="40" class="ml-3 mr-5">{{ i.icon}}</v-icon>
              <strong>{{ i.title }}</strong>
            </v-col>
          </v-row>
        </v-card-item>
    </v-card>
  </v-container>
</template>
<script setup>
/*eslint-disable no-unused-vars  */
import { ref, onBeforeMount } from 'vue';


const item = ref([])

onBeforeMount(() => {
  item.value = [
    {
      icon: "mdi-shield-check",
      title: "RSP Policy",
      path: "/SDTeamMangement/RspPolicies"
    },
    {
      icon: "mdi-list-box",
      title: "Survey",
      path: "/SDTeamMangement/Survey"
    },
    {
      icon: "mdi-laptop-account",
      title: "Traning",
      path: "/SDTeamMangement/Traning"
    }
  ]

});

</script>

