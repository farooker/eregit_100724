<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col>
            <permission-table
              :headers="props.headers"
              :desserts="items_permission"
              :is-read-only="false"
              @on-item-change="on_permission_change"
              @on-item-delete="on_permission_delete"
            />
          </v-col>
        </v-row>
        <v-row>
          <button-control
            style="margin: 6px"
            color="primary"
            icon="mdi mdi-plus"
            text="Add Module"
            @button-clicked="on_clicked_add_module"
          />
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import PermissionTable from "../tables/PermissionTable.vue";
import ButtonControl from "../controls/ButtonControl.vue";

import { useConfirmationDialog } from "@/components/dialogs/ConfirmationDialogService";
const { showDialog } = useConfirmationDialog();

import { reactive } from "vue";

const props = defineProps({
  headers: {
    type: Array,
    default: () => [
      { title: "Permission Module", key: "permission" },
      { title: "View", key: "view" },
      { title: "Create", key: "created" },
      { title: "Update", key: "updated" },
      { title: "Delete", key: "deleted" },
      { title: "Action", key: "action" },
    ],
  },
  desserts: {
    type: Array,
    default: () => [],
  },
  role_id: {
    type: String,
    default: null,
  },
});

const items_permission = reactive(props.desserts);


const emit = defineEmits(["on-delete-permission", "on-permission-change"]);

const on_clicked_add_module = () => {
  const item_allow = {}
  props.headers.forEach((el) => {
    item_allow[el.key] = false
  })
  item_allow.permission = null
  items_permission.push(item_allow);
};

const on_permission_change = (new_items_permission) => {
  emit("on-permission-change", new_items_permission);
};

const on_permission_delete = async (deleted_item_permission) => {
  if (!props.role_id) {
    const index_remove = items_permission.findIndex(
      (el) => el.permission === deleted_item_permission.permission
    );
    if (index_remove > -1) items_permission.splice(index_remove, 1);
  } else {
    const confirmed = await showDialog(
      `ยืนยันการลบ Permission ?`,
      `กรุณาตรวจสอบคุณไม่ามารถกลับมาแก้ไขได้\nคลิกปุ่ม "ตกลง" เพื่อดำเนิดนการ`
    );
    if (confirmed) {
      emit("on-delete-permission", deleted_item_permission);
    }
  }
};
</script>
