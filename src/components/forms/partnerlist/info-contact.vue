<template>
  <v-container>
    <!-- <h1 class="text-center">Change Information</h1> -->
    <h2 class="text-center">ข้อมูลผู้ติดต่อ</h2>

    <!-- ฟอร์มเลือก Branch Code -->
    <v-card class="pa-5 mb-5">
      <v-select
        v-model="branchCode"
        :items="branchOptions"
        label="Branch Code"
        required
      ></v-select>
    </v-card>

    <!-- ฟอร์มเพิ่มผู้ติดต่อ -->
    <v-card class="pa-4 mb-5">
      <h3 class="py-3">เพิ่มผู้ติดต่อ</h3>

      <div v-for="(contact, index) in addContacts" :key="index" class="mb-3">
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="contact.name"
              placeholder="ชื่อผู้ติดต่อ (ภาษาอังกฤษ)"
              required
              variant="outlined"
              density="compact"
              dense
            ></v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field
              v-model="contact.mobile_number"
              placeholder="เบอร์โทรศัพท์"
              required
              variant="outlined"
              density="compact"
              dense
            ></v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field
              v-model="contact.email"
              placeholder="Email เพื่อแจ้งการชำระเงิน"
              required
              variant="outlined"
              density="compact"
              dense
            ></v-text-field>
          </v-col>
        </v-row>
      </div>

      <!-- ปุ่มเพิ่มฟิลด์ผู้ติดต่อใหม่ -->
      <!-- <v-btn color="green" @click="addNewContact('เพิ่ม')">+ เพิ่มผู้ติดต่อ</v-btn> -->
      <ButtonControl
      icon="mdi mdi-plus"
      text="เพิ่ม"
      @button-clicked="addNewContact('เพิ่ม')"
    />
    </v-card>

    <!-- ฟอร์มยกเลิกผู้ติดต่อ -->
    <v-card class="pa-4 mb-5">
      <h3 class="py-3">ยกเลิกผู้ติดต่อ</h3>

      <div v-for="(contact, index) in removeContacts" :key="index" class="mb-3">
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="contact.name"
              placeholder="ชื่อผู้ติดต่อ (ภาษาอังกฤษ)"
              required
              variant="outlined"
              density="compact"
            ></v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field
              v-model="contact.mobile_number"
              placeholder="เบอร์โทรศัพท์"
              required
              variant="outlined"
              density="compact"
            ></v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field
              v-model="contact.email"
              placeholder="Email เพื่อแจ้งการชำระเงิน"
              required
              variant="outlined"
              density="compact"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>

      <!-- ปุ่มเพิ่มฟิลด์ผู้ติดต่อใหม่ -->
      <!-- <v-btn color="red" @click="addNewContact('ยกเลิก')">+ เพิ่มผู้ติดต่อ (ยกเลิก)</v-btn> -->
      <ButtonControl
      icon="mdi mdi-plus"
      text="เพิ่ม"
      @button-clicked="addNewContact('ยกเลิก')"
    />
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, watch } from "vue";
import ButtonControl from "@/components/controls/ButtonControl.vue";

const emit = defineEmits(["on-data-update"]);

// ข้อมูล Branch Code (ตัวเลือก)
const branchOptions = ["NVAT", "SVAT", "MVAT"];

// ฟิลด์เลือก branch code
const branchCode = ref(null);

// ข้อมูลผู้ติดต่อสำหรับ "เพิ่มผู้ติดต่อ"
const addContacts = ref([
  {
    name: "",
    mobile_number: "",
    email: "",
  },
]);

// ข้อมูลผู้ติดต่อสำหรับ "ยกเลิกผู้ติดต่อ"
const removeContacts = ref([
  {
    name: "",
    mobile_number: "",
    email: "",
  },
]);

// ใช้งาน emit
// const emit = defineEmits(["on-data-update"]);

// ฟังก์ชันเพิ่มผู้ติดต่อใหม่
const addNewContact = (type) => {
  if (type === "เพิ่ม") {
    addContacts.value.push({
      name: "",
      mobile_number: "",
      email: "",
    });
  } else if (type === "ยกเลิก") {
    removeContacts.value.push({
      name: "",
      mobile_number: "",
      email: "",
    });
  }
};

// ฟังก์ชันจัดการการเปลี่ยนแปลงข้อมูล
const updateData = () => {
  const data = {
    change_contact_information: [
      ...addContacts.value.map((contact) => ({
        branch_code: branchCode.value || "",
        business_partner_name: "", // สามารถเพิ่มฟิลด์นี้ได้หากจำเป็น
        name: contact.name,
        mobile_number: contact.mobile_number,
        email: contact.email,
        remark: "เพิ่ม",
      })),
      ...removeContacts.value.map((contact) => ({
        branch_code: branchCode.value || "",
        business_partner_name: "", // สามารถเพิ่มฟิลด์นี้ได้หากจำเป็น
        name: contact.name,
        mobile_number: contact.mobile_number,
        email: contact.email,
        remark: "ลบ",
      })),
    ],
  };

  emit("on-data-update", data); // ส่งข้อมูลไปยัง parent component
  console.log("UAAAAAAAAAAAAAAAAAAAAAAA:", data);
};

// ใช้ watch เพื่อตรวจจับการเปลี่ยนแปลงในข้อมูล
watch(
  [addContacts, removeContacts, branchCode],
  () => {
    updateData(); // อัปเดตข้อมูลทุกครั้งที่มีการเปลี่ยนแปลง
  },
  { deep: true }
);
</script>

<style scoped>
h1 {
  font-size: 2rem;
  color: #000;
}

h2 {
  font-size: 1.5rem;
  color: #333;
}

h3 {
  font-size: 1.25rem;
  color: #333;
}

.mb-3 {
  margin-bottom: 1rem;
}
</style>
