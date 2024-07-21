import axiosBase from "./AxiosConfig";
const getCompanyAll = async (offset = 0, limit = 1000, sort_by = "id:asc") => {
  return await axiosBase({
    method: "get",
    url: `/master/get-companies?offset=${offset}&limit=${limit}&sort-by=${sort_by}`,
    data: {},
  });
};

const getCompanyById = async (companyId) => {
  return await axiosBase({
    method: "get",
    url: `/master/get-company/${companyId}`,
    data: {},
  });
};
const getCompanyCategoriesAll = async () => {
  return await axiosBase({
    method: "get",
    url: `/master/get-company-categories`,
    data: {},
  });
};

const createCompanyGetagory = async (name_th, name_en) => {
  return await axiosBase({
    method: "post",
    url: "/master/create-company-category",
    data: { name_th, name_en, created_user_id: Number(sessionStorage.getItem("userId")), },
  });
};

export default {
  getCompanyAll,
  getCompanyById,
  getCompanyCategoriesAll,
  createCompanyGetagory,
};
