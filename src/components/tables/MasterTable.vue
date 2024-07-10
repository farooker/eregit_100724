<!-- <template>
      <v-data-table-virtual
        :headers="headers"
        :items="items"
        class="my-data-table"
      >
        <template v-slot:[`item.actiion_1`]="{ item }">
          <v-btn
            v-for="action in item.actiion_1"
            :key="action"
            @click="handleAction(item, action)"
            outlined
          >
            {{ action }}
          </v-btn>
        </template>
      </v-data-table-virtual>
  </template>
  
  <style>
  table th + th {
    border-left: 1px solid #dddddd;
  }
  table td + td {
    border-left: 1px solid #dddddd;
  }
  </style>
  
  <script>
  import { ref } from "vue";
  
  export default {
    setup() {
      const headers = ref([
        { text: "Name", value: "name" },
        { text: "Age", value: "age" },
        { text: "Email", value: "email" },
        { text: "Action_1", value: "actiion_1" },
        { text: "Action_2", value: "actiion_2" },
      ]);
  
      const items = ref([
        { name: "John Doe", age: 30, email: "john@example.com", actiion_1: ['add', 'remove'], actiion_2: ["history_log"] },
        { name: "Jane Smith", age: 25, email: "jane@example.com", actiion_1: ['add', 'remove'], actiion_2: ["history_log"]  },
        // Add more data items here
      ]);
  
      // Handle action button click
      const handleAction = (item, action) => {
        if (action === 'add') {
          // Handle add action
          console.log(`Adding: ${item.name}`);
        } else if (action === 'remove') {
          // Handle remove action
          console.log(`Removing: ${item.name}`);
        }
      };
  
      return {
        headers,
        items,
        handleAction,
      };
    },
  };
  </script>
   -->

<template>
  <v-row dense>
    <v-col cols="12">
      <v-card color="secondary">
        <v-card-item>
          <v-row align="center" justify="start">
            <v-col
              v-for="header in props.headers"
              :key="header.value"
              :cols="header.width"
            >
              <h5>{{ header.text }}</h5>
            </v-col>
          </v-row>
        </v-card-item>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-row
        v-for="(item, index) in props.items"
        :key="index"
        class="data-row"
        style="margin-left: auto; margin-right: auto"
      >
        <v-col
          v-for="header in headers"
          :key="header.value"
          :cols="header.width"
          class="data-col"
        >
          <div
            v-if="Array.isArray(item[header.value])"
            style="display: flex; justify-content: start; align-items: center;"
          >
            <ButtonControl
              v-for="(action, actionIndex) in item[header.value]"
              :key="actionIndex"
              :icon="action.icon"
              :text="action.text"
              :color="action.color"
              :id="index.toString() + ',' + action.action"
              @button-clicked="handle_item_clicked"
              style="flex: 1; margin: 0 1px;"
            />
          </div>
          <p
            v-if="
              Array.isArray(item[header.value]) === false &&
              header.value !== 'history' &&
              header.value !== 'status'
            "
          >
            {{ item[header.value] }}
          </p>
          <history-control
            v-if="
              Array.isArray(item[header.value]) === false &&
              header.value === 'history'
            "
            :id="index.toString()"
            @link-clicked="handle_go_to_history"
          /> 
          <Active :value="item[header.value]" v-if="header.value === 'status'" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup>
import ButtonControl from "../controls/ButtonControl.vue";
import HistoryControl from "../controls/HistoryControl.vue";
import Active from "../status/Active.vue";

const props = defineProps({
  headers: {
    type: Array,
    default: () => [
      { text: "Name", value: "name", width: 2 },
      { text: "Age", value: "age", width: 1 },
      { text: "Email", value: "email", width: 3 },
      { text: "Action", value: "action", width: 2 },
      { text: "Status", value: "status", width: 2 },
      { text: "", value: "history", width: 2 },
    ],
  },
  items: {
    type: Array,
    default: () => [
      {
        name: "John Doe",
        age: 30,
        email: "john@example.com",
        action: [
          {
            color: "#F0F0F0",
            icon: "mdi mdi-eye-circle",
            text: "",
            action: "view",
          },
          {
            color: "#F0F0F0",
            icon: "mdi mdi-pencil",
            text: "",
            action: "edit",
          },
        ],
        history: "history_log",
        status: true,
      },
      {
        name: "Jane Smith",
        age: 25,
        email: "jane@example.com",
        action: [
          {
            color: "#F0F0F0",
            icon: "mdi mdi-eye-circle",
            text: "",
            action: "view",
          },
          {
            color: "#F0F0F0",
            icon: "mdi mdi-pencil",
            text: "",
            action: "edit",
          },
        ],
        history: "history_log",
        status: false,
      },
    ],
  },
});

const emit = defineEmits(["handle-item-clicked", "handle-go-to-history"]);

const handle_item_clicked = (index) => {
  emit('handle-item-clicked', index)
};

const handle_go_to_history = (index) => {
  emit('handle-go-to-history', index)
};
</script>

<style>
.red-header h5 {
  text-align: start;
}

.data-row {
  background-color: white;
  /* border-bottom: 1px solid #e0e0e0; */
}

.data-row {
  background-color: white;
}

.data-col {
  border: 1px solid #e0e0e0; /* Adds grid lines */
  padding: 8px; /* Optional: Adjusts the padding inside each cell */
  text-align: start; /* Centers the content in each cell */
}

.data-col p {
  margin: 0; /* Removes default paragraph margins */
}
</style>
