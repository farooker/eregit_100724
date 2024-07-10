<template>
  <v-container style="padding: auto" fluid>
    <v-card-text>
      <ToolbarSurvey
        :step="stepper.index"
        :is-done="stepper.prevCompleted"
        @prev="stepperPrev"
      />
    </v-card-text>
    <v-card>
      <v-card-item class="ml-15">
        <v-row dense class="mt-5">
          <v-col cols="6">
            <h2>Training</h2>
            <h3>นโยบายการจัดซื้อจัดจ้างอย่างรับผิดชอบ</h3>
            <br />
            <h5>บริษัท เฟรเซฮร์ พร๊อพเพอร์ตี้ ขอสื่อสารนโยบายจัดซื้อจัดจ้าง</h5>
            <h5>
              อย่างรับผิดชอบ
              ซึ่งได้จัดทำขึ้นและยึดถือเป็นความยั่งยืนในการกิจกรรม
            </h5>
            <h5>
              ดำเนิน ต่อผู้มีส่วนเกี่ยวข้องต่างขององค์กร อันรวมถึงคู่ค้า ผู้ขาย
            </h5>
            <h5>
              และผู้รับเหมาช่วงของเรา
              ซึ่งได้ทางเรามีความคาดหวังที่จะขยายความยั่งยืน
            </h5>
            <h5>ในการดำเนินงานนี้ ไปยังคู่ของเราต่อไป</h5>
            <br />
            <h5>
              ทางเราจึงขอให้ท่านรับทราบและศึกษานโยบายการจัดจ้างอย่างรับผิดชอบนี้
            </h5>
            <h5 style="color: red">
              สามารถส่งต่อ Email หรือ Link ให้ผู้ร่วมงานอื่นรับผิดชอบได้
            </h5>
            <br />
            <br />
          </v-col>
          <v-col cols="6" class="d-flex align-center jusityfy-start">
            <img
              src="../../../assets/trianing_image_survay.jpg"
              aspect-ratio="4/3"
              cover
              width="600"
              height="450"
            />
          </v-col>
        </v-row>
        <v-row dense class="mt-5">
          <v-col cols="auto" class="d-flex justify-center">
            <v-btn
              color="secondary"
              width="140"
              class="text-capitalize"
              variant="outlined"
              rounded
              @click="handleSend"
            >
              ส่งต่อ
            </v-btn>
          </v-col>
          <v-col cols="auto" class="d-flex justify-center">
            <v-btn
              color="secondary"
              width="140"
              class="text-capitalize"
              rounded
            >
              ทำเลย
            </v-btn>
          </v-col>
          <v-col cols="12" class="d-flex justify-end">
            <v-btn width="140" class="text-capitalize" rounded variant="text">
              ทำภายหลัง >>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-item>
    </v-card>
  </v-container>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import ToolbarSurvey from "@/components/items/ToolbarSurvey.vue";
import { useRoute, useRouter } from "vue-router";
import { useShareActivityDialog } from "@/components/dialogs/ShareActivityDialogService";

const { showShareActivityDialog } = useShareActivityDialog();

const state = ref(null);
const bp_number = ref(null);
// const rsp_survey_id = ref(null);

const route = useRoute();
const router = useRouter();

const stepper = ref({
  index: 4,
  prevCompleted: true,
});

onBeforeMount(() => {
  state.value = route.query.state;
  bp_number.value = route.query.bp_number;
  // rsp_survey_id.value = route.query.rsp_survey_id;
});

const handleSend = async () => {
  const result = await showShareActivityDialog(bp_number.value);
  if (result && result.email) {
    // call api share activity
    console.log(result);
  }
};

const stepperPrev = () => {
  router.push(
    `/SDTeamMangement/Survey/Questionnaire/1?prev_completed=completed&state=created&bp_number=${bp_number.value}`
  );
};
</script>
