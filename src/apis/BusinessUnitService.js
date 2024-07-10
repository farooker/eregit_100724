import axiosBase from "./AxiosConfig";
const getBusinesUnitAll = async (offset = 0, limit = 1000, sort_by = "id:desc") => {
  return await axiosBase({
    method: "get",
    url: `/master/get-business-units?offset=${offset}&limit=${limit}&sort-by=${sort_by}`,
    data: {},
  });
};


const getBusinessById = async (businessId) => {
  return await axiosBase({
    method: "get",
    url: `/master/get-business-unit/${businessId}`,
    data: {},
  });
};
export default {
  getBusinesUnitAll,
  getBusinessById
};
