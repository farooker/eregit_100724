<template>
  <v-form ref="form">
    <!-- {{ data_input.type_register }} -->
    <v-row dense>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h5>ต้องการลงทะเบียนแบบใด</h5>
          </v-card-title>
          <v-row dense>
            <v-col cols="12">
              <v-radio-group class="ml-6" v-model="data_input.type_register">
                <v-radio
                  v-for="(item, index) in items_type_register"
                  :label="item.name"
                  :value="item.id"
                  :key="index"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h6>ต้องการข้อมูลแบบใด</h6>
          </v-card-title>
          <v-row dense>
            <v-col cols="12">
              <v-radio-group class="ml-6" v-model="data_input.type_data">
                <v-radio
                  v-for="(item, index) in filteredItemsTypeData"
                  :label="item.name_th"
                  :value="item.id"
                  :key="index"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12">
        <!-- <h3>ส่ง Email ให้ Vender กรอกเอง</h3> -->
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h6>สำหรับบริษัท</h6>
          </v-card-title>
          <v-row dense>
            <v-col cols="12">
              <v-autocomplete
                class="mx-5"
                chips
                v-model="data_input.company_data.data"
                :items="displayItemsCompany"
                multiple
                closable-chips
                item-value="custom_id"
                item-title="displayName"
                density="compact"
                :rules="[(v) => (v && v.length) || 'กรอกข้อมูลให้ครบถ้วน']"
                variant="outlined"
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h6>Payment Terms</h6>
          </v-card-title>
          <v-row dense>
            <v-col cols="12">
              <v-radio-group class="ml-6" v-model="data_input.term_data.data">
                <v-radio
                  v-for="(item, index) in itemsPaymentTerms"
                  :label="item.description"
                  :key="index"
                  :value="item.id"
                />
              </v-radio-group>
            </v-col>
            <div class="ml-6 mt-n6 d-flex flex-row">
              <v-radio-group
                v-model="data_input.term_data.data"
                style="width: auto"
              >
                <v-radio value="other" label="อื่นๆ"></v-radio>
              </v-radio-group>
              <v-text-field
                style="min-width: 200px"
                class="mr-12 ms-3"
                density="compact"
                dense
                variant="outlined"
                v-model="data_input.term_data.other"
              ></v-text-field>
            </div>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12">
        <h3 class="my-5">1.ประเภทคู่ค้า</h3>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-row dense class="mt-5">
            <v-col cols="12">
              <v-radio-group
                class="ml-6 d-flex"
                :rules="textRequired"
                v-model="data_input.customer_type_data.data"
              >
                <v-radio
                  v-for="(item, index) in items_cutomer_type"
                  :label="item.name_th"
                  :value="item.id"
                  :key="index"
                ></v-radio>
              </v-radio-group>
            </v-col>
            <!-- <v-col cols="12" class="ml-6 d-flex flex-row">
              <v-radio-group
                v-model="data_input.customer_type_data.data"
                style="width: auto"
              >
                <v-radio label="อื่นๆ"></v-radio>
              </v-radio-group>
              <v-text-field
                class="mr-12"
                style="margin-left: -900px"
                density="compact"
                dense
                variant="outlined"
                v-model="data_input.customer_type_data.other"
              ></v-text-field>
            </v-col> -->
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" v-if="!isNaturalPerson">
        <v-card>
          <v-row dense text-align="center">
            <v-col cols="3" class="d-flex align-center">
              <h4 class="ml-5">เลขประจำผู้เสียภาษีอากร</h4>
            </v-col>
            <v-col cols="7" class="d-flex align-center">
              <!-- <ThaiIdInputControl
                :initialOtpValue="
                  isNaturalPerson
                    ? props.registerFormDetail?.business_partner_register_form?.taxpayer_number_id
                        .toString()
                        .padStart(13, '0') ?? ''
                    : props.registerFormDetail?.business_partner_profile_form?.business_partner_type?.id
                        .toString()
                        .padStart(13, '0')
                "
                class="mt-5"
                @on-input="handleThaiId"
              /> -->
              <ThaiIdInputControl
                :initialOtpValue="
                  props.registerFormDetail?.business_partner_register_form?.taxpayer_number_id
                    .toString()
                    .padStart(13, '0')
                "
                class="mt-5"
                @on-input="handleThaiId"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" v-if="isNaturalPerson">
        <v-card>
          <v-row dense text-align="center">
            <v-col cols="3" class="d-flex align-center">
              <h4 class="ml-5">เลขบัตรประจำตัวประชาชน</h4>
            </v-col>
            <v-col cols="7" class="d-flex align-center">
              <!-- <ThaiIdInputControl
                :initialOtpValue="
                  isNaturalPerson
                    ? props.registerFormDetail?.business_partner_register_form?.taxpayer_number_id
                        .toString()
                        .padStart(13, '0') ?? ''
                    : props.registerFormDetail?.business_partner_profile_form?.business_partner_type?.id
                        .toString()
                        .padStart(13, '0')
                "
                class="mt-5"
                @on-input="handleThaiId"
              /> -->
              <ThaiIdInputControl
                :initialOtpValue="
                  props.registerFormDetail?.business_partner_register_form?.taxpayer_number_id
                    .toString()
                    .padStart(13, '0')
                "
                class="mt-5"
                @on-input="handleThaiId"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-radio-group
            class="ml-6 mt-5"
            v-model="data_input.tax_register.type"
          >
            <v-radio label="จดทะเบียนภาษีมูลค่าเพิ่ม" value="1"></v-radio>
          </v-radio-group>
          <v-radio-group
            class="ml-6 mt-n4"
            :disabled="isDisableBranch"
            v-model="data_input.tax_register.branch"
          >
            <v-radio class="ml-5" label="สำนักงานใหญ่" value="1"></v-radio>
            <div class="d-flex align-center box">
              <v-radio class="ml-5" value="0" label="สาขาที่"></v-radio>
              <v-text-field
                v-model="data_input.tax_register.branch_code"
                variant="outlined"
                dense
                :rules="
                  data_input.tax_register.branch != '1' &&
                  data_input.tax_register.type != '0'
                    ? textRequired
                    : [() => true]
                "
                density="compact"
                style="margin-left: -12px; margin-right: 6; flex-grow: 9"
              ></v-text-field>
            </div>
            <!-- <v-radio
              class="ml-5"
              v-model="data_input.tax_register.branch_code"
              label="สาขา"
              value="0"
            ></v-radio> -->
          </v-radio-group>
          <v-radio-group
            class="ml-6 mt-n4"
            v-model="data_input.tax_register.type"
          >
            <v-radio label="ไม่จดทะเบียนภาษีมูลค่าเพิ่ม" value="0"></v-radio>
          </v-radio-group>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        v-if="data_input.type_register == EnumType.AccountType.VENDER"
      >
        <v-card>
          <v-card-title>
            <h6>ประเภทธุรกิจ</h6>
          </v-card-title>
          <v-row dense>
            <v-col cols="12">
              <v-select
                class="ml-6 mr-6"
                v-model="data_input.type_business.data"
                :items="itemCompanyCatagory"
                item-value="id"
                placeholder="เลือกคำตอบ"
                item-title="name_th"
                density="compact"
                variant="outlined"
              ></v-select>
            </v-col>
            <v-col cols="1" v-if="data_input.type_business.data == 29">
              <v-radio-group v-model="data_input.type_business.is_other">
                <v-radio label="อื่นๆ" :value="true"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="11" v-if="data_input.type_business.data == 29">
              <v-text-field
                class="mr-6"
                v-if="data_input.type_business.is_other"
                density="compact"
                :rules="textRequired"
                dense
                variant="outlined"
                v-model="data_input.type_business.other"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        v-if="data_input.type_register == EnumType.AccountType.VENDER"
      >
        <v-card>
          <v-card-title>
            <h6>ประเภทสินค้าและบริการ</h6>
          </v-card-title>
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                class="mr-6 ml-6"
                density="compact"
                :rules="textRequired"
                dense
                variant="outlined"
                v-model="data_input.type_product_service"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        v-if="data_input.type_register == EnumType.AccountType.CUSTOMER"
      >
        <v-card>
          <v-card-title>
            <h6>ประเภทของลูกค้า</h6>
          </v-card-title>
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                class="mr-6 ml-6"
                density="compact"
                :rules="textRequired"
                dense
                variant="outlined"
                v-model="data_input.customer_type"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12">
        <h3 class="my-5">2.ข้อมูลคู่ค้า</h3>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-row dense>
            <v-col cols="12" v-if="isNaturalPerson">
              <v-card-title style="padding: 0px">
                <h6>คำนำหน้าชื่อ (ภาษาไทย)</h6>
              </v-card-title>
              <v-col cols="12">
                <v-radio-group
                  class="mt-n3"
                  v-model="data_input.customer_info.th.pserson.gender"
                  inline
                  :rules="textRequired"
                >
                  <v-radio label="นาย" value="นาย"></v-radio>
                  <v-radio label="นาง" value="นาง"></v-radio>
                  <v-radio label="นางสาว" value="นางสาว"></v-radio>
                </v-radio-group>
              </v-col>
            </v-col>
            <v-col cols="12" class="mt-n8 mb-n7" v-if="isNaturalPerson">
              <v-card-title>
                <h6>ชื่อ-นามสกุล บุคคลธรรมดา (ภาษาไทย)</h6>
              </v-card-title>
              <v-text-field
                :rules="textRequired"
                v-model="data_input.customer_info.th.pserson.name"
                class="ml-6 mr-6 mb-3"
                density="compact"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" v-if="!isNaturalPerson">
              <v-card-title>
                <h6>ชื่อบริษัท (ภาษาไทย)</h6>
              </v-card-title>
              <v-text-field
                class="ml-6 mr-6"
                density="compact"
                :rules="textRequired"
                dense
                v-model="data_input.customer_info.th.company_name"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="mt-n5">
              <v-card-title>
                <h6>ที่อยู่ (ภาษาไทย)</h6>
              </v-card-title>
              <v-text-field
                class="ml-6 mr-6"
                density="compact"
                v-model="data_input.customer_info.th.address"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <AddressInputControlTHRegis
                tag-desc="(ภาษาไทย)"
                key-value="id"
                key-title="name_th"
                class="ml-5 mr-5"
                :address-item="data_input.customer_info.th.info"
                :is-disable-address="false"
                @on-input="handleAddressInputTh"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-row dense>
            <v-col cols="12" v-if="isNaturalPerson">
              <v-card-title>
                <h6>คำนำหน้าชื่อ (ภาษาอังกฤษ)</h6>
              </v-card-title>
              <v-col cols="12">
                <v-radio-group
                  v-model="data_input.customer_info.en.pserson.gender"
                  inline
                  class="mt-n3"
                  :rules="textRequired"
                >
                  <v-radio label="Mr." value="Mr."></v-radio>
                  <v-radio label="Mrs." value="Mrs."></v-radio>
                  <v-radio label="Miss" value="Miss"></v-radio>
                </v-radio-group>
              </v-col>
            </v-col>
            <v-col cols="12" class="mt-n8 mb-n7" v-if="isNaturalPerson">
              <v-card-title>
                <h6>ชื่อ-นามสกุล บุคคลธรรมดา (ภาษาอังกฤษ)</h6>
              </v-card-title>
              <v-text-field
                :rules="textRequired"
                v-model="data_input.customer_info.en.pserson.name"
                class="ml-6 mr-6 mb-3"
                density="compact"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" v-if="!isNaturalPerson">
              <v-card-title>
                <h6>ชื่อบริษัท (ภาษาอังกฤษ)</h6>
              </v-card-title>
              <v-text-field
                class="ml-6 mr-6"
                v-model="data_input.customer_info.en.company_name"
                density="compact"
                :rules="textRequired"
                dense
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="mt-n5">
              <v-card-title>
                <h6>ที่อยู่ (ภาษาอังกฤษ)</h6>
              </v-card-title>
              <v-text-field
                class="ml-6 mr-6"
                v-model="data_input.customer_info.en.address"
                density="compact"
                dense
                :rules="textRequired"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <!-- <AddressInputControlEN
                tag-desc="(ภาษาอังกฤษ)"
                key-value="id"
                key-title="name_en"
                class="ml-5 mr-5"
                :is-disable-address="true"
                :address-item="data_input.customer_info.en.info"
              /> -->
              <!-- {{ data_input.customer_info.en.info }} -->
              <ManaulAddressInputControlEN
                tag-desc="(ภาษาอังกฤษ)"
                class="ml-5 mr-5"
                :address-item="data_input.customer_info.en.info"
                @on-input="handleAddressEN"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card class="pa-4">
          <v-card-title>
            <v-row dense>
              <v-col class="d-flex align-center" cols="4"
                ><h6>
                  ชื่อผู้ติดต่อ (ภาษาอังกฤษ) ขึ้นมาอย่างน้อย 1 เพิ่มได้ไม่เกิน 2
                </h6>
              </v-col>
              <v-col class="d-flex align-center" cols="4"
                ><h6>เบอร์โทรศัพท์</h6>
              </v-col>
              <v-col class="d-flex align-center" cols="4"
                ><h6>Email เพื่อแจ้งการชำระ</h6>
              </v-col>
            </v-row>
            <v-row
              dense
              v-for="(item, index) in data_input.items_contects"
              :key="index"
            >
              <v-col class="d-flex align-center" cols="4"
                ><v-text-field
                  density="compact"
                  dense
                  v-model="item.name"
                  variant="outlined"
                  :rules="textRequired"
                ></v-text-field>
              </v-col>
              <v-col class="d-flex align-center" cols="4"
                ><v-text-field
                  density="compact"
                  dense
                  v-model="item.phone"
                  variant="outlined"
                  :rules="textRequired"
                ></v-text-field>
              </v-col>
              <v-col class="d-flex align-center" cols="4">
                <v-text-field
                  v-if="index !== 0"
                  density="compact"
                  dense
                  :rules="textRequired"
                  v-model="item.email"
                  variant="outlined"
                  color="red"
                  append-icon="mdi mdi-close-circle"
                  @click:append="handleRemoveContact(index)"
                ></v-text-field>
                <v-text-field
                  v-else
                  density="compact"
                  dense
                  :rules="textRequired"
                  v-model="item.email"
                  variant="outlined"
                  color="red"
                ></v-text-field>
              </v-col>
            </v-row>
            <ButtonControl
              v-if="data_input.items_contects.length < 2"
              icon="mdi mdi-plus"
              text="เพิ่ม"
              @button-clicked="handleAddNewContact"
            />
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <AccountMoneyInputControl
            :acc-name-en="data_input.customer_info.en.company_name"
            :bank-name="data_input.bank_info.bank_name"
            :bank-branch="
              props.registerFormDetail?.business_partner_profile_form
                ?.bank_branch ?? ''
            "
            :bank-account-number="
              props.registerFormDetail?.business_partner_profile_form
                ?.bank_account_number ?? ''
            "
            @on-input="handleMoneyTranferInput"
          />
        </v-card>
      </v-col>
      <div class="d-flex justify-center w-100 mt-5">
        <ButtonControl
          style="min-width: 100px; height: 35px"
          text="ต่อไป"
          @button-clicked="handleNext"
        />
      </div>
    </v-row>
  </v-form>
