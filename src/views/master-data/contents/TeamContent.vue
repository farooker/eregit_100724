<template>
  <v-container fluid>
    <v-row no-gutters justify="end">
      <button-control
        icon="mdi mdi-plus"
        text="Create Team"
        @button-clicked="on_go_to_create"
      />
    </v-row>
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
import ButtonControl from "@/components/controls/ButtonControl.vue";
import { useRouter } from "vue-router";
import { useConfirmationDialog } from "@/components/dialogs/ConfirmationDialogService";
import TeamService from "@/apis/TeamService";
import { onMounted, ref, reactive } from "vue";
const { showDialog } = useConfirmationDialog();

const router = useRouter();

const headers = reactive([
  { text: "ID", value: "id", width: 1 },
  { text: "Business Unit", value: "business_unit", width: 2 },
  { text: "Company", value: "company", width: 3 },
  { text: "Name TH", value: "name_th", width: 3 },
  { text: "Status", value: "status", width: 1 },
  { text: "Action", value: "action", width: 1 },
  { text: "", value: "history", width: 1 },
]);

let items = ref([]);

const process_array = (inputArray) => {
  return inputArray.map((item) => ({
    id: 1,
    business_unit: item?.company?.business_unit?.name_th,
    business_unit_id: item?.company?.business_unit?.id,
    company: item?.company?.name_en,
    company_id: item?.company?.id,
    name_th: item?.name_th,
    name_en: item?.name_en,
    status: true,
    action: [
      { color: "secondary", icon: "mdi mdi-pencil", text: "", action: "edit" },
      { color: "black", icon: "mdi mdi-trash-can", text: "", action: "delete" },
    ],
    history: "history_log",
  }));
};

const handleFetchTeams = async () => {
  try {
    const result_teams = await TeamService.getTeamAll();
    if (result_teams.data.is_success) {
      items.value = process_array(result_teams.data.data);
    } else {
      // Failed
    }
  } catch (error) {
    // Failed
  }
};

const on_go_to_create = () => {
  router.push({ name: "TeamManagement" });
};

const handle_item_clicked = async (event) => {
  const result = event.split(",");
  if (result.length > 0 && result[1] === "edit") {
    router.push({ name: "TeamManagement", params: { id: result[0] } });
  }

  if (result.length > 0 && result[1] === "delete") {
    const is_ok = await showDialog(
      "ยืนยันการลบ Team ?",
      "กรุณาตรวจสอบคุณไม่สามารถกลับมาแก้ไขได้\nคลิกปุ่มตกลง เพื่อดำเนินการ"
    );
    if (is_ok) {
      console.log("Call api delete: ", result[0]);
    }
  }
};

const handle_history = (index) => {
  console.log("history: ", index);
  router.push({ name: "HistoryTeamPage" });
};

onMounted(async () => {
  await handleFetchTeams();
});
</script>
