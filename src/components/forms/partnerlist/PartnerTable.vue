<template>
  <div>
    <v-card class="mx-auto elevation-1" color="secondary">
      <v-card-item>
        <v-row align-center>
          <v-col cols="2">
            <strong>Create date</strong>
          </v-col>
          <v-col cols="2">
            <strong>Tax ID</strong>
          </v-col>
          <v-col cols="2">
            <strong>Role</strong>
          </v-col>
          <v-col cols="4">
            <strong>Name</strong>
          </v-col>
          <v-col cols="2">
            <strong>Contact Owner</strong>
          </v-col>
        </v-row>
      </v-card-item>
    </v-card>

    <v-expansion-panels v-model="panel" class="mt-1">
      <v-progress-linear
        class="rounded-pill"
        :indeterminate="loading"
        bg-color="transparent"
        color="secondary"
      ></v-progress-linear>
      <v-expansion-panel
        v-for="(i, index) in props.items"
        :key="index"
        class="mt-2 pa-3"
        :style="index === panel ? 'border: 2px solid red;' : ''"
      >
        <v-expansion-panel-title :color="index === panel ? '#FFF1F0' : ''">
          <template v-slot:actions="{ expanded }">
            <v-icon
              color="secondary"
              :icon="expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            ></v-icon>
          </template>

          <v-row no-gutters dense justify="space-around">
            <v-col cols="2" align-self="center">
              <span> {{ dateUtils.parseDdMmYy(i.created_at) }}</span>
            </v-col>

            <v-col cols="2" align-self="center">
              <!-- <span>{{i.email}}</span> -->
              <h4>1234422</h4>
            </v-col>

            <v-col cols="2" align-self="center">
              <!-- <Active :value="i.is_active" /> -->
              <!-- <span>{{i.email}}</span> -->
              <h4>Admin</h4>
            </v-col>

            <v-col cols="4" align-self="center">
              <!-- <span> {{i.company?.name_th}}</span> -->
              <h4>บริษัท จำกัด มหาชน</h4>
            </v-col>

            <v-col cols="2" align-self="center">
              <!-- <span>{{i.email}}</span> -->
              <!-- <span>{{i.email}}</span> -->
              <h4>ASDF123@gmail.com</h4>
              <h4>Retall /SAMYAN MITRTOWN</h4>
              <!-- <Role  :value="i.role?.name" /> -->
            </v-col>

            <!-- <v-col cols="2" align-self="center">
              <v-btn class="me-2 text-none" color="secondary" variant="flat" rounded @click="handleEditEvent(i)">
                แก้ไข
              </v-btn>
            </v-col> -->
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text style="background-color: #fff1f0">
          <v-card class="ml-n3 mr-n3" elevation="0" rounded="0">
            <v-card-item class="ma-2">
              <v-row>
                <v-col cols="10">
                  <v-row align-center>
                    <v-col cols="2">
                      <v-card-item>
                        <v-card-title class="text-secondary"
                          >Company Info</v-card-title
                        >
                        <!-- <h2>dwfefef</h2> -->
                      </v-card-item>
                    </v-col>
                  </v-row>
                  <v-row align-center>
                    <v-col cols="2">
                      <v-card-item>
                        <v-card-title class="gray-text"
                          >Business Pratner Number</v-card-title
                        >
                        <!-- <strong>{{i.member_type?.name}}</strong> -->
                        <h4>012029448</h4>
                      </v-card-item>
                    </v-col>

                    <v-col cols="2">
                      <v-card-item>
                        <v-card-title class="gray-text"
                          >Vendor Number</v-card-title
                        >
                        <!-- <strong>This is a subtitle</strong> -->
                        <h4>1111111111</h4>
                      </v-card-item>
                    </v-col>

                    <v-col cols="2">
                      <v-card-item>
                        <v-card-title class="gray-text"
                          >Customer Number</v-card-title
                        >
                        <!-- <span> <strong class="gray-text"> Freelance@gamil.com</strong> <strong>( Freelance /
                        Active)</strong></span> -->
                        <h4>22222222</h4>
                      </v-card-item>
                    </v-col>

                    <v-col cols="3">
                      <v-card-item>
                        <v-card-title class="gray-text"
                          >FPT Affillate</v-card-title
                        >
                        <!-- <span> <strong class="gray-text"> Freelance@gamil.com</strong> <strong>( Freelance /
                        Active)</strong></span> -->
                        <h4>No</h4>
                      </v-card-item>
                    </v-col>
                  </v-row>

                  <v-row align-center>
                    <v-col cols="2">
                      <v-card-item>
                        <v-card-title class="gray-text"
                          >Organization Type</v-card-title
                        >
                        <!-- <strong>{{i.member_type?.name}}</strong> -->
                        <h4>Juristiic Person</h4>
                      </v-card-item>
                    </v-col>

                    <v-col cols="2">
                      <v-card-item>
                        <v-card-title class="gray-text"
                          >Juristiic Type</v-card-title
                        >
                        <!-- <strong>This is a subtitle</strong> -->
                        <h4>Company</h4>
                      </v-card-item>
                    </v-col>

                    <v-col cols="2">
                      <v-card-item>
                        <v-card-title class="gray-text"
                          >Company Cetagory</v-card-title
                        >
                        <!-- <span> <strong class="gray-text"> Freelance@gamil.com</strong> <strong>( Freelance /
                        Active)</strong></span> -->
                        <h4>Company</h4>
                      </v-card-item>
                    </v-col>

                    <!-- <v-col cols="2">
                  <v-card-item>
                    <v-card-title class="gray-text">Team</v-card-title>
                    <span> <strong class="gray-text"> Freelance@gamil.com</strong> <strong>( Freelance /
                        Active)</strong></span>
                  </v-card-item>
                </v-col> -->
                    <v-col cols="3">
                      <v-card-item>
                        <v-card-title class="gray-text"
                          >Product/Service Category</v-card-title
                        >
                        <!-- <span> <strong class="gray-text"> Freelance@gamil.com</strong> <strong>( Freelance /
                        Active)</strong></span> -->
                        <h4>Cement</h4>
                      </v-card-item>
                    </v-col>
                  </v-row>

                  <v-divider class="mt-2 mb-2"></v-divider>

                  <v-row align-center>
                    <v-col cols="2">
                      <v-card-item>
                        <v-card-title class="text-secondary"
                          >Payment Info.</v-card-title
                        >
                        <!-- <h2>dwfefef</h2> -->
                      </v-card-item>
                    </v-col>
                  </v-row>

                  <v-row align-center>
                    <v-col cols="2">
                      <v-card-item>
                        <v-card-title class="gray-text"
                          >VAT Registered
                        </v-card-title>
                        <!-- <strong>{{i.member_type?.name}}</strong> -->
                        <h4>Yes</h4>
                      </v-card-item>
                    </v-col>

                    <v-col cols="2">
                      <v-card-item>
                        <v-card-title class="gray-text"
                          >Account Name</v-card-title
                        >
                        <!-- <strong>This is a subtitle</strong> -->
                        <h4>xxxxx</h4>
                      </v-card-item>
                    </v-col>

                    <v-col cols="2">
                      <v-card-item>
                        <v-card-title class="gray-text">Bank</v-card-title>
                        <!-- <span> <strong class="gray-text"> Freelance@gamil.com</strong> <strong>( Freelance /
                        Active)</strong></span> -->
                        <h4>xxxxx</h4>
                      </v-card-item>
                    </v-col>

                    <!-- <v-col cols="2">
                  <v-card-item>
                    <v-card-title class="gray-text">Team</v-card-title>
                    <span> <strong class="gray-text"> Freelance@gamil.com</strong> <strong>( Freelance /
                        Active)</strong></span>
                  </v-card-item>
                </v-col> -->
                    <v-col cols="3">
                      <v-card-item>
                        <v-card-title class="gray-text"
                          >Account Number</v-card-title
                        >
                        <!-- <span> <strong class="gray-text"> Freelance@gamil.com</strong> <strong>( Freelance /
                        Active)</strong></span> -->
                        <h4>xxxxx</h4>
                      </v-card-item>
                    </v-col>
                  </v-row>
                  <v-divider class="mt-2 mb-2"></v-divider>

                  <v-row align-center>
                    <v-col cols="2">
                      <v-card-item>
                        <v-card-title class="text-secondary"
                          >Branch Info</v-card-title
                        >
                        <!-- <h2>dwfefef</h2> -->
                      </v-card-item>
                    </v-col>
                  </v-row>

                  <v-row align-center>
                    <v-col cols="2">
                      <v-select
                        v-model="model"
                        :items="Foo"
                        readonly
                        label="สำนักงานใหญ่"
                      ></v-select>
                    </v-col>
                  </v-row>

                  <v-row align-center>
                    <v-col cols="2">
                      <v-card-item>
                        <v-card-title class="gray-text"
                          >Business Partner Role
                        </v-card-title>
                        <!-- <strong>{{i.member_type?.name}}</strong> -->
                        <h4>Yes</h4>
                      </v-card-item>
                    </v-col>

                    <v-col cols="2">
                      <v-card-item>
                        <v-card-title class="gray-text"
                          >Branch Code</v-card-title
                        >
                        <!-- <strong>This is a subtitle</strong> -->
                        <h4>xxxxx</h4>
                      </v-card-item>
                    </v-col>
                  </v-row>

                  <v-row align-center>
                    <v-col cols="6">
                      <v-card-item>
                        <v-card-title class="gray-text"
                          >Company Code
                        </v-card-title>
                        <!-- <strong>{{i.member_type?.name}}</strong> -->
                        <h4>
                          xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                        </h4>
                      </v-card-item>
                    </v-col>
                  </v-row>

                  <v-row align-center>
                    <v-col cols="6">
                      <v-card-item>
                        <v-card-title class="gray-text"
                          >Branch Address
                        </v-card-title>
                        <!-- <strong>{{i.member_type?.name}}</strong> -->
                        <h4>
                          xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                        </h4>
                      </v-card-item>
                    </v-col>
                  </v-row>

                  <v-row align-center>
                    <v-col cols="12">
                      <v-card-item>
                        <v-card-title class="gray-text"
                          >Contact Person
                        </v-card-title>
                        <!-- <strong>{{i.member_type?.name}}</strong> -->
                        <v-row>
                          <v-col cols="2">
                            <h4>xxxxxxxxxxxxxxxxxxxxxx</h4></v-col
                          >
                          <v-col cols="2"
                            ><h4>xxxxxxxxxxxxxxxxxxxxxx</h4></v-col
                          >
                          <v-col cols="2"
                            ><h4>xxxxxxxxxxxxxxxxxxxxxx</h4></v-col
                          >
                        </v-row>
                      </v-card-item>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="2">

                  <v-row dense class="mt-10 pa-9">
                        <v-col cols="12">
                          <v-btn
                            color="info"
                            variant="flat"
                            rounded
                            @click="handleEditEvent(i)"
                          >
                            Change Info.
                          </v-btn>
                        </v-col>

                        <v-col cols="12">
                          <v-btn
                            class="me-2 mt-4 text-none"
                            color="secondary"
                            variant="flat"
                            rounded
                            @click="handleEditEvent(i)"
                          >
                            Extend Company
                          </v-btn>
                        </v-col>

                        <v-col cols="12">
                          <v-btn
                            class="me-2 mt-4 text-none"
                            color="secondary"
                            variant="flat"
                            rounded
                            @click="handleEditEvent(i)"
                          >
                            Extend Role
                          </v-btn>
                        </v-col>

                        <v-col cols="12">
                          <v-btn
                            class="me-2 mt-4 text-none"
                            color="secondary"
                            variant="flat"
                            rounded
                            @click="handleEditEvent(i)"
                          >
                            Attached Document
                          </v-btn>
                        </v-col>
                      </v-row>
                </v-col>
              </v-row>
            </v-card-item>
          </v-card>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { ref, onMounted } from "vue";
import { defineProps } from "vue";
import dateUtils from "@/utils/dateUtils";

const emit = defineEmits(["action-edit"]);
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  height: {
    type: Number,
    default: 400,
  },
});
const panel = ref([]);

const handleEditEvent = (item) => {
  emit("action-edit", item);
};
</script>

<style scoped>
.divider-vertical {
  border-left: 1px solid #ccc; /* Adjust the color as needed */
  height: 100%; /* Adjust the height as needed */
  margin: 0 10px; /* Adjust the margin as needed */
}
</style>
