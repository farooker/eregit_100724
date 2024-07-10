<template>
  <v-container>
    <h3>Company</h3>
    <v-card>
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <h4>ID</h4>
          </v-col>
          <v-col cols="12">
            <p>{{ data.id }}</p>
          </v-col>
          <v-col cols="12">
            <h4>Company Code</h4>
          </v-col>
          <v-col cols="12">
            <p>{{ data.company_code }}</p>
          </v-col>
          <v-col cols="12">
            <h4>Name TH</h4>
          </v-col>
          <v-col cols="12">
            <p>{{ data.name_th }}</p>
          </v-col>
          <v-col cols="12">
            <h4>Name EN</h4>
          </v-col>
          <v-col cols="12">
            <p>{{ data.name_en }}</p>
          </v-col>
          <v-col cols="12">
            <h4>Taxpayer ID number</h4>
          </v-col>
          <v-col cols="12">
            <p>{{ data.taxpayer_id_number }}</p>
          </v-col>
          <v-col cols="12">
            <h4>Address TH</h4>
          </v-col>
          <v-col cols="12">
            <p>{{ data.address_th }}</p>
          </v-col>
          <v-col cols="12">
            <h4>Address EN</h4>
          </v-col>
          <v-col cols="12">
            <p>{{ data.address_en }}</p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-footer color="transparent" style="margin-top: 120px">
      <v-row justify="center">
        <v-col cols="auto">
          <button-control
            color="black"
            text="ย้อนกลับ"
            width="100"
            @button-clicked="on_go_to_back"
          />
        </v-col>
      </v-row>
    </v-footer>
  </v-container>
</template>

<script setup>
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

import ButtonControl from "@/components/controls/ButtonControl.vue";

const route = useRoute();
const router = useRouter();

const id = route.params.id;

let data = reactive([]);
data = {
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

const on_go_to_back = () => {
  router.go(-1);
};
</script>
