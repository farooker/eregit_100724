
import axiosBase  from './AxiosConfig';
const  getAllUserChangeLog = async ()=>{
 return await axiosBase({
    method: 'get',
    url: '/user/get-user-change-logs',
    data: {
      'offset' :'0',
      'limit' :'10',
      'sort-by' : 'id:desc'
    }
  });
}
export default {
  getAllUserChangeLog
}
