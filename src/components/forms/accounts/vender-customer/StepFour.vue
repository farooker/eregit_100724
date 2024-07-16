<template>
  <v-row>
    <!-- {{ props.BusinessPartnerGroup }}
      {{ props.bpType }} -->
       <!-- {{ registerFormDetail }} -->
       <!-- {{   props.registerFormDetail.business_partner_register_form.payment_term.id
       }} -->
    <v-col cols="12"><h2>ข้อมูลเพิ่มเติม</h2></v-col>
    <v-col cols="12">
      <v-card>
        <v-row dense>
          <v-col cols="12">
            <v-card-title>
              <h6>Reconcillation acct</h6>
            </v-card-title>
            <v-select
              class="ml-6 mr-6"
              :items="itemReconcilation"
              item-title="name"
              item-value="id"
              v-model="data_input.more_data_one.reconcliation_acct_seletion"
              density="compact"
              variant="outlined"
            ></v-select>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>Instruction key</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              variant="outlined"
              v-model="data_input.more_data_one.instruction_key"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>Sort key</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              variant="outlined"
              v-model="data_input.more_data_one.sort_key"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>Check double invoice</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              variant="outlined"
              v-model="data_input.more_data_one.check_double_invoice"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>Payment methods</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              variant="outlined"
              v-model="data_input.more_data_one.payment_methodes"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>Payment term</h6>
            </v-card-title>
            <v-select
              class="ml-6 mr-6"
              v-model="data_input.more_data_one.pyment_term_selection"
              :items="displayItemsPaymentTerms"
              item-title="displayName"
              item-value="id"
              density="compact"
              variant="outlined"
            ></v-select>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>Payment terms</h6>
            </v-card-title>
            <v-select
              class="ml-6 mr-6"
              v-model="data_input.more_data_one.payment_terms_selection"
              :items="displayItemsPaymentTerms"
              item-title="displayName"
              item-value="id"
              density="compact"
              variant="outlined"
            ></v-select>
          </v-col>
        </v-row>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card>
        <v-row dense v-if="props.typeForm != AccountType.AccountType.CUSTOMER">
          <v-col cols="12">
            <v-card-title>
              <h6>Withholding tax type (1)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              v-model="data_input.more_data_two.with_tax_type['1']"
              dense
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-card-title>
              <h6>Withholding tax code (1)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              variant="outlined"
              v-model="data_input.more_data_two.with_tax_code['1']"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-card-title>
              <h6>Subject to WHT (1)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              variant="outlined"
              v-model="data_input.more_data_two.subject_wht['1']"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-card-title>
              <h6>Type of reciepient (1)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              variant="outlined"
              v-model="data_input.more_data_two.type_reciepient['1']"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-card-title>
              <h6>Withholding tax type (2)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              v-model="data_input.more_data_two.with_tax_type['2']"
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>Withholding tax code (2)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              v-model="data_input.more_data_two.with_tax_code['2']"
              dense
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-card-title>
              <h6>Subject to WHT (2)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              variant="outlined"
              v-model="data_input.more_data_two.subject_wht['2']"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-card-title>
              <h6>Type of reciepient (2)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              variant="outlined"
              v-model="data_input.more_data_two.type_reciepient['2']"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-card-title>
              <h6>Withholding tax type (3)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              v-model="data_input.more_data_two.with_tax_type['3']"
              dense
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-card-title>
              <h6>Withholding tax code (3)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              variant="outlined"
              v-model="data_input.more_data_two.with_tax_code['3']"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-card-title>
              <h6>Subject to WHT (3)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              variant="outlined"
              v-model="data_input.more_data_two.subject_wht['3']"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-card-title>
              <h6>Type of reciepient (3)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              variant="outlined"
              v-model="data_input.more_data_two.type_reciepient['3']"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row dense v-if="props.typeForm === AccountType.AccountType.CUSTOMER">
          <v-col cols="12">
            <v-card-title>
              <h6>Withholding tax type (1)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              v-model="data_input.more_data_two.with_tax_type['1']"
              dense
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-card-title>
              <h6>Withholding tax code (1)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              variant="outlined"
              v-model="data_input.more_data_two.with_tax_code['1']"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-card-title>
              <h6>Withhold agent (1)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              v-model="data_input.more_data_two.with_agent['1']"
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-card-title>
              <h6>Obilgation from (2)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              v-model="data_input.more_data_two.obli_from['1']"
              density="compact"
              dense
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>Obilgation to (2)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              v-model="data_input.more_data_two.obli_to['1']"
              dense
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-card-title>
              <h6>Withholding tax type (2)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              v-model="data_input.more_data_two.with_tax_type['2']"
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>Withholding tax code (2)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              v-model="data_input.more_data_two.with_tax_code['2']"
              dense
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-card-title>
              <h6>Withhold agent (2)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              dense
              v-model="data_input.more_data_two.with_agent['2']"
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-card-title>
              <h6>Obilgation from (2)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              v-model="data_input.more_data_two.obli_from['2']"
              density="compact"
              dense
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>Obilgation to (2)</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              v-model="data_input.more_data_two.obli_to['2']"
              dense
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>
        </v-row> </v-card
    ></v-col>

    <!-- /*************************************** */ -->
    <!-- <v-col cols="12">
        <v-card>
          <v-row dense>
            <v-col cols="12">
              <v-card-title>
                <h6>Withholding tax type (1)</h6>
              </v-card-title>
              <v-text-field
                class="ml-6 mr-6"
                density="compact"
                v-model="data_input.more_data_two.with_tax_type['1']"
                dense
                variant="outlined"
                readonly
                bg-color="#dfdfdf"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-card-title>
                <h6>Withholding tax code (1)</h6>
              </v-card-title>
              <v-text-field
                class="ml-6 mr-6"
                density="compact"
                dense
                variant="outlined"
                v-model="data_input.more_data_two.with_tax_code['1']"
                readonly
                bg-color="#dfdfdf"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              v-if="props.typeForm === AccountType.AccountType.VENDER"
            >
              <v-card-title>
                <h6>Subject to WHT (1)</h6>
              </v-card-title>
              <v-text-field
                class="ml-6 mr-6"
                density="compact"
                dense
                variant="outlined"
                v-model="data_input.more_data_two.subject_wht['1']"
                readonly
                bg-color="#dfdfdf"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              v-if="props.typeForm === AccountType.AccountType.VENDER"
            >
              <v-card-title>
                <h6>Type of reciepient (1)</h6>
              </v-card-title>
              <v-text-field
                class="ml-6 mr-6"
                density="compact"
                dense
                variant="outlined"
                v-model="data_input.more_data_two.type_reciepient['1']"
                readonly
                bg-color="#dfdfdf"
              ></v-text-field>
            </v-col>

  ิ

            <v-col cols="12">
              <v-card-title>
                <h6>Withhold agent (1)</h6>
              </v-card-title>
              <v-text-field
                class="ml-6 mr-6"
                density="compact"
                dense
                v-model="data_input.more_data_two.with_agent['1']"
                variant="outlined"
                readonly
                bg-color="#dfdfdf"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-card-title>
                <h6>Obilgation from (1)</h6>
              </v-card-title>
              <v-text-field
                class="ml-6 mr-6"
                density="compact"
                v-model="data_input.more_data_two.obli_from['1']"
                dense
                variant="outlined"
                readonly
                bg-color="#dfdfdf"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-card-title>
                <h6>Obilgation to (1)</h6>
              </v-card-title>
              <v-text-field
                class="ml-6 mr-6"
                density="compact"
                dense
                variant="outlined"
                v-model="data_input.more_data_two.obli_to['1']"
                readonly
                bg-color="#dfdfdf"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-card-title>
                <h6>Withholding tax type (2)</h6>
              </v-card-title>
              <v-text-field
                class="ml-6 mr-6"
                density="compact"
                dense
                v-model="data_input.more_data_two.with_tax_type['2']"
                variant="outlined"
                readonly
                bg-color="#dfdfdf"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-card-title>
                <h6>Withholding tax code (2)</h6>
              </v-card-title>
              <v-text-field
                class="ml-6 mr-6"
                density="compact"
                v-model="data_input.more_data_two.with_tax_code['2']"
                dense
                variant="outlined"
                readonly
                bg-color="#dfdfdf"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-card-title>
                <h6>Withhold agent (2)</h6>
              </v-card-title>
              <v-text-field
                class="ml-6 mr-6"
                density="compact"
                v-model="data_input.more_data_two.with_agent['2']"
                dense
                variant="outlined"
                readonly
                bg-color="#dfdfdf"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-card-title>
                <h6>Obilgation from (2)</h6>
              </v-card-title>
              <v-text-field
                class="ml-6 mr-6"
                v-model="data_input.more_data_two.obli_from['2']"
                density="compact"
                dense
                variant="outlined"
                readonly
                bg-color="#dfdfdf"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-card-title>
                <h6>Obilgation to (2)</h6>
              </v-card-title>
              <v-text-field
                class="ml-6 mr-6"
                density="compact"
                v-model="data_input.more_data_two.obli_to['2']"
                dense
                variant="outlined"
                readonly
                bg-color="#dfdfdf"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              v-if="props.typeForm === AccountType.AccountType.VENDER"
            >
              <v-card-title>
                <h6>Withholding tax type (3)</h6>
              </v-card-title>
              <v-text-field
                class="ml-6 mr-6"
                density="compact"
                v-model="data_input.more_data_two.with_tax_type['3']"
                dense
                variant="outlined"
                readonly
                bg-color="#dfdfdf"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              v-if="props.typeForm === AccountType.AccountType.VENDER"
            >
              <v-card-title>
                <h6>Withholding tax code (3)</h6>
              </v-card-title>
              <v-text-field
                class="ml-6 mr-6"
                density="compact"
                v-model="data_input.more_data_two.with_tax_code['3']"
                dense
                variant="outlined"
                readonly
                bg-color="#dfdfdf"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              v-if="props.typeForm === AccountType.AccountType.VENDER"
            >
              <v-card-title>
                <h6>Subject to WHT (3)</h6>
              </v-card-title>
              <v-text-field
                class="ml-6 mr-6"
                density="compact"
                dense
                variant="outlined"
                v-model="data_input.more_data_two.subject_wht['3']"
                readonly
                bg-color="#dfdfdf"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              v-if="props.typeForm == AccountType.AccountType.VENDER"
            >
              <v-card-title>
                <h6>Type of reciepient (3)</h6>
              </v-card-title>
              <v-text-field
                class="ml-6 mr-6"
                density="compact"
                dense
                variant="outlined"
                v-model="data_input.more_data_two.type_reciepient['3']"
                readonly
                bg-color="#dfdfdf"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-col> -->

    <v-col cols="12" v-if="props.typeForm != AccountType.AccountType.CUSTOMER">
      <v-card>
        <v-row dense>
          <v-col cols="12">
            <v-card-title>
              <h6>Purch. organisation</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              v-model="data_input.vander_info.pruch"
              dense
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>Order Currency</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              :rules="textRequired"
              v-model="data_input.vander_info.order_currency"
              density="compact"
              dense
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>GR-Base Inv Venf</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              v-model="data_input.vander_info.gb_base"
              dense
              variant="outlined"
              readonly
              bg-color="#dfdfdf"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>Head office</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              :rules="textRequired"
              density="compact"
              v-model="data_input.vander_info.head_office"
              dense
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-card-title>
              <h6>Payee in doc</h6>
            </v-card-title>
            <v-text-field
              class="ml-6 mr-6"
              density="compact"
              v-model="data_input.vander_info.pa_yee_in_doc"
              dense
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <!-- {{ props.BusinessPartnerGroup }}
      {{ itemsAccountBusinessPartnerType }}
      {{ props.bpType }}
      {{ itemBbType }} -->
  </v-row>
