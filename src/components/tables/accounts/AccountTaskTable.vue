<template>
  <v-row dense>
    <v-col cols="12">
      <v-card
        color="secondary"
        style="background-color: #ed1c24 !important; border-radius: 10px"
      >
        <v-card-item>
          <!-- <v-row align="center" justify="start" dense>
            <v-col
              class="ml-1 mt-1"
              v-for="header in props.headers"
              :key="header.value"
              :cols="header.width"
            >
              <h4>{{ header.text }}</h4>
            </v-col>
          </v-row> -->
          <v-row align="center" justify="start" dense>
            <v-col cols="1" class="d-flex justify-start">
              <strong
                @click="sortByField('created_at')"
                style="cursor: pointer; font-size: small; margin-top: 2px"
              >
                <v-icon>
                  {{
                    sortDirection === "created_at:desc"
                      ? "mdi-arrow-up"
                      : "mdi-arrow-down"
                  }}
                </v-icon>
                Created date
              </strong>
            </v-col>
            <v-col cols="2">
              <strong
                @click="sortByField('account_task_action')"
                style="cursor: pointer; font-size: small"
              >
                <v-icon>
                  {{
                    sortDirection === "account_task_action:desc"
                      ? "mdi-arrow-up"
                      : "mdi-arrow-down"
                  }}
                </v-icon>
                Case type
              </strong>
            </v-col>
            <v-col cols="1">
              <strong
                style="cursor: pointer; font-size: small"
              >
                <v-icon>
                  {{
                    sortDirection === "role:asc"
                      ? "mdi-arrow-up"
                      : "mdi-arrow-down"
                  }}
                </v-icon>
                Role
              </strong>
            </v-col>
            <v-col cols="3">
              <strong
                @click="sortByField('business_partner_name')"
                style="cursor: pointer; font-size: small"
              >
                <v-icon>
                  {{
                    sortDirection === "business_partner_name:desc"
                      ? "mdi-arrow-up"
                      : "mdi-arrow-down"
                  }}
                </v-icon>
                Name
              </strong>
            </v-col>
            <v-col cols="3">
              <strong
                @click="sortByField('contact_owner')"
                style="cursor: pointer; font-size: small"
              >
                <v-icon>
                  {{
                    sortDirection === "contact_owner:desc"
                      ? "mdi-arrow-up"
                      : "mdi-arrow-down"
                  }}
                </v-icon>
                Contact Owner
              </strong>
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
          class="mt-3 mx-1 pointer-card"
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
            <v-col cols="1" align-self="center">
              <h4 class="truncate">
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
                <strong class="truncate">{{
                  item.contact_owner?.team?.name_en
                }}</strong>
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
import { computed, ref } from "vue";
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
    default: () => [],
  },
});

const sortDirection = ref("created_at:desc");

const emit = defineEmits([
  "handle-reject-clicked",
  "handle-item-click",
  "handle-sort-by",
]);

const handleReject = (id) => {
  emit("handle-reject-clicked", id);
};

const handleItemClick = (item) => {
  emit("handle-item-click", item);
};

const sortByField = (field) => {
  if (sortDirection.value.startsWith(field)) {
    sortDirection.value = sortDirection.value.endsWith(":asc")
      ? `${field}:desc`
      : `${field}:asc`;
  } else {
    sortDirection.value = `${field}:asc`;
  }

  console.log(`Sorting by ${field}, direction: ${sortDirection.value}`);
  emit("handle-sort-by", sortDirection.value);
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
.pointer-card {
  cursor: pointer;
}

.pointer-card {
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.pointer-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.truncate {
  white-space: normal;
  overflow: hidden;
  word-wrap: break-word; /* ให้ข้อความข้ามบรรทัดใหม่ตามคำ */
}
</style>
<!-- @click="sortByField('role')" -->
