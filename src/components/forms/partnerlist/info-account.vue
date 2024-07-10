<template>
  <v-container>
    <div class="d-flex align-center justify-center">
      <h2 class="py-5">Change Information</h2>
    </div>

    <div class="d-flex align-center justify-center">
      <h2 class="pa-5">บัญชีธนาคาร</h2>
    </div>

    <v-row dense class="mb-5">
      <v-col cols="12"><h2>เพิ่มบัญชีธนาคาร</h2></v-col>
      <v-col cols="12">
        <v-card>
          <v-row dense no-gutters>
            <v-col cols="12">
              <v-card-title>
                <h6>ชื่อบัญชี (ภาษาอังกฤษ)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.account_name_en"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-card-title>
                <h6>ธนาคาร</h6>
              </v-card-title>
              <v-select
                class="ml-4 mr-4"
                v-model="data_input.bank"
                :items="data_input.item_bank"
                item-value="id"
                item-title="name"
                density="compact"
                variant="outlined"
              ></v-select>
            </v-col>

            <v-col cols="12">
              <v-card-title>
                <h6>สาขาธนาคาร</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.branch_account"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-card-title>
                <h6>เลขบัญชี</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.account_number"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row dense class="mt-9">
      <v-col cols="12"><h2>ยกเลิกบัญชีธนาคาร</h2></v-col>
      <v-col cols="12">
        <v-card>
          <v-row dense no-gutters>
            <v-col cols="12">
              <v-card-title>
                <h6>ชื่อบัญชี (ภาษาอังกฤษ)</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.account_name_de"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-card-title>
                <h6>ธนาคาร</h6>
              </v-card-title>
              <v-select
                class="ml-4 mr-4"
                v-model="data_input.bank_de"
                :items="data_input.item_bank"
                item-value="id"
                item-title="name"
                density="compact"
                variant="outlined"
              ></v-select>
            </v-col>

            <v-col cols="12">
              <v-card-title>
                <h6>สาขาธนาคาร</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.branch_account_de"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-card-title>
                <h6>เลขบัญชี</h6>
              </v-card-title>
              <v-text-field
                class="ml-4 mr-4"
                density="compact"
                v-model="data_input.account_number_de"
                dense
                variant="outlined"
              ></v-text-field>
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
const emit = defineEmits(["on-data-update"]);
const data_input = ref({
  account_name_en: "",
  branch_account: "",
  account_number: "",

  account_name_de: "",
  branch_account_de: "",
  account_number_de: "",

  bank: null,
  bank_de: null,

  item_bank: [
    {
      id: 0,
      name: "test1",
    },
    {
      id: 1,
      name: "test9",
    },
  ],
});

watch(
  data_input.value,
  (newValue) => {
    emit("on-data-update", newValue);
    console.log("ddddd", data_input.value);
  },
  { deep: true }
);
// const router = useRouter();
</script>
