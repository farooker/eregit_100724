import axiosBase from "./AxiosConfig";
const getPermissionAll = async () => {
  return await axiosBase({
    method: "get",
    url: `/master/get-role-permissions`,
  });
};

const getPermissionByRoleId = async (roleId) => {
  return await axiosBase({
    method: "get",
    url: `/master/get-role-permissions/${roleId}`,
  });
};

const updatedPermissionById = async (role_id, modules = []) => {
  return await axiosBase({
    method: "post",
    url: "/master/update-role-permission",
    data: {
      role_id: role_id ? Number(role_id) : null,
      module: modules,
      updated_user_id: 1,
    },
  });
};

export default {
  getPermissionAll,
  getPermissionByRoleId,
  updatedPermissionById,
};
