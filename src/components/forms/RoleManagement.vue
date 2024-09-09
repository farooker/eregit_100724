<template>
  <v-container>
    <v-card>
      <v-card-text>
        <!-- <v-form ref="form"> @submit.prevent="submit"> -->
          <v-row no-gutters dense>
            <v-col><h4>Name Rule</h4></v-col>
            <v-col cols="12">
              <v-text-field
                variant="outlined"
                readonly
                bg-color="#dfdfdf"
                v-model="localRoleName"
                placeholder="กรอกชื่อ role"
                :rules="[(v) => !!v || 'Name role is required']"
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters dense>
            <v-col><h4>Description</h4></v-col>
            <v-col cols="12">
              <v-text-field
                variant="outlined"
                readonly
                bg-color="#dfdfdf"
                v-model="localRoleDesc"
                placeholder="กรอกรายละเอียด role"
                :rules="[(v) => !!v || 'Description is required']"
                required
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>
        <!-- </v-form> -->
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  role_name_p: {
    type: String,
    default: ''
  },
  role_desc_p: {
    type: String,
    default: ''
  },
});

const emit = defineEmits(["on-update-role"]);

const localRoleName = ref(props.role_name_p);
const localRoleDesc = ref(props.role_desc_p);

watch(() => props.role_name_p, (newValue) => {
  localRoleName.value = newValue;
});

watch(() => props.role_desc_p, (newValue) => {
  localRoleDesc.value = newValue;
});

watch(localRoleName, (newValue) => {
  emit("on-update-role", { name: newValue, desc: localRoleDesc.value });
});

watch(localRoleDesc, (newValue) => {
  emit("on-update-role", { name: localRoleName.value, desc: newValue });
});
</script>