</template>

<script setup>
import { computed, ref } from "vue";

import ButtonControl from "@/components/controls/ButtonControl.vue";
import ThaiIdInputControl from "@/components/controls/ThaiIdInputControl";
import AddressInputControlTHRegis from "@/components/controls/AddressInputControl.vue";
// import AddressInputControlEN from "@/components/controls/AddressInputControl.vue";
import AccountMoneyInputControl from "@/components/controls/AccountMoneyInputControl.vue";
import PaymentTermService from "@/apis/PaymentTermService";
import CompnayService from "@/apis/CompnayService";
import { onMounted, watchEffect, watch } from "vue";
import PartnerServive from "@/apis/PartnerServive";
import TypesService from "@/apis/TypesService";
import ManaulAddressInputControlEN from "@/components/controls/ManaulAddressInputControl.vue";
import EnumType from "@/utils/enum.util";

import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";

const { handlingErrorsMessage } = useErrorHandlingDialog();
const emit = defineEmits(["on-commit-data", "on-input"]);

const props = defineProps({
  registerFormDetail: {
    type: Object,
    default: () => {},
  },
});

const form = ref(null);
const itemsCompanyData = ref([]);
const itemsPaymentTerms = ref([]);
const itemCompanyCatagory = ref([]);
const items_cutomer_type = ref([]);
const items_type_data = ref([]);
const items_type_register = ref([]);
const textRequired = [(v) => !!v || "กรุณากรอกข้อมูลให้ครบถ้วน"];
const initial = ref(true);
const data_input = ref({
  type_register: null, // link
  type_data: null, // link
  company_data: {
    is_other: false,
    data: null, // link
    other: null,
  },
  term_data: {
    data: null, // link
    other: null,
  },
  customer_type_data: {
    data: null, // link
    other: null,
  },
  thai_people_id: null,
  tax_register: {
    type: null,
    branch: null,
    branch_code: null,
  },
  customer_info: {
    en: {
      pserson: {
        gender: null,
        name: null,
      },
      company_name: null,
      address: null,
      info: {
        province: null,
        district: null,
        parish: null,
        zip_code: null,
      },
    },
    th: {
      pserson: {
        gender: null,
        name: null,
      },
      company_name: null,
      address: null,
      info: {
        province: null,
        district: null,
        parish: null,
        zip_code: null,
      },
    },
  },
  type_business: {
    is_other: false,
    data: null,
    other: null,
  },
  type_product_service: null,
  customer_type: null,
  items_contects: [],
  bank_info: {
    acc_name_en: null,
    bank_name: null,
    bank_branch: null,
    acc_number: null,
    bank_key: null,
  },
});

