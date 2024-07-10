<template>
  <v-container>
    <div class="d-flex align-center justify-center">
      <h2 class="py-5">Change Information</h2>
    </div>

    <div class="d-flex align-center justify-center">
      <h2 class="pa-5">เปลี่ยนที่อยู่</h2>
    </div>

    <v-row dense class="mb-5">
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-card-title>
              <h6>Branch Code</h6>
            </v-card-title>
            <v-row dense no-gutters>
              <v-col cols="12">
                <v-text-field
                  class="ml-4 mr-4"
                  density="compact"
                  v-model="data_input.branch_code"
                  :rules="rules_valid.branchcodeRule"
                  dense
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row dense class="mb-5">
      <v-col cols="12">
        <v-card>
        <v-card-text>
          <v-row dense no-gutters>
            <v-col cols="12" class="mt-2">
              <v-card-title>
                <h6>ที่อยู่ (ภาษาไทย)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.address.th.address"
                :rules="rules_valid.adressthRules"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12"
              ><AddressInputControlTH
                class="ml-4 mr-4"
                tag-desc="(TH Branch)"
                :is-not-team="true"
                :isDisableAddress="false"
                :address-item="data_input.address.th.info"
                @on-input="handleAddressTH"
            /></v-col>
          </v-row>
             </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row dense class="mb-5">
      <v-col cols="12">
        <v-card>
        <v-card-text>
          <v-row dense no-gutters>
            <v-col cols="12" class="mt-2">
              <v-card-title>
                <h6>ที่อยู่ (อังกฤษ)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.address.en.address"
                :rules="rules_valid.adressenRules"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <AddressInputControlEN
                tag-desc="(ภาษาอังกฤษ)"
                key-value="id"
                key-title="name_en"
                class="ml-5 mr-5"

                :address-item="data_input.address.en.info"
              />
            </v-col>
          </v-row>
           </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { ref, watch } from "vue";

import AddressInputControlTH from "@/components/controls/AddressInputControl.vue";
import AddressInputControlEN from "@/components/controls/AddressInputControl.vue";

const emit = defineEmits(["on-data-update"]);

const data_input = ref({
  branch_code: "",
  address: {
    en: {
      address: null,
      info: {
        province: null,
        district: null,
        parish: null,
        zip_code: null,
      },
    },
    th: {
      address: null,
      info: {
        province: null,
        district: null,
        parish: null,
        zip_code: null,
      },
    },
  },
});

const rules_valid = ref({
  email: [
    (v) => !!v || "กรุณากรอกข้อมูลให้ครบ",
    (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Email format ไม่ถูกต้อง",
  ],
  radioRules: [(v) => !!v || "กรุณาเลือก 1 อัน"],
  branchcodeRule: [
    (v) => !!v || "กรุณากรอกข้อมูล Branch Code",
    (v) => /^\S+(\s\S+)*$/.test(v) || "ข้อความต้องไม่เป็นค่าว่าง",
  ],
  adressthRules: [
    (v) => !!v || "* กรุณากรอกที่อยู่",
    (v) =>
      /^[\u0E00-\u0E7F\s]+$/.test(v) ||
      "* กรุณากรอกข้อมูลเป็นอักษรภาษาไทยเท่านั้น",
    (v) => v.length >= 2 || "* กรุณากรอกที่อยู่อย่างน้อย 2 ตัวอักษร",
    (v) => /^\S+(\s\S+)*$/.test(v) || "* กรุณากรอกข้อมูลให้ถูกต้อง",
  ],
  adressenRules: [
    (v) => !!v || "* กรุณากรอกที่อยู่",
    (v) =>
      /^[a-zA-Z\s]+$/.test(v) || "* กรุณากรอกข้อมูลเป็นอักษรภาษาอังกฤษเท่านั้น",
    (v) => v.length >= 2 || "* กรุณากรอกที่อยู่อย่างน้อย 2 ตัวอักษร",
    (v) => /^\S+(\s\S+)*$/.test(v) || "* กรุณากรอกข้อมูลให้ถูกต้อง",
  ],
});


watch(
  data_input.value,
  (newValue) => {
    emit("on-data-update", newValue);
    // console.log("ddddd", data_input.value )
  },
  { deep: true }
);

const handleAddressTH = (data_obj) => {
  // console.log("AddressInputControlEN", data_obj)
  data_input.value.address.th.info = data_obj;
  data_input.value.address.en.info = data_obj;
};

// const router = useRouter();
</script>
