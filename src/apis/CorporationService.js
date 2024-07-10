import axiosBase from "./AxiosConfig";
const getCorporationAll = async (offset = 0, limit = 1000, sort_by = "id:desc") => {
  return await axiosBase({
    method: "get",
    url: `/master/get-corporations?offset=${offset}&limit=${limit}&sort-by=${sort_by}`,
    data: {},
  });
};
export default {
    getCorporationAll,
};
