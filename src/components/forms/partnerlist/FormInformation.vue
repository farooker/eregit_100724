<template>
<div>
<ChangeInfoAccount v-if="IsAccount" />
<ChangeInfoChangeName v-if="IsChange" />

<ChangeInfoBranch v-if="IsBrnch" />
<ChangeInfoAddress v-if="IsAddress" />

<ChangeInfoContact v-if="IsContact" />
<ChangeInfoBusiness v-if="IsBusiness" />


</div>
  <div>
    <ChangeInformationDetail />
  </div>
</template>

<script>
import ChangeInformationDetail from '@/components/partnerlist/Info-uploadfile.vue';

import ChangeInfoAddress from '@/components/partnerlist/info-address.vue';
import ChangeInfoBusiness from '@/components/partnerlist/info-business.vue';

import ChangeInfoChangeName from '@/components/partnerlist/info-change-name.vue';
import ChangeInfoContact from '@/components/partnerlist/info-contact.vue';

import ChangeInfoBranch from '@/components/partnerlist/info-insert-branch.vue';
import ChangeInfoAccount from '@/components/partnerlist/info-account.vue';
export default {

    props: {
     IsAccount: {
      type: Boolean,
      default: false, // ตั้งค่า default ถ้าไม่มีการส่ง prop มา
    },
      IsChange: {
      type: Boolean,
      default: false, // ตั้งค่า default ถ้าไม่มีการส่ง prop มา
    },


     IsBrnch: {
      type: Boolean,
      default: false, // ตั้งค่า default ถ้าไม่มีการส่ง prop มา
    },
      IsAddress: {
      type: Boolean,
      default: false, // ตั้งค่า default ถ้าไม่มีการส่ง prop มา
    },

     IsContact: {
      type: Boolean,
      default: false, // ตั้งค่า default ถ้าไม่มีการส่ง prop มา
    },
      IsBusiness: {
      type: Boolean,
      default: false, // ตั้งค่า default ถ้าไม่มีการส่ง prop มา
    },
  },

    data() {
    return {
      // IsAccount: false,
      // IsChange:false,

      // IsBrnch: false,
      // IsAddress:false,

      // IsContact: false,
      // IsBusiness:false,

    }
  },
  name: "FormInformation",
  components: {
    ChangeInformationDetail,
    ChangeInfoAddress,
    ChangeInfoBusiness,
    ChangeInfoChangeName,
    ChangeInfoContact,
    ChangeInfoBranch,
    ChangeInfoAccount
  }
};
</script>
