<template>
  <v-menu v-model="menus_dialog" :close-on-content-click="false" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn class="text-capitalize" color="grey-lighten-2" block height="40" v-bind="props">
        Filter
        <v-icon right>mdi-chevron-down</v-icon>
      </v-btn>
    </template>
    <v-card min-width="1000" elevation="5">
      <v-card-item class="pa-2 mt-2">
        <v-row align-center dense>
          <v-col cols="8">
            <v-row align-center dense>
              <v-col cols="6">
                <v-select v-model="RoleId" :loading="loading" density="compact" variant="outlined" placeholder="Role" item-title="name"
                  :items="selected_items.roles" item-value="id" />
              </v-col>
              <v-col cols="6">
                <datePickerRangeControl :from="DateFrom" :to="DateTo" @from="DateFrom = $event"
                  @to="DateTo = $event" />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="1">
            <v-btn class="text-none" variant="text" @click="clearAll">
              <p class="text-decoration-underline">
                Clear all</p>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-item>
    </v-card>
  </v-menu>
</template>
<script setup>
/*eslint-disable no-unused-vars  */
import { ref, onMounted,computed,defineProps } from 'vue';
import roleService from '@/apis/RoleService';
import datePickerRangeControl from '@/components/controls/DatePickerRangeControl.vue'
import { useErrorHandlingDialog } from '@/components/dialogs/ExceptionHandleDialogService'
const { handlingErrorsMessage } = useErrorHandlingDialog();
const emit = defineEmits(["roles_id","date_from","date_to"]);
const props = defineProps({
  roles_id: {
    type: String,
    default: null,
  },
  date_from: {
    type: String,
    default: null,
  },
  date_to: {
    type: String,
    default: null,
  },
});

const RoleId = computed({
    get() {   return props.roles_id; },
    set(value) {  emit("roles_id", value) }
});
const DateFrom = computed({
    get() {  return props.date_from; },
    set(value) {  emit("date_from", value) }
});
const DateTo = computed({
    get() {  return props.date_to; },
    set(value) {  emit("date_to", value) }
});

const menus_dialog = ref(false);
const selected_items = ref({
  roles: []
});
const loading = ref(false);
onMounted(async () => {
  loading.value = true;
  const promise1 = await getRoles();
  Promise.all([promise1])
  loading.value = false;

});
const getRoles = async () => {
  try {
    const response = await roleService.getRoleAll();
    if (response.data?.is_success) {
      selected_items.value.roles= response.data.data
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  }
}
const clearAll = () =>{
  RoleId.value = null;
  DateFrom.value = null;
  DateTo.value = null;
}
</script>

