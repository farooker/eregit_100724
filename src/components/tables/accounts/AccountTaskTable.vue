<template>
  <v-row dense>
    <v-col cols="12">
      <v-card
        color="secondary"
        style="background-color: #ed1c24 !important; border-radius: 10px"
      >
        <v-card-item>
          <v-row align="center" justify="start" dense>
            <v-col
              class="ml-1 mt-1"
              v-for="header in props.headers"
              :key="header.value"
              :cols="header.width"
            >
              <h4>{{ header.text }}</h4>
            </v-col>
          </v-row>
        </v-card-item>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-row
        v-for="(item, index) in props.items"
        :key="index"
        dense
        @click="handleItemClick(item)"
      >
        <v-alert
          class="mt-3 mx-1"
          :style="{ borderLeft: borderLeft }"
          color="white"
          style="border-radius: 10px !important"
          elevation="1"
        >
          <v-row dense>
            <v-col cols="1" align-self="center">
              <h4>
                {{ getDateString(item.created_at) }}
              </h4>
            </v-col>
            <v-col cols="2" align-self="center">
              <v-chip
                style="border-radius: 8px; box-shadow: none"
                color="secondary"
                v-if="item.account_task_action === 'New Register'"
                variant="elevated"
                label
              >
                New Register
              </v-chip>
              <v-chip
                color="#1ECAEC"
                v-if="item.account_task_action === 'Extend Company'"
                variant="elevated"
                label
              >
                Extend Company
              </v-chip>
              <v-chip
                color="#046B37"
                v-if="item.account_task_action === 'Extend Role'"
                variant="elevated"
                label
              >
                Extend Role
              </v-chip>
              <v-chip
                color="#148DB4"
                v-if="item.account_task_action === 'Change Information'"
                variant="elevated"
                label
              >
                Change Information
              </v-chip>
              <v-chip
                v-if="item.account_task_action === ''"
                variant="elevated"
                label
              >
                Unknow State
              </v-chip>
              <v-chip
                v-if="item.account_task_action === 'NewTasks'"
                variant="elevated"
                label
              >
                New Tasks
              </v-chip>
            </v-col>
            <v-col cols="2" align-self="center">
              <h4  class="truncate">
                {{ item.business_partner_role?.name }}
              </h4>
            </v-col>
            <v-col cols="3" align-self="center">
              <h4 class="truncate">
                {{ item.business_partner_name }}
              </h4>
            </v-col>
            <v-col cols="3" align-self="center">
              <v-chip color="secondary" label style="border-radius: 15px">
                {{ item.contact_owner?.email }}
              </v-chip>
              <br />
              <div style="font-size: 14px">
                <strong  class="truncate">{{ item.contact_owner?.team?.name_en }}</strong>
                /<span class="text-grey">While convenient, the color pack</span
                >/
                <span class="text-grey">Commentail</span>
              </div>
            </v-col>
            <v-col cols="1" align-self="center">
              <v-menu transition="scale-transition">
                <template v-slot:activator="{ props }">
                  <v-btn text v-bind="props" variant="text">
                    <v-icon size="30px" icon=" mdi-dots-horizontal"></v-icon>
                  </v-btn>
                </template>

                <v-list dense>
                  <v-list-item @click="handleReject(item.id)">
                    <template v-slot:prepend>
                      <v-btn
                        v-bind="props"
                        variant="text"
                        prepend-icon="mdi mdi-close-circle"
                      >
                        Reject
                      </v-btn>
                    </template>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>
        </v-alert>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup>
