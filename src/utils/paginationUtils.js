
const pageOffset =(page , limit)=>{

  const pageNumber = Number(page);
  const pageSize = Number(limit);
  return (pageNumber - 1) * pageSize;
}
const pageSize =(limit,total)=>{
  const result = Math.ceil(total / limit);
 return result

}

export default { pageOffset ,pageSize }
