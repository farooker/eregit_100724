<template>
  <v-container>
    <h3>Edit Team</h3>
    <v-card>
      <v-card-text>
        <v-row no-gutters dense>
          <v-col cols="12"><h4>Business Unit</h4></v-col>
          <v-col cols="12">
            <v-select
              v-model="business_unit"
              density="compact"
              :items="item_business_unit"
              item-title="name_en"
              item-value="id"
              variant="outlined"
              placeholder="เลือก Business Unit"
            ></v-select>
          </v-col>
          <v-col cols="12"><h4>Company</h4></v-col>
          <v-col cols="12">
            <v-select
              v-model="company"
              density="compact"
              :items="item_companies"
              item-title="name_en"
              item-value="id"
              variant="outlined"
              placeholder="เลือก Company"
            ></v-select>
          </v-col>
          <v-col cols="12"><h4>Name TH</h4></v-col>
          <v-col cols="12">
            <v-text-field
              variant="outlined"
              v-model="name_th"
              placeholder="กรอกชื่อภาษาไทย"
              :rules="[(v) => !!v || 'Name TH is required']"
              density="compact"
            ></v-text-field>
          </v-col>
          <v-col cols="12"><h4>Name EN</h4></v-col>
          <v-col cols="12">
            <v-text-field
              variant="outlined"
              v-model="name_en"
              placeholder="กรอกชื่อภาษาอังกฤษ"
              :rules="[(v) => !!v || 'Name EN is required']"
              density="compact"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-checkbox v-model="is_status" label="Status" />
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
        <v-col cols="auto">
          <button-control
            type="submit"
            @button-clicked="submit_from_update_team"
            color="secondary"
            text="ตกลง"
            width="100"
          />
        </v-col>
      </v-row>
    </v-footer>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { reactive } from "vue";
import ButtonControl from "../controls/ButtonControl.vue";
import { useRouter } from "vue-router";

const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
});

const router = useRouter();

let item_business_unit = reactive([]);
let item_companies = reactive([]);

let business_unit = ref(props.item.business_unit_id);
let company = ref(props.item.company_id);
let name_en = ref(props.item.name_en);
let name_th = ref(props.item.name_th);
let is_status = ref(props.item.status);

