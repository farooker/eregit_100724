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
import CompnayService from "@/apis/CompnayService";
import MasterTable from "@/components/tables/MasterTable.vue";
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const headers = reactive([
  { text: "ID", value: "id", width: 1 },
  { text: "Business Unit", value: "business_unit", width: 2 },
  { text: "CCode", value: "company_code", width: 1 },
  { text: "Name TH", value: "name_th", width: 5 },
  { text: "Action", value: "action", width: 1 },
  { text: "", value: "history", width: 2 },
]);

let items = ref([]);
let companies = ref([]);

const process_array = (inputArray) => {
  return inputArray.map((item) => ({
    id: item.id,
    business_unit: item.business_unit.name_en,
    company_code: item.company_code,
    name_th: item.name_th,
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

const handleFetchCompanies = async () => {
  try {
    const result_companies = await CompnayService.getCompanyAll();
    if (result_companies.data.is_success) {
      companies.value = result_companies.data.data;
      items.value = process_array(companies.value);
    } else {
      // Failed
    }
  } catch (error) {
    // Failed
  }
};

const handle_item_clicked = (event) => {
  const action = event.split(",");
  if (action[1] && action[1] === "view") {
    router.push({ name: "CompanyDetail", params: { id: items.value[0].id } });
  }
};

const handle_history = (index) => {
  console.log("history: ", index);
  router.push({ name: "HistoryTeamPage" });
};

onMounted(async () => {
  await handleFetchCompanies();
});
</script>
