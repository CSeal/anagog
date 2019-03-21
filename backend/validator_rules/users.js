function getValidRules(errors_msg_const) {
  return {
    first_name: (val) => {
      if(!val){
        const { first_name_is_not_defined } = errors_msg_const;
        return first_name_is_not_defined;
      }
    },
    password: (val) => {
      if(!val){
        const { password_is_not_defined } = errors_msg_const;
        return password_is_not_defined;
      }
    }
  };
}


module.exports = getValidRules;