import axiosBase from "./AxiosConfig";


const  getAuthenInfo = async (_email = "")=>{
  return await axiosBase({
     method: 'post',
     url: '/get-authorization',
     data: {
       email: _email,
     }
   });
 }
const  verifyUrl = async (_email = "",_code = "")=>{
 return await axiosBase({
    method: 'post',
    url: '/verify-url',
    data: {
      email: _email,
      code: _code,
    },
  });
};
const forgetPassword = async (_email = "") => {
  return await axiosBase({
    method: "post",
    url: "/forgot-password",
    data: {
      email: _email,
    },
  });
};
const resetPassword = async (_email = "", _newPassword = "", _code = "") => {
  return await axiosBase({
    method: "post",
    url: "/reset-password",
    data: {
      email: _email,
      newPassword: _newPassword,
      code: _code,
    },
  });
};

const getOTP = async (email, module) => {
  return await axiosBase({
    method: "post",
    url: "/get-otp",
    data: {
      email,
      module,
    },
  });
};

const getVertifyOTP = async (otp, reference_code) => {
  return await axiosBase({
    method: "post",
    url: "/verify-otp",
    data: {
      otp,
      reference_code,
    },
  });
};

const signUp = async (username, password, bp_number) => {
  return await axiosBase({
    method: "post",
    url: "/sign-up",
    data: {
      username,
      password,
      bp_number
    },
  });
};

const getAuthrization = async (email) => {
  return await axiosBase({
    method: "post",
    url: "/get-authorization",
    data: {
      email,
    },
  });
};


const login = async (username, password) => {
  return await axiosBase({
    method: "post",
    url: "/login",
    data: {
      username,
      password
    },
  });
};

const checkExistingUsernam = async (username) => {
  return await axiosBase({
    method: "post",
    url: "/user/check-existing-username",
    data: {
      username,
    },
  });
};

export default {
  getAuthenInfo,
  verifyUrl,
  forgetPassword,
  resetPassword,
  getOTP,
  getVertifyOTP,
  signUp,
  getAuthrization,
  login,
  checkExistingUsernam
};