import { computed } from "vue";
import convertColorNameToRGB from "@/utils/util.js";
const props = defineProps({
  headers: {
    type: Array,
    default: () => [
      { text: "Created Date", width: 1 },
      { text: "Case type", width: 2 },
      { text: "Role", width: 2 },
      { text: "Name", width: 3 },
      { text: "Contact owner", width: 3 },
      { text: "", width: 1 },
    ],
  },
  colorCardAlert: {
    type: String,
    default: "success", //success,warming,error
  },
  items: {
    type: Array,
    default: () => [
      {
        id: 1,
        account_task_action: "Extend Company",
        form_number: "112312312",
        account_task_state: "NewTasks",
        contact_owner: {
          id: 1,
          email: "test@email.com",
          firstname: "Test",
          lastname: "System",
          is_register: true,
          is_active: true,
          member_type: {
            id: 1,
            name: "Employee",
          },
          team: {
            name_th: "การตลาด",
            name_en: "Marketing",
            is_active: true,
            company: {
              id: 2,
              company_code: "3000",
              name_th: "บริษัท เฟรเซอร์ส พร็อพเพอร์ตี้ โฮม (ประเทศไทย) จำกัด",
              name_en: "Frasers Property (Thailand) Public Company Limited",
              taxpayer_id_number: "1234567890123",
              address_th:
                "944 มิตรทาวน์ ออฟฟิศ ทาวเวอร์ ชั้นที่ 20 ถนนพระราม 4 แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร 10330",
              address_en:
                "944 Mitrtown Office Tower, 22nd- 23rd Floor, Rama 4 Road, Wangmai Subdistrict, Pathumwan District, Bangkok 10330",
              business_unit: {
                id: 2,
                name_th: "Residential",
                name_en: "Residential",
                purchasing_organization: "GL00",
                corporation: {
                  id: 1,
                  name_th:
                    "บริษัท เฟรเซอร์ส พร็อพเพอร์ตี้ โฮม (ประเทศไทย) จำกัด",
                  name_en: "Frasers Property (Thailand) Public Company Limited",
                },
              },
              created_at: "2023-10-04T15:40:00",
              created_user_id: 1,
              updated_at: "2023-10-04T15:40:00",
              updated_user_id: 1,
            },
          },
          role: {
            id: 1,
            name: "admin",
            description: "",
          },
          created_at: "2023-10-04T15:40:00",
          created_user_id: 1,
          updated_at: "2023-10-04T15:40:00",
          updated_user_id: 1,
        },
        created_at: "2023-12-09T00:00:00Z",
        created_user_id: 16,
        updated_at: "2023-12-09T00:00:00Z",
        updated_user_id: 16,
      },
      {
        id: 2,
        account_task_action: "Extend Company",
        form_number: "112312312",
        account_task_state: "NewTasks",
        contact_owner: {
          id: 1,
          email: "test@email.com",
          firstname: "Test",
          lastname: "System",
          is_register: true,
          is_active: true,
          member_type: {
            id: 1,
            name: "Employee",
          },
          team: {
            name_th: "การตลาด",
            name_en: "Marketing",
            is_active: true,
            company: {
              id: 2,
              company_code: "3000",
              name_th: "บริษัท เฟรเซอร์ส พร็อพเพอร์ตี้ โฮม (ประเทศไทย) จำกัด",
              name_en: "Frasers Property (Thailand) Public Company Limited",
              taxpayer_id_number: "1234567890123",
              address_th:
                "944 มิตรทาวน์ ออฟฟิศ ทาวเวอร์ ชั้นที่ 20 ถนนพระราม 4 แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร 10330",
              address_en:
                "944 Mitrtown Office Tower, 22nd- 23rd Floor, Rama 4 Road, Wangmai Subdistrict, Pathumwan District, Bangkok 10330",
              business_unit: {
                id: 2,
                name_th: "Residential",
                name_en: "Residential",
                purchasing_organization: "GL00",
                corporation: {
                  id: 1,
                  name_th:
                    "บริษัท เฟรเซอร์ส พร็อพเพอร์ตี้ โฮม (ประเทศไทย) จำกัด",
                  name_en: "Frasers Property (Thailand) Public Company Limited",
                },
              },
              created_at: "2023-10-04T15:40:00",
              created_user_id: 1,
              updated_at: "2023-10-04T15:40:00",
              updated_user_id: 1,
            },
          },
          role: {
            id: 1,
            name: "admin",
            description: "",
          },
          created_at: "2023-10-04T15:40:00",
          created_user_id: 1,
          updated_at: "2023-10-04T15:40:00",
          updated_user_id: 1,
        },
        created_at: "2023-12-09T00:00:00Z",
        created_user_id: 16,
        updated_at: "2023-12-09T00:00:00Z",
        updated_user_id: 16,
      },
    ],
  },
});

const emit = defineEmits(["handle-reject-clicked", "handle-item-click"]);

const handleReject = (id) => {
  emit("handle-reject-clicked", id);
};

const handleItemClick = (item) => {
  emit("handle-item-click", item);
};

const getDateString = (dateString) => {
  const date = new Date(dateString);
  let day = String(date.getDate()).padStart(2, "0");
  let month = String(date.getMonth() + 1).padStart(2, "0");
  let year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const borderLeft = computed(() => {
  const rgb = convertColorNameToRGB(props.colorCardAlert);
  return `rgba(${rgb}, 1) 8px solid`;
});
</script>

<style>
.truncate {
  white-space: normal;
  overflow: hidden;
  word-wrap: break-word; /* ให้ข้อความข้ามบรรทัดใหม่ตามคำ */
}
</style>
