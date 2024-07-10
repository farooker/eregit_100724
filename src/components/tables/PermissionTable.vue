<!-- <template>
  <v-data-table-virtual
    :headers="props.headers"
    :items="props.desserts"
    item-value="name"
    hide-default-footer
    density="compact"
  >
    <template v-slot:[`header.action`] />
    <template v-slot:[`item.permission`]="{ item }" v-if="!isReadOnly">
      <v-select
        density="compact"
        v-model="item.permission"
        :items="item_selection"
        variant="solo"
      />
    </template>
    <template v-slot:[`item.view`]="{ item }">
      <v-checkbox
        v-if="!isReadOnly"
        density="compact"
        color="secondary"
        v-model="item.view"
        :readonly="isReadOnly"
      ></v-checkbox>
      <v-icon color="green" v-if="isReadOnly && item.view">mdi mdi-check-bold</v-icon>
    </template>
    <template v-slot:[`item.created`]="{ item }">
      <v-checkbox
        v-if="!isReadOnly"
        density="compact"
        color="secondary"
        v-model="item.created"
        :readonly="isReadOnly"
      ></v-checkbox>
      <v-icon color="green" v-if="isReadOnly && item.created">mdi mdi-check-bold</v-icon>
    </template>
    <template v-slot:[`item.updated`]="{ item }">
      <v-checkbox
        v-if="!isReadOnly"
        density="compact"
        color="secondary"
        v-model="item.updated"
        :readonly="isReadOnly"
      ></v-checkbox>
      <v-icon color="green" v-if="isReadOnly && item.updated">mdi mdi-check-bold</v-icon>
    </template>
    <template v-slot:[`item.deleted`]="{ item }">
      <v-checkbox
        v-if="!isReadOnly"
        density="compact"
        color="secondary"
        v-model="item.deleted"
        :readonly="isReadOnly"
      ></v-checkbox>
      <v-icon color="green" v-if="isReadOnly && item.deleted">mdi mdi-check-bold</v-icon>
    </template>
    <template v-slot:[`item.action`]="{ item }">
      <v-icon @click="on_delete_clicked(item)">mdi mdi-delete</v-icon>
    </template>
  </v-data-table-virtual>
</template>

<script setup>
import { defineProps, watch, ref } from "vue";

const props = defineProps({
  headers: {
    type: Array,
    default: () => [],
  },
  desserts: {
    type: Array,
    default: () => [],
  },
  isReadOnly: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["on-item-change", "on-item-delete"]);
const dessertsRef = ref(props.desserts);

watch(
  dessertsRef.value,
  (newDesserts) => {
    emit("on-item-change", newDesserts);
  },
  { deep: true }
);

const on_delete_clicked = (item) => {
  emit("on-item-delete", item);
};

const item_selection = [
  "California",
  "Colorado",
  "Florida",
  "Georgia",
  "Texas",
  "Wyoming",
];
</script> -->

<template>
  <v-data-table-virtual
    :headers="props.headers"
    :items="props.desserts"
    item-value="name"
    hide-default-footer
    density="compact"
  >
    <template
      v-for="(header, index) in props.headers"
      :key="index"
      v-slot:[`item.${header.key}`]="{ item }"
    >
      <p
        v-if="
          header.key === 'permission' && isReadOnly && header.key !== 'action'
        "
      >
        {{ item.permission }}
      </p>
      <v-select
        v-else-if="
          header.key === 'permission' && !isReadOnly && header.key !== 'action'
        "
        density="compact"
        v-model="item.permission"
        :items="data_mock_all_module_api"
        item-title="name_th"
        item-value="id"
        variant="solo"
      />
      <v-checkbox
        v-else-if="
          header.key !== 'permission' && !isReadOnly && header.key !== 'action'
        "
        density="compact"
        color="secondary"
        v-model="item[header.key]"
        :readonly="isReadOnly"
      ></v-checkbox>
      <v-icon
        v-else-if="
          isReadOnly &&
          item[header.key] &&
          header.key !== 'permission' &&
          header.key !== 'action'
        "
        color="green"
        >mdi mdi-check-bold</v-icon
      >
      <v-icon
        v-else-if="!isReadOnly && header.key === 'action'"
        @click="on_delete_clicked(item)"
        >mdi mdi-delete</v-icon
      >
    </template>
  </v-data-table-virtual>
</template>

<script setup>
import { defineProps, watch, ref, onMounted } from "vue";

import ModuleService from "@/apis/ModuleService";

const props = defineProps({
  headers: {
    type: Array,
    default: () => [],
  },
  desserts: {
    type: Array,
    default: () => [],
  },
  isReadOnly: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["on-item-change", "on-item-delete"]);

const dessertsRef = ref(props.desserts);
let data_mock_all_module_api = ref([]);

const handleFetchModuleAll = async () => {
  const result_modules = await ModuleService.getModuleAll();
  if (result_modules.data.is_success) {
    data_mock_all_module_api.value = result_modules.data.data;
  } else {
    // Failed
  }
};

watch(
  dessertsRef,
  (newDesserts) => {
    emit("on-item-change", newDesserts);
  },
  { deep: true }
);

const on_delete_clicked = (item) => {
  emit("on-item-delete", item);
};

onMounted(async() => {
  await handleFetchModuleAll()
});
</script>