const provicesInfoTh = ref({
  province: null,
  district: null,
  parish: null,
  zip_code: null,
});

const provicesInfoEn = ref({
  province: null,
  district: null,
  parish: null,
  zip_code: null,
});

const initialTaxType = ref(true);
const initialThaiId = ref(true);

watchEffect(() => {
  if (props.registerFormDetail) {
    data_input.value.type_register =
      props.registerFormDetail?.business_partner_register_form?.business_partner_role?.id;

    data_input.value.type_data =
      props.registerFormDetail.business_partner_register_form?.fill_type.id;

    data_input.value.customer_type_data.data =
      props.registerFormDetail?.business_partner_profile_form?.business_partner_type.id;

    data_input.value.customer_type =
      props.registerFormDetail?.business_partner_profile_form?.customer_category;

    // const companies =
    //   props.registerFormDetail.business_partner_register_form?.company ??
    //   [].map((el) => el.id);

    // props.registerFormDetail.business_partner_register_form.company.map(
    //   (el) => { return el.id }
    // );

    if (props.registerFormDetail.business_partner_register_form.company)
      data_input.value.company_data.data =
        props.registerFormDetail.business_partner_register_form.company.map(
          (el) => {
            return { id: el.id, company_code: el.company_code };
          }
        );

    if (
      props.registerFormDetail.business_partner_register_form?.payment_term
        .is_default
    ) {
      data_input.value.term_data.data =
        props.registerFormDetail.business_partner_register_form?.payment_term.id;
    } else {
      data_input.value.term_data.data = "other";
      data_input.value.term_data.other =
        props.registerFormDetail.business_partner_register_form?.payment_term.description;
    }

    data_input.value.type_business.data =
      props.registerFormDetail.business_partner_profile_form?.company_category.id;

    data_input.value.type_product_service =
      props.registerFormDetail.business_partner_profile_form?.product_category;

    data_input.value.customer_info.th.company_name =
      props.registerFormDetail.business_partner_register_form?.name_th;

    data_input.value.customer_info.th.address =
      props.registerFormDetail.business_partner_profile_form?.address_th;

    data_input.value.customer_info.en.company_name =
      props.registerFormDetail.business_partner_register_form?.name_en;

    data_input.value.customer_info.en.address =
      props.registerFormDetail.business_partner_profile_form?.address_en;

    provicesInfoTh.value.province =
      props.registerFormDetail.business_partner_profile_form?.province_th.id;

    provicesInfoTh.value.district =
      props.registerFormDetail.business_partner_profile_form?.district_th.id;

    provicesInfoTh.value.parish =
      props.registerFormDetail.business_partner_profile_form?.subdistrict_th.id;

    provicesInfoTh.value.zip_code =
      props.registerFormDetail.business_partner_profile_form?.postal_code_th.id;

    provicesInfoEn.value.province =
      props.registerFormDetail.business_partner_profile_form?.province_en;

    provicesInfoEn.value.district =
      props.registerFormDetail.business_partner_profile_form?.district_en;

    provicesInfoEn.value.parish =
      props.registerFormDetail.business_partner_profile_form?.subdistrict_en;

    provicesInfoEn.value.zip_code =
      props.registerFormDetail.business_partner_profile_form?.postal_code_en.id;

    data_input.value.customer_info.th.info = provicesInfoTh.value;
    data_input.value.customer_info.en.info = provicesInfoEn.value;

    if (initialThaiId.value) {
      initialThaiId.value = false;
      data_input.value.thai_people_id =
        props.registerFormDetail.business_partner_register_form?.taxpayer_number_id;
    }

    if (initialTaxType.value) {
      data_input.value.tax_register.type = props.registerFormDetail
        .business_partner_profile_form?.is_vat_registered
        ? "1"
        : "0";
      initialTaxType.value = false;
    }

    if (
      props.registerFormDetail.business_partner_profile_form?.is_head_office
    ) {
      data_input.value.tax_register.branch = "1";
    } else {
      if (props.registerFormDetail.business_partner_profile_form?.branch_code) {
        data_input.value.tax_register.branch = "0";
        data_input.value.tax_register.branch_code =
          props.registerFormDetail.business_partner_profile_form?.branch_code;
      } else {
        data_input.value.tax_register.branch = null;
      }
    }

    if (data_input.value.tax_register.type == 0) {
      data_input.value.tax_register.branch = null;
      data_input.value.tax_register.branch_code = null;
    }

    data_input.value.bank_info.acc_name_en =
      props.registerFormDetail.business_partner_register_form.name_en;

    data_input.value.bank_info.bank_name =
      props.registerFormDetail.business_partner_profile_form?.bank.id.toString();

    data_input.value.bank_info.bank_branch =
      props.registerFormDetail.business_partner_profile_form?.bank_branch;

    data_input.value.bank_info.acc_number =
      props.registerFormDetail.business_partner_profile_form?.bank_account_number;

    if (initial.value) {
      data_input.value.customer_info.th.pserson.name =
        props.registerFormDetail.business_partner_register_form?.name_th;
      initial.value = false;
      let regexTh = /^(นาย|นางสาว|นาง)/;
      let matchTh = regexTh.exec(
        data_input.value.customer_info.th.pserson.name
      );
      if (matchTh) {
        switch (matchTh[0]) {
          case "นาย":
            data_input.value.customer_info.th.pserson.name =
              data_input.value.customer_info.th.pserson.name.replace("นาย", "");
            data_input.value.customer_info.th.pserson.gender = "นาย";
            break;
          case "นางสาว":
            data_input.value.customer_info.th.pserson.name =
              data_input.value.customer_info.th.pserson.name.replace(
                "นางสาว",
                ""
              );
            data_input.value.customer_info.th.pserson.gender = "นางสาว";
            break;
          case "นาง":
            data_input.value.customer_info.th.pserson.name =
              data_input.value.customer_info.th.pserson.name.replace("นาง", "");
            data_input.value.customer_info.th.pserson.gender = "นาง";
            break;
        }
      }

      data_input.value.customer_info.en.pserson.name =
        props.registerFormDetail.business_partner_register_form?.name_en;

      let regexEn = /^(Mr\.|Mrs\.|Miss)/;
      let matchEn = regexEn.exec(
        data_input.value.customer_info.en.pserson.name
      );
      if (matchEn) {
        switch (matchEn[0]) {
          case "Mr.":
            data_input.value.customer_info.en.pserson.name =
              data_input.value.customer_info.en.pserson.name.replace("Mr.", "");
            data_input.value.customer_info.en.pserson.gender = "Mr.";
            break;
          case "Mrs.":
            data_input.value.customer_info.en.pserson.name =
              data_input.value.customer_info.en.pserson.name.replace(
                "Mrs.",
                ""
              );
            data_input.value.customer_info.en.pserson.gender = "Mrs.";
            break;
          case "Miss":
            data_input.value.customer_info.en.pserson.name =
              data_input.value.customer_info.en.pserson.name.replace(
                "Miss",
                ""
              );
            data_input.value.customer_info.en.pserson.gender = "Miss";
            break;
        }
      }
    }

    data_input.value.items_contects = [];

    for (let index = 1; index < 4; index++) {
      if (!props.registerFormDetail.business_partner_profile_form) return;

      const contact_name =
        props.registerFormDetail.business_partner_profile_form[
          `contact_name_${index}`
        ];

      const contact_email =
        props.registerFormDetail.business_partner_profile_form[
          `contact_email_${index}`
        ];

      const contact_mobile_number =
        props.registerFormDetail.business_partner_profile_form[
          `contact_mobile_number_${index}`
        ];

      if (!contact_name || !contact_email || !contact_mobile_number) break;

      data_input.value.items_contects.push({
        name: contact_name,
        email: contact_email,
        phone: contact_mobile_number,
      });
    }
  } else {
    data_input.value.tax_register.type = "0";
    data_input.value.tax_register.branch = null;
    data_input.value.tax_register.branch_code = null;
  }
});
watch(
  () => data_input.value.tax_register.type,
  () => {
    if (data_input.value.tax_register.type == 0) {
      data_input.value.tax_register.branch = null;
      data_input.value.tax_register.branch_code = "";
    }
  },
  { deep: true, immediate: true }
);

