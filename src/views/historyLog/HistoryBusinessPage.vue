<template>
  <v-container fluid>
    <h3>History Log {{ bussinessId }}</h3>
    <history-table-view
      :headers="[
        'Date And Time',
        'Business Unit',
        'Change Action',
        'Change By',
      ]"
      :desserts="items_bussiness_history"
      @on-sort="handleSort"
    />
    <v-footer color="transparent" style="margin-top: 120px">
      <v-row
        class="d-flex justify-center"
        align-content="center"
        align="center"
      >
        <v-col cols="12" align-self="center" class="text-center">
          <button-control
            color="black"
            text="ย้อนกลับ"
            width="100"
            @button-clicked="on_clicked_go_back"
          />
        </v-col>
      </v-row>
    </v-footer>
  </v-container>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import ButtonControl from "../../components/controls/ButtonControl.vue";
import HistoryLogService from "@/apis/HistoryLogService";
import HistoryTableView from "@/components/tables/HistoryTableView.vue";
import { ref, onMounted } from "vue";
import BusinessUnitService from "@/apis/BusinessUnitService";

const route = useRoute();
const router = useRouter();

const sortby = ref("desc");
const bussinessId = ref(route.query.bussiness_id);
const item_bussiness_by_id = ref({});
let items_bussiness_history = ref([]);

onMounted(async () => {
  await handleLoadBusinessUnityId();
  await handleLoadBusinessUnitHistory();
});

const handleLoadBusinessUnityId = async () => {
  try {
    const result_ = await BusinessUnitService.getBusinessById(
      bussinessId.value
    );
    if (result_.data.is_success) {
      item_bussiness_by_id.value = result_.data.data;
    } else {
      // Failed
    }
  } catch (error) {
    // Failed
  }
};

const handleLoadBusinessUnitHistory = async () => {
  try {
    const result_ = await HistoryLogService.getAllUserChangeLog(sortby.value, 13, bussinessId.value);
    if (result_.data.is_success) {
      const items = [];
      result_.data.data.forEach((el) => {
        items.push({
          created_at: el.created_at,
          type: item_bussiness_by_id.value.name_en || 'None',
          changed_field: el.changed_field,
          changed_value: el.changed_value,
          user_email: el.user.email,
        });
        items_bussiness_history.value = items;
      });
    } else {
      // Failed
    }
  } catch (error) {
    // Failed
  }
};

const on_clicked_go_back = () => {
  router.go(-1);
};

const handleSort = async (tagSort) => {
  sortby.value = tagSort;
  await handleLoadBusinessUnitHistory();
};
</script>