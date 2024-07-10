<template>
    <v-card class="elevation-1">
      <v-card-text>
        <v-form ref="form">
          <v-row no-gutters dense>
            <v-col>
              <h4>Email</h4>
            </v-col>
            <v-col cols="12">
              <v-text-field variant="outlined" v-model="item_input.email" placeholder="Email"
                :rules="rules_valid.email" density="compact"></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters dense>
            <v-col>
              <h4>User type</h4>
            </v-col>
            <v-col cols="12">
              <v-select
                variant="outlined"
                density="compact"
                :disabled="loading.memberType"
                :loading="loading.memberType"
                :items="selected_items.memberType"
                :rules="rules_valid.memberType"
                placeholder="User type"
                item-title="name"
                item-value="id"
              ></v-select>
              <!-- <v-text-field variant="outlined" v-model="form.userType" placeholder="User Type"
                :rules="[(v) => !!v || 'User Type is required']" required density="compact"></v-text-field> -->
            </v-col>
          </v-row>
          <!-- <v-row no-gutters dense>
            <v-col>
              <h4>Company</h4>
            </v-col>
            <v-col cols="12">
              <v-select
                variant="outlined"
                density="compact"
                :disabled="loading.comapanies"
                :loading="loading.comapanies"
                :items="items.comapanies"
                item-title="name_th"
                item-value="id"
              ></v-select>
              <v-text-field variant="outlined" v-model="form.company" placeholder="company"
                :rules="[(v) => !!v || 'Comapny is required']" required density="compact"></v-text-field>
            </v-col>
          </v-row> -->
          <v-row no-gutters dense>
            <v-col>
              <h4>Role</h4>
            </v-col>
            <v-col cols="12">
              <v-select
                variant="outlined"
                density="compact"
                placeholder="Role"
                :disabled="loading.role"
                :loading="loading.role"
                :items="selected_items.role"
                :rules="rules_valid.role"
                item-title="name"
                item-value="id"
              ></v-select>
              <!-- <v-text-field variant="outlined" v-model="form.role" placeholder="role"
                :rules="[(v) => !!v || 'Role is required']" required density="compact"></v-text-field> -->
            </v-col>
          </v-row>
          <v-row no-gutters dense>
            <v-col>
              <h4>Team</h4>
            </v-col>
            <v-col cols="12">
              <v-select
                variant="outlined"
                density="compact"
                placeholder="Team"
                :disabled="loading.team"
                :loading="loading.team"
                :items="selected_items.team"
                :rules="rules_valid.team"
                item-title="name_th"
                item-value="id"
              ></v-select>
              <!-- <v-text-field variant="outlined" v-model="form.team" placeholder="Team"
                :rules="[(v) => !!v || 'Team is required']" required density="compact"></v-text-field> -->
            </v-col>
          </v-row>
          <!-- <v-row v-if="p_index > -1" no-gutters dense>
            <v-col>
              <h4>Status</h4>
            </v-col>
            <v-col cols="12">
              <v-checkbox v-model="item_input.status"></v-checkbox>
            </v-col>
          </v-row> -->
        </v-form>
      </v-card-text>
    </v-card>
    <div class="text-center mt-5">
      <v-btn rounded class="ma-2" color="black"  style="width: 100px;" @click="handleDismissEvent">
        <strong>ยกเลิก</strong>
      </v-btn>
      <v-btn rounded class="ma-2" color="secondary" style="width: 100px;" @click="handleSubmitEvent">
        <strong>ตกลง</strong>
      </v-btn>
    </div>
</template>

<script setup>
import memberTypeService from '@/apis/MemberTypeService';
import roleService from '@/apis/RoleService';
import compnayService from '@/apis/CompnayService';
import teamService from '@/apis/TeamService';
import { ref, reactive, onMounted  } from "vue";

//import { useConfirmationDialog } from '@/components/dialogs/ConfirmationDialogService'
import { useErrorHandlingDialog } from '@/components/dialogs/ExceptionHandleDialogService'

const emit = defineEmits(["is-title","is-view"]);
const { handlingErrorsMessage } = useErrorHandlingDialog();
// const { showDialog } = useConfirmationDialog();

const props = defineProps({
  index: {
    type: Number,
    default: -1,
  },
  item: {
    type: Object,
    default: () => {}
  },
});

