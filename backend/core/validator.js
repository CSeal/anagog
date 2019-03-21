function validatorProcessor(bodyObj, validRules){
  const errors = [];

  for (let key in bodyObj) {
    if(key in validRules) {
      const error = validRules[key]( bodyObj[key] );
      if(error && error.error_type) {
        errors.push(error)
      }
    }
  }
  if (errors.length) {
    return errors;
  }
}

module.exports = validatorProcessor