<template>
  <v-container fluid>
    <h3>History Log {{ teamId }}</h3>
    <history-table-view
      :headers="['Date And Time', 'Team', 'Change Action', 'Change By']"
      :desserts="items_team_history"
      @on-sort="handleSort"
    />
    <v-footer color="transparent" style="margin-top: 120px">
      <v-row
        class="d-flex justify-center"
        align-content="center"
        align="center"
      >
        <v-col cols="12" align-self="center" class="text-center">
          <button-control
            color="black"
            text="ย้อนกลับ"
            width="100"
            @button-clicked="on_clicked_go_back"
          />
        </v-col>
      </v-row>
    </v-footer>
  </v-container>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import ButtonControl from "../../components/controls/ButtonControl.vue";
import HistoryLogService from "@/apis/HistoryLogService";
import HistoryTableView from "@/components/tables/HistoryTableView.vue";
import { ref, onMounted } from "vue";
import TeamService from "@/apis/TeamService";

const route = useRoute();
const router = useRouter();
const sortby = ref("desc");

const teamId = ref(route.query.team_id);
const item_team_by_id = ref({});
const items_team_history = ref([]);

onMounted(async () => {
  await handleLoadTeamById();
  await handleLoadTeamHistory();
});

const handleLoadTeamById = async () => {
  try {
    const result_ = await TeamService.getTeamById(teamId.value);
    if (result_.data.is_success) {
      item_team_by_id.value = result_.data.data;
    } else {
      // Failed
    }
  } catch (error) {
    // Failed
  }
};

const handleLoadTeamHistory = async () => {
  try {
    const result_ = await HistoryLogService.getAllUserChangeLog(sortby.value, 15, teamId.value);
    if (result_.data.is_success) {
      items_team_history.value = [];
      result_.data.data.forEach((el) => {
        items_team_history.value.push({
          created_at: el.created_at,
          type: item_team_by_id.value.name_en,
          changed_field: el.changed_field,
          changed_value: el.changed_value,
          user_email: el.user.email,
        });
      });
    } else {
      // Failed
    }
  } catch (error) {
    // Failed
  }
};

const on_clicked_go_back = () => {
  router.go(-1);
};

const handleSort = async (tagSort) => {
  sortby.value = tagSort;
  await handleLoadTeamHistory();
};
</script>
