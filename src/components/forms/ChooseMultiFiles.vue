<template>
  <v-row dense>
    <v-col cols="12" v-if="title != null">
      <h5 style="color: gray">{{ title }}</h5>
    </v-col>
    <v-col cols="6">
      <v-card
        class="mx-auto ma-1"
        variant="outlined"
        color="white"
        @dragover="dragover"
        @dragleave="dragleave"
        @drop="drop"
      >
        <v-container class="bg-grey-lighten-3">
          <v-row no-gutters style="height: 200px">
            <v-col align-self="center" cols="12" class="text-center">
              <v-icon size="70" color="secondary">{{ icon }}</v-icon>
            </v-col>
            <v-col align-self="center" cols="12" class="text-center">
              <div>
                <h5>Drag & Drop Files</h5>
                <h5 class="text-secondary">HERE</h5>
              </div>
            </v-col>
            <v-col align-self="center" cols="12" class="text-center">
              <v-btn
                variant="elevated"
                class="text-capitalize"
                color="secondary"
                rounded
                @click="handlePickFile"
              >
                Browse Files
              </v-btn>
              <input
                ref="uploader"
                class="d-none"
                type="file"
                :accept="accept"
                @change="handleFileChanged"
                multiple
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
    <v-col cols="6">
      <h5 v-if="listTitle != null">{{ listTitle }}</h5>
      <div v-for="(file, index) in files" :key="index">
        <v-list-item>
          <template v-slot:prepend>
            <v-icon color="secondary">{{ icon }}</v-icon>
          </template>
          <v-list-item-title>{{ file.name }}</v-list-item-title>
          <template v-slot:append>
            <h5>{{ convertSize(file.size) }}</h5>
            <v-icon color="red" class="ms-2" @click="removeFile(index)">mdi-delete</v-icon>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-col>
    <v-col cols="12">
      <h5 class="text-secondary">{{ description }}</h5>
    </v-col>
  </v-row>
</template>

<script >

import convertSize from "convert-size";
import { useValidDialog } from "@/components/dialogs/TemplateDialogService";
const { showValidDialog } = useValidDialog();

export default {
  props: {
    icon: {
      type: String,
      default: "mdi-microsoft-excel",
    },
    isFiles: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: null,
    },
    listTitle: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: "",
    },
    // accept: {
    //   type: String,
    //   default:
    //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
    // },
    accept: {
      type: String,
      default: "*/*",
    },
    maxFile: {
      type: Number,
      default: 100,
    },
    maxSize: {
      type: Number,
      default: 500000,
    },
  },
  data() {
    return {
      files: [],
      isDragging: false,
    };
  },
  watch: {
    isFiles(val) {
      if (val && val.length) {
        this.files = [...val];
      } else {
        this.files = [];
      }
    },
  },

  methods: {
    removeFile(index) {
    const removedFile = this.files.splice(index, 1)[0]; // Capture the removed file if needed
    this.$emit('request-remove-file', index, removedFile); // Emit an event with the index and the file
    console.log('Updated files', this.files);
  },
    handlePickFile() {
      this.$refs.uploader.click();
    },
    async handleFileChanged(e) {
      const newFiles = Array.from(e.target.files);
      if (this.files.length + newFiles.length > this.maxFile) {
        await showValidDialog(
          "File limit exceeded",
          `Please upload no more than ${this.maxFile} files.`
        );
        return;
      }
      this.files = [...this.files, ...newFiles];
      this.$emit("input-files", this.files);
    },
    dragover(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    dragleave() {
      this.isDragging = false;
    },
    async drop(e) {
      e.preventDefault();
      const newFiles = Array.from(e.dataTransfer.files);
      if (this.files.length + newFiles.length > this.maxFile) {
        await showValidDialog(
          "File limit exceeded",
          `Please upload no more than ${this.maxFile} files.`
        );
        return;
      }
      this.files = [...this.files, ...newFiles];
      this.$emit("input-files", this.files);
    },
    convertSize(size) {
      return convertSize(size);
    },
  },
};
</script>
