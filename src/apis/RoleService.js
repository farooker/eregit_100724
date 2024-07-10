import axiosBase from "./AxiosConfig";

const getRoleAll = async (offset = 0, limit = 1000, sort_by = "id:desc") => {
  return await axiosBase({
    method: "get",
    url: `/master/get-roles?offset=${offset}&limit=${limit}&sort-by=${sort_by}`,
    data: {},
  });
};

const getRoleById = async (roleId) => {
  return await axiosBase({
    method: "get",
    url: `/master/get-role/${roleId}`,
    data: {},
  });
};

export default {
  getRoleAll,
  getRoleById,
};
