<template>
   <div>
    <v-card class="mx-auto elevation-1" color="secondary">
      <v-card-item>
        <v-row align-center>
          <v-col cols="2">
            <strong>Create date</strong>
          </v-col>
          <v-col cols="2">
            <strong> Email</strong>
          </v-col>
          <v-col cols="1">
            <strong>Status</strong>
          </v-col>
          <v-col cols="4">
            <strong>Company</strong>
          </v-col>
          <v-col cols="1">
            <strong>Role</strong>
          </v-col>
        </v-row>
      </v-card-item>
    </v-card>
    <v-expansion-panels v-model="panel" class="mt-1">
    <v-progress-linear
        class="rounded-pill"
        :indeterminate="loading"
        bg-color="transparent"
        color="secondary"
      ></v-progress-linear>
      <v-expansion-panel v-for="(i, index) in props.items" :key="index" class="mt-1"
        :style="index === panel ? 'border: 2px solid red;' : ''">
        <v-expansion-panel-title :color="index === panel ? '#FFF1F0' : ''">
          <template v-slot:actions="{ expanded }">
            <v-icon color="secondary" :icon="expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"></v-icon>
          </template>
          <v-row no-gutters dense justify="space-around">
            <v-col cols="2" align-self="center">
              <span class="font-weight-bold"> {{ dateUtils.parseDdMmYy(i.created_at) }}</span>
            </v-col>
            <v-col cols="2" align-self="center">
               <span class="font-weight-bold">{{i.email}}</span>
            </v-col>
            <v-col cols="1" align-self="center">
              <Active :value="i.is_active" />
            </v-col>
            <v-col cols="4" align-self="center">
              <span class="font-weight-bold"> {{i.team?.company?.name_th}}</span>
            </v-col>
            <v-col cols="1" align-self="center">
                <Role  :value="i.role?.name" />
            </v-col>
            <v-col cols="2" align-self="center">
              <v-btn class="me-2 text-none font-weight-bold" color="secondary" variant="flat" rounded @click="handleEditEvent(i)">
                แก้ไข
              </v-btn>
            </v-col>
          </v-row>

        </v-expansion-panel-title>
        <v-expansion-panel-text style="background-color: #fff1f0">
          <v-card class="ml-n3 mr-n3" elevation="0" rounded="0">
            <v-card-item class="ma-2">
              <v-row align-center  v-if="i.member_type.id === 1">
                <v-col cols="2">
                  <v-card-item>
                    <v-card-title class="text-secondary">User Type</v-card-title>
                    <strong>{{i.member_type?.name}}</strong>
                  </v-card-item>
                </v-col>
                <v-col cols="2">
                  <v-card-item>
                    <v-card-title class="text-secondary">ฺBusiniess Unit</v-card-title>
                    <strong>{{i.team?.company?.business_unit?.name_th}}</strong>
                  </v-card-item>
                </v-col>
                <v-col cols="8">
                  <v-card-item>
                    <v-card-title class="text-secondary">Team</v-card-title>
                    <strong>{{i.team?.name_th}}</strong>
                  </v-card-item>
                </v-col>
              </v-row>
              <v-row align-center  v-if="i.member_type.id === 2">
                <v-col cols="2">
                  <v-card-item>
                    <v-card-title class="text-secondary">User Type</v-card-title>
                    <strong>{{i.member_type?.name}}</strong>
                  </v-card-item>
                </v-col>
                <v-col cols="10">
                  <v-card-item>
                    <v-card-title class="text-secondary">Contact Owner</v-card-title>
                    ????
                      <!-- <span> <strong class="text-secondary"> Freelance@gamil.com</strong> <strong>( Freelance /
                        Active)</strong></span> -->
                  </v-card-item>
                </v-col>
              </v-row>
              <v-divider class="mt-2 mb-2"></v-divider>
              <v-row justify="end">
                <v-col cols="1">
                  <a href="/HistoryUserPage" class="text-black">History log</a>
                </v-col>
              </v-row>
            </v-card-item>
          </v-card>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
   </div>
</template>
<script setup>
// eslint-disable-next-line no-unused-vars
import { ref, onMounted } from 'vue';
import { defineProps } from 'vue';
import Active from '@/components/status/Active'
import Role from '@/components/status/Role'
import dateUtils from "@/utils/dateUtils";

const emit = defineEmits(["action-edit"]);
const props = defineProps({
  items: {
    type: Array,
    default: ()=> []
  },
  loading: {
    type: Boolean,
    default: false
  },
  height: {
    type: Number,
    default: 400
  }
});
const panel= ref([]);

const  handleEditEvent=(item)=> {
      emit("action-edit",item)
}
</script>



