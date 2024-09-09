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
    url: `/pdpa/get-privacy-policy-acceptance/${userId}`,
    data: {},
  });
};

const createTermandConditionAcceptance = async (terms_and_conditions_id) => {
  return await axiosBase({
    method: "post",
    url: `/pdpa/create-terms-and-conditions-acceptance`,
    data: {
      terms_and_conditions_id: Number(terms_and_conditions_id),
      user_id: Number(sessionStorage.getItem("userId")),
      created_user_id: Number(sessionStorage.getItem("userId")),
    },
  });
};

const createPrivacyPolicyAcceptance = async (privacy_policy_id) => {
  return await axiosBase({
    method: "post",
    url: `/pdpa/create-privacy-policy-acceptance`,
    data: {
      privacy_policy_id: Number(privacy_policy_id),
      user_id: Number(sessionStorage.getItem("userId")),
      created_user_id: Number(sessionStorage.getItem("userId")),
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
