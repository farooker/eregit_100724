<template>
  <div>
    <v-row dense>
      <v-col cols="10">
        <v-row no-gutters>
          <v-col cols="4">
            <v-select v-model="filter.search_key" density="compact" class="rounded-s-lg" variant="solo" flat
              :items="items.topics" item-title="name" item-value="id" />
          </v-col>
          <v-col cols="8">
            <v-row no-gutters>
              <v-divider vertical></v-divider>
              <v-text-field v-model="filter.search_value" density="compact" variant="solo" flat class="rounded-e-lg"
                placeholder="ค้นหา ชื่อบริษัท ,Contact owner" single-line
                hide-details></v-text-field>
              <v-btn color="grey-lighten-2" height="40" variant="flat" rounded="0" class="rounded-e" @click="handleFetchUsers">
                <v-icon size="25">mdi-magnify</v-icon>
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="2">
        <v-menu v-model="dialogFilter" :close-on-content-click="false" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn class="text-capitalize" color="grey-lighten-2" block height="40" variant="flat" v-bind="props">
              Filter
              <v-icon right>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-card min-width="1200" elevation="5">
            <v-card-item class="pa-8">
              <v-row align-center>
                <v-col cols="3">
                  <v-select v-model="filter.member_type_id" density="compact" variant="outlined" placeholder="Member Type"
                    item-title="name" :items="items.memberType" item-value="id" />
                </v-col>
                <v-col cols="3">
                  <v-select v-model="filter.role_id" density="compact" variant="outlined" placeholder="Roles"
                    item-title="name" item-value="id" :items="items.roles" />
                </v-col>
                <v-col cols="3">
                  <v-select v-model="filter.is_active" density="compact" variant="outlined" placeholder="Status"
                    :items="items.status" item-title="name" item-value="id" />
                </v-col>
                <v-col cols="3">
                  <v-btn variant="text" class="text-capitalize" @click="handleFilterClear"> Clear All</v-btn>
                </v-col>
              </v-row>
            </v-card-item>
          </v-card>
        </v-menu>
      </v-col>
    </v-row>
    <v-row justify="end" class="mt-2 mb-2">
      <v-col cols="2">
        <v-btn variant="outlined" block :loading="loading.tables" class="text-capitalize" @click="handleAddUserEvent">
          <v-icon left>mdi-account-plus</v-icon>
          Add Users
        </v-btn>
      </v-col>
    </v-row>
    <UserTable class="mt-1" :items="items.tables" :loading="loading.tables" @action-edit="handleEditUserEvent" />
    <PaginationControl class="mt-3" :value="filter.offset" @value="handlePaginationEvent" />
  </div>
</template>
<script setup>
// eslint-disable-next-line no-unused-vars
import { ref, watch, onMounted } from 'vue';
import memberTypeService from '@/apis/MemberTypeService';
import roleService from '@/apis/RoleService';
import UserService from '@/apis/UserService';
import PaginationControl from '@/components/controls/PaginationControl'
import UserTable from '@/components/tables/UserTable.vue'

import { useErrorHandlingDialog } from '@/components/dialogs/ExceptionHandleDialogService'
const { handlingErrorsMessage } = useErrorHandlingDialog();

const emit = defineEmits(["is-title", 'is-view']);
const dialogFilter = ref(false)
const items = ref({
  topics:[
    {
      id: 'business_partner_name',
      name: 'Business Partner Name'
    },{
      id: 'company_name',
      name: 'Company Name'
    },{
      id: 'contact_owner',
      name: 'Contact Owner'
    }
  ],
  memberType: [],
  roles: [],
  status: [
    {
      id: 0,
      name: 'Inactive'
    },
    {
      id: 1,
      name: 'Active'
    }
  ],
  tables: []
});
const loading = ref({
  memberType: false,
  roles: false,
  status: false,
  tables: false
});
const filter = ref({
  search_key: 'business_partner_name',
  search_value: null,
  member_type_id: null,
  role_id: null,
  is_active: null,
  offset: 1,
  limit: 10,
});

onMounted(() => {
  emit('is-title', "");
  handleLoadAllMemberType();
  handleLoadAllRole();
  handleFetchUsers();

});
const handleFilterClear = ()=>{
    filter.value.role_id = null;
    filter.value.member_type_id= null;
    filter.value.search_key= null;
    filter.value.is_active= null;
}
const handleLoadAllMemberType = async () => {
  try {
    loading.value.memberType = true;
    const response = await memberTypeService.getMemberTypeAll();
    if (response.data?.is_success) {
      items.value.memberType = response.data.data
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

const handleLoadAllRole = async () => {
  try {
    loading.value.roles = true;
    const response = await roleService.getRoleAll();
    if (response.data?.is_success) {
      items.value.roles = response.data.data
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  } finally {
    loading.value.roles = false;
  }
}

const handleFetchUsers = async () => {
  try {
    loading.value.tables = true;
    items.value.tables = [];
    const sort_by =  `id:desc&search_key=${filter.value.search_key}&search_value=${filter.value.search_value}&member_type_id=${filter.value.member_type_id}&role_id=${filter.value.role_id}&is_active=${filter.value.is_active}`
    const response = await UserService.getUserSearch(filter.value.offset, filter.value.limit, sort_by);
    items.value.tables = response.data?.data
  } catch (e) {
    if (e.response) {
      const val = e.response.data
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  } finally {
    loading.value.tables = false;
  }
}
const handlePaginationEvent = (offset) => {
  filter.value.offset = offset;
  handleFetchUsers();
}


const handleAddUserEvent = () => {
  const component = "user-add";
  const payload = "";
  emit("is-view", component, payload)
}

const handleEditUserEvent = (item) => {
  const component = "user-edit";
  const payload = item;
  emit("is-view", component, payload)
}
</script>



