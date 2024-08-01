import axiosBase from "./AxiosConfig";
const getAccountReconciliationAll = async (business_partner_role_id = null) => {
  let url = `/master/get-reconciliation-accounts?sort-by=id:desc`;
  if(business_partner_role_id) url += `&business_partner_role_id=${business_partner_role_id}`
  return await axiosBase({
    method: "get",
    url ,
    data: {},
  });
};

export default {
  getAccountReconciliationAll,
};
