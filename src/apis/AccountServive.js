import axiosBase from "./AxiosConfig";


const getAccountTasksAll = async (
  state = "NewTasks",
  offset = 0,
  limit = 200,
  sort_by = "created_at:desc"
) => {
  return await axiosBase({
    method: "get",
    url: `/partner/get-account-tasks?state=${state}&offset=${offset}&limit=${limit}&sort-by=${sort_by}`,
    data: {},
  });
};

const getAccountDraftAll = async (
  state = "Draft",
  offset = 0,
  limit = 200,
  sort_by = "created_at:desc"
) => {
  return await axiosBase({
    method: "get",
    url: `/partner/get-account-tasks?state=${state}&offset=${offset}&limit=${limit}&sort-by=${sort_by}`,
    data: {},
  });
};

const getAccountReadyToExporttAll = async (
  state = "ReadyToExport",
  offset = 0,
  limit = 200,
  sort_by = "created_at:desc"
) => {
  return await axiosBase({
    method: "get",
    url: `/partner/get-account-tasks?state=${state}&offset=${offset}&limit=${limit}&sort-by=${sort_by}`,
    data: {},
  });
};

const getAccountArchivetAll = async (
  state = "Archive",
  offset = 0,
  limit = 200,
  sort_by = "created_at:desc"
) => {
  return await axiosBase({
    method: "get",
    url: `/partner/get-account-tasks?state=${state}&offset=${offset}&limit=${limit}&sort-by=${sort_by}`,
    data: {},
  });
};

const getAccountRejectAll = async (
  state = "Reject",
  offset = 0,
  limit = 200,
  sort_by = "created_at:desc"
) => {
  return await axiosBase({
    method: "get",
    url: `/partner/get-account-tasks?state=${state}&offset=${offset}&limit=${limit}&sort-by=${sort_by}`,
    data: {},
  });
};
export default {
  getAccountTasksAll,
  getAccountDraftAll,
  getAccountReadyToExporttAll,
  getAccountArchivetAll,
  getAccountRejectAll
};
