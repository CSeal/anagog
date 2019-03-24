const error = {
  user_not_found: {
    error_type: 'user_not_found',
    error_msg: 'User not found'
  },
  user_must_be_required: {
    error_type: 'user_must_be_required',
    error_msg: 'User must be required'
  },
  password_must_be_required: {
    error_type: 'pussword_must_be_required',
    error_msg: 'Password must be required'
  },
  password_must_be_valid: {
    error_type: 'password_must_be_valid',
    error_msg: 'Password must be valid(Minimum eight characters, at least one letter and one numbe)'
  },
  users_token_was_not_created: {
    error_type: 'users_token_was_not_created',
    error_msg: 'User`s token was not created'
  },
  user_is_not_authorized: {
    error_type: 'user_is_not_authorized',
    error_msg: 'User is not authorized'
  },
  some_server_error: {
    error_type: 'some_server_error',
    error_msg: 'Some server error'
  },
}

module.exports = error;