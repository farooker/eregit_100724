<template>
  <v-container fluid>
    <master-table
      :headers="headers"
      :items="items"
      @handle-item-clicked="handle_item_clicked"
      @handle-go-to-history="handle_history"
    />
  </v-container>
</template>

<script setup>
import MasterTable from "@/components/tables/MasterTable.vue";
import { useRouter } from "vue-router";
import BusinessUnitService from "@/apis/BusinessUnitService";
import { onMounted, reactive, ref } from "vue";

import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
const { handlingErrorsMessage } = useErrorHandlingDialog();

const router = useRouter();

const headers = reactive([
  { text: "ID", value: "id", width: 1 },
  { text: "Name TH", value: "name_th", width: 4 },
  { text: "Name EN", value: "name_en", width: 4 },
  { text: "Action", value: "action", width: 1 },
  { text: "", value: "history", width: 2 },
]);

const process_array = (inputArray) => {
  return inputArray.map((item) => ({
    id: item.id,
    name_th: item.name_th,
    name_en: item.name_en,
    action: [
      {
        color: "#F0F0F0",
        icon: "mdi mdi-eye-circle",
        text: "",
        action: "view",
      },
    ],
    history: "history_log",
  }));
};

let items = ref([]);
let business_units = ref([]);

const handleFetchBusinessUnit = async () => {
  try {
    const result_business_units = await BusinessUnitService.getBusinesUnitAll();
    if (result_business_units.data.is_success) {
      business_units.value = result_business_units.data.data;
      items.value = process_array(business_units.value);
    } else {
      // Failed
    }
  } catch (error) {
    if (error.response) {
      const val = error.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("Other Error", error.message);
  }
};

onMounted(async () => {
  await handleFetchBusinessUnit();
});

const handle_item_clicked = (event) => {
  const action = event.split(",");
  if (action[1] && action[1] === "view") {
    const business = items.value[action[0]];
    router.push({
      name: "BusinessUnitDetail",
      params: { id: business?.id },
    });
  }
};

const handle_history = (index) => {
  console.log("history: ", index);
  router.push({
    name: "HistoryBusinessPage",
    query: {
      business_id: business_units.value[0]?.id,
    },
  });
};
</script>
