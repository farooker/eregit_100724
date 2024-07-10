<template>
  <v-container>
    <h2>Member Mangement</h2>
    <div class="text-center mt-5">
      <h2>{{ isTitle }}</h2>
    </div>

    <component
      :is="currentComponent"
      :id="id"
      @is-title="toggleTitle"
      @is-view="toggleView"
    />
  </v-container>
</template>
<script setup>
import { ref, onBeforeMount } from "vue";
import ListMember from "@/views/MemberManagement/ListMember.vue";
import MemberForm from "@/components/forms/MemberForm.vue";

const currentComponent = ref(null);
const isTitle = ref(null);
const id = ref(null);

onBeforeMount(() => {
  currentComponent.value = ListMember;
});

const toggleTitle = (e) => {
  console.log(e);
  isTitle.value = e;
};

const toggleView = (view, payload = {}) => {
  switch (view) {
    case "user-main":
      currentComponent.value = ListMember;
      break;
    case "user-add":
      {
        currentComponent.value = MemberForm;
        id.value = null;
      }
      break;
    case "user-edit":
      {
        currentComponent.value = MemberForm;
        id.value = payload;
      }
      break;
    default:
      currentComponent.value = ListMember;
      break;
  }
};
</script>
