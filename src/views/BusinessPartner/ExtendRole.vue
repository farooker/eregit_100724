<template>
  <v-container>
    <div class="text-center">
      <h1 class="pa-5">Extend Role</h1>
    </div>
<!-- {{ extendRole.business_partner_role }} -->
    <div v-if="extendRole.business_partner_role === 'Customer'">
      <h2>Customer > Vendor</h2>
  </div>
      <div v-if="extendRole.business_partner_role === 'Vendor'">
      <h2>Vendor > Customer</h2>
  </div>
<!-- {{   selected_branch.items_branch_data }} -->
  <!-- <div v-if="extendRole.business_partner_role !== 'Vendor & Customer'"> -->
    <v-card class="pa-5">
      <v-card-text>
        <v-row no-gutters dense>
          <v-card-title>
            <h5>เลือกสาขาที่ต้องการ</h5>
          </v-card-title>
          <v-col cols="12">
            <v-select
              class="ml-6 mr-6"
              chips
              item-title="branch_code"
              v-model="data_input.company_data.data"
              :items="selected_branch.items_branch_data"
               item-value="id"
              multiple
              density="compact"
              variant="outlined"
            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

<div class="pa-5 ma-5">
      <v-row justify="center" align="center">
        <!-- ปุ่มยกเลิก -->
        <v-btn color="black" @click="handleToComapnyProfile = false" class="ma-0 pa-0 mr-7" style="border-radius: 15px; width: 100px;">
          ยกเลิก
        </v-btn>
        <!-- ปุ่มตกลง -->
        <v-btn color="red" @click="handleToSaveData" class="ma-0 pa-0 mr-7" style="border-radius: 15px; width: 100px;">
          ตกลง
        </v-btn>
      </v-row>

    </div>
  <!-- </div> -->
  </v-container>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import PartnerServive from "@/apis/PartnerServive";
import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
const { handlingErrorsMessage } = useErrorHandlingDialog();
const route = useRoute();
const router = useRouter();

const selected_branch = ref({
  items_branch_data: [],
});
const prependBranchCode = () => {
  for (let item of selected_branch.value.items_branch_data) {
    item.branch_code = `สาขา ${item.branch_code}`;
  }
};
const dataBodyExtendRole = ref({
  bp_number: null,
  extend_to_bp_role_id: null,
  branch: [
    {
      branch_code : null
    }
  ],
});

const data_input = ref({
  company_data: {
    is_other: false,
    data: null,
    other: null,
  },
});
const extendRole = ref({});

const bp_number = route.query.bp_number;

onMounted(async () => {
  await getBusinessPartnerInfo(bp_number);
  await getBusinessPartnerBranches(bp_number);
  await prependBranchCode();
});
const getBusinessPartnerInfo = async (bp_number) => {
  try {
    const response = await PartnerServive.getBusinessPartnerChangInfo(
      bp_number
    );
    if (response.data?.is_success) {
      extendRole.value = response.data.data;
      console.log("infodata", extendRole.value);
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

const getBusinessPartnerBranches = async (bp_number) => {
  try {
    const response = await PartnerServive.getBusinessPartnerExtendRole(
      bp_number
    );
    if (response.data?.is_success) {
      // Branches.value = response.data.data;
      selected_branch.value.items_branch_data = response.data.data?.branch
      console.log("Branches", selected_branch.value.items_branch_data);
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
const handleSaveExtendRole = async ()=> {
dataBodyExtendRole.value.bp_number = route.query?.bp_number ?? null;
if(extendRole.value.business_partner_role === 'Customer')
  dataBodyExtendRole.value.business_partner_role = 1;
dataBodyExtendRole.value.branch[0].branch_code =
data_input.value.company_data.data

}
if(extendRole.value.business_partner_role === 'Vendor'){
  dataBodyExtendRole.value.business_partner_role = 2;
dataBodyExtendRole.value.branch[0].branch_code =
data_input.value.company_data.data

}
const handleToSaveData = async () => {
  try {
    handleSaveExtendRole()
    const response = await PartnerServive.createExtendRole(
      dataBodyExtendRole.value

    );
    if (response.data?.is_success) {
      handleToComapnyProfile(response.data.data?.form_number);
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
const handleToComapnyProfile = () => {
  // console.warn(form_number);
  router.push({
    path: "/BusinessPartner/BusinessPartnerList",
    // query: { form_number: form_number },
  });
};

</script>


<style scoped>
:deep(.v-field) {
  border-radius: 10px !important;
  border: 1px solid #ededed !important;
  -webkit-border-radius: 10px !important;
  -moz-border-radius: 10px !important;
  -ms-border-radius: 10px !important;
  -o-border-radius: 10px !important;
}
</style>