//const p_index = reactive(props.index);
const form = ref(null);
//const valid = ref(false);
const rules_valid = ref({
  email: [
    (v) => !!v || "กรุณากรอกข้อมูลให้ครบ",
    (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Email format ไม่ถูกต้อง",
  ],
  memberType:  [ (v) => !!v || "กรุณากรอกข้อมูลให้ครบ"],
  role:  [ (v) => !!v || "กรุณากรอกข้อมูลให้ครบ"],
  team:  [ (v) => !!v || "กรุณากรอกข้อมูลให้ครบ"]
})
const loading =ref({
  submit :false,
  role:false,
  team:false,
  comapanies :false,
  memberType:false,
})
const selected_items = ref({
  role:[],
  comapanies :[],
  memberType:[],
  team:[]
})
const item_input = reactive({
  email: "",
  memberTypeId: "",
  company: "",
  roleId: "",
  teamId: "",
  status: false,
});

onMounted (() => {
    if (props.index  == -1) {
      emit('is-title', "Add User");
    } else {
      console.log(props.index);
      emit('is-title', "Edit User");
    }


    onLoadedCompaniesAll();
    onLoadedMemberTypeAll();
    onLoadedRoleAll();
    onLoadedTeamAll();
});

// eslint-disable-next-line no-unused-vars
const onLoadedMemberTypeAll = async() =>{
  try {
      loading.value.memberType = true;
      const response = await memberTypeService.getMemberTypeAll();
      if (response.data?.is_success) {
        selected_items.value.memberType = response.data.data
      }
    } catch (e) {
      if (e.response) {
        const val = e.response.data
        handlingErrorsMessage(val.message, val?.data.error);
        return;
      }
      handlingErrorsMessage("unknown", e.message);
    } finally {
      loading.value.memberType = false;
    }
}
// eslint-disable-next-line no-unused-vars
const onLoadedCompaniesAll = async () =>{
  try {
      loading.value.comapanies = true;
      const response = await compnayService.getCompanyAll();
      if (response.data?.is_success) {
        selected_items.value.comapanies = response.data.data
      }
    } catch (e) {
      if (e.response) {
        const val = e.response.data
        handlingErrorsMessage(val.message, val?.data.error);
        return;
      }
      handlingErrorsMessage("unknown", e.message);
    } finally {
      loading.value.comapanies = false;
    }
}
// eslint-disable-next-line no-unused-vars
const onLoadedRoleAll = async () =>{
  try {
      loading.value.role = true;
      const response = await roleService.getRoleAll();
      if (response.data?.is_success) {
        selected_items.value.role = response.data.data
      }
    } catch (e) {
      if (e.response) {
        const val = e.response.data
        handlingErrorsMessage(val.message, val?.data.error);
        return;
      }
      handlingErrorsMessage("unknown", e.message);
    } finally {
      loading.value.role = false;
    }
}
const onLoadedTeamAll = async () =>{
  try {
      loading.value.team = true;
      const response = await teamService.getTeamAll();
      if (response.data?.is_success) {
        selected_items.value.team = response.data.data
      }
    } catch (e) {
      if (e.response) {
        const val = e.response.data
        handlingErrorsMessage(val.message, val?.data.error);
        return;
      }
      handlingErrorsMessage("unknown", e.message);
    } finally {
      loading.value.team = false;
    }
}


const handleDismissEvent =() =>{
    emit("is-view",'user-main')
}
const handleSubmitEvent = async (e) => {
  e.preventDefault();
  if (form.value && form.value.validate()) {
    // Form is valid, you can perform further actions
    console.log('Form is valid');
  } else {
    // Form is not valid, handle accordingly
    console.log('Form is not valid');
  }
  // const { valid } = await this.$refs.form.validate()

  // if (valid) alert('Form is valid')
  //e.preventDefault()
//   const form = this.$refs.form;
//  if (form.validate()) {
//         // Form is valid, you can perform further actions
//         console.log('Form is valid');
//       } else {
//         // Form is not valid, handle accordingly
//         console.log('Form is not valid');
//     }
  // const confirmed = await showDialog('Confirm Action','Are you sure you want to proceed?');
  //     if (confirmed) {
  //       console.log('Action confirmed!');
  //     } else {
  //       console.log('Action cancelled.');
  //     }
  // if (valid.value) {
  //   console.log(form);
  // }
};
</script>
