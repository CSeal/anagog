const validIdRegExp = /^[0-9]+$/i;
const orderIdRegExp = /^o|r-[0-9]{8}$/i;
const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i;
const validIdTest = (val, regExp) => {
  if(regExp.test(val) && val !== 0){
    return true;
  }
  return false;
}
const validDataTest = (val, regExp) => {
  return validIdTest(val, regExp);
}

module.exports = {
  validIdRegExp,
  validIdTest,
  orderIdRegExp,
  emailRegExp,
  validDataTest
}