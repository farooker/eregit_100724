<template>
  <v-container>
     <v-row justify="center" align="center">
    <h1 class="pa-5">Extend Company</h1>
        </v-row>
    <v-container>
      <v-card class="pa-5">
        <div class="mb-1">ต้องการ Extend Company Role ใด</div>
        <v-radio-group v-model="input_data.radio_1" color="red">
          <v-radio label="Vendor" value="one"></v-radio>

        </v-radio-group>
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
  </v-container>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router'
const input_data = ref({
  radio_1:'',
})

const router = useRouter()

const handleConfirm = async () => {
  try {
    if (input_data.value.radio_1 === 'one') {
      // console.log('dddddd')
      await router.push('/BusinessPartner/VandorCustomer');
    } else if (input_data.value.radio_1 === 'two') {
      await router.push('/accounts/AccountDashBoard');
    }
  } catch (error) {
    console.error('Error during navigation:', error);
  }
};

</script>

