<template>
  <v-container>
    <h3>Corparation</h3>
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
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

import ButtonControl from "@/components/controls/ButtonControl.vue";

const route = useRoute();
const router = useRouter();

const id = route.params.id;

let data = reactive([]);
data = {
  id: 1,
  name_th: "เฟรเซอร์ส พร็อพเพอร์ตี้ (ประเทศไทย)",
  name_en: "Frasers Property Thailand",
  created_at: "2023-09-25T15:29:08Z",
  created_user_id: 1,
  updated_at: "2023-09-25T15:29:08Z",
  updated_user_id: 1,
};

const on_go_to_back = () => {
  router.go(-1);
};
</script>
