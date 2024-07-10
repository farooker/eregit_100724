<template>
  <v-card color="#FEF0F0" width="100%" class="box my-2">
    <v-card-title style="padding: 0;" class="ms-3 mt-2">
      <h6>Attached Document</h6>
    </v-card-title>
    <v-row dense align="center" class="no-wrap" style="overflow-x: auto;">
      <v-col cols="5" md="2" sm="3" v-for="(i) in item_files" :key="i.id" :title="i.file_name">
        <v-card class="ma-2 mb-3">
          <v-row dense>
            <v-col cols="1">
              <v-icon size="32" class="mt-2 ms-1" color="red"
                >mdi mdi-file-document
              </v-icon>
            </v-col>
            <v-col cols="9" class="mt-2">
              <span
                class="ml-6 text-subtitle-2 truncate"
                style="font-weight: bold"
                >{{ i.file_name }}</span
              >
              <!-- <p class="ml-6 text-subtitle-2" style="color: grey">
                {{ i.file_size }}
              </p> -->
            </v-col>
            <v-col cols="2">
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn
                    icon="mdi mdi-menu-down"
                    variant="plain"
                    size="large"
                    v-bind="props"
                  />
                </template>
                <v-list style="padding: 0;">
                  <v-list-item
                    v-for="(item, index) in item_menu"
                    :key="index"
                    :value="index"
                    @click="hanldeMenuClick(i.file)"
                  >
                    <v-list-item-title
                      ><span :class="item.icon"></span>
                      {{ item.title }}</v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <!-- <v-col cols="1" align-self="center" class="ml-auto" justify-end>
        <v-btn
          @click="handleDownloadAll"
          prepend-icon="mdi mdi-download"
          variant="text"
          style="font-size: small;padding-right: 25px;"
        >
          dawnload all
        </v-btn>
      </v-col> -->
    </v-row>
  </v-card>
</template>

<script setup>
import { ref, watchEffect } from "vue";
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  downloadall:{type: String}
});


const item_files = ref(props.items);
const download_all_files = ref(props.downloadall);
watchEffect(() => {
  item_files.value = props.items;
});

const item_menu = ref([
  { title: "Dawnload", icon: "mdi mdi-download" },
]);

const handleDownloadAll = () => {
  window.open(download_all_files.value, '_blank');
  console.log("download_all_files",download_all_files.value);
};

const hanldeMenuClick = (file_url) => {
    console.log("download",file_url)
    window.open(file_url, '_blank');
};


</script>

<style scoped>
.truncate {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
}

.file-item {
  min-width: 240px;
  max-width: 240px;
  margin-top: 10px
}
.no-wrap {
  flex-wrap: nowrap;
}

.box {
    top: 55px;
    left: 56px;
    z-index: 99;
    position: fixed;
    /* padding: 0px 30px; */
    padding-right: 50px;
}

@media (max-width: 480px) {
  .box {
    left: 0;
    padding: 0;
  }
}

</style>
