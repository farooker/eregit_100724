
import axiosBase  from './AxiosConfig';
const  getPermissionAll = async ()=>{
 return await axiosBase({
    method: 'get',
    url: `/master/get-role-permissions`
  });
}

const  getPermissionByRoleId = async (roleId)=>{
    return await axiosBase({
       method: 'get',
       url: `/master/get-role-permissions/${roleId}`
     });
   }
export default {
    getPermissionAll,
    getPermissionByRoleId
}
