
import axiosBase  from './AxiosConfig';
const  getMemberTypeAll = async (offset = 0,limit = 1000, sort_by= 'id:desc')=>{
 return await axiosBase({
    method: 'get',
    url:`/master/get-member-types?offset=${offset}&limit=${limit}&sort-by=${sort_by}`,
    param: {}
  });
}
export default {
  getMemberTypeAll
}
