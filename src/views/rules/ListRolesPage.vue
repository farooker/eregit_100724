<template>
  <v-container fluid>
    <h3>Role & Permission</h3>
    <v-row dense>
      <v-col cols="12">
        <v-card color="secondary">
          <v-card-item>
            <v-row align="center" justify="space-between">
              <v-col cols="3">
                <div>
                  <h5>Role Name</h5>
                </div>
              </v-col>
              <v-col cols="5">
                <h5>Decscription</h5>
              </v-col>
              <v-col>
                <h5>Status</h5>
              </v-col>
            </v-row>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense>
      <v-expansion-panels v-model="is_item_expan">
        <v-progress-linear
          class="rounded-pill"
          :indeterminate="isLoading"
          bg-color="transparent"
          color="secondary"
        ></v-progress-linear>
        <role-item
          v-for="(role, index) in roles_mock"
          :style="
            index === is_item_expan
              ? 'border: 2px solid red; margin-top: 2px;'
              : ''
          "
          :key="role.id"
          :is-expand-view="index === is_item_expan"
          :permission="role.name"
          :description="role.description"
          :is-active="role.is_active"
          :sub-headers="headers"
          :sub-desserts="generate_desserts(role.id)"
          :id="role.id"
          @edited-clicked="on_clicked_edit"
          @history-clicked="on_clicked_history"
        />
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import roleService from "@/apis/RoleService";
import permissionService from "@/apis/PermissionService";
import actionService from "@/apis/ActionService";
import RoleItem from "../../components/items/RoleItem.vue";

import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
const { handlingErrorsMessage } = useErrorHandlingDialog();

const router = useRouter();

const roles_mock = ref([]);
const action_all_mock = ref([]);
const permission_module_mock = ref([]);
const headers = ref([]);
const isLoading = ref(true);

const handleFetchListRoles = async () => {
  const result_roles = await roleService.getRoleAll();
  if (result_roles.data.is_success) {
    roles_mock.value = result_roles.data.data;
  } else {
    // Failed
  }
};

const handleFetchActions = async () => {
  try {
    const result_actions = await actionService.getActionAll();
    if (result_actions.data.is_success) {
      action_all_mock.value = result_actions.data.data;
      headers.value = action_all_mock.value.map((action) => ({
        title: action.name,
        key: action.name,
      }));
      headers.value.unshift({ title: "Permission Module", key: "permission" });
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

const handleFetchListPermissionByRoleId = async (role_id) => {
  try {
    const result_permissions = await permissionService.getPermissionByRoleId(
      role_id
    );
    if (result_permissions.data.is_success) {
      permission_module_mock.value.push(result_permissions.data.data);
    } else {
      //Failed
    }
  } catch (error) {
    // if (error.response) {
    //   const val = error.response.data;
    //   handlingErrorsMessage(val.message, val?.data.error);
    //   return;
    // }
    // handlingErrorsMessage("Other Error", error.message);
    return;
  }
};

const is_item_expan = ref(null);

onMounted(async () => {
  await handleFetchActions();
  await handleFetchListRoles();
  for (let index = 0; index < roles_mock.value.length; index++) {
    const role_id = roles_mock.value[index]?.id;
    if (role_id) await handleFetchListPermissionByRoleId(role_id);
  }
  isLoading.value = false;
});

watch(is_item_expan, (newValue, oldValue) => {
  console.log(
    `The value of is_item_expan changed from ${oldValue} to ${newValue}`
  );
});

const generate_desserts = (role_id) => {
  const desserts_module = [];
  const find_role_id = permission_module_mock.value.find(
    (el) => el.role_id === role_id
  );
  if (find_role_id)
    find_role_id.module.forEach((item) => {
      let dessert = {
        permission: item.name_th,
      };
      action_all_mock.value.forEach((action) => {
        dessert[action.name] = item.action.some((obj) => obj.id === action.id);
      });
      desserts_module.push(dessert);
    });
  return desserts_module;
};

const on_clicked_edit = (role_id) => {
  router.push({ name: "CreateRolePage", params: { role_id: role_id } });
};

const on_clicked_history = (role_id) => {
  console.log(role_id);
  router.push({ name: "HistoryRolePage", query: { role_id: role_id } });
  // router.push("/HistoryRolePage");
};
</script>
