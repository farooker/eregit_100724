import axiosBase from "./AxiosConfig";

const createGeneraleLink = async (databody) => {
  return await axiosBase({
    method: "post",
    url: "/partner/create-business-partner-register-form",
    data: {
      ...databody,
      // registered_user_email: "co3@co.co",
      created_user_id: Number(sessionStorage.getItem("userId")),
    },
  });

};

export default {
  createGeneraleLink,
};
