<template>
  <v-row dense style="padding-left: 15px">
    <v-col cols="12">
      <v-card-title>
        <h5>กรณีต้องการให้บริษัทโอนเข้าบัญชี</h5>
      </v-card-title>
    </v-col>
    <v-col cols="12" class="mt-n5">
      <v-card-title>
        <h6>ชื่อบัญชี (ภาษาอังกฤษ)</h6>
      </v-card-title>
      <v-text-field
        class="ml-4 mr-6"
        density="compact"
        dense
        v-model="data_input.acc_name_en"
        variant="outlined"
        :rules="textRequired"
        :readonly="props.isDisableAddress"
        :bg-color="bgColor"
      ></v-text-field>
    </v-col>
    <v-col cols="12" class="mt-n5">
      <v-card-title>
        <h6>ธนาคาร</h6>
      </v-card-title>
      <v-select
        class="ml-4 mr-6"
        :items="itemBanks"
        item-value="id"
        item-title="name_th"
        :rules="textRequired"
        density="compact"
        variant="outlined"
        @update:model-value="handleBankSelection"
        v-model="data_input.bank_name"
        :readonly="props.isDisableAddress"
        :bg-color="bgColor"
      ></v-select>
    </v-col>
    <v-col cols="12" class="mt-n5">
      <v-card-title>
        <h6>สาขาธนาคาร</h6>
      </v-card-title>
      <v-text-field
        class="ml-4 mr-6"
        density="compact"
        dense
        variant="outlined"
        v-model="data_input.bank_branch"
        :readonly="props.isDisableAddress"
        :bg-color="bgColor"
        :rules="textRequired"
      ></v-text-field>
    </v-col>
    <v-col cols="12" class="mt-n5">
      <v-card-title>
        <h6>เลขที่บัญชี</h6>
      </v-card-title>
      <v-text-field
        class="ml-4 mr-6"
        density="compact"
        dense
        variant="outlined"
        v-model="data_input.acc_number"
        :rules="textRequired"
        :readonly="props.isDisableAddress"
        :bg-color="bgColor"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script setup>
import OtherService from "@/apis/OtherService";
import { ref, watch, computed } from "vue";
import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
import { onMounted } from "vue";
const { handlingErrorsMessage } = useErrorHandlingDialog();

const emit = defineEmits(["on-input"]);

const props = defineProps({
  accNameEn: {
    type: String,
    default: "",
  },
  bankName: {
    type: String,
    default: null,
  },
  bankBranch: {
    type: String,
    default: null,
  },
  bankAccountNumber: {
    type: String,
    default: null,
  },
  isDisableAddress: {
    type: Boolean,
    default: false,
  },
});

const itemBanks = ref([]);

onMounted(async () => {
  await getBanks();
});

const textRequired = [(v) => !!v || "กรุณากรอกข้อมูลให้ครบถ้วน"];

const bgColor = computed(() => {
  return props.isDisableAddress ? "#dfdfdf" : "white";
});
const data_input = ref({
  acc_name_en: props.accNameEn,
  bank_name: props.bankName,
  bank_branch: props.bankBranch,
  acc_number: props.bankAccountNumber,
  bank_key: null,
});

watch(
  () => props.accNameEn,
  (newValue) => {
    data_input.value.acc_name_en = newValue;
  }
);

watch(
  () => data_input.value.bank_name,
  (newVal) => {
    const item_find = itemBanks.value.find((el) => el.id == newVal);
    if (item_find) data_input.value.bank_key = item_find.bank_key;
  },
  { deep: true }
);

const handleBankSelection = (item) => {
  const item_find = itemBanks.value.find((el) => el.id == item);
  if (item_find) data_input.value.bank_key = item_find.bank_key;
  console.warn(JSON.stringify(data_input.value));
};

const getBanks = async () => {
  try {
    const response = await OtherService.getBanksAll();
    if (response.data?.is_success) {
      itemBanks.value = response.data.data.map((item) => ({
        ...item,
        id: item.id.toString(),
      }));
      const item_find = itemBanks.value.find(
        (el) => el.id == data_input.value.bank_name
      );
      if (item_find) data_input.value.bank_key = item_find.bank_key;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  }
};

watch(
  () => data_input.value,
  (newValue) => {
    emit("on-input", newValue);
  },
  { deep: true }
);
</script>
