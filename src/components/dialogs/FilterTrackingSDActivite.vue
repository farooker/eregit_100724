<template>
  <v-menu v-model="menus_dialog" :close-on-content-click="false" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn class="text-capitalize" color="grey-lighten-2" block height="40" v-bind="props">
        Filter
        <v-icon right>mdi-chevron-down</v-icon>
      </v-btn>
    </template>
    <v-card min-width="1400" elevation="5">
      <v-card-item class="pa-2 mt-2">
        <v-row align-center dense>
          <v-col cols="11">
            <v-row align-center dense>
              <v-col cols="2">
                <v-select v-model="CompaniesId" :loading="loading" density="compact" variant="outlined" placeholder="Company Code" item-title="company_code"
                  :items="selected_items.companies" item-value="id" />
              </v-col>
              <v-col cols="2">
                <v-select v-model="BuOwnersId"  :loading="loading" density="compact" variant="outlined" placeholder="BU Owner" item-title="name_th" item-value="id"
                  :items="selected_items.bu_owners" />
              </v-col>
              <v-col cols="2">
                <v-select v-model="ActivitiesId"  :loading="loading" density="compact" variant="outlined" placeholder="Activities" :items="selected_items.activities"
                  item-title="activity_name" item-value="activity_id" />
              </v-col>
              <v-col cols="2">
                <v-select v-model="Status"  :loading="loading" density="compact" variant="outlined" placeholder="Status" :items="selected_items.status"
                  item-title="name" item-value="id" />
              </v-col>
              <v-col cols="2">
                <v-select v-model="CompCategoriesId"  :loading="loading" density="compact" variant="outlined" placeholder="Company Category"
                  :items="selected_items.comp_categories" item-title="name_th" item-value="id" />
              </v-col>
              <v-col cols="2">
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
import compnayService from '@/apis/CompnayService';
import businessUnitService from '@/apis/BusinessUnitService';
import datePickerRangeControl from '@/components/controls/DatePickerRangeControl.vue'
import { useErrorHandlingDialog } from '@/components/dialogs/ExceptionHandleDialogService'
const { handlingErrorsMessage } = useErrorHandlingDialog();
const emit = defineEmits(["companies_id","bu_owners_id","activities_id","status","comp_categories_id","date_from","date_to"]);
const props = defineProps({
  companies_id: {
    type: String,
    default: null,
  },
  bu_owners_id: {
    type: String,
    default: null,
  },
  activities_id: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    default: null,
  },
  comp_categories_id: {
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

const CompaniesId = computed({
    get() {   return props.companies_id; },
    set(value) {  emit("companies_id", value) }
});

const BuOwnersId = computed({
    get() {   return props.bu_owners_id; },
    set(value) {  emit("bu_owners_id", value) }
});
const ActivitiesId = computed({
    get() {   return props.activities_id; },
    set(value) {  emit("activities_id", value) }
});
const Status = computed({
    get() {   return props.status; },
    set(value) {  emit("status", value) }
});
const CompCategoriesId = computed({
    get() {  return props.comp_categories_id; },
    set(value) {  emit("comp_categories_id", value) }
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
  companies: [],
  bu_owners: [],
  activities: [
    {
      activity_id: 1,
      activity_name: 'RSP Policy'
    },
    {
      activity_id: 2,
      activity_name: 'Survey'
    },
    {
      activity_id: 3,
      activity_name: 'Traning'
    }
  ],
  status: ['initial', 'inprogress', 'completed'],
  comp_categories: []
});
const loading = ref(false);
// const loading = ref({
//   companies: false,
//   comp_categories: false,
//   businesUnit: false
// })


onMounted(async () => {
  loading.value = true;
  const promise1 = await getCompanies();
  const promise2 = await getBusinessUnit();
  const promise3 = await getCompaniesCategories();
  Promise.all([promise1, promise2, promise3])
  loading.value = false;

});
const getCompanies = async () => {
  try {
   // loading.value.roles = true;
    const response = await compnayService.getCompanyAll();
    if (response.data?.is_success) {
      selected_items.value.companies = response.data.data
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  } finally {
   // loading.value.roles = false;
  }
}
const getBusinessUnit = async () => {
  try {
    //loading.value.businesUnit = true;
    const response = await businessUnitService.getBusinesUnitAll();
    if (response.data?.is_success) {
      selected_items.value.bu_owners = response.data.data
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  } finally {
    //loading.value.businesUnit = false;
  }
}
const getCompaniesCategories = async () => {
  try {
   //loading.value.comp_categories = true;
    const response = await compnayService.getCompanyCategoriesAll();
    if (response.data?.is_success) {
      selected_items.value.comp_categories = response.data.data
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  } finally {
    //loading.value.comp_categories = false;
  }
}
const clearAll = () =>{
  CompaniesId.value = null;
  BuOwnersId.value = null;
  ActivitiesId.value = null;
  Status.value = null;
  CompCategoriesId.value = null;
  DateFrom.value = null;
  DateTo.value = null;
}
</script>

