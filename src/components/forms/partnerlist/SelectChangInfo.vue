<template>
  <v-container>
    <h1 class="py-5">Change Information</h1>
    {{ props.DataInfo.business_partner_role }}

    <v-card
      class="pa-5 mb-3"
      v-if="props.DataInfo.business_partner_role === 'Customer'"
    >
      <div class="mb-1">ต้องการแก้ไขข้อมูลแบบใด</div>
      <v-radio-group v-model="input_data.selectedValue" color="red">
        <v-radio label="ต้องการแก้ไขข้อมูลเอง" value="1"></v-radio>
      </v-radio-group>
    </v-card>

    <v-card
      class="pa-5 mb-3"
      v-if="props.DataInfo.business_partner_role !== 'Customer'"
    >
      <div class="mb-1">ต้องการแก้ไขข้อมูลแบบใด</div>
      <v-radio-group v-model="input_data.selectedValue" color="red">
        <v-radio label="ต้องการแก้ไขข้อมูลเอง" value="1"></v-radio>
        <v-radio label="ส่งให้ Vendor แก้ไขข้อมูล" value="2"></v-radio>
      </v-radio-group>
    </v-card>

    <v-card class="pa-5 mt-3 box-checkbox">
      <div class="mb-1">คุณต้องการแก้ไขข้อมูลแบบใดบ้าง</div>
      <!-- <p>{{ selected }}</p> Customer -->

      <v-checkbox
        v-model="input_data.selectedBank"
        label="บัญชีธนาคาร"
        value="บัญชีธนาคาร"
      ></v-checkbox>
      <v-checkbox
        v-model="input_data.selectedChangeName"
        label="เปลียนชื่อ Search Term"
        value="เปลียนชื่อ Search Term"
        class=""
      ></v-checkbox>
      <v-checkbox
        v-model="input_data.selectedBranch"
        label="เพิ่มสาขา"
        value="เพิ่มสาขา"
      ></v-checkbox>
      <v-checkbox
        v-model="input_data.selectedAddress"
        label="เปลี่ยนที่อยู่"
        value="เปลี่ยนที่อยู่"
      ></v-checkbox>
      <v-checkbox
        v-model="input_data.selectedContact"
        label="ข้อมูลผู้ติดต่อ"
        value="ข้อมูลผู้ติดต่อ"
      ></v-checkbox>
    </v-card>

    <div class="ma-5 pa-5">
      <v-row justify="center" align="center">
        <v-col cols="12" class="d-flex justify-center">
          <!-- ปุ่มยกเลิก -->
          <v-btn color="black" @click="dialog = false" class="ma-0 pa-0 mr-7" style="min-width: 100px; height: 35px; border-radius: 15px;">
            ยกเลิก
          </v-btn>
          <!-- ปุ่มตกลง -->
          <v-btn color="red" @click="handleConfirm" class="ma-0 pa-0 mr-7" style="min-width: 100px; height: 35px; border-radius: 15px;">
            ตกลง
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script setup>
import { useConfirmationDialog } from "@/components/dialogs/ConfirmationDialogService";
import { ref, defineProps } from "vue";
// import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
// const { handlingErrorsMessage } = useErrorHandlingDialog();
const emit = defineEmits(["on-next"]);
const { showDialog } = useConfirmationDialog();
const input_data = ref({
  selectedValue: 0,
      selectedBank: "",
      selectedChangeName: "",
      selectedBranch: "",
      selectedAddress: "",
      selectedContact: "",
      selectedBusiness: "",
});
const props = defineProps({
  DataInfo: {
    type: Object,
  }
});
  // const  goBack() {
  //     this.$router.go(-1);
  //   }
//     handleConfirm() {
//       this.$emit("on-next", {
//         selectedBank: this.selectedBank,
//         selectedChangeName: this.selectedChangeName,
//         selectedBranch: this.selectedBranch,
//         selectedAddress: this.selectedAddress,
//         selectedContact: this.selectedContact,
//         selectedBusiness: this.selectedBusiness,
//       });
// };


const handleConfirm = async () => {
    if (
      await showDialog(
        "ยืยยันการแก้ไขข้อมูล ?",
        "กรุณาตรวจสอบการส่งเรื่อง คุณไม่สามารถแก้ไขได้แล้วอีก\nคลิกปุ่ม ตกลง เพื่อดำเนินการ"
      )
    )  emit("on-next", input_data.value);
};
</script>


<style scoped>
.box-checkbox :deep(.v-input__control) {
  height: 25px  !important;
}
</style>
