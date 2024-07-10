<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <v-chip :color="toggleColor(props.value)" label  class="font-weight-bold">
      {{props.value}}
    </v-chip>
  </div>
</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  value: {
    type: Text,
    default: ""
  }
});

const toggleColor=(role)=>{
  const toggle = role.toLowerCase();
  const modifiedString = toggle.replace(/\s+/g, '_');
   switch(modifiedString){
    case "vender": return "#99225E"
    case "admin_vendor": return "#FE8144"
    case "sd_team": return "#85C761"
    case "account": return "#3390BB"
    case "admin": return "#ed1c24"
    default : return  "#B59E7A" //"#F5EBDB"
   }
}
</script>
