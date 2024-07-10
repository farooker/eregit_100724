import axiosBase from "./AxiosConfig";
//2
const getCurrentTermsAll = async () => {
  return await axiosBase({
    method: "get",
    url: `/pdpa/get-current-terms-and-conditions`,
    data: {},
  });
};
//1
const getTermsConditionsbyId = async (userId) => {
  return await axiosBase({
    method: "get",
    url: `/pdpa/get-terms-and-conditions-acceptance/${userId}`,
    data: {},
  });
};
//4
const getCurrentPrivacyPolicyAll = async () => {
  return await axiosBase({
    method: "get",
    url: `/pdpa/get-current-privacy-policy`,
    data: {},
  });
};
//3
const getPrivacyPolicybyId = async (userId) => {
  return await axiosBase({
    method: "get",
    url: `/pdpa/get-terms-and-conditions-acceptance/${userId}`,
    data: {},
  });
};

const createTermandConditionAcceptance = async (terms_and_conditions_id,user_id) => {
  return await axiosBase({
    method: "post",
    url: `/pdpa/create-terms-and-conditions-acceptance`,
    data: {
      terms_and_conditions_id: Number(terms_and_conditions_id),
      user_id: Number(sessionStorage.getItem("userId")),
    },
  });
};

const createPrivacyPolicyAcceptance = async (terms_and_conditions_id,user_id) => {
  return await axiosBase({
    method: "post",
    url: `/pdpa/create-privacy-policy-acceptance`,
    data: {
      terms_and_conditions_id: Number(terms_and_conditions_id),
      user_id: Number(sessionStorage.getItem("userId")),
    },
  });
};

export default {
  getCurrentTermsAll,
  getTermsConditionsbyId,
  getCurrentPrivacyPolicyAll,
  getPrivacyPolicybyId,
  createTermandConditionAcceptance,
  createPrivacyPolicyAcceptance
};
