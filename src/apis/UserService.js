
import axiosBase  from './AxiosConfig';

const  getUserSearch = async (offset = 0,limit = 1000, sort_by= 'id:desc')=>{
 return await axiosBase({
    method: 'get',
    url: '/users/get-users', //?offset=0&limit=10&sort-by=id:desc
    params: {
      "offset": offset,
      "limit": limit,
      "sort-by":sort_by
    }
  });
}

const  getUserById= async (userId)=>{
  return await axiosBase({
     method: 'get',
    //  url: '/user/get-user/' + userId,
     url: `/user/get-user/${userId}`,
     data: {},
   });
 }


const  createMultipleUser = async (data = [])=>{
  return await axiosBase({
     method: 'post',
     url: '/user/create-multiple-user',
     data: {
        user:Array.from(data, (i) => {
          return  {
              email : i.email,
              member_type :i.member_type,
              role :i.role,
              company_code : i.company_code,
              team :i.team,
            }
        }),
        created_user_id: Number(sessionStorage.getItem("userId")),
     }
   });
}
const  deactivateUser
= async (data = [])=>{
  return await axiosBase({
     method: 'post',
     url: '/user/deactivate-user',
     data: {
        user:Array.from(data, (i) => {
          return  {
              email : i.email
            }
        }),
      updated_user_id : Number(sessionStorage.getItem("userId")),
     }
   });
}

const  downloadCreateMultipleUserTemplate
= async ()=>{
  return await axiosBase({
     method: 'get',
     url: '/user/download-create-multiple-user-template',
     data: {}
   });
}

const  downloadDeactivateUserTemplate = async ()=>{
  return await axiosBase({
     method: 'get',
     url: '/user/download-deactivate-user-template',
     data: {}
   });
}

export default {
  getUserSearch,
  downloadCreateMultipleUserTemplate,
  downloadDeactivateUserTemplate,
  createMultipleUser,
  deactivateUser,
  getUserById
 }
