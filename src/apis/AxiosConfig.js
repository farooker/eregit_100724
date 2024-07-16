import axios from "axios";
const _axios = axios.create();
_axios.defaults.baseURL = "https://api-esg-dev.onefrasers.com/release/v1"; //https://api-esg-dev.onefrasers.com/release/v1

_axios.defaults.headers.common["Authorization"] =
  "Bearer tXZFVTbtqM1hYqM5RFQb2Pl5NPN7uE9hAedkI/z2kJHDsdUD9DkN1hkqBOdB0v7XxCBQn1hfAkpWxpUa0duO+w==";
_axios.defaults.headers.common["Content-Type"] = "application/json";
_axios.defaults.headers.common["Accept"] = "application/json";
// _axios.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded";

axios.interceptors.request.use((request) => {
  // console.log("Starting Request", JSON.stringify(request, null, 2));
  return request;
});

axios.interceptors.response.use((response) => {
  // console.log("Response:", JSON.stringify(response, null, 2));
  return response;
});

export default _axios;
