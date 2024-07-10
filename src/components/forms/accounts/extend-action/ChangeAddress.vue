<template>
  <!-- เปลี่ยนที่อยู่ -->
  <v-container fuild>
    <v-row dense no-gutters>
      <v-col cols="12"><h2>เปลี่ยนที่อยู่</h2></v-col>
      <v-col cols="12">
        <v-card class="">
          <v-row dense no-gutters>
            <v-col cols="12">
              <v-card-title>
                <h6>Business Partner Number</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.partner_number"
                dense
                variant="outlined"
                :rules="required"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>ฺBranch Code</h6>
              </v-card-title>
              <!-- <v-select
                class="ml-4 mr-4"
                chips
                v-model="data_input.branch_code"
                :items="itemsBranchCode"
                multiple
                item-value="id"
                item-title="name"
                density="compact"
                variant="outlined"
              ></v-select> -->
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.branch_code"
                dense
                :rules="required"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>Branch Description</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.branch_description"
                dense
                variant="outlined"
              ></v-text-field>
              <!-- <v-select
                class="ml-4 mr-4"
                chips
                v-model="data_input.branch_description"
                :items="itemsBranchDesc"
                multiple
                item-value="id"
                item-title="name"
                density="compact"
                variant="outlined"
              ></v-select> -->
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>Name 1 (TH)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.name_1_th"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>Name 2 (TH)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.name_2_th"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>Name 3 (TH)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.name_3_th"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>Name 4 (TH)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.name_4_th"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>Name 1 (EN)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.name_1_en"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>Name 2 (EN)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.name_2_en"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>Name 3 (EN)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.name_3_en"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>Name 4 (EN)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.name_4_en"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>Address 1 (TH)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.address_1_th"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>Address 2 (TH)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.address_2_th"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>
            <AddressInputControlTH
              tag-desc="(TH)"
              key-value="id"
              key-title="name_th"
              :is-disable-address="false"
              :address-item="data_input.addressTh"
              @on-input="handleAddressInputTH"
              class="ml-4 mr-4"
            />

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>Address 1 (EN)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.address_1_en"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mt-n7">
              <v-card-title>
                <h6>Address 2 (EN)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.address_2_en"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>
            <!-- <AddressInputControlEN
              tag-desc="(EN)"
              key-value="id"
              key-title="name_en"
              :is-disable-address="true"
              :address-item="data_input.address"
              class="ml-5"
            /> -->
            <ManaulAddressInputControl
              :address-item="data_input.addressEn"
              tag-desc="(ภาษาอังกฤษ)"
              class="ml-4 mr-4"
              @on-input="handleAddressInputEn"
            />
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { ref, watch, watchEffect } from "vue";
// import AddressInputControlEN from "@/components/controls/AddressInputControl.vue";
import AddressInputControlTH from "@/components/controls/AddressInputControl.vue";
import ManaulAddressInputControl from "@/components/controls/ManaulAddressInputControl.vue";

const propsVar = defineProps({
  changeAddress: {
    type: Object,
  },
  index: Number,
});

const emit = defineEmits(["on-data-update"]);

// const itemsBranchCode = ref([]);
// const itemsBranchDesc = ref([]);

const required = [(v) => !!v || "กรุณากรอกข้อมูลให้ครบถ้วน"];

const data_input = ref({
  partner_number: "",
  name_1_th: "",
  name_2_th: "",
  name_3_th: "",
  name_4_th: "",
  name_1_en: "",
  name_2_en: "",
  name_3_en: "",
  name_4_en: "",
  address_1_th: "",
  address_2_th: "",
  address_3_th: "",
  address_1_en: "",
  address_2_en: "",
  address_3_en: "",
  search_term1_th: "",
  search_term1_en: "",
  addressTh: {
    province: null,
    district: null,
    parish: null,
    zip_code: null,
  },
  addressEn: {
    province: null,
    district: null,
    parish: null,
    zip_code: null,
  },
  branch_code: null,
  branch_description: null,
  business_partner_role: null,
});

const prefillBranchDesc = (branchCode) => {
  switch (branchCode) {
    case "NVAT":
      return "NVAT";
    case "00000":
      return "สำนักงานใหญ่";
    default:
      return branchCode;
  }
};

watchEffect(() => {
  data_input.value.partner_number =
    propsVar.changeAddress?.business_partner_number;

  data_input.value.name_1_th = propsVar.changeAddress?.name1_th;
  data_input.value.name_2_th = propsVar.changeAddress?.name2_th;
  data_input.value.name_3_th = propsVar.changeAddress?.name3_th;
  data_input.value.name_4_th = propsVar.changeAddress?.name4_th;

  data_input.value.name_1_en = propsVar.changeAddress?.name1_en;
  data_input.value.name_2_en = propsVar.changeAddress?.name2_en;
  data_input.value.name_3_en = propsVar.changeAddress?.name3_en;
  data_input.value.name_4_en = propsVar.changeAddress?.name4_en;

  data_input.value.search_term1_th = propsVar.changeAddress?.search_term1_th;
  data_input.value.search_term1_en = propsVar.changeAddress?.search_term1_th;

  data_input.value.address_1_th = propsVar.changeAddress?.address_th;
  data_input.value.address_2_th = propsVar.changeAddress?.address1_th;
  data_input.value.address_3_th = propsVar.changeAddress?.address2_th;

  data_input.value.address_1_en = propsVar.changeAddress?.address_en;
  data_input.value.address_2_en = propsVar.changeAddress?.address1_en;
  data_input.value.address_3_en = propsVar.changeAddress?.address2_en;

  data_input.value.business_partner_role =
    propsVar.changeAddress.business_partner_role?.id;

  data_input.value.addressTh = {
    province: propsVar.changeAddress?.province_th?.id,
    district: propsVar.changeAddress?.district_th?.id,
    parish: propsVar.changeAddress?.subdistrict_th?.id,
    zip_code: propsVar.changeAddress?.postal_code_th?.id,
  };

  data_input.value.addressEn = {
    province: propsVar.changeAddress?.province_en,
    district: propsVar.changeAddress?.district_en,
    parish: propsVar.changeAddress?.subdistrict_en,
    zip_code: propsVar.changeAddress?.postal_code_en?.id,
  };

  data_input.value.branch_code = propsVar.changeAddress?.branch_code;
  data_input.value.branch_description = prefillBranchDesc(
    propsVar.changeAddress?.branch_code
  );
});


const handleAddressInputTH = (address) => {
  data_input.value.addressTh = address;
};

const handleAddressInputEn = (address) => {
  data_input.value.addressEn = address;
};

watch(
  data_input.value,
  () => {
    emit("on-data-update", {
      index: propsVar.index,
      newValue: data_input.value,
    });
  },
  { deep: true, immediate: true }
);
</script>
