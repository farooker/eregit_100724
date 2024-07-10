const isValidEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
};

const isValidRole = (role) => {
  const match = ['vender','admin vendor','SD Team','Account','Admin']
  const isValid = match.includes(role);
  return isValid;
};
const isValidExcel = (role) => {
  const match = ['xls','xlsx']
  const isValid = match.includes(role);
  return isValid;
};

export default { isValidEmail, isValidRole ,isValidExcel }
