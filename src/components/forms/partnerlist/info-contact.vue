<template>
  <v-container>
    <div class="d-flex align-center justify-center">
      <h2 class="py-5">Change Information</h2>
    </div>

    <div class="d-flex align-center justify-center">
      <h2 class="pa-5">ข้อมูลผู้ติดต่อ</h2>
    </div>

    <v-row dense class="mb-5">
      <v-col cols="12">
        <v-card>
          <v-row dense no-gutters>
            <v-col cols="12">
              <v-card-title>
                <h6>Branch Code</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.branch_code"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row dense class="mb-5">
      <v-col cols="12"><h3>เพิ่มผู้ติดต่อ</h3></v-col>
      <v-col cols="12">
        <v-card>
          <v-row dense no-gutters>
            <v-col cols="12">
              <v-card class="pa-4">
                <v-card-title>
                  <v-row dense>
                    <v-col class="d-flex align-center" cols="4"
                      ><h6>ชื่อผู้ติดต่อ (ภาษาอังกฤษ)</h6>
                    </v-col>
                    <v-col class="d-flex align-center" cols="4"
                      ><h6>เบอร์โทรศัพท์</h6>
                    </v-col>
                    <v-col class="d-flex align-center" cols="4"
                      ><h6>Email เพื่อแจ้งชำระ</h6>
                    </v-col>
                  </v-row>
                  <!-- {{ data_input.items_contects }} -->
                  <v-row
                    dense
                    v-for="(item, index) in data_input.items_contects"
                    :key="index"
                  >
                    <v-col class="d-flex align-center" cols="4"
                      ><v-text-field
                        density="compact"
                        dense
                        :rules="textRequired"
                        v-model="item.contact_name"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col class="d-flex align-center" cols="4"
                      ><v-text-field
                        density="compact"
                        dense
                        :rules="textRequired"
                        v-model="item.contact_mobile_number"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col class="d-flex align-center" cols="4"
                      ><v-text-field
                        density="compact"
                        dense
                        :rules="textRequired"
                        v-model="item.contact_email"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <ButtonControl
                    icon="mdi mdi-plus"
                    text="เพิ่ม"
                    @button-clicked="handleAddNewContact"
                  />
                </v-card-title>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row dense class="mb-5">
      <v-col cols="12"><h3>ยกเลิกผู้ติดต่อ</h3></v-col>
      <v-col cols="12">
        <v-card>
          <v-row dense no-gutters>
            <v-col cols="12">
              <v-card class="pa-4">
                <v-card-title>
                  <v-row dense>
                    <v-col class="d-flex align-center" cols="4"
                      ><h6>ชื่อผู้ติดต่อ (ภาษาอังกฤษ)</h6>
                    </v-col>
                    <v-col class="d-flex align-center" cols="4"
                      ><h6>เบอร์โทรศัพท์</h6>
                    </v-col>
                    <v-col class="d-flex align-center" cols="4"
                      ><h6>Email เพื่อแจ้งชำระ</h6>
                    </v-col>
                  </v-row>
                  <!-- {{ data_input.items_contects }} -->
                  <v-row
                    dense
                    v-for="(item, index) in data_input.items_contects_cancel"
                    :key="index"
                  >
                    <v-col class="d-flex align-center" cols="4"
                      ><v-text-field
                        density="compact"
                        dense
                        :rules="textRequired"
                        v-model="item.contact_name"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col class="d-flex align-center" cols="4"
                      ><v-text-field
                        density="compact"
                        dense
                        :rules="textRequired"
                        v-model="item.contact_mobile_number"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col class="d-flex align-center" cols="4"
                      ><v-text-field
                        density="compact"
                        dense
                        :rules="textRequired"
                        v-model="item.contact_email"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <ButtonControl
                    icon="mdi mdi-plus"
                    text="เพิ่ม"
                    @button-clicked="handleCancelContact"
                  />
                </v-card-title>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { ref, watch } from "vue";
// import { useRouter } from "vue-router";
import ButtonControl from "@/components/controls/ButtonControl.vue";

const emit = defineEmits(["on-data-update"]);
const data_input = ref({
  branch_code: "",
  contact_name_en: "",
  items_contects: [],
  items_contects_cancel: [],
  phone_number: "",
  email_noti: "",

  contact_name_de: "",
  phone_number_de: "",
  email_noti_de: "",
});
// const router = useRouter();

const handleAddNewContact = () => {
  data_input.value.items_contects.push({
    contact_name: "",
    contact_mobile_number: "",
    contact_email: "",
  });
};

const handleCancelContact = () => {
  data_input.value.items_contects_cancel.push({
    contact_name: "",
    contact_mobile_number: "",
    contact_email: "",
  });
};


watch(
  data_input.value,
  (newValue) => {
    emit("on-data-update", newValue);
    console.log("ddddd", data_input.value);
  },
  { deep: true }
);
</script>
