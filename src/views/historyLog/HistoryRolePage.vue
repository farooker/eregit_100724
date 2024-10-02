<template>
  <v-container fluid>
    <h3>History Log {{ roleId }}</h3>
    <history-table-view
      :headers="['Date And Time', 'Role', 'Change Action', 'Change By']"
      :desserts="items_roles_history"
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
import RoleService from "@/apis/RoleService";

const route = useRoute();
const router = useRouter();
const sortby = ref("desc");

const roleId = ref(route.query.role_id);
const item_role_by_id = ref({});
const items_roles_history = ref([]);

onMounted(async () => {
  await handleLoadRoleById();
  await handleLoadRoleHistory();
});

const handleLoadRoleById = async () => {
  try {
    const result_ = await RoleService.getRoleById(roleId.value);
    if (result_.data.is_success) {
      item_role_by_id.value = result_.data.data;
    } else {
      // Failed
    }
  } catch (error) {
    // Failed
  }
};

const handleLoadRoleHistory = async () => {
  try {
    const result_ = await HistoryLogService.getAllUserChangeLog(
      sortby.value,
      17,
      roleId.value
    );
    if (result_.data.is_success) {
      items_roles_history.value = [];
      result_.data.data.forEach((el) => {
        items_roles_history.value.push({
          created_at: el.created_at,
          type: item_role_by_id.value.name,
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
  await handleLoadRoleHistory();
};
</script>