</template>

<script setup>
import { computed, watch, watchEffect } from "vue";
import { ref } from "vue";

import AccountType from "@/utils/enum.util";
import PaymentTermService from "@/apis/PaymentTermService";
import { onMounted } from "vue";

import { useErrorHandlingDialog } from "@/components/dialogs/ExceptionHandleDialogService";
import AccountReconciliationService from "@/apis/AccountReconciliationService";
import PartnerServive from "@/apis/PartnerServive";
const { handlingErrorsMessage } = useErrorHandlingDialog();

const props = defineProps({
  typeForm: {
    type: Number,
    default: AccountType.AccountType.CUSTOMER, //0-Customer 1-Vender
  },
  registerFormDetail: {
    type: Object,
    default: () => {},
  },
  BusinessPartnerGroup: Number,
  bpType: Number,
  compCode: Array,
});

const emit = defineEmits(["on-input"]);

const textRequired = [(v) => !!v || "กรุณากรอกข้อมูลให้ครบถ้วน"];
const itemReconcilation = ref([]);
const itemsPaymentTerms = ref([]);
const itemsAccountBusinessPartnerType = ref([]);
const itemBbType = ref([]);

const data_input = ref({
  more_data_one: {
    reconcliation_acct_seletion: null,
    instruction_key: "4",
    sort_key:
      props.typeForm != AccountType.AccountType.CUSTOMER ? "009" : "002",
    check_double_invoice: "x",
    payment_methodes:
      props.typeForm != AccountType.AccountType.CUSTOMER ? "ABCDEFGHJK" : "4",
    pyment_term_selection: null,
    payment_terms_selection: null,
  },
  more_data_two: {
    subject_wht: {
      1: null,
      2: null,
      3: null,
    },
    type_reciepient: {
      1: null,
      2: null,
      3: null,
    },
    with_tax_type: {
      1: null,
      2: null,
      3: null,
    },
    with_tax_code: {
      1: null,
      2: null,
      3: null,
    },
    with_agent: {
      1: null,
      2: null,
    },
    obli_from: {
      1: null,
      2: null,
    },
    obli_to: {
      1: null,
      2: null,
    },
  },
  vander_info: {
    pruch: "", //props.compCode.join(","),
    gb_base: props.typeForm != AccountType.AccountType.CUSTOMER ? "X" : null,
    order_currency:
      props.typeForm != AccountType.AccountType.CUSTOMER ? "THB" : null,
    head_office: null,
    pa_yee_in_doc: null,
  },
});

