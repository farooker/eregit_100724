<template>
  <v-container fluid>
    <h3>User Management</h3>
    <v-row justify="center" class="mt-5">
      <h3>{{ title }}</h3>
    </v-row>
    <v-row no-gutters dense>
      <role-management
        v-if="role_id"
        :role_name_p="role_name"
        :role_desc_p="role_desc"
        @on-update-role="on_updated_role"
      />
      <role-management v-if="!role_id" />
    </v-row>
    <v-row no-gutters justify="center">
      <h3>Permission Setting</h3>
    </v-row>
    <v-row no-gutters dense>
      <v-col cols="12">
        <v-form ref="form">
          <permission-management
            :headers="headers"
            :role_id="role_id"
            :desserts="desserts_module"
            @submit_form="submit_from_new_role"
            @on-delete-permission="on_delete_permision_item"
            @on-permission-change="on_permission_item_change"
          />
        </v-form>
      </v-col>
    </v-row>
    <v-footer color="transparent" style="margin-top: 120px">
      <v-row justify="center">
        <v-col cols="auto">
          <button-control
            color="black"
            text="ย้อนกลับ"
            width="100"
            @button-clicked="on_go_to_back"
          />
        </v-col>
        <v-col cols="auto">
          <button-control
            type="submit"
            @button-clicked="submit_from_new_role"
            color="secondary"
            text="ตกลง"
            width="100"
          />
        </v-col>
      </v-row>
    </v-footer>
  </v-container>
</template>

<script setup>
import RoleManagement from "../../components/forms/RoleManagement.vue";
import PermissionManagement from "@/components/forms/PermissionManagement.vue";
import ButtonControl from "@/components/controls/ButtonControl.vue";

import ActionService from "@/apis/ActionService";
import RoleService from "@/apis/RoleService";
import PermissionService from "@/apis/PermissionService";

import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
const { handlingErrorsMessage } = useErrorHandlingDialog();

import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const role_id = route.params.role_id;

import { useConfirmationDialog } from "@/components/dialogs/ConfirmationDialogService";
import { reactive } from "vue";
import { ref } from "vue";
const { showDialog } = useConfirmationDialog();

const form = ref(null);

const title = ref("");
const role_name = ref("");
const role_desc = ref("");

const action_all_mock = ref([]);
const permission_module_mock = ref({});

const headers = ref([]);
const desserts_module = reactive([]);
const role_permission_update = reactive({
  role_id: role_id,
  modules: [],
});

const handleFetchRoleById = async (role_id) => {
  try {
    const result_role = await RoleService.getRoleById(role_id);
    if (result_role.data.is_success) {
      const data = result_role.data.data;
      role_name.value = data.name;
      role_desc.value = data.description;
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

const handleFetchPermissionByRoleId = async (role_id) => {
  try {
    const result_permission = await PermissionService.getPermissionByRoleId(
      role_id
    );
    if (result_permission.data.is_success) {
      permission_module_mock.value = result_permission.data.data;
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

const handleFetchActions = async () => {
  try {
    const result_actions = await ActionService.getActionAll();
    if (result_actions.data.is_success) {
      action_all_mock.value = result_actions.data.data;
      headers.value = action_all_mock.value.map((action) => ({
        title: action.name,
        key: action.name,
      }));
      headers.value.unshift({ title: "Permission Module", key: "permission" });
      headers.value.push({ title: "Action", key: "action" });
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

const handleUpdatePermissionById = async () => {
  try {
    const result_actions = await PermissionService.updatedPermissionById(
      role_permission_update.role_id,
      role_permission_update.modules
    );
    if (result_actions.data.is_success) {
      router.push({ path: "/ListRolesPage" });
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
  await handleFetchActions();
  if (role_id) {
    console.log("Fetch role by role id: " + role_id + " this is update form");
    title.value = "Update Role & Permission";
    await handleFetchRoleById(role_id);
    await handleFetchPermissionByRoleId(role_id);
    generate_desserts();
  } else {
    console.log("Without fetch role this is new form");
    title.value = "Create new Role & Permission";
  }
});

const generate_desserts = () => {
  if (permission_module_mock.value.module) {
    permission_module_mock.value.module.forEach((item) => {
      const actions = [];
      let dessert = {
        permission: item.id,
      };
      action_all_mock.value.forEach((action) => {
        dessert[action.name] = item.action.some((obj) => obj.id === action.id);
        if (dessert[action.name] === true)
          actions.push({ action_id: action.id });
      });
      desserts_module.push(dessert);
      role_permission_update.modules.push({
        module_id: dessert.permission,
        action: actions,
      });
    });
  }
};

const submit_from_new_role = async () => {
  const validObj = await form.value.validate();
  if (!validObj.valid) return;
  if (!role_id) {
    const confirmed = await showDialog(
      "ยืนยันการบันทึก",
      'กรุณาตรวจสอบ\nคลิกปุ่ม"ตกลง"เพื่อดำเนินการ'
    );
    if (confirmed) {
      console.log("เพิ่มข้อมูล");
    } else {
      console.log("cancelled.");
    }
  } else {
    const confirmed = await showDialog(
      `บันทึกการเปลี่ยนแปลง\nRole & Permission`,
      'กรุณาตรวจสอบ\nคลิกปุ่ม"ตกลง"เพื่อดำเนินการ'
    );
    if (confirmed) {
      console.log("บันทึกการเปลี่ยนแปลง");
      await handleUpdatePermissionById();
    } else {
      console.log("cancelled.");
    }
  }
};

const on_permission_item_change = (item_permission) => {
  // console.log("on_permission_item_change: " + JSON.stringify(item_permission));
  role_permission_update.modules = [];
  item_permission.forEach((el) => {
    const actionArr = Object.keys(el);
    const actions = [];

    for (let index = 1; index < actionArr.length; index++) {
      const action_find = action_all_mock.value.find(
        (action) => action.name === actionArr[index]
      );
      if (el[actionArr[index]] === true) {
        if (action_find) actions.push({ action_id: action_find.id });
      }
    }
    role_permission_update.modules.push({
      module_id: el.permission,
      action: actions,
    });
  });
  console.log("new:", JSON.stringify(role_permission_update));
};

const on_delete_permision_item = (item_permission) => {
  const permissionIndex = desserts_module.findIndex(
    (el) => el.permission === item_permission.permission
  );
  if (permissionIndex > -1) desserts_module.splice(permissionIndex, 1);
};

const on_updated_role = (role) => {
  console.log("on_updated_role: ", role);
};

const on_go_to_back = () => {
  router.go(-1);
};
</script>
