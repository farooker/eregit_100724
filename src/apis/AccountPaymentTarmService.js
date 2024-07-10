import axiosBase from "./AxiosConfig";
const getAccounrAccountPaymentTarmsAll= async () => {
  return await axiosBase({
    method: "get",
    url: `/master/get-account-payment-terms`,
    data: {},
  });
};

export default {
    getAccounrAccountPaymentTarmsAll,
  };
  