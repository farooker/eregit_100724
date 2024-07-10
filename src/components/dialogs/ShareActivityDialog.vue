<template>
  <v-row justify="center">
    <v-dialog v-model="isVisible" width="800" height="320">
      <v-card>
        <v-card-text class="ma-5">
          <v-row
            class="mb-0"
            justify="space-between"
            variant="text"
            align="center"
          >
            <v-col>
              <h2>Share this activity</h2>
            </v-col>
            <v-col class="d-flex justify-end">
              <v-btn
                density="compact"
                @click="cancelShareActivityDialog()"
                icon="mdi mdi-close"
                variant="tonal"
              >
              </v-btn>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row dense align="center">
            <v-col cols="12">
              <h3>email</h3>
            </v-col>
            <v-col cols="9">
              <v-text-field
                v-model="email"
                required
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-btn
                @click="confirmShareActivityDialog()"
                block
                size="large"
                class="mt-n5"
                color="secondary"
              >
                Send Email
              </v-btn>
            </v-col>
            <v-col v-if="is_err" cols="12" style="color: red">
              <h5>*แชร์ไม่ได้เนื่องจาก User เต็มจำนวน</h5>
              <h5>กรุณาติดต่อให้ email.com หรือ gmail.com</h5>
              <h5>ตั้งค่าใหม่ที่ Members Manament</h5>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script setup>
import { useShareActivityDialog } from "@/components/dialogs/ShareActivityDialogService";
import { watch } from "vue";
const {
  isVisible,
  email,
  is_err,
  confirmShareActivityDialog,
  cancelShareActivityDialog,
} = useShareActivityDialog();

watch(
  () => email.value,
  () => {
    // console.log(email.value)
    is_err.value = false;
  }
);
</script>
