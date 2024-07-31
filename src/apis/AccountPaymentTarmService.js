import axiosBase from "./AxiosConfig";
const getAccounrAccountPaymentTarmsAll = async () => {
  return await axiosBase({
    method: "get",
    url: `/master/get-account-payment-terms?sort-by=id:desc`,
    data: {},
  });
};

export default {
  getAccounrAccountPaymentTarmsAll,
};
