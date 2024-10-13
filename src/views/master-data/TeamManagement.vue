<template>
  <v-container>
    <v-form ref="form">
      <create-team-form v-if="!hasId" @on-change="handleInputCreate" />
      <edit-team-form
        v-if="hasId"
        :item="itemTeam"
        @on-change="handleInputUpdate"
      />
    </v-form>
    <v-footer color="transparent" style="margin-top: 120px">
      <v-row justify="center">
        <v-col cols="auto">
          <button-control
            color="black"
            text="ย้อนกลับ"
            width="100"
            @button-clicked="on_go_to_back"
          />
        </v-col>
        <v-col cols="auto">
          <button-control
            type="submit"
            @button-clicked="submit_from_update_team"
            color="secondary"
            text="ตกลง"
            width="100"
          />
        </v-col>
      </v-row>
    </v-footer>
  </v-container>
</template>

<script setup>
import CreateTeamForm from "@/components/forms/CreateTeamForm.vue";
import EditTeamForm from "@/components/forms/EditTeamForm.vue";
import ButtonControl from "@/components/controls/ButtonControl.vue";

import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
const { handlingErrorsMessage } = useErrorHandlingDialog();

import { ref } from "vue";
import { onMounted } from "vue";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import TeamService from "@/apis/TeamService";

const route = useRoute();
const router = useRouter();

const id = route.params.id;
const hasId = computed(() => !!id);
const itemTeam = ref({});
const form = ref(null);

const dataInput = ref({});

const process_array = (item) => {
  return {
    id: item?.id,
    business_unit: item?.company?.business_unit?.name_th,
    business_unit_id: item?.company?.business_unit?.id,
    company: item?.company?.name_en,
    company_id: item?.company?.id,
    name_th: item?.name_th,
    name_en: item?.name_en,
    status: true,
    action: [
      { color: "secondary", icon: "mdi mdi-pencil", text: "", action: "edit" },
      { color: "black", icon: "mdi mdi-trash-can", text: "", action: "delete" },
    ],
    history: "history_log",
    is_active: item?.is_active,
  };
};

onMounted(async () => {
  if (hasId.value) {
    await onLoadedTeamVyId(id);
  }
});

const onLoadedTeamVyId = async (teamId) => {
  try {
    const response = await TeamService.getTeamById(teamId);
    if (response.data?.is_success) {
      itemTeam.value = process_array(response.data.data);
    }
  } catch (error) {
    if (error.response) {
      const val = error.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("Other Error", error.message);
  }
};

const onCreateTeam = async () => {
  try {
    const response = await TeamService.createdTeam(
      dataInput.value.company,
      dataInput.value.name_th,
      dataInput.value.name_en,
      dataInput.value.is_status
    );
    if (response.data?.is_success) {
      router.push({ path: "/MasterDataManagement" });
    }
  } catch (error) {
    if (error.response) {
      const val = error.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("Other Error", error.message);
  }
};

const onUpdateTeam = async () => {
  try {
    const response = await TeamService.updatedTeamById(
      id,
      dataInput.value.company,
      dataInput.value.name_th,
      dataInput.value.name_en,
      dataInput.value.is_status
    );
    if (response.data?.is_success) {
      router.push({ path: "/MasterDataManagement" });
    }
  } catch (error) {
    if (error.response) {
      const val = error.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("Other Error", error.message);
  }
};

const handleInputCreate = (inputData) => {
  // console.log(JSON.stringify(inputData));
  dataInput.value = inputData;
  console.log(dataInput.value)
};

const handleInputUpdate = (inputData) => {
  // console.log(JSON.stringify(inputData));
  dataInput.value = inputData;
  console.log(dataInput.value)
};

const on_go_to_back = () => {
  router.go(-1);
};

const submit_from_update_team = async () => {
  const validObj = await form.value.validate();
  if (!validObj.valid) return;
  if (hasId.value) {
    await onUpdateTeam();
  } else {
    await onCreateTeam();
  }
};
</script>
