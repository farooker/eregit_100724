import axiosBase from "./AxiosConfig";
const getProviceAll = async () => {
  return await axiosBase({
    method: "get",
    url: `/master/get-provinces?sort-by=name_th:asc&offset=0&limit=100`,
  });
};

const getDistrictAll = async (province_id) => {
  let url = `/master/get-districts?sort-by=name_th:asc&offset=0&limit=900`;
  if (province_id) url += `&province_id=${province_id}`;
  return await axiosBase({
    method: "get",
    url,
  });
};

const getSubDistrictAll = async (district_id) => {
  let url = `/master/get-subdistricts?sort-by=name_th:asc&offset=0&limit=80000`;
  if (district_id) url += `&district_id=${district_id}`;
  return await axiosBase({
    method: "get",
    url,
  });
};

const getPostalCodeAll = async (subdistrict_id) => {
  let url = `/master/get-postal-codes?offset=0&limit=5000&sort-by=id:desc`;
  if (subdistrict_id) url += `&subdistrict_id=${subdistrict_id}`;
  return await axiosBase({
    method: "get",
    url,
  });
};

const getPostalCodeById = async (postCodeId) => {
  let url = `/master/get-postal-code/${postCodeId}`;
  return await axiosBase({
    method: "get",
    url,
  });
};



// const getProviceAll = async () => {
//   return await axiosBase({
//     method: "get",
//     url: `/master/get-provinces?sort-by=name_th:asc&offset=0&limit=100`,
//   });
// };

// const getDistrictAll = async (offset, limit) => {
//   const url = `/master/get-districts?sort-by=name_th:asc&offset=${offset}&limit=${limit}`;
//   return await axiosBase({
//     method: "get",
//     url,
//   });
// };

// const getSubDistrictAll = async (offset, limit) => {
//   const url = `/master/get-subdistricts?sort-by=name_th:asc&offset=${offset}&limit=${limit}`;
//   return await axiosBase({
//     method: "get",
//     url,
//   });
// };

// const getPostalCodeAll = async (offset, limit) => {
//   const url = `/master/get-postal-codes?offset=${offset}&limit=${limit}&sort-by=id:desc`;
//   return await axiosBase({
//     method: "get",
//     url,
//   });
// };











const getDistrictByProviceId = async (proviceId) => {
  return await axiosBase({
    method: "get",
    url: `/master/get-district/${proviceId}`,
  });
};

const getSubDistrictByDistrictId = async (districtId) => {
  return await axiosBase({
    method: "get",
    url: `/master/get-subdistrict/${districtId}`,
    headers: {
      Accept: "application/json",
    },
  });
};

const getPostalCodeBySubDirictId = async (subDirictId) => {
  return await axiosBase({
    method: "get",
    url: `/master/get-postal-code/${subDirictId}`,
  });
};









const getBanksAll = async (sort) => {
  return await axiosBase({
    method: "get",
    url: `/master/get-banks?sort-by=name_th:${sort}`,
  });
};

const getDocumentType = async () => {
  return await axiosBase({
    method: "get",
    url: `/master/get-document-types?sort-by=id:desc`,
  });
};

const loadAnyDocumentByUrl = async (url) => {
  return await axiosBase({
    method: "get",
    url,
    responseType: "blob",
  });
};

export default {
  getProviceAll,
  getDistrictAll,
  getSubDistrictAll,
  getPostalCodeAll,
  getBanksAll,
  getDocumentType,
  getDistrictByProviceId,
  getSubDistrictByDistrictId,
  getPostalCodeBySubDirictId,
  loadAnyDocumentByUrl,
  getPostalCodeById
};
