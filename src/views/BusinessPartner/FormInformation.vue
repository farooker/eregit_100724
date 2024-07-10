<template>
  <div>
    <ChangeInfoAccount
      @on-data-update="handleAccount"
      v-if="props.IsAccount === 'บัญชีธนาคาร'"
    />

    <ChangeInfoChangeName
      @on-data-update="handleChangeName"
      v-if="props.IsChangename === 'เปลียนชื่อ Search Term'"
    />

    <ChangeInfoBranch
      @on-data-update="handleChangeBranch"
      v-if="props.IsBrnch === 'เพิ่มสาขา'"
    />

    <ChangeInfoAddress
      @on-data-update="handleAddress"
      v-if="props.IsAddress === 'เปลี่ยนที่อยู่'"
    />

    <ChangeInfoContact
      @on-data-update="handleContact"
      v-if="props.IsContact === 'ข้อมูลผู้ติดต่อ'"
    />
    <!-- <ChangeInfoBusiness v-if="IsBusiness" /> -->
  </div>
  <div>
    <ChangeInformationDetail @on-input-files="handleInputFiles" />
  </div>

  <v-col cols="12" class="d-flex align-center justify-center">
    <ButtonControl text="ส่ง" @button-clicked="handleNext" />
  </v-col>
</template>

<script setup>
import { ref, defineProps } from "vue";
import ButtonControl from "@/components/controls/ButtonControl.vue";
import ChangeInformationDetail from "@/components/forms/partnerlist/Info-uploadfile.vue";

import ChangeInfoAddress from "@/components/forms/partnerlist/info-address.vue";
// import ChangeInfoBusiness from "@/components/forms/partnerlist/info-business.vue";

import ChangeInfoChangeName from "@/components/forms/partnerlist/InfoChangeName.vue";
import ChangeInfoContact from "@/components/forms/partnerlist/info-contact.vue";

import ChangeInfoBranch from "@/components/forms/partnerlist/InfoAddBranch.vue";
import ChangeInfoAccount from "@/components/forms/partnerlist/info-account.vue";

const itemUpdate = ref({
  info_account: null,
  info_change_name: null,
  info_barnch: null,
  info_adress: null,
  info_contact: null,
  file_update: [],
});

const emit = defineEmits(["on-button-ok-click"]);
const props = defineProps({
  IsAccount: {
    type: String,
    default: "",
  },
  IsChangename: {
    type: String,
    default: "",
  },
  IsBrnch: {
    type: String,
    default: "",
  },
  IsAddress: {
    type: String,
    default: "",
  },

  IsContact: {
    type: String,
    default: "",
  },
});

const handleAccount = (data) => {
  itemUpdate.value.info_account = data;
  // console.log("handleAccount",data);
};

const handleChangeName = (data) => {
  itemUpdate.value.info_change_name = data;
  // console.log("handleChangeName",data);
};

const handleChangeBranch = (data) => {
  itemUpdate.value.info_barnch = data;
  // console.log("handleChangeBranch",data);
};

const handleAddress = (data) => {
  itemUpdate.value.info_adress = data;
  // console.log("handleAddress",data);
};

const handleContact = (data) => {
  itemUpdate.value.info_contact = data;
  console.log("handleContact", data);
};

const handleInputFiles = (files) => {
  itemUpdate.value.file_update = files;
  // emit("on-input-files", files);
};

const handleNext = () => {
  emit("on-button-ok-click", itemUpdate.value);
  // emit("on-input-files", files);
};
</script>
