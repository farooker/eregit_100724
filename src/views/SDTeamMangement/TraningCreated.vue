<template>
  <v-container>
    <h2>Mangement > Traning</h2>
    <div class="mt-5">
      <v-card class="elevation-1">
        <v-card-text>
          <div>
            <strong>ชื่อเรื่อง</strong>
            <v-text-field variant="outlined" placeholder="ชื่อกรอกชื่อเรื่อง" density="compact"></v-text-field>
          </div>
          <div>
            <strong>Link SCORM</strong>
            <v-text-field variant="outlined" placeholder="กรอก Link SCORM" density="compact"></v-text-field>
          </div>
          <div>
            <strong>Role</strong>
            <v-select
                variant="outlined"
                density="compact"
                placeholder="Role"
                item-title="name"
                item-value="id"
              ></v-select>
          </div>

        </v-card-text>
       <v-radio-group>
          <template v-slot:label>
            <div><strong>Active กิจกรรมนี้เมื่อใด</strong></div>
          </template>

          <v-radio value="now">
            <template v-slot:label>
              <div  class="pa-1"><strong class="text-black">Active ตอนนี้</strong></div>
            </template>
          </v-radio>

          <v-radio value="date" class="pa-1">
            <template v-slot:label>
              <div style="width: 500px;">
              <v-row align="center">
              <v-col cols="3" align-self="center">
                <strong class="text-black">Active วันที่ </strong>
              </v-col>
              <v-col cols="9" align-self="center">
                <MenuDatePickerControl
                width="500"
                :value="date"
                @value="date = $event"
                placeholder="Active Date"
                 />
              </v-col>
              </v-row>
              </div>
            </template>
          </v-radio>
        </v-radio-group>
      </v-card>
      <div class="text-center mt-5">
        <v-btn rounded class="ma-2"
        to="/SDTeamMangement/Traning"
        color="black" style="width: 100px;">
          <strong>ยกเลิก</strong>
        </v-btn>
        <v-btn rounded class="ma-2" color="secondary" style="width: 100px;" @click="handleAccept">
          <strong>ตกลง</strong>
        </v-btn>
      </div>
    </div>
  </v-container>
</template>
<script setup>
// eslint-disable-next-line no-unused-vars
import { ref, computed } from "vue";
//import Choosefile from '@/components/forms/Choosefile'
import MenuDatePickerControl from '@/components/controls/MenuDatePickerControl.vue'
import { useConfirmationDialog } from '@/components/dialogs/ConfirmationDialogService'
const { showDialog } = useConfirmationDialog();
// const emit = defineEmits(["visible"]);
// const props = defineProps({
//   visible: {
//     type: Boolean,
//     default: false,
//   },
// });
const date = ref(null);
// const file = ref(null);
// const dialog = computed({
//   get() { return props.visible },
//   set(value) { emit("visible", value) },
// });

// const handleOnChangeFile = async (val) => {
//   file.value = val;
// }
const handleAccept = async () =>{

  const confirmed = await showDialog('ยืนยัน Active ตอนนี้','กรุณาตรวจสอบคลิกปุ่ม "ตกลง" เพื่อดำเนินการ');
      if (confirmed) {
        console.log('Action confirmed!');
      } else {
        console.log('Action cancelled.');
      }
}

</script>

