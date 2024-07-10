

<script setup>
/*eslint-disable no-unused-vars  */
import { ref, onBeforeMount, computed } from "vue";
import AttachedDocumentTable from "@/components/tables/businesspartner/AttacheducTable.vue";
import PaginationControl from "@/components/controls/PaginationControl";
import { useConfirmationDialog } from "@/components/dialogs/ConfirmationDialogService";
import Choosefile from "@/components/forms/Choosefile";
import PartnerServive from "@/apis/PartnerServive";
import UploadPolicy from "@/components/forms/UploadPolicy";
import { useRoute } from "vue-router";
import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
import UserService from "@/apis/UserService";
const { handlingErrorsMessage } = useErrorHandlingDialog();
const { showDialog } = useConfirmationDialog();
const emit = defineEmits(["visible"]);
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  items: Array
});
const fav = ref(true);
const menu = ref(false);
const message = ref(false);
const hints = ref(true);
const tab = ref(null);
const activeTab = ref(1); // เริ่มต้นด้วยแท็บ 1
const fileID = ref();

// const dialog = ref({
//   uploadPolicy:false
// });
const itemsFileDocument = ref([]);
const items = ref([]);
const bpitem = ref([]);
const file = ref(null);
const route = useRoute();
const bp_number = route.params.id;

onBeforeMount(() => {
  (items.value = [
    { title: "All Document", icon: "mdi-account-outline" },
    { title: "Recently Delete", icon: "mdi-link-variant" },
  ]),
    getBusinessPartnerDetail(bp_number),
    getUploadDocumentByFormNumber();
});
onBeforeMount(() => {});

const handleOnChangeFile = async (val) => {
  file.value = val;
};

const handleUpload = async () => {
  const documentData = [
    {
      document_name: file.value.name,
      size: file.value.size,
      type: file.value.type,
      content: file.value,
    },
  ];

  try {
    const response = await createUploadDocuments(bp_number, documentData);
    // console.log("Document upload successful:", response.data);
  } catch (error) {
    // console.error("Failed to upload documents:", error);
  }
};

onBeforeMount(() => {
  (items.value = [
    { title: "All Document", icon: "mdi-account-outline" },
    { title: "Recently Delete", icon: "mdi-link-variant" },
  ]),
    getBusinessPartnerDetail(bp_number),
    getUploadDocumentByFormNumber();
});
onBeforeMount(() => {});

const handleDelete = async (item) => {
  const response = await PartnerServive.getUploadDocumentByFormNumber(
    bp_number
  );
  response.data.data.forEach((file) => {
    // console.log(`Document ID: ${file.id}, is_active: ${file.is_active}`);
    fileID.value = file.id;
  });

  const confirmed = await showDialog(
    "ยืนยันลบแบบฟอร์ม",
    'กรุณาตรวจสอบคลิกปุ่ม "ตกลง" เพื่อดำเนินการ'
  );
  if (confirmed) {
    itemsFileDocument.value = itemsFileDocument.value.filter(
      (el) => el !== item
    );
    const response = await PartnerServive.DeletedFileUpload(item.id);
    // console.log(response.data);

    // console.log("Item deleted:", itemsFileDocument.value);
  } else {
    // console.log("Action cancelled.");
  }
};

const getBusinessPartnerDetail = async (bp_number) => {
  try {
    const response = await PartnerServive.getBusinessPartnerDetail(bp_number);
    if (response.data?.is_success) {
      bpitem.value = [response.data.data];
      // console.log("Data loaded for bpitem:", bpitem.value);
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
    } else {
      handlingErrorsMessage("unknown", e.message);
    }
  } finally {
    // console.log("Data fetching completed.");
  }
};


const activeDocuments = ref([]);
const inactiveDocuments = ref([]);

const getUploadDocumentByFormNumber = async () => {
  try {
    const response = await PartnerServive.getUploadDocumentByFormNumber(bp_number);

    if (response.data?.is_success) {
      const filteredData = response.data.data.reduce((acc, el) => {
        const documentDetail = {
          id: el.id,
          file: el.document_path,
          file_name: el.document_name,
          file_size: el.file_size || "Unknown", // Assume getFileSize provides this or placeholder
          created_at: formatDate(el.created_at),
          created_by: el.created_user_email || "Unknown", // Assuming this is resolved in background
          is_active: el.is_active
        };

        if (el.is_active) {
          acc.active.push(documentDetail);
        } else {
          acc.inactive.push(documentDetail);
        }
        return acc;
      }, { active: [], inactive: [] });

      activeDocuments.value = filteredData.active;
      inactiveDocuments.value = filteredData.inactive;
    }
  } catch (e) {
    console.error("Error fetching documents:", e.message);
  }
};