const isDisableBranch = computed(() => {
  if (data_input.value.tax_register.type == 0) {
    return true;
  }
  return false;
});

const filteredItemsTypeData = computed(() => {
  return items_type_data.value.filter(
    (item) => item.business_partner_role_id === data_input.value.type_register
  );
});

onMounted(async () => {
  await getCompanies();
  await getPaymentTerm();
  await getCompaniesCategories();
  await getBusinessPartnerType();
  await getFillTypes();
  await getBusinessPartnerRoles();
  initialInputdata();
});

const initialInputdata = () => {
  data_input.value.items_contects = [{ name: "", email: "", phone: "" }];
};

const isNaturalPerson = computed(() => {
  if (data_input.value.customer_type_data.data == 1) return true;
  return false;
});

const createPaymentTerm = async () => {
  try {
    const response = await PaymentTermService.createPaymentTerm(
      data_input.value.type_register,
      "00000",
      data_input.value.term_data.other
    );
    if (response.data?.is_success) {
      data_input.value.term_data.data = response.data.data?.id;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data?.error);
    }
  }
};

const createBusinessPartnerType = async () => {
  try {
    const response = await PartnerServive.createBusinessPartnerType(
      data_input.value.customer_type_data.other,
      "",
      false
    );
    if (response.data?.is_success) {
      data_input.value.customer_type_data.data = response.data.data?.id;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data?.error);
    }
  }
};

