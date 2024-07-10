<template>
  <v-container fluid>
    <h3>User Management</h3>
    <v-row justify="center">
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
      <permission-management
        :headers="headers"
        :role_id="role_id"
        :desserts="desserts_module"
        @submit_form="submit_from_new_role"
        @on-delete-permission="on_delete_permision_item_in_db"
        @on-permission-change="on_permission_item_change"
      />
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

import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const role_id = route.params.role_id;

import { useConfirmationDialog } from "@/components/dialogs/ConfirmationDialogService";
import { reactive } from "vue";
import { ref } from "vue";
const { showDialog } = useConfirmationDialog();

const router = useRouter();

const desserts_module = reactive([]);
const title = ref("");
const role_name = ref("");
const role_desc = ref("");
let headers = ref([]);
let action_all_mock = ref([]);
let roles_mock = ref({});
let permission_module_mock = ref({});

const handleFetchRoleById = async (role_id) => {
  try {
    const result_role = await RoleService.getRoleById(role_id);
    if (result_role.data.is_success) {
      roles_mock.value = result_role.data.data;
    } else {
      // Failed
    }
  } catch (error) {
    // Failed
  }
};

const handleFetchPermissionByRoleId = async (role_id) => {
  try {
    const result_permission = await PermissionService.getPermissionByRoleId(
      role_id
    );
    if (result_permission.data.is_success) {
      permission_module_mock.value = {
        role_id: 1,
        module: [
          {
            id: 6,
            name_th: "รายการพาร์ทเนอร์",
            name_en: "Business partner list",
            description: null,
            action: [
              {
                id: 1,
                name: "add",
                description: null,
              },
              {
                id: 2,
                name: "get",
                description: null,
              },
            ],
          },
          {
            id: 1,
            name_th: "สร้างใบสมัครใหม่",
            name_en: "Create new register form",
            description: null,
            action: [
              {
                id: 1,
                name: "add",
                description: null,
              },
            ],
          },
        ],
      };
    } else {
      // Failed
    }
  } catch (error) {
    // Failed
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
    // Failed
  }
};

onMounted(async () => {
  await handleFetchActions();
  if (role_id) {
    console.log("Fetch role by role id: " + role_id + " this is update form");
    title.value = "Update Role & Permission";
    await handleFetchRoleById(role_id);
    await handleFetchPermissionByRoleId(role_id);
    role_name.value = roles_mock.value.name;
    role_desc.value = roles_mock.value.description;
    generate_desserts();
  } else {
    console.log("Without fetch role this is new form");
    title.value = "Create new Role & Permission";
  }
});

const generate_desserts = () => {
  if (permission_module_mock.value.module) {
    permission_module_mock.value.module.forEach((item) => {
      let dessert = {
        permission: item.id,
      };
      action_all_mock.value.forEach((action) => {
        dessert[action.name] = item.action.some((obj) => obj.id === action.id);
      });
      desserts_module.push(dessert);
    });
  }
};

const submit_from_new_role = async () => {
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
    } else {
      console.log("cancelled.");
    }
  }
};

const on_permission_item_change = (item_permission) => {
  console.log("on_permission_item_change: " + JSON.stringify(item_permission));
};

const on_delete_permision_item_in_db = (item_permission) => {
  console.log(
    "on_delete_permision_item_in_db: " + JSON.stringify(item_permission)
  );
};

const on_updated_role = (role) => {
  console.log("on_updated_role: ", role);
};

const on_go_to_back = () => {
  router.go(-1);
};
</script>
