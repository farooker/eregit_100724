<template>
  <v-container>
    <create-team-form v-if="!hasId" />
    <edit-team-form v-if="hasId" :item="itemTeam" />
  </v-container>
</template>

<script setup>
import CreateTeamForm from "@/components/forms/CreateTeamForm.vue";
import EditTeamForm from "@/components/forms/EditTeamForm.vue";
import { reactive } from "vue";
import { onMounted } from "vue";
import { computed } from "vue";

import { useRoute } from "vue-router";

const route = useRoute();

const id = route.params.id;
const hasId = computed(() => !!id);
let itemTeam = reactive({});

const data_api_get_all_team_mock = {
  id: 1,
  company_code: "1000",
  name_th: "บริษัท แผ่นดินทอง พร็อพเพอร์ตี้ ดีเวลลอปเม้นท์ จำกัด (มหาชน)",
  name_en: "Golden Land Property Development PLC.",
  taxpayer_id_number: "0107537002273",
  address_th:
    "944 มิตรทาวน์ ออฟฟิศ ทาวเวอร์ ชั้นที่ 20 ถนนพระราม 4 แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร 10330",
  address_en:
    "20th Floor, Mitrtown Office Tower 944 Rama 4 Road, Wangmai, Pathumwan, Bangkok 10330",
  business_unit: {
    id: 1,
    name_th: "Commercial",
    name_en: "Commercial",
    purchasing_organization: "GL00",
    corporation: {
      id: 1,
      name_th: "เฟรเซอร์ส พร็อพเพอร์ตี้ (ประเทศไทย)",
      name_en: "Frasers Property Thailand",
    },
  },
};

const process_array = (item) => {
  return {
    id: 1,
    business_unit: item?.company?.business_unit?.name_th,
    business_unit_id: item?.company?.business_unit?.id,
    company: item?.company?.name_en,
    company_id: item?.company?.id,
    name_th: item?.name_th,
    name_en: item?.name_en,
    status: true,
    action: [
      { color: "secondary", icon: "mdi mdi-pencil", text: "", action: "edit" },
      { color: "black", icon: "mdi mdi-trash-can", text: "", action: "delete" },
    ],
    history: "history_log",
    is_active: item?.is_active,
  };
};

itemTeam = process_array(data_api_get_all_team_mock);
onMounted(() => {
  if (hasId.value) {
    console.log("Call team by id");
  }
});
</script>
