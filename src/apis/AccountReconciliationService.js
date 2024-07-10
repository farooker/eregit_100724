import axiosBase from "./AxiosConfig";
const getAccountReconciliationAll = async (business_partner_role_id) => {
  return await axiosBase({
    method: "get",
    url: `/master/get-reconciliation-accounts?business_partner_role_id=${business_partner_role_id}`,
    data: {},
  });
};
 
export default {
  getAccountReconciliationAll,
};