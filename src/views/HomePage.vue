<template>
  <v-container fluid>
    <h3 style="margin-bottom: 15px">Example Component</h3>
    <!-- <v-row>
      <v-col cols="auto">
        <ButtonControl color="red" text="Example" />
      </v-col>
      <v-col cols="auto">
        <HistoryControl />
      </v-col>
      <v-col cols="auto">
        <PaginationControl />
      </v-col>
    </v-row>
    <h3 style="margin-bottom: 15px">Example DataTable</h3>
    <v-row>
      <v-col cols="12">
        <HistoryTable />
      </v-col>
      <v-col cols="12">
        <MasterTable />
      </v-col>
      <v-col cols="12">
        <PermissionTable :headers="herders_table" :desserts="desserts" />
      </v-col>
    </v-row>
    <h3 style="margin-bottom: 15px; margin-top: 15px">Dialog Component</h3>
    <v-row
      ><v-col cols="auto"
        ><ButtonControl
          color="red"
          text="Open Dialog ยืนยัน"
          @button-clicked="on_open_log"
        /> </v-col
    ></v-row>
    <v-row
      ><v-col cols="auto"
        ><ButtonControl
          color="black"
          text="Open Alert"
          @button-clicked="on_open_alert"
        /> </v-col
    ></v-row>
    <v-row>
      <v-col cols="12">
        <CreditOption />
      </v-col>
    </v-row>
    <v-row
      ><v-col cols="auto">
        <ButtonControl
          color="black"
          text="Open Dialog"
          @button-clicked="on_open_log"
        /> </v-col
    ></v-row>

<v-combobox
  chips
  multiple
  label="Combobox"
  :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
  variant="solo-inverted"
  item-color="red"
></v-combobox>
<v-select
  v-model="selectedItems"
  :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
  :menu-props="{ top: true, offsetY: true }"
  small-chips
  label="Roles"
  multiple
  hint="Select the role"
  persistent-hint
>
  <template #selection="{ item }">
  <div v-if="raw === Texas" >
    <v-chip color="red">{{ item }}</v-chip>
    </div>
  </template>
</v-select>

    <h3 style="margin-bottom: 15px; margin-top: 15px">
      List Drag & Drop Question card
    </h3>
    <draggable v-model="cardsDragDrop" tag="ul" handle=".handle" item-key="id">
      <template v-slot:item="{ element, index }">
        <v-row>
          <v-col cols="12">
            <v-form ref="form">
              <QuestionOption
                :type="element.typeQuestionCard"
                :id="element.id.toString()"
                :index="Number(index)"
                :data="element.data"
                @on-update="handleQuestionUpdate"
                @on-remove="handleQuestionRemove"
              />
            </v-form>
          </v-col>
        </v-row>
      </template>
    </draggable>
    <v-btn @click="submitForm">Submit</v-btn> -->
  </v-container>
</template>

<!-- <script setup>
// eslint-disable-next-line no-unused-vars
import { ref, watch, onMounted, onBeforeMount, onBeforeUnmount } from "vue";
import draggable from "vuedraggable";
import ButtonControl from "@/components/controls/ButtonControl.vue";
import HistoryControl from "@/components/controls/HistoryControl.vue";
import PaginationControl from "@/components/controls/PaginationControl.vue";
import HistoryTable from "@/components/tables/HistoryTable.vue";
import MasterTable from "@/components/tables/MasterTable.vue";
import PermissionTable from "@/components/tables/PermissionTable.vue";
import { useConfirmationDialog } from "@/components/dialogs/ConfirmationDialogService";
const { showDialog } = useConfirmationDialog();

import { useAlertDialogDialog } from "@/components/dialogs/AlertSuccessDialogService";
const { showAlert } = useAlertDialogDialog();


const cardsDragDrop = ref([
  {
    id: "1",
    typeQuestionCard: "None",
    data: {
      controlType: "Paragraph",
      metaData: {
        question: "ไข่กับไก่อะไรเกิดก่อน ?",
        answer: "",
        isRequire: true,
      },
    },
  },
  {
    id: "2",
    typeQuestionCard: "None",
    data: {
      controlType: "Multichoice",
      metaData: {
        question: "ข้อใดถูกที่สุด",
        isRequired: true,
        answers: [
          {
            title: "chioce",
            isChecked: false,
            answer: "ตัวเลือกที่ 1",
          },
          {
            title: "chioce",
            isChecked: false,
            answer: "ตัวเลือกที่ 2",
          },
          {
            title: "other",
            isChecked: false,
            answer: "ตัวเลือกอื่นๆ",
          },
        ],
      },
    },
  },
  {
    id: "3",
    typeQuestionCard: "None",
    data: {
      controlType: "Dropdown",
      metaData: {
        question: "ขอใดถูกต้องที่สุด ?",
        isRequired: false,
        answers: [
          { answer: "Option 1" },
          { answer: "Option 2" },
          { answer: "Option 3" },
        ],
      },
    },
  },
]);


const herders_table = [
  { title: "Permission Module", key: "permission" },
  { title: "View", key: "view" },
  { title: "Create", key: "created" },
  { title: "Update", key: "updated" },
  { title: "Delete", key: "deleted" },
];

const desserts = [
  {
    permission: "Permission",
    view: true,
    created: false,
    updated: true,
    deleted: true,
  },
];

const form = ref(null);
const selectedItems  = ref([]);

const submitForm = () => {
  if (form.value.validate()) {
    // ทำการส่งข้อมูลของฟอร์มหากผ่านการตรวจสอบความถูกต้อง
    // สามารถทำการนำทางหรือจัดการข้อมูลต่อได้ที่นี่
  }
};

onMounted(() => {
  //   SCORM.init();
  //   courseURL.value =
  //     "https://8e07-1-46-134-176.ngrok-free.app//mod/scorm/player.php?a=5&currentorg=Frasers_property_-_ESG_Made_Simple_ORG&scoid=10&sesskey=miFNTCFFQs&display=popup&mode=normal";
});
const on_open_log = async () => {
  const confirmed = await showDialog(
    "ยืนยันการบันทึก",
    'กรุณาตรวจสอบ\nคลิกปุ่ม"ตกลง"เพื่อดำเนินการ'
  );
  if (confirmed) {
   await this.on_open_alert();
  } else {
    window.alert("Cancel");
  }
};

const on_open_alert = async () => {
  const confirmed = await showAlert(
    "เผยแพร่สำเร็จแล้ว",
    "คุณสามารถตรวจสอบรายการได้"
  );
  if (confirmed) {
    window.alert("Accept");
  }
};

const handleQuestionUpdate = (item) => {
  console.log(JSON.stringify(item));
};

const handleQuestionRemove = (id) => {
  const indexOfById = cardsDragDrop.value.findIndex((el) => el.id == id);
  if (indexOfById > -1) cardsDragDrop.value.splice(indexOfById, 1);
};

document.addEventListener('DOMContentLoaded', function () {
  const combobox = document.querySelector('.v-combobox');

  combobox.addEventListener('change', function () {
    const selectedItems = combobox.querySelectorAll('.v-chip--selected');

    selectedItems.forEach(function (item) {
      item.classList.add('selected-item');
    });
  });
});

</script> -->

<!-- <style>

  .theme--light.v-combobox.v-combobox--chips .v-chip--selected {
    background-color: red;
    color: red;
  }
</style> -->

