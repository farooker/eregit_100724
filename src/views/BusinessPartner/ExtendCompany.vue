<template>
  <v-container>
    <!-- <v-app-bar class="custom-app-bar">
      <AttachedMenat class="mb-9" @on-attach-file="handleAttchFiles" app />
    </v-app-bar> -->

    <div >
      <v-row class="pa-10" justify="center" align="center">
        <v-col class="d-flex justify-center" cols="12"
          ><h2>Extend Company</h2></v-col
        >
      </v-row>

      <v-card class="pa-5" v-if="stepper === 0">
        <div class="mb-1">ต้องการ Extend Company Role ใด</div>
        <v-skeleton-loader :loading="isLoading" type="list-item-two-line">
          <v-radio-group v-model="typePartner" color="red">
            <v-radio label="Vendor" :value="1"></v-radio>
            <v-radio label="Customer" :value="0"></v-radio>
          </v-radio-group>
        </v-skeleton-loader>
      </v-card>

      <v-card v-if="stepper === 1">
        <v-card-title>
          <h5>สำหรับบริษัท</h5>
        </v-card-title>
        <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <v-autocomplete
              class="ml-6 mr-6"
              v-model="companiesSelection"
              :items="displayItemsCompany"
              item-value="customValue"
              :rules="rules_valid.companyData"
              item-title="displayName"
              multiple
              closable-chips
              density="compact"
              variant="outlined"
            >
              <template #selection="{ item }">
                <v-chip
                  style="color: black"
                  variant="outlined"
                  :color="getItemColor(item.value)"
                >
                  {{ item.title }}
                </v-chip>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>
        </v-card-text>
      </v-card>
      <v-row v-if="isAlowAction" justify="center" class="mt-10" align="center">
        <ButtonControl @click="handleOnClick()" :text="buttonName" />
      </v-row>
    </div>
  </v-container>
</template>
<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
import PartnerServive from "@/apis/PartnerServive";
import CompnayService from "@/apis/CompnayService";
import { useConfirmationDialog } from "@/components/dialogs/ConfirmationDialogService";
// import AttachedMenat from "@/components/forms/accounts/AttachedMenat.vue";
import ButtonControl from "@/components/controls/ButtonControl.vue";
const { handlingErrorsMessage } = useErrorHandlingDialog();
const { showDialog } = useConfirmationDialog();

const stepper = ref(0);
const typePartner = ref("");
const itemsCompanyData = ref([]);
const companiesSelection = ref([]);
const dataExtendCompanyReq = ref({});
const businessPartnerDetail = ref({});
// const attachFiles = ref([]);
const isLoading = ref(true);

const isAlowAction = ref(false);
const buttonName = ref("ต่อไป");

const router = useRouter();
const route = useRoute();

const form_number = route.query.form_number;


const rules_valid = ref({
  email: [
    (v) => !!v || "กรุณากรอกข้อมูลให้ครบ",
    (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Email format ไม่ถูกต้อง",
  ],
  companyData: [(v) => !!v || "กรุณากรอกข้อมูลให้ครบ"],
  role: [(v) => !!v || "กรุณากรอกข้อมูลให้ครบ"],
  team: [(v) => !!v || "กรุณากรอกข้อมูลให้ครบ"],
  radioRules: [(v) => !!v || "กรุณาเลือก 1 อัน"],
});
const displayItemsCompany = computed(() => {
  return itemsCompanyData.value.map((item) => ({
    ...item,
    displayName: `${item.company_code} - ${item.name_th}`,
    customValue: { id: item.id, code: item.company_code },
  }));
});

onMounted(async () => {
  await onLoadEntendCompanyByFormNumner();
  await getCompanies();
  await getBusinessPartnerDetail(dataExtendCompanyReq.value.bp_number);
  isAlowAction.value = true;
  isLoading.value = false;
});

const onLoadEntendCompanyByFormNumner = async () => {
  try {
    const response = await PartnerServive.getExtendCompanyBplRequestByFormNumber(
      form_number
    );
    if (response.data?.is_success) {
      dataExtendCompanyReq.value = response.data?.data;
      typePartner.value = dataExtendCompanyReq.value.business_partner_role.id;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  }
};

const getCompanies = async () => {
  try {
    const response = await CompnayService.getCompanyAll();
    if (response.data?.is_success) {
      itemsCompanyData.value = response.data.data;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  }
};

const getBusinessPartnerDetail = async (bp_number, branch_code) => {
  console.log("bp", bp_number)
  try {
    const response = await PartnerServive.getBusinessPartnerDetailBranchCode(bp_number,branch_code);
    if (response.data?.is_success) {
      businessPartnerDetail.value = response.data.data;
      console.log("getBusinessPartnerDetailBranchCode", businessPartnerDetail)
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  }
};

const companyCodesExits = ref({});
const companyCodesPartner = ref({});

// const handleAttchFiles = (item_files) => {
//   attachFiles.value = item_files;
// };

const getItemColor = (item) => {
  return companyCodesPartner.value.some((checkItem) => checkItem.id === item.id)
    ? "green"
    : "red";
};

const handleOnClick = async () => {
  if (stepper.value === 1) {
    if (
      await showDialog(
        "ยืยยันการแก้ไขข้อมูล ?",
        "กรุณาตรวจสอบข้อมูล คุณไม่สามารถแก้ไขได้แล้ว\nคลิกปุ่ม ตกลง เพื่อดำเนินการ"
      )
    ) {
      const companyIds = companiesSelection.value.map((el) => el.id);

      const dataBodySave = {
        form_number: form_number,
        company_id: companyIds.join(","),
        business_partner_role_id: 1,
      };

      window.alert(JSON.stringify(dataBodySave));

      router.push({
        name: "AccountManagement",
        query: { path: "ArchiveTask" },
      });
    }
  }

  if (stepper.value === 0) {
    const compIds = dataExtendCompanyReq.value.company_id.split(",");
    companyCodesExits.value = itemsCompanyData.value
      .filter((company) => compIds.includes(company.id.toString()))
      .map((company) => {
        return { id: company.id, code: company.company_code };
      });

    companiesSelection.value = companyCodesExits.value;

    if (typePartner.value == "1") {
      const partnerDetailCode =
        businessPartnerDetail.value.company_information.company_code_of_vendor.split(
          ","
        );
      companyCodesPartner.value = itemsCompanyData.value
        .filter((company) =>
          partnerDetailCode.includes(company.company_code.toString())
        )
        .map((company) => {
          return { id: company.id, code: company.company_code };
        });
    } else {
      const partnerDetailCode =
        businessPartnerDetail.value.company_information.company_code_of_customer.split(
          ","
        );
      companyCodesPartner.value = itemsCompanyData.value
        .filter((company) =>
          partnerDetailCode.includes(company.company_code.toString())
        )
        .map((company) => {
          return { id: company.id, code: company.company_code };
        });
    }
    stepper.value++;
    buttonName.value = "เสร็จ";
  }
};
</script>


<style scoped>
.custom-app-bar {
  height: 79px !important;
}
:deep(.v-text-field .v-field) {
  border-radius: 10px !important;

}

:deep(.v-chip--variant-tonal .v-chip__underlay) {
  background-color: #ed1c24 !important;

}

:deep(.v-chip.v-chip--density-default) {
  border: 1px solid #ed1c24 !important;
}
</style>

