<template>
  <v-container fluid>
    <h3>History Log</h3>
    <history-table :headers="header_roles_history" :desserts="items_roles_history" />
    <v-footer color="transparent" style="margin-top: 120px">
      <v-row
        class="d-flex justify-center"
        align-content="center"
        align="center"
      >
        <v-col cols="12" align-self="center" class="text-center">
          <button-control color="black" text="ย้อนกลับ" width="100" @button-clicked="on_clicked_go_back" />
        </v-col>
      </v-row>
    </v-footer>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router';
import ButtonControl from "../../components/controls/ButtonControl.vue";
import HistoryTable from "@/components/tables/HistoryTable.vue";

const router = useRouter();

const header_roles_history = [
    { key: "datetime", text: "Date And Time", width: 3 },
    { key: "role", text: "Role",  width: 2 },
    { key: "action", text: "Change Action", width: 4 },
    { key: "by", text: "Changes by", width: 3 },
];
const items_roles_history = [
  {
    datetime: "2022-01-01 15:00:45",
    role: "Admin",
    action: "Updated status to active",
    by: "kan@gmail.com",
  },
  {
    datetime: "2022-01-01 15:00:45",
    role: "Admin",
    action: "Updated status to active",
    by: "kan@gmail.com",
  },
  {
    datetime: "2022-01-01 15:00:45",
    role: "Admin",
    action: "Updated status to active",
    by: "kan@gmail.com",
  },
  {
    datetime: "2022-01-01 15:00:45",
    role: "Admin",
    action: "Updated status to active",
    by: "kan@gmail.com",
  },
];

const on_clicked_go_back = () => {
  router.go(-1)
}
</script>
