<template>
  <v-card class="elevation-1">
    <v-card-text>
      <v-form ref="form">
        <v-row no-gutters dense>
          <v-col>
            <h4>Email</h4>
          </v-col>
          <v-col cols="12">
            <v-text-field
              variant="outlined"
              v-model="input_data.email"
              placeholder="Email"
              :rules="rules_valid.email"
              density="compact"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row no-gutters dense>
          <v-col>
            <h4>Role</h4>
          </v-col>
          <v-col cols="12">
            <v-select
              variant="outlined"
              v-model="input_data.role"
              density="compact"
              placeholder="Role"
              :items="roles_items_selection"
              item-title="name"
              item-value="id"
            ></v-select>
            <!-- <v-text-field variant="outlined" v-model="form.role" placeholder="role"
                :rules="[(v) => !!v || 'Role is required']" required density="compact"></v-text-field> -->
          </v-col>
        </v-row>

        <v-row no-gutters densec v-if="props.id">
          <v-col>
            <h4>Status</h4>
          </v-col>
          <v-col cols="12">
            <v-select
              variant="outlined"
              v-model="input_data.status"
              density="compact"
              :items="status_items_selection"
              item-title="title"
              item-value="value"
            ></v-select>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
  <div class="text-center mt-5">
    <v-btn
      rounded
      class="ma-2"
      color="black"
      style="width: 100px"
      @click="handleDismissEvent"
    >
      <strong>ยกเลิก</strong>
    </v-btn>
    <v-btn
      rounded
      class="ma-2"
      color="secondary"
      style="width: 100px"
      @click="handleSubmitEvent"
    >
      <strong>ตกลง</strong>
    </v-btn>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";

import roleService from "@/apis/RoleService";
import UserService from '@/apis/UserService';

import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
const { handlingErrorsMessage } = useErrorHandlingDialog();

const status_items_selection = [
  { value: true, title: "Active" },
  { value: false, title: "InActive" },
];

const emit = defineEmits(["is-view"]);

const props = defineProps({
  id: {
    type: String,
    default: null,
  },
});

const form = ref(null);

const input_data = ref({
  email: "",
  role: "",
  status: '',
});

const roles_items_selection = ref('');

onBeforeMount(async () => {
  await onLoadedRoleAll();
  if (props.id) {
    await onFatchUserById(props.id);
  }
});

const rules_valid = ref({
  email: [
    (v) => !!v || "กรุณากรอกข้อมูลให้ครบ",
    (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Email format ไม่ถูกต้อง",
  ],
  memberType: [(v) => !!v || "กรุณากรอกข้อมูลให้ครบ"],
  role: [(v) => !!v || "กรุณากรอกข้อมูลให้ครบ"],
  team: [(v) => !!v || "กรุณากรอกข้อมูลให้ครบ"],
});

const onLoadedRoleAll = async () => {
  try {
    const response = await roleService.getRoleAll();
    if (response.data?.is_success) {
      roles_items_selection.value = response.data.data;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  }
};

const onFatchUserById = async (id) => {
  try {
   const response = await UserService.getUserById(id);
    if (response.data?.is_success) {
      console.log(JSON.stringify(response.data?.data))
    }
  } catch (e) {
 if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  }
};

const handleSubmitEvent = async (e) => {
  e.preventDefault();
  if (form.value && form.value.validate()) {
    // Form is valid, you can perform further actions
    console.log("Form is valid");
  } else {
    // Form is not valid, handle accordingly
    console.log("Form is not valid");
  }
};

const handleDismissEvent = () => {
  emit("is-view", "user-main");
};
</script>
