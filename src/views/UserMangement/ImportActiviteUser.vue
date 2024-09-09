<template>
  <div>
    <v-row justify="end" class="mt-2 mb-2">
      <v-col cols="2">
        <v-btn variant="elevated"
              class="text-capitalize"
              color="secondary"
              :disabled="loading"
              block
              @click="download">
          <v-icon left>mdi-microsoft-excel</v-icon>
          Download template
        </v-btn>
      </v-col>
    </v-row>
    <Choosefile class="elevation-1 pa-8" @input-file="handleOnChangeFile" :is-file="file"></Choosefile>
    <ImportActiveUserTable class="mt-5 mb-5" :items="items" :company-code="comapnies_code" />
    <div v-if="isValid.length > 0" >
      <strong class="text-secondary">ไฟล์ที่ที่อัพไม่ตรงกับ template กรุณาตรวจสอบและอัพใหม่อีกครั้ง*</strong>
      <div v-for="message in isValid" :key="message">
        <strong class="text-secondary">{{ message }}</strong>
      </div>
    </div>
    <v-divider class="mt-5 mb-5"></v-divider>
    <div class="text-center ">
      <v-btn rounded class="ma-2"
            color="black"
            style="width: 100px;"
            :disabled="loading"
            @Click="dismiss">
        <strong>ยกเลิก</strong>
      </v-btn>
      <v-btn rounded class="ma-2"
            color="secondary"
            style="width: 100px;"
            :disabled="loading"
            :loading="loading"
            @Click="submit">
        <strong>ตกลง</strong>
      </v-btn>
    </div>
  </div>
</template>
<script setup>

/*eslint-disable no-unused-vars  */
import readXlsxFile from 'read-excel-file'
import { Base64 } from 'js-base64'
import { saveAs } from 'file-saver'
import Choosefile from '@/components/forms/Choosefile'
import compnayService from '@/apis/CompnayService';
import ImportActiveUserTable from "@/components/tables/ImportActiveUserTable.vue";
import validate from "@/utils/validateUtils";
import userService from '@/apis/UserService';
import { useConfirmationDialog } from '@/components/dialogs/ConfirmationDialogService'
import { useErrorHandlingDialog } from '@/components/dialogs/ExceptionHandleDialogService'
import { useValidDialog } from '@/components/dialogs/TemplateDialogService'

import { ref, reactive, onMounted } from "vue";

const emit = defineEmits(["is-title", 'is-view']);
const { showValidDialog } = useValidDialog();
const { handlingErrorsMessage } = useErrorHandlingDialog();
const { showDialog } = useConfirmationDialog();

const file = ref(null);
const items = ref([]);
const loading = ref({
  companies_code :false
});
const comapnies_code = ref([]);
const isValid = ref([]);
onMounted(() => {
  emit('is-title', "");
  handleLoadCompaniesCodeAll();
});
const handleLoadCompaniesCodeAll = async () => {
  try {
    loading.value = true;
    const response = await compnayService.getCompanyAll();
    if (response.data?.is_success) {
      comapnies_code.value = Array.from(response.data.data, (i) => i.company_code)
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data
       handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  } finally {
     loading.value = false;
  }
}


const handleOnChangeFile = async (_file) => {
  file.value = _file;
  items.value = [];
  isValid.value = [];
  const value = await readXlsxFile(_file);
  for (let index = 1; index < value.length; index++) {
    const format = {
      email: value[index][0], // emial
      member_type:  value[index][1], //User Type
      company_code: value[index][2], // company
      role: value[index][3], // role
      team: value[index][4], // tea,
    }
    if (!validate.isValidEmail(format.email)) {
      const message = `No.${index} Email format ไม่ถูกต้อง`;
      isValid.value.push(message)
    }
    if (!validate.isValidRole(format.role)) {
      const message = `No.${index} ไม่มี Role ที่เลือก`;
      isValid.value.push(message)
    }
    if(!comapnies_code.value.includes(String(format.company_code))){
      const message = `No.${index} company format ไม่ถูกต้อง`;
      isValid.value.push(message)
    }
    items.value.push(format)
  }
}
const dismiss = () => {
  emit("is-view", 'user-main')
}
const download = async () => {
  try {
    loading.value = true;
    const response = await userService.downloadCreateMultipleUserTemplate();
    const { data } = response
    const decode = Base64.toUint8Array(data)
    const blob = new Blob([decode], { type: 'xlsx' })
    saveAs(blob, "TemplateActiviteUser.xlsx")
  } catch (e) {
    if (e.response) {
      const val = e.response.data
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  } finally {
    loading.value = false;
  }
}
const submit = async (e) => {
  e.preventDefault()
  if (file.value === null) {
    await showValidDialog('ไม่พบไฟล์', 'กรุณาตรวจสอบไฟล์และอัพโหลดใหม่อีกครั้ง');
    return
  }
  const fileName = file.value.name
  const isFile = fileName.split('.');
  if (!validate.isValidExcel(isFile[1])) {
    await showValidDialog('ไฟล์ที่อัพโหลดไม่ใช้ไฟล์ Excel', 'กรุณาตรวจสอบไฟล์และอัพโหลดใหม่อีกครั้ง');
    return
  }
  if (isValid.value.length > 0) {
    await showValidDialog('ไฟล์ที่อัพโหลดไม่ตรงกับ templete', 'กรุณาตรวจสอบไฟล์และอัพโหลดใหม่อีกครั้ง');
    return
  }
  const confirmed = await showDialog('ยืนยันการบันทึก?', 'กรุณาตรวจสอบ คลิกปุ่ม "ตกลง" เพื่อดำเนินการ');
  if (confirmed) {
    try {
      loading.value = true;
      const response = await userService.createMultipleUser(items.value);
      console.log(response);
      if (response.data?.is_success) {
        file.value = null;
        items.value = [];
        isValid.value = [];
        dismiss();
      }
    } catch (e) {
      if (e.response) {
        const val = e.response.data
        handlingErrorsMessage(val.message, val?.data.error);
        return;
      }
      handlingErrorsMessage("unknown", e.message);
    } finally {
      loading.value = false;
    }
  } else {
    console.log('Action cancelled.');
  }
}

</script>
