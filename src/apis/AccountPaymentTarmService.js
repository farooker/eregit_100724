import axiosBase from "./AxiosConfig";
const getAccounrAccountPaymentTarmsAll = async (business_partner_role_id = null) => {
  let url = `/master/get-account-payment-terms?sort-by=id:desc`;
  if(business_partner_role_id) url += `&business_partner_role_id=${business_partner_role_id}`
  return await axiosBase({
    method: "get",
    url,
  });
};

export default {
  getAccounrAccountPaymentTarmsAll,
};
