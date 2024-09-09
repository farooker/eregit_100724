<template>
  <div>
    <v-row dense>
      <v-col cols="10">
        <v-row no-gutters>
          <v-col cols="4">
            <v-select
              v-model="filter.search_key"
              density="compact"
              class="rounded-s-lg"
              variant="solo"
              :items="selected_items.search_partail"
            />
          </v-col>
          <v-col cols="8">
            <v-row no-gutters>
              <v-divider vertical></v-divider>
              <v-text-field
                v-model="filter.search_value"
                density="compact"
                variant="solo"
                class="rounded-e-lg"
                placeholder="ค้นหา ชื่อบริษัท ,Contact owner"
                single-line
                hide-details
              ></v-text-field>
              <v-btn
                color="grey-lighten-2"
                height="40"
                rounded="0"
                class="rounded-e"
                @click.prevent="handleFetchUsers"
              >
                <v-icon size="25">mdi-magnify</v-icon>
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="2">
        <v-menu
          v-model="dialogFilter"
          :close-on-content-click="false"
          location="bottom"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              class="text-capitalize"
              color="grey-lighten-2"
              block
              height="40"
              v-bind="props"
            >
              Filter
              <v-icon right>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-card min-width="1200" elevation="5">
            <v-card-item class="pa-8">
              <v-row align-center>
                <v-col cols="3">
                  <v-select
                    v-model="filter.member_type_id"
                    density="compact"
                    variant="outlined"
                    placeholder="Member Type"
                    item-title="name"
                    :items="selected_items.search_member_type"
                    item-value="id"
                  />
                </v-col>
                <v-col cols="3">
                  <v-select
                    v-model="filter.role_id"
                    density="compact"
                    variant="outlined"
                    placeholder="Roles"
                    item-title="name"
                    item-value="id"
                    :items="selected_items.search_role"
                  />
                </v-col>
                <v-col cols="3">
                  <v-select
                    v-model="filter.is_active"
                    density="compact"
                    variant="outlined"
                    placeholder="Status"
                    :items="selected_items.search_status"
                    item-title="name"
                    item-value="id"
                  />
                </v-col>
                <v-col cols="3">
                  <v-btn
                    variant="text"
                    class="text-capitalize"
                    @click="handleFilterClear"
                  >
                    Clear All</v-btn
                  >
                </v-col>
              </v-row>
            </v-card-item>
          </v-card>
        </v-menu>
      </v-col>
    </v-row>
    <v-row justify="end" class="mt-2 mb-2">
      <v-col cols="2">
        <v-btn
          variant="outlined"
          block
          :loading="loading.tables"
          class="text-capitalize"
          @click="handleAddUserEvent"
        >
          <v-icon left>mdi-account-plus</v-icon>
          Add Users
        </v-btn>
      </v-col>
    </v-row>
    <UserTable
      class="mt-1"
      :items="content"
      :loading="loading.tables"
      @action-edit="handleEditUserEvent"
    />
    <PaginationControl
      class="mt-3"
      :value="filter.page"
      :length="filter.pageSize"
      @value="handlePaginationEvent"
    />
  </div>
</template>
<script setup>
// eslint-disable-next-line no-unused-vars
import { ref, watch, onMounted } from "vue";
import memberTypeService from "@/apis/MemberTypeService";
import roleService from "@/apis/RoleService";
import UserService from "@/apis/UserService";
import PaginationControl from "@/components/controls/PaginationControl";
import UserTable from "@/components/tables/UserTable.vue";
import paginationUtils from "@/utils/paginationUtils";

import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
const { handlingErrorsMessage } = useErrorHandlingDialog();

const emit = defineEmits(["is-title", "is-view"]);
const dialogFilter = ref(false);
const selected_items = ref({
  search_partail: ["Business Partner Name", "Company Name", "Contact Owner"],
  search_status: [
    {
      id: 0,
      name: "Inactive",
    },
    {
      id: 1,
      name: "Active",
    },
  ],
  search_member_type: [],
  search_role: [],
});
const loading = ref({
  memberType: false,
  roles: false,
  status: false,
  tables: false,
});
const filter = ref({
  search_key: "Business Partner Name",
  search_value: null,
  member_type_id: null,
  role_id: null,
  is_active: null,
  page: 0,
  pageSize: 0,
  offset: 0,
  limit: 10,
});
const content = ref([]);

onMounted(() => {
  emit("is-title", "");

  //paginationUtils.pageSize(4,15)
  //paginationUtils.pageIndex(0,4,15)
  handleLoadAllMemberType();
  handleLoadAllRole();
  handleFetchUsers();
});
const handleFilterClear = () => {
  filter.value.role_id = null;
  filter.value.member_type_id = null;
  filter.value.is_active = null;
  //filter.value.search_key= null;
};
// eslint-disable-next-line no-unused-vars
const handleLoadAllMemberType = async () => {
  try {
    loading.value.memberType = true;
    const response = await memberTypeService.getMemberTypeAll();
    if (response.data?.is_success) {
      selected_items.value.search_member_type = response.data.data;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  } finally {
    loading.value.memberType = false;
  }
};

// eslint-disable-next-line no-unused-vars
const handleLoadAllRole = async () => {
  try {
    loading.value.roles = true;
    const response = await roleService.getRoleAll();
    if (response.data?.is_success) {
      selected_items.value.search_role = response.data.data;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  } finally {
    loading.value.roles = false;
  }
};

const handleFetchUsers = async () => {
  try {
    loading.value.tables = true;
    content.value.tables = [];
    let sort_by = `id:desc`;
    if (filter.value.search_key && filter.value.search_value)
      `&search_key=${filter.value.search_key}`;
    if (filter.value.is_active)
      sort_by += `&is_active=${filter.value.is_active}`;
    if (filter.value.role_id) sort_by += `&role_id=${filter.value.role_id}`;
    if (filter.value.member_type_id)
      sort_by += `&member_type_id=${filter.value.member_type_id}`;
    if (filter.value.search_value)
      sort_by += `&search_value=${filter.value.search_value}`;
    const response = await UserService.getUserSearch(
      filter.value.offset,
      filter.value.limit,
      sort_by
    );
    if (response.data?.is_success) {
      const headers = response.headers;

      const itemsOffset = Number(headers["items-offset"]);
      const itemsLimit = Number(headers["items-limit"]);
      const itemsTotal = Number(headers["items-total"]);

      filter.value.offset = itemsOffset ?? 0;
      filter.value.limit = itemsLimit ?? 10;
      filter.value.pageSize =
        paginationUtils.pageSize(itemsLimit, itemsTotal) ?? 1;
      content.value = response.data?.data;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  } finally {
    loading.value.tables = false;
  }
};
const handlePaginationEvent = (page) => {
  filter.value.page = page;
  filter.value.offset = paginationUtils.pageOffset(page, filter.value.limit);
  handleFetchUsers();
};

const handleAddUserEvent = () => {
  const component = "user-add";
  const payload = "";
  emit("is-view", component, payload);
};

const handleEditUserEvent = (item) => {
  const component = "user-edit";
  const payload = item;
  emit("is-view", component, payload);
};
</script>