function getFileExtension(filename) {
  if (filename.includes(".") && filename.lastIndexOf(".") !== 0) {
    return filename.substring(filename.lastIndexOf(".") + 1);
  }
  return "";
}

async function getFileSize(url) {
  try {
    const response = await fetch(url, { method: "HEAD" }); // ใช้ method 'HEAD' เพื่อขอข้อมูล header และไม่ต้องดาวน์โหลดเนื้อหา
    if (!response.ok) throw new Error("Network response was not ok."); // ตรวจสอบว่า response สมบูรณ์หรือไม่

    const size = response.headers.get("Content-Length"); // ดึงค่า Content-Length จาก headers

    if (size !== null) {
      return parseInt(size, 10); // แปลงค่าเป็น integer
    } else {
      throw new Error("Content-Length header is missing"); // จัดการกรณีที่ไม่มี Content-Length header
    }
  } catch (error) {
    console.error("Error:", error.message);
    return 0; // ส่งค่า -1 เป็นตัวบ่งชี้ข้อผิดพลาด
  }
}

function formatDate(isoDate) {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
</script>

<template>
  <v-container>
    <h2>Attached Document</h2>
    <div class="mt-5">
      <v-row justify="end">
        <v-col cols="auto">
          <v-btn
            to="/BusinessPartner/CreateBusinessPartner"
            block
            class="text-capitalize rounded-pill request-document-button"
            color="red"
          >
            <v-icon left>mdi-file-document-outline</v-icon>
            ขอเอกสารเพิ่มเติม
          </v-btn>
        </v-col>
      </v-row>
        <AttachedDocumentTable class="mt-5" :items="bpitem" />


      <!-- <PaginationControl class="mt-9" /> -->
    </div>

    <v-card class="mt-9 pt-9">
      <v-toolbar color="rgba(0, 0, 0, 0)">
        <v-toolbar-title>
          <strong>แนบเอกสารเพิ่มเติม</strong>
        </v-toolbar-title>
        <!-- <template v-slot:append>
          <v-btn icon="mdi-close" @click="dialog = false"></v-btn>
        </template> -->
      </v-toolbar>

      <div class="pa-9">
        <Choosefile
          @input-file="handleOnChangeFile"
          :is-file="file"
          title=""
          list-title="uploaded Files"
        >
        </Choosefile>
        <div class="my-4 ms-4">
          <v-row justify="end">
            <v-col cols="auto">
              <v-btn
                class="rounded-pill"
                color="secondary"
                variant="flat"
                width="120"
                @click="handleUpload"
              >
                อัพโหลด
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-card>
    <div class="my-3">
      <div>
        <div class="btn-tabs">
          <button
            @click="activeTab = 1"
            :class="{ 'active-tab': activeTab === 1 }"
          >
            All Document
          </button>
          <button
            @click="activeTab = 2"
            :class="{ 'active-tab': activeTab === 2 }"
          >
            Recently Delete
          </button>
        </div>
        <div>
          <div v-show="activeTab === 1">
            <v-card
              v-for="doc in activeDocuments"
              :key="doc.id"
              elevation="2"
              rounded="0"
              class="rounded-lg mt-3"
            >
              <v-card-item class="ma-0">
                <v-row no-gutters dense justify="space-around">
                  <v-col
                    cols="1"
                    align-self="center"
                    class="d-flex justify-end"
                  >
                    <v-checkbox
                      hide-details
                      hide-spin-buttons
                      class="pa-0 ma-0"
                    ></v-checkbox>
                  </v-col>
                  <v-col
                    cols="1"
                    align-self="center"
                    class="d-flex justify-start"
                  >
                    <v-chip color="secondary" label>
                      {{ getFileExtension(doc.file_name).toUpperCase() }}
                    </v-chip>
                  </v-col>
                  <v-col cols="3" align-self="center" class="pa-1">
                    <strong>{{ doc.file_name }}</strong>
                  </v-col>
                  <v-col cols="1" align-self="center" class="pa-1">
                    <span>{{ doc.file_size }} MB.</span>
                  </v-col>
                  <v-divider vertical class="ma-2"></v-divider>
                  <v-col cols="2" align-self="center" class="pa-1">
                    <strong class="text-secondary">{{ doc.created_by }}</strong>
                    <br />
                    <strong>upload {{ formatDate(doc.created_at) }}</strong>
                  </v-col>
                  <v-col cols="2" align-self="center" class="pa-1">
                    <v-btn
                      class="me-2 text-none"
                      color="secondary"
                      variant="outlined"
                      rounded
                      :href="doc.file"
                      target="_blank"
                      download
                    >
                      <v-icon icon="mdi-download"></v-icon>
                      Download
                    </v-btn>
                  </v-col>
                  <v-col cols="1" align-self="center" class="pa-1">
                    <v-menu transition="scale-transition">
                      <template v-slot:activator="{ props }">
                        <v-btn text v-bind="props" variant="text">
                          <v-icon icon="mdi-dots-horizontal"></v-icon>
                        </v-btn>
                      </template>
                      <v-list dense>
                        <v-list-item @click="() => handleDelete(doc)">
                          <template v-slot:prepend>
                            <v-icon icon="mdi-delete"></v-icon>
                          </template>
                          <v-list-item-title>Delete</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-card-item>
            </v-card>
          </div>
          <div v-show="activeTab === 2">
            <v-card
              v-for="doc in inactiveDocuments"
              :key="doc.id"
              elevation="2"
              rounded="0"
              class="rounded-lg mt-3"
            >
              <v-card-item class="ma-0">
                <v-row no-gutters dense justify="space-around">
                  <v-col
                    cols="1"
                    align-self="center"
                    class="d-flex justify-end"
                  >
                    <v-checkbox
                      hide-details
                      hide-spin-buttons
                      class="pa-0 ma-0"
                    ></v-checkbox>
                  </v-col>
                  <v-col
                    cols="1"
                    align-self="center"
                    class="d-flex justify-start"
                  >
                    <v-chip color="secondary" label>
                      {{ getFileExtension(doc.file_name).toUpperCase() }}
                    </v-chip>
                  </v-col>
                  <v-col cols="3" align-self="center" class="pa-1">
                    <strong>{{ doc.file_name }}</strong>
                  </v-col>
                  <v-col cols="1" align-self="center" class="pa-1">
                    <span>{{ doc.file_size }} MB.</span>
                  </v-col>
                  <v-divider vertical class="ma-2"></v-divider>
                  <v-col cols="2" align-self="center" class="pa-1">
                    <strong class="text-secondary">{{ doc.created_by }}</strong>
                    <br />
                    <strong>upload {{ formatDate(doc.created_at) }}</strong>
                  </v-col>
                  <v-col cols="2" align-self="center" class="pa-1">
                    <v-btn
                      class="me-2 text-none"
                      color="secondary"
                      variant="outlined"
                      rounded
                      :href="doc.file"
                      target="_blank"
                      download
                    >
                      <v-icon icon="mdi-download"></v-icon>
                      Download
                    </v-btn>
                  </v-col>
                  <v-col cols="1" align-self="center" class="pa-1">
                    <v-menu transition="scale-transition">
                      <template v-slot:activator="{ props }">
                        <v-btn text v-bind="props" variant="text">
                          <v-icon icon="mdi-dots-horizontal"></v-icon>
                        </v-btn>
                      </template>
                      <v-list dense>
                        <v-list-item @click="() => handleDelete(doc)">
                          <template v-slot:prepend>
                            <v-icon icon="mdi-delete"></v-icon>
                          </template>
                          <v-list-item-title>Delete</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-card-item>
            </v-card>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<style scoped>
.btn-tabs button {
  margin: 5px;
  padding: 10px;
  border: none;
  /* background-color: lightgray; */
  cursor: pointer;
}
.btn-tabs button:focus,
button:hover {
  /* background-color: gray; */
  color: red;
  border-bottom: 3px solid red;
}

.btn-tabs button.active-tab {
  color: red;
  border-bottom: 3px solid red;
}

.btn-tabs div[role="tabpanel"] {
  display: none;
  border: 1px solid #ccc;
  padding: 10px;
}
.btn-tabs div[role="tabpanel"]:target {
  display: block;
}
</style>
