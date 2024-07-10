<template>
  <v-container fluid class="mt-8">
    <div class="box-froms">
      <v-app-bar class="custom-app-bar" v-if="itemsFileDocument.length > 0">
        <AttachedMenat
          :items="itemsFileDocument"
          class="mb-9"
          @on-attach-file="handleAttchFiles"
          app
        />
      </v-app-bar>

      <div class="d-flex justify-end mb-5 mt-5">
        <ButtonControl
          icon="mdi mdi-file-document"
          class="mr-2"
          text="ขอเอกสารเพิ่มเติม"
          @click="handleSwitchToRewwuestDoc"
        />
        <ButtonControl
          icon="mdi mdi-content-save-cog"
          @click="handleOnDaftSave()"
          text="Save Daft"
        />
      </div>
      <div
        v-show="is_id_form === FORM_ID.REQUEST_DOCS"

      >
        <RequestDocument
          :pb_number="datasInputs[0]?.bp_number"
          @on-back="handleReqDocumentBack"
          @on-commit-data="handleReqDocumentCommit"
        />
      </div>
      <v-form ref="extendRoleForm">
        <v-row
          v-for="(item, index) in datasInputs"
          :key="index"
          v-show="is_id_form === FORM_ID.EXTEND_ROLE"

        >
          <v-col cols="12"><h2>Extend Customer to Vendor</h2></v-col>
          <v-col cols="12">
            <v-card class="">
              <v-skeleton-loader :loading="isLoading" type="list-item-two-line">
                <v-row dense no-gutters>
                  <v-col cols="12">
                    <v-card-title>
                      <h6>Business Partner Number</h6>
                    </v-card-title>
                    <v-text-field
                      class="ml-4 mr-4"
                      density="compact"
                      v-model="item.partner_number"
                      dense
                      variant="outlined"
                      :rules="required"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-card-title>
                      <h6>Neme</h6>
                    </v-card-title>
                    <v-text-field
                      class="ml-4 mr-4"
                      density="compact"
                      v-model="item.name"
                      dense
                      :rules="required"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-skeleton-loader>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card class="">
              <v-skeleton-loader :loading="isLoading" type="list-item-two-line">
                <v-row dense no-gutters>
                  <v-col cols="12">
                    <v-card-title>
                      <h6>Branch Code</h6>
                    </v-card-title>
                    <v-select
                      class="ml-4 mr-4"
                      v-model="item.branch_code"
                      :items="item.itemsBranch"
                      :rules="required"
                      density="compact"
                      variant="outlined"
                    ></v-select>
                  </v-col>

                  <v-col cols="12">
                    <v-card-title>
                      <h6>Branch Description</h6>
                    </v-card-title>
                    <v-text-field
                      class="ml-4 mr-4"
                      density="compact"
                      v-model="item.branch_desc"
                      :rules="required"
                      dense
                      variant="outlined"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-card-title>
                      <h6>Reconciliation Account</h6>
                    </v-card-title>
                    <v-select
                      class="ml-4 mr-4"
                      chips
                      v-model="item.reconciliation_account"
                      :items="itemReconcilation"
                      :rules="required"
                      item-value="id"
                      item-title="name"
                      density="compact"
                      variant="outlined"
                    ></v-select>
                  </v-col>

                  <v-col cols="12">
                    <v-card-title>
                      <h6>Sort Key</h6>
                    </v-card-title>
                    <v-text-field
                      class="ml-4 mr-4"
                      density="compact"
                      v-model="item.sort_key"
                      dense
                      variant="outlined"
                      readonly
                      bg-color="#dfdfdf"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-card-title>
                      <h6>Payment Term</h6>
                    </v-card-title>
                    <v-select
                      class="ml-4 mr-4"
                      chips
                      v-model="item.payment_term"
                      :items="itemsPaymentTerms"
                      item-title="description"
                      item-value="id"
                      density="compact"
                      variant="outlined"
                      :rules="required"
                    ></v-select>
                  </v-col>

                  <v-col cols="12">
                    <v-card-title>
                      <h6>Payment Methods</h6>
                    </v-card-title>
                    <v-text-field
                      class="ml-4 mr-4"
                      density="compact"
                      v-model="item.payment_methods"
                      dense
                      variant="outlined"
                      readonly
                      bg-color="#dfdfdf"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-card-title>
                      <h6>Withholding Tax Type (1)</h6>
                    </v-card-title>
                    <v-text-field
                      class="ml-4 mr-4"
                      density="compact"
                      v-model="item.withholding_tax_type_1"
                      dense
                      variant="outlined"
                      readonly
                      bg-color="#dfdfdf"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-card-title>
                      <h6>Withholding Tax Type (2)</h6>
                    </v-card-title>
                    <v-text-field
                      class="ml-4 mr-4"
                      density="compact"
                      v-model="item.withholding_tax_type_2"
                      dense
                      variant="outlined"
                      readonly
                      bg-color="#dfdfdf"
                    ></v-text-field>
                  </v-col>

                  <!-- ไม่มีใน customer -->
                  <v-col cols="12" v-if="item.isVender">
                    <v-card-title>
                      <h6>Withholding Tax Type (3)</h6>
                    </v-card-title>
                    <v-text-field
                      class="ml-4 mr-4"
                      density="compact"
                      v-model="item.withholding_tax_type_3"
                      dense
                      variant="outlined"
                      readonly
                      bg-color="#dfdfdf"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-card-title>
                      <h6>Company Code</h6>
                    </v-card-title>
                    <v-select
                      class="ml-4 mr-4"
                      chips
                      v-model="item.company_id"
                      :items="displayItemsCompany"
                      multiple
                      item-value="id"
                      item-title="displayName"
                      density="compact"
                      variant="outlined"
                    ></v-select>
                  </v-col>

                  <v-col cols="12">
                    <v-card-title>
                      <h6>Tax Type</h6>
                    </v-card-title>
                    <v-select
                      class="ml-4 mr-4"
                      v-model="item.tax_type"
                      :items="taxType"
                      :rules="required"
                      item-value="id"
                      item-title="title"
                      density="compact"
                      variant="outlined"
                    ></v-select>
                  </v-col>

                  <!-- ไม่มีใน customer -->
                  <v-col cols="12" v-if="item.isVender">
                    <v-card-title>
                      <h6>Purch Organization</h6>
                    </v-card-title>
                    <v-text-field
                      class="ml-4 mr-4"
                      density="compact"
                      v-model="item.purch_organization"
                      dense
                      variant="outlined"
                      readonly
                      bg-color="#dfdfdf"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-skeleton-loader>
            </v-card>
          </v-col>
        </v-row>
      </v-form>
      <div class="pa-5 ma-5" v-show="is_id_form === FORM_ID.EXTEND_ROLE">
        <v-row justify="center" align="center">
          <ButtonControl @click="handleOnClickSave()" text="ตกลง" />
        </v-row>
      </div>
    </div>
  </v-container>