const arrayCompCode = ref(props.compCode ?? []);

watchEffect(async () => {

  data_input.value.more_data_one.pyment_term_selection =
  props.registerFormDetail?.business_partner_register_form?.payment_term.id;

  data_input.value.more_data_one.reconcliation_acct_seletion =
    props.registerFormDetail?.account_information_form
      ?.reconciliation_account_id ?? null;
  // data_input.value.more_data_one.pyment_term_selection =
  //   props.registerFormDetail?.account_information_form?.payment_term_id ?? null;
  data_input.value.more_data_one.payment_terms_selection =
    props.registerFormDetail?.account_information_form?.payment_terms_id ??
    null;
  data_input.value.vander_info.head_office =
    props.registerFormDetail?.account_information_form?.head_office ?? null;
});
const TAG_GL00 = [
  "1000",
  "1100",
  "1200",
  "1300",
  "1400",
  "1500",
  "1600",
  "1700",
  "1800",
  "1900",
  "2000",
  "2100",
  "2200",
  "2400",
  "2500",
  "2300",
  "3000",
  "3100",
  "3300",
  "3400",
  "3500",
  "3600",
  "3700",
  "3800",
  "3900",
  "4000",
  "4100",
  "4200",
  "4300",
  "4400",
];
const TAG_FPT = [
  "6000",
  "6001",
  "6002",
  "6003",
  "6004",
  "6005",
  "6006",
  "6007",
  "6008",
  "6009",
  "6017",
  "6018",
  "6019",
  "6021",
  "6022",
  "6023",
  "3200",
];
const TAG_FPHT = ["5000", "5001", "5002", "5003"];