item_companies = [
  {
    id: 51,
    company_code: "5003",
    name_th: "บริษัท มัส บี จำกัด",
    name_en: "MUST BE Co., Ltd.",
    taxpayer_id_number: "0105565131781",
    address_th: "62 ถนนรัชดาภิเษก แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110",
    address_en:
      "62 Ratchadapisek Road, Klongtoey Sub-District, Klongtoey District, Bangkok 10110",
    business_unit: {
      id: 4,
      name_th: "FPHT & Others",
      name_en: "FPHT & Others",
      purchasing_organization: "FPHT",
      corporation: {
        id: 1,
        name_th: "เฟรเซอร์ส พร็อพเพอร์ตี้ (ประเทศไทย)",
        name_en: "Frasers Property Thailand",
      },
    },
  },
  {
    id: 50,
    company_code: "5002",
    name_th:
      "บริษัท เฟรเซอร์ส พร็อพเพอร์ตี้ คอร์เปอร์เรท เซอร์วิสเซส (ประเทศไทย) จำกัด",
    name_en: "Frasers Property Corporate Services (Thailand) Co.,Ltd.",
    taxpayer_id_number: "0105564174495",
    address_th:
      "944 มิตรทาวน์ ออฟฟิศ ทาวเวอร์ ชั้นที่ 20 ถนนพระราม 4 แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร 10330",
    address_en:
      "20th Floor, Mitrtown Office Tower, 944 Rama 4 Road, Wangmai, Pathumwan, Bangkok 10330",
    business_unit: {
      id: 4,
      name_th: "FPHT & Others",
      name_en: "FPHT & Others",
      purchasing_organization: "FPHT",
      corporation: {
        id: 1,
        name_th: "เฟรเซอร์ส พร็อพเพอร์ตี้ (ประเทศไทย)",
        name_en: "Frasers Property Thailand",
      },
    },
  },
  {
    id: 49,
    company_code: "5001",
    name_th: "บริษัท เฟรเซอร์ส แอสเซ็ทส์ จำกัด",
    name_en: "Frasers Assets Co., Ltd.",
    taxpayer_id_number: "0105561003819",
    address_th:
      "944 มิตรทาวน์ ออฟฟิศ ทาวเวอร์ ชั้นที่ 20 ถนนพระราม 4 แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร 10330",
    address_en:
      "20th Floor, Mitrtown Office Tower, 944 Rama 4 Road, Wangmai, Pathumwan, Bangkok 10330",
    business_unit: {
      id: 4,
      name_th: "FPHT & Others",
      name_en: "FPHT & Others",
      purchasing_organization: "FPHT",
      corporation: {
        id: 1,
        name_th: "เฟรเซอร์ส พร็อพเพอร์ตี้ (ประเทศไทย)",
        name_en: "Frasers Property Thailand",
      },
    },
  },
  {
    id: 48,
    company_code: "5000",
    name_th: "บริษัท เฟรเซอร์ส พร็อพเพอร์ตี้ โฮลดิ้งส์ (ประเทศไทย) จำกัด  ",
    name_en: "Frasers Property Holdings (Thailand) Co.,Ltd.",
    taxpayer_id_number: "0105558178352",
    address_th:
      "944 มิตรทาวน์ ออฟฟิศ ทาวเวอร์ ห้องเลขที่ S23003 ชั้นที่ 23 ถนนพระราม 4 แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร 10330",
    address_en:
      " 944 Mitrtown Office Tower, Room No. S23003, 23rd Floor, Rama 4 Road, Wangmai Subdistrict, Pathumwan District, Bangkok 10330",
    business_unit: {
      id: 4,
      name_th: "FPHT & Others",
      name_en: "FPHT & Others",
      purchasing_organization: "FPHT",
      corporation: {
        id: 1,
        name_th: "เฟรเซอร์ส พร็อพเพอร์ตี้ (ประเทศไทย)",
        name_en: "Frasers Property Thailand",
      },
    },
  },
  {
    id: 47,
    company_code: "6023",
    name_th: "บริษัท พีบีเอ โรบอทิคส์ (ประเทศไทย) จำกัด",
    name_en: "PBA Robotics (Thailand) Co., Ltd.",
    taxpayer_id_number: "0105562089792",
    address_th:
      "944 มิตรทาวน์ ออฟฟิศ ทาวเวอร์ ชั้นที่ 22-23 ถนนพระราม 4 แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร 10330",
    address_en:
      " 944 Mitrtown Office Tower, 22nd- 23rd Floor, Rama 4 Road, Wangmai Subdistrict, Pathumwan District, Bangkok 10330",
    business_unit: {
      id: 3,
      name_th: "Industrial",
      name_en: "Industrial",
      purchasing_organization: "FPT",
      corporation: {
        id: 1,
        name_th: "เฟรเซอร์ส พร็อพเพอร์ตี้ (ประเทศไทย)",
        name_en: "Frasers Property Thailand",
      },
    },
  },
  {
    id: 46,
    company_code: "6022",
    name_th: "บริษัท เฟรเซอร์ส พร็อพเพอร์ตี้ ศูนย์บริหารเงิน (ประเทศไทย) จำกัด",
    name_en: "Frasers Property Treasury Center (Thailand) Company Limited",
    taxpayer_id_number: "0105562192666",
    address_th:
      "944 มิตรทาวน์ ออฟฟิศ ทาวเวอร์ ชั้นที่ 22-23 ถนนพระราม 4 แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร 10330",
    address_en:
      " 944 Mitrtown Office Tower, 22nd- 23rd Floor, Rama 4 Road, Wangmai Subdistrict, Pathumwan District, Bangkok 10330",
    business_unit: {
      id: 3,
      name_th: "Industrial",
      name_en: "Industrial",
      purchasing_organization: "FPT",
      corporation: {
        id: 1,
        name_th: "เฟรเซอร์ส พร็อพเพอร์ตี้ (ประเทศไทย)",
        name_en: "Frasers Property Thailand",
      },
    },
  },
  {
    id: 45,
    company_code: "6021",
    name_th: "บริษัท เฟรเซอร์ส พร็อพเพอร์ตี้ เทคโนโลยี (ประเทศไทย) จำกัด",
    name_en: "Frasers Property Technology (Thailand) Company Limited",
    taxpayer_id_number: "0105561067540",
    address_th:
      "944 มิตรทาวน์ ออฟฟิศ ทาวเวอร์ ชั้นที่ 22-23 ถนนพระราม 4 แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร 10330",
    address_en:
      " 944 Mitrtown Office Tower, 22nd- 23rd Floor, Rama 4 Road, Wangmai Subdistrict, Pathumwan District, Bangkok 10330",
    business_unit: {
      id: 3,
      name_th: "Industrial",
      name_en: "Industrial",
      purchasing_organization: "FPT",
      corporation: {
        id: 1,
        name_th: "เฟรเซอร์ส พร็อพเพอร์ตี้ (ประเทศไทย)",
        name_en: "Frasers Property Thailand",
      },
    },
  },
  {
    id: 44,
    company_code: "6019",
    name_th: "บริษัท ออโตเมชั่น แอสเซ็ท จำกัด",
    name_en: "Automation Asset Co., Ltd.",
    taxpayer_id_number: "0105562067438",
    address_th:
      "944 มิตรทาวน์ ออฟฟิศ ทาวเวอร์ ชั้นที่ 22-23 ถนนพระราม 4 แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร 10330",
    address_en:
      " 944 Mitrtown Office Tower, 22nd- 23rd Floor, Rama 4 Road, Wangmai Subdistrict, Pathumwan District, Bangkok 10330",
    business_unit: {
      id: 3,
      name_th: "Industrial",
      name_en: "Industrial",
      purchasing_organization: "FPT",
      corporation: {
        id: 1,
        name_th: "เฟรเซอร์ส พร็อพเพอร์ตี้ (ประเทศไทย)",
        name_en: "Frasers Property Thailand",
      },
    },
  },
  {
    id: 43,
    company_code: "6018",
    name_th: "บริษัท ซิสเต็ม แอสเซ็ทส์ จำกัด",
    name_en: "System Assets Company Limited",
    taxpayer_id_number: "0105561042229",
    address_th:
      "944 มิตรทาวน์ ออฟฟิศ ทาวเวอร์ ชั้นที่ 22-23 ถนนพระราม 4 แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร 10330",
    address_en:
      " 944 Mitrtown Office Tower, 22nd- 23rd Floor, Rama 4 Road, Wangmai Subdistrict, Pathumwan District, Bangkok 10330",
    business_unit: {
      id: 3,
      name_th: "Industrial",
      name_en: "Industrial",
      purchasing_organization: "FPT",
      corporation: {
        id: 1,
        name_th: "เฟรเซอร์ส พร็อพเพอร์ตี้ (ประเทศไทย)",
        name_en: "Frasers Property Thailand",
      },
    },
  },
  {
    id: 42,
    company_code: "6017",
    name_th: "บริษัท อีโค อินดัสเทรียล เซอร์วิสเซส จำกัด",
    name_en: "ECO Industrial    Services Company   Limited",
    taxpayer_id_number: "0205544003163",
    address_th:
      "944 มิตรทาวน์ ออฟฟิศ ทาวเวอร์ ชั้นที่ 22-23 ถนนพระราม 4 แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร 10330",
    address_en:
      " 944 Mitrtown Office Tower, 22nd- 23rd Floor, Rama 4 Road, Wangmai Subdistrict, Pathumwan District, Bangkok 10330",
    business_unit: {
      id: 3,
      name_th: "Industrial",
      name_en: "Industrial",
      purchasing_organization: "FPT",
      corporation: {
        id: 1,
        name_th: "เฟรเซอร์ส พร็อพเพอร์ตี้ (ประเทศไทย)",
        name_en: "Frasers Property Thailand",
      },
    },
  },
];

item_business_unit = [
  {
    id: 1,
    name_th: "ชื่อที่ไทย",
    name_en: "Thai Name",
    purchasing_organization: "10002",
  },
];

const on_go_to_back = () => {
  router.go(-1);
};

const submit_from_update_team = () => {};
</script>
