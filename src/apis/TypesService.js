import axiosBase from "./AxiosConfig";
const getTypesAll = async () => {
  return await axiosBase({
    method: "get",
    url: "/master/get-fill-types",
  });
};
export default {
    getTypesAll,
};
