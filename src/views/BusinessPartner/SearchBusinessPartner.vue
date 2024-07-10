<template>
  <v-container>
    <div class="box-froms">
      <div class="text-center">
      <h1 class="pa-4 ma-4">กรอกข้อมูลบริษัท</h1>
    </div>
    <div class="my-5">
      <h4 class="mb-2">เลขประจำผู้เสียภาษีอากร/ เลขบัตรประชาชน</h4>
      <v-text-field
        v-model="tax_id"
        type="number"
        density="compact"
        variant="solo"
        class="rounded-e-lg"
        placeholder="ตัวอย่าง 1234567890123"
        single-line
        hide-details
      ></v-text-field>
    </div>

    <div class="my-5">
      <h4 class="mb-2">ชื่อบริษัท</h4>
      <v-text-field
        v-model="business_partner_name"
        density="compact"
        variant="solo"
        style="padding: 0px"
        class="rounded-e-lg"
        placeholder="ตัวอย่าง บริษัท เฟรเซอร์ส พร็อพเพอร์ตี้ (ประเทศไทย) จำกัด (มหาชน)"
        single-line
        hide-details
      ></v-text-field>
    </div>
        <v-btn
          @click="getSearchBusinessPartner"
          block
          style="min-width: 100px; margin: 0 auto;"
          class="text-capitalize rounded-pill"
          color="#ab2328"
        >
          ค้นหา
        </v-btn>
    <!-- {{ content.items }} -->
    <div v-if="content.items.length > 0 && current_view === 2">
      <BusinessPartnerTable
        class="mt-5"
        :items="content.items"
        :loading="loading.items"
        :selected="selected_checked[`${filter.page - 1}`]"
        @selected="selected_checked[`${filter.page - 1}`] = $event"
      />
      <PaginationControl
        class="mt-3"
        :value="filter.page"
        :length="filter.pageSize"
        @value="handlePaginationEvent"
      />
    </div>
    <!--ไม่เจอ-->
    <!-- {{ current_view }} -->
    <v-card
      v-if="content.items.length === 0 && current_view === 2 && !loading.items"
      class="black--text text-center outlined pa-5 mt-5"
      style="border-radius: 10px; box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; border: 1px solid #ed1c24;"
      title="ไม่มีข้อมูลคู่ค้าในระบบ สามารถสร้างฟอร์มการลงทะเบียนคู่ค้าได้"
      color="red-lighten-5"
      dark
      outlined
    >
      <v-row justify="center" align="center" class="mt-2 mb-2" dense>
        <v-col cols="auto">
          <v-btn
            :to="{
              name: 'GenerateLinkPage',
              query: {
                taxpayer_id_number: tax_id,
                name_th: business_partner_name,
              },
            }"
            block
            class="text-capitalize rounded-pill"
            color="red"
            >Create Form</v-btn
          >
        </v-col>
      </v-row>
    </v-card>
    </div>

  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import paginationUtils from "@/utils/paginationUtils";
import PaginationControl from "@/components/controls/PaginationControl";
// import { useRouter } from "vue-router";
import BusinessPartnerTable from "@/components/tables/businesspartner/BusinessPartnerTable.vue";
import PartnerService from "@/apis/PartnerServive";
// import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
// const { handlingErrorsMessage } = useErrorHandlingDialog();

const tax_id = ref("");
const business_partner_name = ref("");
let current_view = ref(1);
const selected_checked = ref([]);
const filter = ref({
  // search_key: "",
  // search_value: null,
  companies_id: null,
  role_id: null,
  bu_owners_id: null,
  affiliate_id: null,
  partner_type_id: null,
  comp_categories_id: null,
  date_from: null,
  date_to: null,
  offset: 0,
  limit: 10,
  page: 1,
  pageSize: 1,
});
const loading = ref({
  registered: false,
  report: false,
  items: false,
});
const content = ref({
  items: [],
});

const search_key = computed(() => {
  if (tax_id.value !== "")
  return { search_key: "tax_id", value: tax_id.value };

  if (business_partner_name.value !== "")
    return {
      search_key: "business_partner_name",
      value: business_partner_name.value,
    };
  return { search_key: null, value: null };
});

onMounted(() => {
  // getSearchBusinessPartner();
});

const getSearchBusinessPartner = async () => {
  try {
    loading.value.items = true;
    content.value.items = [];
    const response = await PartnerService.getSearchBusinessPartner(
      filter.value.offset,
      filter.value.limit,
      search_key.value.search_key,
      search_key.value.value,
      filter.value.companies_id,
      filter.value.role_id,
      filter.value.bu_owners_id,
      filter.value.comp_categories_id,
      filter.value.affiliate_id,
      filter.value.partner_type_id,
      filter.value.date_from,
      filter.value.date_to
    );
    const headers = response.headers;
    const itemsOffset = Number(headers["items-offset"]);
    const itemsLimit = Number(headers["items-limit"]);
    const itemsTotal = Number(headers["items-total"]);

    filter.value.offset = itemsOffset;
    filter.value.limit = itemsLimit;
    console.log(itemsLimit);
    filter.value.pageSize = paginationUtils.pageSize(itemsLimit, itemsTotal);
    if (response.data?.is_success) {
      content.value.items = response.data.data?.business_partners;

      // response.data?.data.forEach((dataItem) => {
      //   dataItem.business_partners.forEach((partner) => {
      //     content.value.items.push(partner);
      //     // console.log("test", content.value.items)
      //   });
      // });
      // content.value.items = response.data?.data.map((item) => {
      //   return {
      //     ...item.business_partners
      //   }
      // });
    }
  } catch (e) {
    if (e.response) {
      // const val = e.response.data;
      // handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    // handlingErrorsMessage("unknown", e.message);
  } finally {
    current_view.value = 2;
    loading.value.items = false;
  }
};
const handlePaginationEvent = (page) => {
  filter.value.page = page;
  filter.value.offset = paginationUtils.pageOffset(page, filter.value.limit);
  getSearchBusinessPartner();
};
</script>


<style scoped>

@media (min-width: 992px) {
  .box-froms {
    margin-left: 150px;
    margin-right: 150px;
  }
}

:deep(.v-text-field .v-field) {
  border-radius: 10px !important;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px !important;
  border: 1px solid #dfdfdf !important;
}
</style>
