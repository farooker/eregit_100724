<script setup>
import { onMounted, ref, watchEffect } from "vue";
import ButtonControl from "@/components/controls/ButtonControl.vue";
import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
const { handlingErrorsMessage } = useErrorHandlingDialog();
import { useConfirmationDialog } from "@/components/dialogs/ConfirmationDialogService";
import OtherService from "@/apis/OtherService";
import PartnerServive from "@/apis/PartnerServive";
const { showDialog } = useConfirmationDialog();

const props = defineProps({
  pb_number: {
    type: String,
  },
});

const emit = defineEmits(["on-commit-data", "on-back"]);

const itemPbNumber = ref();

watchEffect(async () => {
  itemPbNumber.value = props.pb_number;
  if (itemPbNumber.value) {
    await onLoadBusinessPartnerByBpNumber();
    await onLoadBusinessPartnerMemberByBpNumber();
  }
});

const member_selections = ref(null);
const inputData = ref({
  radio: "",
  contact_owner: {
    id: "",
    email: "",
    member_type: "",
  },
  company: {
    business_partner_unit: "",
  },
  vender: "",
  document_type: [],
  comment: "",
});
const itemsDocumentType = ref([]);
const businessPartnerFormBpNumber = ref({});
const itemMembers = ref([]);
const form = ref(null);

onMounted(async () => {
  await onLoadDocumentTypes();
});

const handleBack = () => {
  emit("on-back");
};

