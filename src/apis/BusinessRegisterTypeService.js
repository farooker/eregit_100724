import axiosBase from "./AxiosConfig";
const getBusinessRegisterTypeByTaxpayer = async (taxpayer_id_number) => {
  return await axiosBase({
    method: "post",
    url: `/master/get-business-register-type-by-tax/${taxpayer_id_number}`,
    // data: { taxpayer_id_number: taxpayer_id_number },
  });
};

export default {
  getBusinessRegisterTypeByTaxpayer,
};
