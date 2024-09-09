import axiosBase from "./AxiosConfig";
const getAllUserChangeLog = async (sortby = "desc", module_id, object_id) => {
  return await axiosBase({
    method: "get",
    url: `/user/get-user-change-logs?sort-by=created_at:${sortby}&module_id=${module_id}&object_id=${object_id}`,
    data: {},
  });
};

const getAllRoleChangeLog = async (sortby = "desc", module_id, object_id) => {
  return await axiosBase({
    method: "get",
    url: `/user/get-user-change-logs?sort-by=created_at:${sortby}&module_id=${module_id}&object_id=${object_id}`,
    data: {},
  });
};

const getAllCorparationChangeLog = async (
  sortby = "desc",
  module_id,
  object_id
) => {
  return await axiosBase({
    method: "get",
    url: `/user/get-user-change-logs?sort-by=created_at:${sortby}&module_id=${module_id}&object_id=${object_id}`,
    data: {},
  });
};

const getAllBusinessUnitChangeLog = async (
  sortby = "desc",
  module_id,
  object_id
) => {
  return await axiosBase({
    method: "get",
    url: `/user/get-user-change-logs?sort-by=created_at:${sortby}&module_id=${module_id}&object_id=${object_id}`,
    data: {},
  });
};

const getAllCompanyChangeLog = async (
  sortby = "desc",
  module_id,
  object_id
) => {
  return await axiosBase({
    method: "get",
    url: `/user/get-user-change-logs?sort-by=created_at:${sortby}&module_id=${module_id}&object_id=${object_id}`,
    data: {},
  });
};
export default {
  getAllUserChangeLog,
  getAllRoleChangeLog,
  getAllCorparationChangeLog,
  getAllBusinessUnitChangeLog,
  getAllCompanyChangeLog,
};
