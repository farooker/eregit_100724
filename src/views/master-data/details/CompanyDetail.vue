<template>
  <v-container>
    <h3>Company</h3>
    <v-card>
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <h4>ID</h4>
          </v-col>
          <v-col cols="12">
            <p>{{ data.id }}</p>
          </v-col>
          <v-col cols="12">
            <h4>Company Code</h4>
          </v-col>
          <v-col cols="12">
            <p>{{ data.company_code }}</p>
          </v-col>
          <v-col cols="12">
            <h4>Name TH</h4>
          </v-col>
          <v-col cols="12">
            <p>{{ data.name_th }}</p>
          </v-col>
          <v-col cols="12">
            <h4>Name EN</h4>
          </v-col>
          <v-col cols="12">
            <p>{{ data.name_en }}</p>
          </v-col>
          <v-col cols="12">
            <h4>Taxpayer ID number</h4>
          </v-col>
          <v-col cols="12">
            <p>{{ data.taxpayer_id_number }}</p>
          </v-col>
          <v-col cols="12">
            <h4>Address TH</h4>
          </v-col>
          <v-col cols="12">
            <p>{{ data.address_th }}</p>
          </v-col>
          <v-col cols="12">
            <h4>Address EN</h4>
          </v-col>
          <v-col cols="12">
            <p>{{ data.address_en }}</p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
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
      </v-row>
    </v-footer>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import ButtonControl from "@/components/controls/ButtonControl.vue";
import CompnayService from "@/apis/CompnayService";

const route = useRoute();
const router = useRouter();

const id = route.params.id;

let data = ref({});

onMounted(async () => {
  await onLoadedCompanyById(id);
});

const onLoadedCompanyById = async (companyId) => {
  try {
    const response = await CompnayService.getCompanyById(companyId);
    if (response.data?.is_success) {
      data.value = response.data.data;
    }
  } catch (error) {
    // Failed
  }
};

const on_go_to_back = () => {
  router.go(-1);
};
</script>
