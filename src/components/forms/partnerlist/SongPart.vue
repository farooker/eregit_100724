<template>
<div>
            <v-row align-center>
              <v-col cols="2">
                  <v-card-item>
                    <v-card-title class="text-secondary">Company Info</v-card-title>
                    <!-- <h2>dwfefef</h2> -->
                  </v-card-item>
                </v-col>
            </v-row>

              <v-row align-center>

                <v-col cols="2">
                  <v-card-item>
                    <v-card-title class="gray-text">Business Pratner Number</v-card-title>
                    <!-- <strong>{{i.member_type?.name}}</strong> -->
                    <h4>012029448</h4>
                  </v-card-item>
                </v-col>


                <v-col cols="2">
                  <v-card-item>
                    <v-card-title class="gray-text">Vendor Number</v-card-title>
                    <!-- <strong>This is a subtitle</strong> -->
                    <h4>1111111111</h4>
                  </v-card-item>
                </v-col>


                <v-col cols="2">
                  <v-card-item>
                    <v-card-title class="gray-text">Customer Number</v-card-title>
                    <!-- <span> <strong class="gray-text"> Freelance@gamil.com</strong> <strong>( Freelance /
                        Active)</strong></span> -->
                         <h4>22222222</h4>
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
                    <v-card-title class="gray-text">FPT Affillate</v-card-title>
                    <!-- <span> <strong class="gray-text"> Freelance@gamil.com</strong> <strong>( Freelance /
                        Active)</strong></span> -->
                         <h4>No</h4>
                  </v-card-item>
                </v-col>

              <v-col cols="2" class="text-right">
              <v-btn class="me-2 mt-4 text-none" color="info" variant="flat" rounded @click="handleEditEvent(i)">
                Change Info.
              </v-btn>
            </v-col>
              </v-row>

              <!-- <v-col cols="10" >
              <v-btn class="me-2 text-none" color="secondary" variant="flat" rounded @click="handleEditEvent(i)">
                แก้ไข
              </v-btn>
            </v-col> -->

              <v-row align-center>

                <v-col cols="2">
                  <v-card-item>
                    <v-card-title class="gray-text">Organization Type</v-card-title>
                    <!-- <strong>{{i.member_type?.name}}</strong> -->
                     <h4>Juristiic Person</h4>
                  </v-card-item>
                </v-col>


                <v-col cols="2">
                  <v-card-item>
                    <v-card-title class="gray-text">Juristiic Type</v-card-title>
                    <!-- <strong>This is a subtitle</strong> -->
                    <h4>Company</h4>
                  </v-card-item>
                </v-col>


                <v-col cols="2">
                  <v-card-item>
                    <v-card-title class="gray-text">Company Cetagory</v-card-title>
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
                    <v-card-title class="gray-text">Product/Service Category</v-card-title>
                    <!-- <span> <strong class="gray-text"> Freelance@gamil.com</strong> <strong>( Freelance /
                        Active)</strong></span> -->
                        <h4>Cement</h4>
                  </v-card-item>
                </v-col>

              <v-col cols="2" class="text-right">
              <v-btn class="me-2 mt-4 text-none" color="secondary" variant="flat" rounded @click="handleEditEvent(i)">
                Extend Company
              </v-btn>
            </v-col>
              </v-row>

              <v-divider  class="mt-2 mb-2" ></v-divider>
              <!-- <v-divider class="mt-2 mb-2" vertical></v-divider> -->
            <v-row align-center>
              <v-col cols="2">
                  <v-card-item>
                    <v-card-title class="text-secondary">Payment Info.</v-card-title>
                    <!-- <h2>dwfefef</h2> -->
                  </v-card-item>
                </v-col>
            </v-row>

              <v-row align-center>

                <v-col cols="2">
                  <v-card-item>
                    <v-card-title class="gray-text">VAT Registered </v-card-title>
                    <!-- <strong>{{i.member_type?.name}}</strong> -->
                    <h4>Yes</h4>

                  </v-card-item>
                </v-col>


                <v-col cols="2">
                  <v-card-item>
                    <v-card-title class="gray-text">Account Name</v-card-title>
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
                    <v-card-title class="gray-text">Account Number</v-card-title>
                    <!-- <span> <strong class="gray-text"> Freelance@gamil.com</strong> <strong>( Freelance /
                        Active)</strong></span> -->
                          <h4>xxxxx</h4>
                  </v-card-item>
                </v-col>

              <v-col cols="2" class="text-right">
              <v-btn class="me-2 mt-4 text-none" color="secondary" variant="flat" rounded @click="handleEditEvent(i)">
                Extend Role
              </v-btn>
            </v-col>
              </v-row>
          <v-divider class="mt-2 mb-2" ></v-divider>
          <v-row align-center>
              <v-col cols="2">
                  <v-card-item>
                    <v-card-title class="text-secondary">Branch Info</v-card-title>
                    <!-- <h2>dwfefef</h2> -->
                  </v-card-item>
                </v-col>
            </v-row>

          <v-row align-center>
              <v-col cols="2">
                  <v-select
                    v-model="model"
                    :items= Foo
                    readonly
                    label="สำนักงานใหญ่"
                  ></v-select>
                </v-col>
            </v-row>

             <v-row align-center>
                <v-col cols="2">
                  <v-card-item>
                    <v-card-title class="gray-text">Business Partner Role </v-card-title>
                    <!-- <strong>{{i.member_type?.name}}</strong> -->
                    <h4>Yes</h4>

                  </v-card-item>
                </v-col>


                <v-col cols="2">
                  <v-card-item>
                    <v-card-title class="gray-text">Branch Code</v-card-title>
                    <!-- <strong>This is a subtitle</strong> -->
                     <h4>xxxxx</h4>
                  </v-card-item>
                </v-col>

              <v-col cols="7" class="text-right">
              <v-btn class="me-2 mt-4 text-none" color="secondary" variant="flat" rounded @click="handleEditEvent(i)">
                Extend Role
              </v-btn>
            </v-col>
              </v-row>

             <v-row align-center>
                <v-col cols="6">
                  <v-card-item>
                    <v-card-title class="gray-text">Company Code </v-card-title>
                    <!-- <strong>{{i.member_type?.name}}</strong> -->
                <h4>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</h4>
                  </v-card-item>
                </v-col>
              </v-row>

             <v-row align-center>
                <v-col cols="6">
                  <v-card-item>
                    <v-card-title class="gray-text">Branch Address </v-card-title>
                    <!-- <strong>{{i.member_type?.name}}</strong> -->
                <h4>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</h4>
                  </v-card-item>
                </v-col>
              </v-row>

             <v-row align-center>
                <v-col cols="12">
                  <v-card-item>
                    <v-card-title class="gray-text">Contact Person </v-card-title>
                    <!-- <strong>{{i.member_type?.name}}</strong> -->
                    <v-row>
                    <v-col cols="2"> <h4>xxxxxxxxxxxxxxxxxxxxxx</h4></v-col>
                    <v-col cols="2"><h4>xxxxxxxxxxxxxxxxxxxxxx</h4></v-col>
                    <v-col cols="2"><h4>xxxxxxxxxxxxxxxxxxxxxx</h4></v-col>
                  </v-row>
                  </v-card-item>
                </v-col>
              </v-row>




</div>
</template>
