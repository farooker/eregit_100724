<template>
  <v-row dense>
    <v-col cols="12"><h3 class="mt-8">เอกสารเพิ่มเติม</h3></v-col>
    <v-col cols="12">
      <v-card class="pa-5">
        <v-col>
          <h3><u>{{ businessPartnerType.name_th }}</u></h3>
      </v-col>
        <v-col
          cols="12"
          class="mt-n5"
          v-for="(item, index) in itemsRequireDocument"
          :key="index"
        >
          <h5>{{ index + 1 }}. {{ item.name_en }}</h5>
        </v-col>
        <ChooseMultiFiles
          :max-file="10"
          icon="mdi mdi-file-document"
          @input-files="handleInputFiles"
          @request-remove-file="handleFileRemovalRequest"

        />
      </v-card>
      <br>
     <p>โปรดตรวจสอบให้แน่ใจว่าไฟล์ซึ่งจะถูกอัพโหลดประกอบด้วยข้อมูลส่วนบุคคลที่จำเป็น ตามที่ระบุไว้ในนโยบายความเป็นส่วนตัวของ FPT เท่านั้น</p>
    </v-col>
    <!-- <v-col cols="12"> </v-col>
    <v-col cols="6" class="d-flex justify-end mt-5" v-if="!isHideButton">
      <ButtonControl
        color="black"
        text="ย้อนกลับ"
        style=" height: 35px;
            min-width: 100px;
            background-color: white !important;
            color: #ed1c24 !important;
            border: 1px solid #ed1c24;"
        @button-clicked="handleReverse"
      />
    </v-col> -->
    <!-- <v-col cols="6" class="d-flex justify-start mt-5" v-if="!isHideButton">
      <ButtonControl text="ถัดไป"  style="min-width: 100px; height: 35px; " @button-clicked="handleNext" />
    </v-col> -->
  </v-row>
</template>

<script setup>
// import ButtonControl from "@/components/controls/ButtonControl.vue";
import ChooseMultiFiles from "../ChooseMultiFiles.vue";
import PartnerServive from "@/apis/PartnerServive";
import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
import { onMounted, ref } from "vue";
const { handlingErrorsMessage } = useErrorHandlingDialog();

const props = defineProps({
  businessPartnerRoleId: {
    type: String,
  },
  businessPartnerTypeId: {
    type: String,
  },
  isVatRegistered: {
    type: Boolean,
  },
  isFilledBookBank: {
    type: Boolean,
  },
  companyIds: {
    type: Array,
  },
  isHideButton: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  "on-button-ok-click",
  "on-button-cancel-click",
  "on-input-files",
  "remove-file",
]);

const handleFileRemovalRequest = (files) => {
  emit("remove-file", files);
};

const handleInputFiles = (files) => {
  emit("on-input-files", files);
};

onMounted(async () => {
  await getDocumentRequire();
  await getBusinessPartnerTypeId(props.businessPartnerTypeId)
});
const businessPartnerType = ref({});
const itemsRequireDocument = ref([]);

const getDocumentRequire = async () => {
  try {
    const response = await PartnerServive.getDocumentRequiresByInfo(
      props.businessPartnerRoleId,
      Number(props.businessPartnerTypeId),
      props.isVatRegistered == 1 ? true : false,
      props.isFilledBookBank == 1 ? true : false,
      props.companyIds
    );
    if (response.data?.is_success) {
      itemsRequireDocument.value = response.data.data;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
  }
};



const getBusinessPartnerTypeId = async (id) => {
  // console.log("bp", bp_number)
  try {
    const response = await PartnerServive.getPartnerTypeAllById(id);
    if (response.data?.is_success) {
      businessPartnerType.value = response.data.data;
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
const handleReverse = () => {
  emit("on-button-cancel-click");
};

const handleNext = async () => {
  emit("on-button-ok-click");
};
</script>
