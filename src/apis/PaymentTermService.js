import axiosBase from "./AxiosConfig";

const getPaymentTermAll = async (
  business_partner_role_id,
  offset = 0,
  limit = 1000,
  sort_by = "id:desc",

) => {
  let url = `/master/get-payment-terms?offset=${offset}&limit=${limit}&sort-by=${sort_by}`
  if (business_partner_role_id) url += `&business_partner_role_id=${business_partner_role_id}`

  return await axiosBase({
    method: "get",
    url,
    data: {},
  });
};

const createPaymentTerm = async (
  business_partner_role_id,
  code,
  description
) => {
  return await axiosBase({
    method: "post",
    url: "/master/create-payment-term",
    data: {
      business_partner_role_id,
      code,
      description,
      created_user_id: Number(sessionStorage.getItem("userId")),
    },
  });
};

export default {
  getPaymentTermAll,
  createPaymentTerm,
};
