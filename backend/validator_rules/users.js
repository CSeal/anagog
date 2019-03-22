function getValidRules(errors_msg_const) {
  return {
    userName: (val) => {
      if(!val){
        const { user_must_be_required } = errors_msg_const;
        return user_must_be_required;
      }
    },
    password: (val) => {
      if(!val){
        const { password_must_be_required } = errors_msg_const;
        return password_must_be_required;
      }
    }
  };
}

module.exports = getValidRules;