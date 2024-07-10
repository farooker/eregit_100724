<template>
  <v-container>
    <v-card class="pa-5">
      <v-col cols="12">
        <v-combobox
          v-model="select"
          :items="['items','dfvk','dij']"
          label="I use chips"
          multiple
          chips
        ></v-combobox>
      </v-col>
  </v-card>
  </v-container>

    <v-container class="pa-5 ma-5">
    <v-row justify="center" align="center">
    <!-- ปุ่มยกเลิก -->
    <v-btn color="black" @click="dialog = false" class="ma-0 pa-0 mr-7">
      ยกเลิก
    </v-btn>
    <!-- ปุ่มตกลง -->
    <v-btn color="red" @click="handleConfirm" class="ma-0 pa-0 mr-7">
        ตกลง
    </v-btn>
</v-row>
</v-container>
</template>