const createComapnyCetagory = async () => {
  try {
    const response = await CompnayService.createCompanyGetagory(
      data_input.value.type_business.other,
      data_input.value.type_business.other
    );
    if (response.data?.is_success) {
      data_input.value.type_business.data = response.data.data?.id;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data?.error);
    }
  }
};

const getBusinessPartnerRoles = async () => {
  try {
    const response = await PartnerServive.getBusinessPartnerRolesAll();
    if (response.data?.is_success) {
      items_type_register.value = response.data?.data;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  }
};

const getFillTypes = async () => {
  try {
    const response = await TypesService.getTypesAll();
    if (response.data?.is_success) {
      items_type_data.value = response.data.data;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  }
};

const getBusinessPartnerType = async () => {
  try {
    const response = await PartnerServive.getPartnerTypeAll();
    if (response.data?.is_success) {
      items_cutomer_type.value = response.data.data;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  }
};

const displayItemsCompany = computed(() => {
  return itemsCompanyData.value.map((item) => ({
    ...item,
    displayName: `${item.company_code} - ${item.name_th}`,
    custom_id: { id: item.id, company_code: item.company_code },
  }));
});

const getCompanies = async () => {
  try {
    const response = await CompnayService.getCompanyAll();
    if (response.data?.is_success) {
      itemsCompanyData.value = response.data.data;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  }
};

watch(
  () => data_input.value.type_register,
  async () => {
    if (data_input.value.type_register) {
      await getPaymentTerm();
    }
  },
  { deep: true }
);
const getPaymentTerm = async () => {
  try {
    const response = await PaymentTermService.getPaymentTermAll(
      data_input.value.type_register
    );
    if (response.data?.is_success) {
      itemsPaymentTerms.value = response.data.data;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
    handlingErrorsMessage("unknown", e.message);
  }
};

const getCompaniesCategories = async () => {
  try {
    const response = await CompnayService.getCompanyCategoriesAll();
    if (response.data?.is_success) {
      itemCompanyCatagory.value = response.data.data;
    }
  } catch (e) {
    if (e.response) {
      const val = e.response.data;
      handlingErrorsMessage(val.message, val?.data.error);
      return;
    }
  }
};

const handleRemoveContact = (index) => {
  if (data_input.value.items_contects.length > 1)
    data_input.value.items_contects.splice(index, 1);
};

const handleAddNewContact = () => {
  if (data_input.value.items_contects.length < 2)
    data_input.value.items_contects.push({ name: "", phone: "", email: "" });
};

const handleThaiId = (id) => {
  data_input.value.thai_people_id = id;
};

watch(
  data_input.value,
  () => {
    emit("on-input", data_input.value);
  },
  { deep: true }
);

const handleNext = async () => {
  const is_valid = await form.value.validate();
  if (is_valid && is_valid["valid"]) {
    if (
      data_input.value.customer_type_data.other &&
      data_input.value.customer_type_data.other !== ""
    )
      await createBusinessPartnerType();

    if (
      data_input.value.term_data.other &&
      data_input.value.term_data.other !== ""
    )
      await createPaymentTerm();

    if (
      data_input.value.type_business.other &&
      data_input.value.type_business.other !== ""
    )
      await createComapnyCetagory();

    if (data_input.value.tax_register.branch == "1")
      data_input.value.tax_register.branch_code = "00000";

    if (data_input.value.tax_register.type == "0")
      data_input.value.tax_register.branch_code = "NVAT";

    emit("on-commit-data", data_input.value);
  }
};

const handleAddressInputTh = (address) => {
  data_input.value.customer_info.th.info = address;
  // data_input.value.customer_info.en.info = address;
};

const handleAddressEN = (address) => {
  data_input.value.customer_info.en.info = address;
};
const handleMoneyTranferInput = (data) => {
  data_input.value.bank_info = data;
};
</script>

<style scoped>
:deep(.v-text-field .v-field) {
  border-radius: 10px !important;
}

:deep(.v-chip--variant-tonal .v-chip__underlay) {
  background-color: #ed1c24 !important;
}

:deep(.v-chip.v-chip--density-default) {
  border: 1px solid #ed1c24 !important;
}

.box {
  position: relative;
}

.box :deep(.v-text-field .v-field) {
  width: 300px;
  position: absolute;
  left: 120px;
  top: -2px;
  flex-grow: 9;
  max-width: 300px;
}

:deep(.v-chip__content) {
  margin-top: 3px;
}

:deep(.mdi-close-circle::before) {
  content: "\F0156";
  color: red;
}
</style>
