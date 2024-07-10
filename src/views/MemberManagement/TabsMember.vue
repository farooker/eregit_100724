<!-- <template>
  <div >
      <v-tabs v-model="tab"  color="secondary">
          <v-tab
            v-for="(tabs,index) in items"
            :key="index"
             class="text-capitalize"
             @click="handleTabClicked(tabs)"
          >
            {{ tabs.title }}
          </v-tab>
        </v-tabs>
      <v-tabs-items>
        <v-tab-item>
             <component
             :is="currentComponent"
             @is-title="toggleTitleEmit"
             @is-view="toggleViewEmit"  />
        </v-tab-item>
      </v-tabs-items>
  </div>
</template>
<script setup>
/*eslint-disable no-unused-vars  */
import { ref, onBeforeMount  } from 'vue';
// import ImportActiviteUser from '@/views/UserMangement/ImportActiviteUser';
// import ImportDeactivateUser from '@/views/UserMangement/ImportDeactivateUser';
import MemberForm from '@/components/forms/MemberForm.vue';

const emit = defineEmits(["is-title","is-view"]);

const tab = ref(null);
const items = ref([]);
const currentComponent = ref(null);

onBeforeMount(() => {
  currentComponent.value = MemberForm;
  items.value= [
          { title: 'Add Member', icon: 'mdi-account-outline', content: MemberForm },
          // { title: 'Import activate user', icon: 'mdi-link-variant', content: ImportActiviteUser },
          // { title: 'Import deactivate user', icon: 'mdi-link-variant', content: ImportDeactivateUser }
        ]
});

const toggleTitleEmit = (title)=>{
  emit("is-title",title)
}
const toggleViewEmit = (view)=>{
  emit("is-view",view)
}
const handleTabClicked = (tab)=>{
  currentComponent.value =  tab.content
}

</script>
 -->
