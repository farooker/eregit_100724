<template>
  <v-container fluid>
    <div class="d-flex align-center justify-center">
      <h3 class="py-5">Change Information</h3>
    </div>

    <div class="d-flex align-center justify-center">
      <h3 class="pa-5">เพิ่มข้อมูลประเภทคู่ค้า และ ประเภทธุรกิจ</h3>
    </div>
{{ itemPartnerTypeNumber }}
    <v-row dense>
      <v-col cols="12">
        <v-card class="pa-8 ma-8 mt-7 mb-7">
          <v-row dense>
            <v-radio-group
              :rules="radioRules"
              v-model="dataInput.register.business_partner_type"
            >
              <v-radio
                v-for="(item, index) in itemPartnerType"
                :key="index"
                :label="item.name_th"
                :value="item.id.toString()"
                :disabled="shouldDisable(item.id)"
              ></v-radio>
            </v-radio-group>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card class="pa-8 ma-8">
          <v-card-title>
            <h6>ประเภทธุรกิจ</h6>
          </v-card-title>
          <v-row dense>
            <v-col cols="12">
              <v-select
                :items="itemCompanyCatagory"
                item-title="name_th"
                item-value="id"
                v-model="dataInput.register.company_category"
                density="compact"
                variant="outlined"
                placeholder="เลือกคำตอบ"
                :rules="textRequired"
              ></v-select>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref,  onMounted, watchEffect } from "vue";
import PartnerServive from "@/apis/PartnerServive";
import CompnayService from "@/apis/CompnayService";
import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";

const { handlingErrorsMessage } = useErrorHandlingDialog();
const props = defineProps({
  bp_group: {
    type: String,
  },
});

// Data references
const dataInput = ref({
  register: {
    business_partner_type: "",
    company_category: "",
  },
});

const itemPartnerType = ref([]);
const itemPartnerTypeNumber = ref(""); // Modify this value to 1 or 2 based on conditions
const itemCompanyCatagory = ref([]);

// Validation rules
const radioRules = [(v) => !!v || "กรุณาเลือก 1 อัน"];
const textRequired = [(v) => !!v || "กรุณากรอกข้อมูลให้ครบถ้วน"];


watchEffect(() => {
  if (props.bp_group) {
    itemPartnerTypeNumber.value = props.bp_group; // Convert to number if needed
  }
});
// Function to determine if an item should be disabled
const shouldDisable = (id) => {
  if (itemPartnerTypeNumber.value === 1) {
    return [2, 3, 4, 5, 6, 7, 8, 16].includes(id);
  } else if (itemPartnerTypeNumber.value === 2) {
    return [1, 3, 4, 16].includes(id);
  } else if (itemPartnerTypeNumber.value ===3) {
    return [1, 2, 4, 5, 6, 7, 8, 16].includes(id);
  } else if (itemPartnerTypeNumber.value ===4) {
    return [1, 2, 3, 5, 6, 7, 8, 16].includes(id);
  }
  return false;
};

// Fetch partner types
const getBusinessPartnerType = async () => {
  try {
    const response = await PartnerServive.getPartnerTypeAll();
    if (response.data?.is_success) {
      itemPartnerType.value = response.data.data;
      // Set itemPartnerTypeNumber based on your logic or conditions
      // itemPartnerTypeNumber.value = 4; // Example of setting this value, adjust as needed
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
    }
  }
};

// Fetch company categories
const getCompaniesCategories = async () => {
  try {
    const response = await CompnayService.getCompanyCategoriesAll();
    if (response.data?.is_success) {
      const sortedData = response.data.data.sort((a, b) => a.id - b.id);
      const otherIndex = sortedData.findIndex((item) => item.name_th === "อื่นๆ");
      if (otherIndex !== -1) {
        const otherItem = sortedData.splice(otherIndex, 1)[0];
        sortedData.push(otherItem);
      }
      itemCompanyCatagory.value = sortedData;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
    }
  }
};

// Lifecycle hook
onMounted(async () => {
  await getBusinessPartnerType();
  await getCompaniesCategories();
});
</script>