</template>
<script setup>
import RequestDocument from "@/components/forms/accounts/RequestDocument.vue";
import AttachedMenat from "@/components/forms/accounts/AttachedMenat.vue";
import ButtonControl from "@/components/controls/ButtonControl.vue";
import CompnayService from "@/apis/CompnayService";
import PartnerServive from "@/apis/PartnerServive";
import PaymentTermService from "@/apis/PaymentTermService";
import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
import { onMounted, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import AccountReconciliationService from "@/apis/AccountReconciliationService";
import { useConfirmationDialog } from "@/components/dialogs/ConfirmationDialogService";

const { showDialog } = useConfirmationDialog();
const { handlingErrorsMessage } = useErrorHandlingDialog();

const FORM_ID = {
  EXTEND_ROLE: 0,
  REQUEST_DOCS: 1,
};

const router = useRouter();
const route = useRoute();

const form_number = route.query.form_number;
const is_id_form = ref(FORM_ID.EXTEND_ROLE);

const itemsPaymentTerms = ref([]);
const itemsCompanyData = ref([]);
const itemReconcilation = ref([]);
const attachFiles = ref([]);
const isLoading = ref(true);
const itemsFileDocument = ref([]);

const taxType = [
  { id: "01", title: "VAT" },
  { id: "02", title: "NO VAT" },
];

const datasInputs = ref([]);

const extendRoleForm = ref(null);
const required = [(v) => !!v || "กรุณากรอกข้อมูลให้ครบถ้วน"];

const handleAttchFiles = (item_files) => {
  attachFiles.value = item_files;
};

const displayItemsCompany = computed(() => {
  return itemsCompanyData.value.map((item) => ({
    ...item,
    displayName: `${item.company_code} - ${item.name_th}`,
    customValue: { id: item.id, code: item.company_code },
  }));
});

onMounted(async () => {
  await getPaymentTerm();
  await getCompanies();
  await getAccountReconciliation();
  await getExtendRoleRequestByFormNumber();
  await getUploadDocumentByFormNumber();
  isLoading.value = false;
});

const getUploadDocumentByFormNumber = async () => {
  try {
    const response = await PartnerServive.getUploadDocumentByFormNumber(
      form_number
    );
    if (response.data?.is_success) {
      itemsFileDocument.value = response.data.data.map((el) => {
        return {
          file: null,
          file_name: el.document_name,
          file_size: "no available",
        };
      });
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      console.log(val.message, val?.data.error);
      return;
    }
    console.log("unknown", e.message);
  }
};

const getAccountReconciliation = async () => {
  try {
    const response =
      await AccountReconciliationService.getAccountReconciliationAll();
    if (response.data?.is_success) {
      itemReconcilation.value = response.data.data;
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

const getPaymentTerm = async () => {
  try {
    const response = await PaymentTermService.getPaymentTermAll();
    if (response.data?.is_success) {
      itemsPaymentTerms.value = response.data.data;
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

const getBranchList = async (bpNumber) => {
  try {
    const response = await PartnerServive.getBranchListByPbNumber(bpNumber);
    if (response.data?.is_success) {
      return response.data.data?.branch.map((el) => el.branch_code);
    }
    return [];
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return [];
    }
    handlingErrorsMessage("unknown", e.message);
    return [];
  }
};

const onSaveDraftExtendCompanyRole = async () => {
  const promises = datasInputs.value.map((el) => {
    const bodyRequest = {
      form_number: form_number,
      extend_to_bp_role_id: el.extend_to_bp_role_id,
      business_partner_number: el.partner_number,
      name: el.name,
      reconciliation_account_id: el.reconciliation_account,
      sort_key: el.sort_key,
      payment_term_id: el.payment_term,
      payment_methods: el.payment_methods,
      withholding_tax_type_1: el.withholding_tax_type_1,
      withholding_tax_type_2: el.withholding_tax_type_2,
      withholding_tax_type_3: el.withholding_tax_type_3,
      company_id: el.company_id.join(","),
      branch: [
        {
          branch_code: el.branch_code,
          branch_description: el.branch_desc,
        },
      ],
    };
    return PartnerServive.createDraftExtendRole(bodyRequest);
  });

  try {
    const responses = await Promise.all(promises);
    const allSuccess = responses.every((response) => response.data.is_success);

    if (allSuccess) {
      router.push({
        name: "AccountManagement",
        query: { path: "DaftTask" },
      });
    } else {
      handlingErrorsMessage(
        "One or more draft extend roles failed to be created."
      );
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

const onSaveExtendCompanyRole = async () => {
  const promises = datasInputs.value.map((el) => {
    const bodyRequest = {
      form_number: form_number,
      extend_to_bp_role_id: el.extend_to_bp_role_id,
      business_partner_number: el.partner_number,
      name: el.name,
      reconciliation_account_id: el.reconciliation_account,
      sort_key: el.sort_key,
      payment_term_id: el.payment_term,
      payment_methods: el.payment_methods,
      withholding_tax_type_1: el.withholding_tax_type_1,
      withholding_tax_type_2: el.withholding_tax_type_2,
      withholding_tax_type_3: el.withholding_tax_type_3,
      company_id: el.company_id.join(","),
      branch: [
        {
          branch_code: el.branch_code,
          branch_description: el.branch_desc,
        },
      ],
    };
    return PartnerServive.createExtendRole(bodyRequest);
  });

  try {
    const responses = await Promise.all(promises);
    const allSuccess = responses.every((response) => response.data.is_success);

    if (allSuccess) {
      router.push({
        name: "AccountManagement",
        query: { path: "ExportTask" },
      });
    } else {
      handlingErrorsMessage("One or more extend roles failed to be created.");
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

const handleOnDaftSave = async () => {
  const is_valid = await extendRoleForm.value.validate();
  if (is_valid && !is_valid["valid"]) return;
  if (
    await showDialog(
      "ยืนยันการบันถึงข้อมูล ?",
      "การ save daft งานของคุณจะไปอยู่ใน daft\nคลิกปุ่ม ตกลง เพื่อดำเนินการ"
    )
  ) {
    await onSaveDraftExtendCompanyRole();
  }
};

const handleOnClickSave = async () => {
  const is_valid = await extendRoleForm.value.validate();
  if (is_valid && !is_valid["valid"]) return;
  if (
    await showDialog(
      "ยืยยันการแก้ไขข้อมูล ?",
      "กรุณาตรวจสอบข้อมูล คุณไม่สามารถแก้ไขได้แล้ว\nคลิกปุ่ม ตกลง เพื่อดำเนินการ"
    )
  ) {
    await onSaveExtendCompanyRole();
  }
};

const getExtendRoleRequestByFormNumber = async () => {
  try {
    const response = await PartnerServive.getExtendRoleRequestByFormNumber(
      form_number
    );
    if (response.data.is_success) {
      for (let index = 0; index < response.data.data.length; index++) {
        const el = response.data.data[index];
        let company_id = [];
        let purchasing_organization = "";
        if (el.company_id)
          purchasing_organization = el.company_id
            .map((el) => el.business_unit.purchasing_organization)
            .join(",");
        if (el.company_id) company_id = el.company_id.map((el) => el.id);

        datasInputs.value.push({
          partner_number: el.business_partner_number,
          bp_number: el.bp_number,
          name: el.name,
          sort_key: el?.sort_key,
          payment_methods: prefillPaymentMethod(
            el.payment_methods,
            el.extend_to_bp_role?.id
          ),
          withholding_tax_type_1: el.withholding_tax_type_1,
          withholding_tax_type_2: el.withholding_tax_type_2,
          withholding_tax_type_3: el?.withholding_tax_type_3,
          purch_organization: purchasing_organization,
          branch_code: el.branch_code,
          branch_desc: el.branch_description,
          reconciliation_account: el.reconciliation_account?.id,
          payment_term: el.payment_term?.id,
          company_id: company_id,
          tax_type: null,
          isVender: el.extend_to_bp_role?.id == 1 ? true : false,
          extend_to_bp_role_id: el.extend_to_bp_role?.id,
          itemsBranch: await getBranchList(el.bp_number),
        });
        console.log(el);
      }
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

const prefillPaymentMethod = (payment_methods, type) => {
  if (payment_methods) return payment_methods;
  if (type == 1) return "ABCDEFGHK";
  return "4";
};

const handleReqDocumentBack = () => {
  is_id_form.value = FORM_ID.EXTEND_ROLE;
};

const handleReqDocumentCommit = () => {
  is_id_form.value = FORM_ID.EXTEND_ROLE;
};

const handleSwitchToRewwuestDoc = () => {
  is_id_form.value = FORM_ID.REQUEST_DOCS;
};
</script>
<style>
.custom-app-bar {
  height: 79px !important;
}

@media (min-width: 992px) {
  .box-froms {
    margin-left: 150px;
    margin-right: 150px;
  }
}
</style>