const onLoadDocumentTypes = async () => {
  try {
    const response = await OtherService.getDocumentType();
    if (response.data?.is_success) {
      itemsDocumentType.value = response.data.data;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(
        val.message ?? "Error",
        val?.data?.error ?? "some thing error"
      );
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  }
};

const onLoadBusinessPartnerByBpNumber = async () => {
  try {
    const response = await PartnerServive.getBusinessPartnerByBpNumber(
      itemPbNumber.value
    );
    if (response.data?.is_success) {
      businessPartnerFormBpNumber.value = response.data.data;
      inputData.value.contact_owner.id =
        businessPartnerFormBpNumber.value.contact_owner_user?.id;
      inputData.value.contact_owner.email =
        businessPartnerFormBpNumber.value.contact_owner_user?.email;
      inputData.value.company.business_partner_unit =
        businessPartnerFormBpNumber.value.contact_owner_user?.team?.company?.business_unit?.name_en;
      inputData.value.contact_owner.member_type =
        businessPartnerFormBpNumber.value.contact_owner_user?.member_type?.name;
      inputData.value.radio = 1;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(
        val.message ?? "Error",
        val?.data?.error ?? "some thing error"
      );
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  }
};

const onLoadBusinessPartnerMemberByBpNumber = async () => {
  try {
    const response = await PartnerServive.getBusinessPartnerMemberByBpNumber(
      "097938"
    );
    if (response.data?.is_success) {
      itemMembers.value = response.data.data.map((el) => el.user.email);
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      console.error(
        val.message ?? "Error",
        val?.data?.error ?? "some thing error"
      );
      return;
    }
    console.error("unknown", e.message);
  }
};

const saveBusinessPartnerMember = async () => {
  try {
    const response = await PartnerServive.createBusinessPartnerMember();
    if (response.data?.is_success) {
      return true;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      console.error(
        val.message ?? "Error",
        val?.data?.error ?? "some thing error"
      );
      return false;
    }
    console.error("unknown", e.message);
    return false;
  }
};

const handleSubmit = async () => {
  const is_valid = await form.value.validate();
  if (is_valid && is_valid["valid"]) {
    if (
      await showDialog(
        "ยืนยันส่งแบบฟอร์มของเอกสารเพิ่ม ?",
        'กรุณาตรวจสอบการส่งเรื่อง\nคลิกปุ่ม "ตกลง" เพื่อดำเนินการ'
      )
    ) {
      window.alert(
        `Request documents : commit data to [Account Detail] by data : ${JSON.stringify(
          inputData.value
        )}`
      );
      emit("on-commit-data", inputData.value);
    }
  } else {
    window.alert("Request documents invalid data!, Please check!");
  }
};
</script>
<template>
  <v-form ref="form">
    <v-card-title>
      <h3>ขอเอกสารเพิ่มเติม</h3>
    </v-card-title>
    <v-card class="py-5 px-5">
      <v-row dense no-gutters>
        <v-col cols="12">
          <v-radio-group v-model="inputData.radio">
            <v-radio
              label="ขอเอกสารเพิ่มเติมจาก Contact Owner"
              color="black"
              :value="1"
            ></v-radio>
            <v-card
              color="secondary_active"
              max-width="450"
              class="ml-10 pa-3 mb-2"
            >
              <v-row dense>
                <v-col cols="12" class="d-flex justify-start">
                  <h4 style="color: rgb(213, 109, 109)">
                    <p>paphatchai.s@frasersproperty.com</p>
                    <!-- {{ inputData.contact_owner.email }} -->
                  </h4>
                </v-col>
                <v-col cols="12" class="d-flex justify-start">
                  <h4>{{ inputData.contact_owner.member_type }}</h4>
                  <strong>test</strong>
                  /<span class="text-grey"
                    >While convenient, the color pack</span
                  >/
                  <span class="text-grey">Commentail</span>
                  <!-- <span class="text-grey">{{
                    inputData.company.business_partner_unit
                  }}</span> -->
                </v-col>
              </v-row>
            </v-card>
            <v-text-field
              class="ml-10"
              density="compact"
              dense
              variant="outlined"
              v-model="inputData.contact_owner.email"
            ></v-text-field>
            <v-radio
              label="ขอเอกสารเพิ่มเติมจาก Vender"
              color="black"
              :value="2"
            ></v-radio>
          </v-radio-group>
        </v-col>

        <v-col cols="12">
          <v-select
            v-model="member_selections"
            class="ml-9 pa-1 mt-n8"
            label="Select"
            :items="itemMembers"
            variant="outlined"
            density="compact"
          ></v-select>
          <!-- <v-combobox
            v-model="member_selections"
            class="ml-10 pa-1 mt-n8"
            density="compact"
            :items="itemMembers"
            variant="outlined"
          ></v-combobox> -->
        </v-col>
        <!--
        <v-col cols="12">
          <v-select
            v-model="member_selections"
            class="ml-10 pa-1 mt-n8"
            density="compact"
            :items="itemMembers"
            variant="outlined"
            item-title="user.email"
            item-value="id"
          ></v-select>
        </v-col> -->
      </v-row>
    </v-card>

    <v-card-title>
      <h3>เอกสาร</h3>
    </v-card-title>
    <v-card class="pa-8">
      <v-row dense no-gutters>
        <v-col cols="12" class="mt-n5">
          <v-card-title>
            <h5>ระบุเอกสารที่ต้องการ</h5>
          </v-card-title>
          <v-select
            :items="itemsDocumentType"
            item-value="id"
            item-title="name_th"
            density="compact"
            v-model="inputData.document_type"
            multiple
            chips
            variant="outlined"
          ></v-select>
        </v-col>

        <v-col cols="12" class="mt-n5">
          <v-card-title>
            <h5>เอกสารอื่นๆ</h5>
          </v-card-title>
          <v-textarea
            v-model="inputData.comment"
            variant="outlined"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-card>
  </v-form>
  <v-footer color="transparent" style="margin-top: 50px">
    <v-row justify="center">
      <v-col cols="auto">
        <button-control
          color="black"
          text="ย้อนกลับ"
          width="100"
          @button-clicked="handleBack"
        />
      </v-col>
      <v-col cols="auto">
        <button-control
          type="submit"
          @button-clicked="handleSubmit"
          color="secondary"
          text="ตกลง"
          width="100"
        />
      </v-col>
    </v-row>
    {{ itemPbNumber }}
  </v-footer>
</template>
