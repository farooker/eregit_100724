<template>
  <v-row dense>
    <v-col cols="12">
      <v-card color="secondary" style="background-color: #ED1C24 !important; border-radius: 10px;">
        <v-card-item style="height: 60px;">
          <v-row align="center" justify="start"  dense >
            <v-col cols="1">
              <v-checkbox
                hide-details
                v-if="menuItems.length > 0"
                v-model="is_check_all"
                class="pa-0 m"
                center-affix
                density="compact"
              ></v-checkbox>
            </v-col>
            <v-col cols="1" class="d-flex justify-start">
              <h5>Created date</h5>
            </v-col>
            <v-col cols="2">
              <h5>Case type</h5>
            </v-col>
            <v-col cols="1">
              <h5>Role</h5>
            </v-col>
            <v-col cols="3">
              <h5>Name</h5>
            </v-col>
            <v-col cols="3">
              <h5>Contact Owner</h5>
            </v-col>
            <v-col cols="1"> </v-col>
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
        class="mt-3"

      >
        <v-alert
          :style="{ borderLeft: borderLeft }"
          color="white"
          elevation="1"
          class="mt-2"
          style="border-radius: 10px !important; "

        >
          <v-row dense>
            <v-col cols="1">
              <v-checkbox
                color="green"
                v-model="is_item_check"
                v-if="menuItems.length > 0"
                hide-details
                class="pa-0 mt-2"
                :value="item.id"
                center-affix
                density="compact"
                @click.stop
              ></v-checkbox>
            </v-col>
            <v-col cols="1" align-self="center">
              <h4>
                {{ getDateString(item.created_at) }}
              </h4>
            </v-col>
            <v-col cols="2" align-self="center">
              <v-chip
              style="border-radius: 8px; box-shadow: none;"
                color="secondary"
                v-if="item.account_task_action === 'New Register'"
                variant="elevated"
                label
              >
                New Register
              </v-chip>
              <v-chip
                color="#18E2E2"
                v-if="item.account_task_action === 'Extend Company'"
                variant="elevated"
                label
              >
                Extend Company
              </v-chip>
              <v-chip
                color="#1ECAEC"
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
                Change Information'
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
            <v-col cols="1" align-self="center">
              <h4>
                {{ item.business_partner_role?.name }}
              </h4>
            </v-col>
            <v-col cols="3" align-self="center">
              <h4>
                {{ item.business_partner_name }}
              </h4>
            </v-col>
            <v-col cols="3" align-self="center">
              <v-chip color="secondary" label style="border-radius: 15px;">
                {{ item.contact_owner?.email }}
              </v-chip>
              <br />
              <div style="font-size: 14px;">
                <strong>{{ item.contact_owner?.team?.name_en }}</strong>
              /<span class="text-grey">While convenient, the color pack</span>/
              <span class="text-grey">Commentail</span>
              </div>
            </v-col>
            <v-col cols="1" align-self="center" v-if="menuItems.length > 0">
              <v-menu transition="scale-transition">
                <template v-slot:activator="{ props }">
                  <v-btn text v-bind="props" variant="text">
                    <v-icon size="30px" icon=" mdi-dots-horizontal"></v-icon>
                  </v-btn>
                </template>

                <v-list dense>
                  <v-list-item
                    v-for="menu in menuItems"
                    :key="menu.id"
                    @click.stop
                    @click="
                      handleMuneClick(menu.id, item.id, index, item.form_number)
                    "
                    class="d-flex align-center px-0 py-0"
                  >
                    <template v-slot:prepend>
                      <v-btn
                        v-bind="props"
                        variant="text"
                        :prepend-icon="menu.icon"
                        style="background-color: transparent;"
                      >
                        {{ menu.title }}
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
import { ref, watch, computed } from "vue";
import convertColorNameToRGB from "@/utils/util.js";
const props = defineProps({
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
  colorCardAlert: {
    type: String, //success,warming,error
  },
  menuItems: {
    type: Array,
    required: true,
    default: () => [
      {
        id: 0,
        title: "Event Name",
        icon: "mdi mdi-close-circle",
      },
    ],
  },
});

const is_check_all = ref(false);
let is_item_check = ref([]);

watch(
  is_check_all,
  (new_value) => {
    if (new_value) {
      props.items.forEach((el) => {
        if (!is_item_check.value.includes(el.id)) {
          is_item_check.value.push(el.id);
        }
      });
    } else if (is_item_check.value.length === props.items.length) {
      is_item_check.value = [];
    }
  },
  { deep: true }
);

const emit = defineEmits([
  "handle-menu-clicked",
  "handle-selection",
  "handle-item-click",
]);

watch(
  is_item_check,
  (new_value, older_value) => {
    if (is_check_all.value && new_value.length !== older_value.length)
      is_check_all.value = false;
    emit("handle-selection", new_value);
  },
  { deep: true }
);

const handleMuneClick = (event_id, item_id, index, form_number) => {
  emit("handle-menu-clicked", { event_id, item_id, index, form_number });
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


<style scoped>

</style>