onMounted(async () => {
  await getPaymentTerm();
  await getBusinessPartnerGroupAll();
  await getAccounrBusinessPartnerTypeAll();
  await getAccountReconciliation(props.typeForm);
  console.log("props.compCode", props.compCode)

  const result = [];
  for (let index = 0; index < arrayCompCode.value.length; index++) {
    const el = arrayCompCode.value[index];
    if (TAG_GL00.includes(el)) result.push("GL00");
    if (TAG_FPT.includes(el)) result.push("FTP");
    if (TAG_FPHT.includes(el)) result.push("FPHT");
  }
  data_input.value.vander_info.pruch = result.join(",");
});

const getAccounrBusinessPartnerTypeAll = async () => {
  try {
    const response = await PartnerServive.getAccounrBusinessPartnerTypeAll();
    if (response.data?.is_success) {
      itemBbType.value = response.data.data;
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

const getBusinessPartnerGroupAll = async () => {
  try {
    const response = await PartnerServive.getBusinessPartnerGroupAll();
    if (response.data?.is_success) {
      itemsAccountBusinessPartnerType.value = response.data.data;
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

const getAccountReconciliation = async (id) => {
  try {
    const response =
      await AccountReconciliationService.getAccountReconciliationAll(id);
    if (response.data?.is_success) {
      itemReconcilation.value = response.data.data;
    }
  } catch (e) {
    if (e.response) {
      return;
    }
  }
};

watchEffect(async () => {
  // if (itemsAccountBusinessPartnerType.value.length == 0) {
  //   await getBusinessPartnerGroupAll();
  // }
  // if (itemBbType.value.length == 0) {
  //   await getAccounrBusinessPartnerTypeAll();
  // }

  // if (itemReconcilation.value.length == 0 && props.typeForm)
  //   await getAccountReconciliation(props.typeForm);

  const Bpg = itemsAccountBusinessPartnerType.value.find(
    (el) => el.id == props.BusinessPartnerGroup
  );

  data_input.value.vander_info.pa_yee_in_doc = Bpg?.code;

  if (props.typeForm && props.typeForm != AccountType.AccountType.CUSTOMER) {
    let indexFind = itemsAccountBusinessPartnerType.value.findIndex(
      (el) => el.id == props.BusinessPartnerGroup
    );

    data_input.value.more_data_two = {
      subject_wht: {
        1: null,
        2: null,
        3: null,
      },
      type_reciepient: {
        1: null,
        2: null,
        3: null,
      },
      with_tax_type: {
        1: null,
        2: null,
        3: null,
      },
      with_tax_code: {
        1: null,
        2: null,
        3: null,
      },
      with_agent: {
        1: null,
        2: null,
      },
      obli_from: {
        1: null,
        2: null,
      },
      obli_to: {
        1: null,
        2: null,
      },
    };

    if (props.BusinessPartnerGroup !== 4 && props.BusinessPartnerGroup !== 5)
      indexFind = -1;

    if (indexFind > -1) {
      const itemFind = itemsAccountBusinessPartnerType.value[indexFind];

      switch (itemFind.code) {
        case "BP04":
          data_input.value.more_data_two.with_tax_type["1"] = "04";
          data_input.value.more_data_two.with_tax_type["2"] = "05";
          data_input.value.more_data_two.with_tax_type["3"] = "06";

          data_input.value.more_data_two.type_reciepient["1"] = "03";
          data_input.value.more_data_two.type_reciepient["2"] = "03";
          data_input.value.more_data_two.type_reciepient["3"] = "03";

          data_input.value.more_data_two.subject_wht["1"] = "X";
          data_input.value.more_data_two.subject_wht["2"] = "X";
          data_input.value.more_data_two.subject_wht["3"] = "X";
          break;
        case "BP05":
          data_input.value.more_data_two.with_tax_type["2"] = null;
          data_input.value.more_data_two.with_tax_type["1"] = null;
          data_input.value.more_data_two.subject_wht["1"] = null;
          data_input.value.more_data_two.subject_wht["2"] = null;
          data_input.value.more_data_two.subject_wht["3"] = null;
          data_input.value.more_data_two.with_tax_type["3"] = null;
          data_input.value.more_data_two.subject_wht["1"] = null;
          // data_input.value.more_data_two.subject_wht["2"] = null;
          // data_input.value.more_data_two.subject_wht["3"] = null;
          data_input.value.more_data_two.type_reciepient["1"] = null;
          data_input.value.more_data_two.type_reciepient["2"] = null;
          data_input.value.more_data_two.type_reciepient["3"] = null;
          break;
      }
    } else {
      const bpIndex = itemBbType.value.findIndex((el) => el.id == props.bpType);
      if (bpIndex > -1) {
        const bp = itemBbType.value[bpIndex];
        switch (bp.code) {
          case "0001":
            data_input.value.more_data_two.with_tax_type["3"] = "15";
            data_input.value.more_data_two.with_tax_type["1"] = "13";
            data_input.value.more_data_two.with_tax_type["2"] = "14";
            data_input.value.more_data_two.type_reciepient["1"] = "03";
            data_input.value.more_data_two.type_reciepient["2"] = "03";
            data_input.value.more_data_two.type_reciepient["3"] = "03";
            data_input.value.more_data_two.subject_wht["1"] = "X";
            data_input.value.more_data_two.subject_wht["2"] = "X";
            data_input.value.more_data_two.subject_wht["3"] = "X";
            data_input.value.more_data_two.with_agent["1"] = null;
            data_input.value.more_data_two.obli_from["1"] = null;
            data_input.value.more_data_two.obli_to["1"] = null;
            data_input.value.more_data_two.with_agent["2"] = null;
            break;
          case "0002":
            data_input.value.more_data_two.with_agent["1"] = "X";
            data_input.value.more_data_two.with_tax_type["1"] = "16";
            data_input.value.more_data_two.with_tax_type["2"] = "17";
            data_input.value.more_data_two.type_reciepient["1"] = "53";
            data_input.value.more_data_two.type_reciepient["2"] = "53";
            data_input.value.more_data_two.type_reciepient["3"] = "53";
            data_input.value.more_data_two.with_tax_type["3"] = "18";
            data_input.value.more_data_two.subject_wht["1"] = "X";
            data_input.value.more_data_two.subject_wht["2"] = "X";
            data_input.value.more_data_two.subject_wht["3"] = "X";
            data_input.value.more_data_two.with_agent["2"] = "X";
            break;
          case "0003":
            data_input.value.more_data_two.with_agent["1"] = "X";
            data_input.value.more_data_two.with_tax_type["1"] = "16";
            data_input.value.more_data_two.with_tax_type["2"] = "17";
            data_input.value.more_data_two.type_reciepient["1"] = "53";
            data_input.value.more_data_two.type_reciepient["2"] = "53";
            data_input.value.more_data_two.type_reciepient["3"] = "53";
            data_input.value.more_data_two.with_tax_type["3"] = "18";
            data_input.value.more_data_two.subject_wht["1"] = "X";
            data_input.value.more_data_two.subject_wht["2"] = "X";
            data_input.value.more_data_two.subject_wht["3"] = "X";
            data_input.value.more_data_two.with_agent["2"] = "X";
            break;
          case "0004":
            data_input.value.more_data_two.with_agent["1"] = "X";
            data_input.value.more_data_two.with_tax_type["1"] = "16";
            data_input.value.more_data_two.with_tax_type["2"] = "17";
            data_input.value.more_data_two.type_reciepient["1"] = "53";
            data_input.value.more_data_two.type_reciepient["2"] = "53";
            data_input.value.more_data_two.type_reciepient["3"] = "53";
            data_input.value.more_data_two.with_tax_type["3"] = "18";
            data_input.value.more_data_two.subject_wht["1"] = "X";
            data_input.value.more_data_two.subject_wht["2"] = "X";
            data_input.value.more_data_two.subject_wht["3"] = "X";
            data_input.value.more_data_two.with_agent["2"] = "X";
            break;
          default:
            data_input.value.more_data_two.with_agent["1"] = "X";
            data_input.value.more_data_two.obli_from["1"] = "01.01.1900";
            data_input.value.more_data_two.obli_to["1"] = "31.12.999";
            data_input.value.more_data_two.with_agent["2"] = "X";
            break;
        }
      }
    }
  }

  // if (props.typeForm && props.typeForm == AccountType.AccountType.CUSTOMER) {
  //   let itemFind = itemsAccountBusinessPartnerType.value.find(
  //     (el) => el.id == props.BusinessPartnerGroup
  //   );

  //   if (props.BusinessPartnerGroup !== 4 && props.BusinessPartnerGroup !== 5)
  //     itemFind = undefined;
  //   data_input.value.vander_info.pa_yee_in_doc = null;
  //   data_input.value.more_data_two = {
  //     subject_wht: {
  //       1: null,
  //       2: null,
  //       3: null,
  //     },
  //     type_reciepient: {
  //       1: null,
  //       2: null,
  //       3: null,
  //     },
  //     with_tax_type: {
  //       1: null,
  //       2: null,
  //       3: null,
  //     },
  //     with_tax_code: {
  //       1: null,
  //       2: null,
  //       3: null,
  //     },
  //     with_agent: {
  //       1: null,
  //       2: null,
  //     },
  //     obli_from: {
  //       1: null,
  //       2: null,
  //     },
  //     obli_to: {
  //       1: null,
  //       2: null,
  //     },
  //   };

  //   if (itemFind) {
  //     switch (itemFind.code) {
  //       case "BP04":
  //         data_input.value.more_data_two.with_tax_type["2"] = "05";
  //         data_input.value.more_data_two.with_tax_type["3"] = "06";

  //         data_input.value.more_data_two.type_reciepient["1"] = "03";
  //         data_input.value.more_data_two.type_reciepient["2"] = "03";
  //         data_input.value.more_data_two.subject_wht["1"] = "X";
  //         data_input.value.more_data_two.subject_wht["2"] = "X";
  //         data_input.value.more_data_two.with_agent["2"] = "x";
  //         data_input.value.more_data_two.with_agent["1"] = "X";
  //         data_input.value.more_data_two.subject_wht["3"] = "X";
  //         break;
  //       case "BP05":
  //         data_input.value.more_data_two.with_tax_type["2"] = null;
  //         data_input.value.more_data_two.subject_wht["1"] = null;
  //         data_input.value.more_data_two.subject_wht["2"] = null;
  //         data_input.value.more_data_two.subject_wht["3"] = null;
  //         data_input.value.more_data_two.with_tax_type["3"] = null;
  //         data_input.value.more_data_two.with_agent["2"] = "x";
  //         data_input.value.more_data_two.subject_wht["1"] = null;
  //         data_input.value.more_data_two.with_agent["1"] = "X";
  //         data_input.value.more_data_two.subject_wht["2"] = null;
  //         data_input.value.more_data_two.subject_wht["3"] = null;
  //         break;
  //     }
  //   } else {
  //     const bp = itemBbType.value.find((el) => el.id == props.bpType);
  //     if (bp) {
  //       switch (bp.code) {
  //         case "0001":
  //           data_input.value.more_data_two.with_tax_type["3"] = "15";
  //           data_input.value.more_data_two.with_tax_type["1"] = null;
  //           data_input.value.more_data_two.with_tax_type["2"] = null;
  //           data_input.value.more_data_two.type_reciepient["2"] = "03";
  //           data_input.value.more_data_two.subject_wht["1"] = "X";
  //           data_input.value.more_data_two.subject_wht["2"] = "X";
  //           data_input.value.more_data_two.subject_wht["3"] = "X";

  //           data_input.value.more_data_two.with_agent["1"] = null;
  //           data_input.value.more_data_two.with_agent["2"] = null;
  //           data_input.value.more_data_two.obli_from["1"] = null;
  //           data_input.value.more_data_two.obli_from["2"] = null;
  //           data_input.value.more_data_two.obli_to["1"] = null;
  //           data_input.value.more_data_two.obli_to["2"] = null;

  //           break;
  //         case "0002":
  //           data_input.value.more_data_two.with_tax_type["1"] = "R1";
  //           data_input.value.more_data_two.with_tax_type["2"] = "R2";
  //           data_input.value.more_data_two.type_reciepient["2"] = "53";
  //           data_input.value.more_data_two.with_tax_type["3"] = "18";
  //           data_input.value.more_data_two.subject_wht["1"] = "X";
  //           data_input.value.more_data_two.subject_wht["2"] = "X";
  //           data_input.value.more_data_two.subject_wht["3"] = "X";
  //           data_input.value.more_data_two.with_agent["2"] = "x";
  //           data_input.value.more_data_two.with_agent["1"] = "X";
  //           break;
  //         case "0003":
  //           data_input.value.more_data_two.with_tax_type["1"] = "R1";
  //           data_input.value.more_data_two.with_tax_type["2"] = "R2";
  //           data_input.value.more_data_two.type_reciepient["2"] = "53";
  //           data_input.value.more_data_two.with_tax_type["3"] = "18";
  //           data_input.value.more_data_two.subject_wht["1"] = "X";
  //           data_input.value.more_data_two.subject_wht["2"] = "X";
  //           data_input.value.more_data_two.subject_wht["3"] = "X";
  //           data_input.value.more_data_two.with_agent["1"] = "X";
  //           data_input.value.more_data_two.with_agent["2"] = "x";

  //           break;
  //         case "0004":
  //           data_input.value.more_data_two.with_tax_type["1"] = "R1";
  //           data_input.value.more_data_two.with_agent["1"] = "X";
  //           data_input.value.more_data_two.with_tax_type["2"] = "R2";
  //           data_input.value.more_data_two.type_reciepient["2"] = "53";
  //           data_input.value.more_data_two.with_tax_type["3"] = "18";
  //           data_input.value.more_data_two.subject_wht["1"] = "X";
  //           data_input.value.more_data_two.subject_wht["2"] = "X";
  //           data_input.value.more_data_two.subject_wht["3"] = "X";
  //           data_input.value.more_data_two.with_agent["2"] = "x";
  //           break;
  //         default:
  //           // data_input.value.more_data_two.with_agent["1"] = "X";
  //           data_input.value.more_data_two.obli_from["1"] = "01.01.1900";
  //           data_input.value.more_data_two.obli_from["2"] = "01.01.1900";
  //           data_input.value.more_data_two.obli_to["1"] = "31.12.999";
  //           data_input.value.more_data_two.obli_to["2"] = "31.12.999";
  //           // data_input.value.more_data_two.with_agent["2"] = "x";
  //           break;
  //       }
  //     }
  //   }
  // }
});

const displayItemsPaymentTerms = computed(() => {
  return itemsPaymentTerms.value.map((item) => ({
    ...item,
    displayName: `${item.code}:${item.description}`,
  }));
});

const getPaymentTerm = async () => {
  try {
    const response = await PaymentTermService.getPaymentTermAll();
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

watch(
  data_input.value,
  (newValue) => {
    emit("on-input", newValue);
  },
  { deep: true }
);
</script>

<style scoped>
:deep(.v-field) {
  border-radius: 10px !important;
  border: 1px solid #ededed !important;
  -webkit-border-radius: 10px !important;
  -moz-border-radius: 10px !important;
  -ms-border-radius: 10px !important;
  -o-border-radius: 10px !important;
}
</style>
