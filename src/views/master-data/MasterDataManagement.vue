<template>
  <div v-bind="$attrs">
     <v-navigation-drawer permanent>
       <v-list-item>
         <h2>Master Data Management</h2>
       </v-list-item>
       <v-divider></v-divider>
       <template v-for="(item, index) in navigationItems" :key="index">
         <v-list-item
           @click="activeItem = item.title"
           :class="{ 'active-item': item.title === activeItem }"
           link
         >
           {{ item.title }}
         </v-list-item>
         <v-divider></v-divider>
       </template>
     </v-navigation-drawer>
   </div>
   <v-container fluid>
     <CorparationContent v-if="activeItem && activeItem === 'Corporation'" />
     <BusinessUnit v-if="activeItem && activeItem === 'Business Unit'" />
     <CompanyContent v-if="activeItem && activeItem === 'Company'" />
     <TeamContent v-if="activeItem && activeItem === 'Team'" />
   </v-container>
 </template>

 <script setup>
 import { ref } from "vue";
 import CorparationContent from "./contents/CorparationContent.vue";
 import BusinessUnit from "./contents/BusinessUnit.vue";
 import CompanyContent from "./contents/CompanyContent.vue";
 import TeamContent from "./contents/TeamContent.vue";
 import { reactive } from "vue";

 const navigationItems = reactive([
   { title: "Corporation" },
   { title: "Business Unit" },
   { title: "Company" },
   { title: "Team" },
 ]);

 const activeItem = ref(navigationItems[0].title);
 </script>

 <style scoped>
 .active-item {
   border-left: 3px solid rgb(var(--v-theme-secondary));
   background-color: rgb(var(--v-theme-secondary), 0.2);
   color: rgb(var(--v-theme-secondary));
 }
 </style>
