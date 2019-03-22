const BaseController = require('../core/baseController')
const UsersCtrl = new BaseController();

UsersCtrl.post('/login', null, (req, res, next) => {

  const errors = UsersCtrl.getTestValidation(req.body);
  if(errors) {
    return UsersCtrl._sendJSONresponse(res, '400', null, errors);
  }
  UsersCtrl.passport.authenticate('local',
                                    function(err, user, info){
    if (!user) {
      const { user_not_found } = UsersCtrl.errors_msg_obj;
      return UsersCtrl._sendJSONresponse(res, '401', null, [user_not_found], info.message);
    }
    if (err) {
      return UsersCtrl._sendJSONresponse(res, '404', null, [err]);
    }
    const tokenPayload = {
      id: user.id,
      userName: user.userName,
    }
    const token = user.generateJWT(tokenPayload);
    if (token){
      const dataPayload = {
        user: {
          userName: user.userName,
          permissions: user.permissions
        },
        token,
      }
      return UsersCtrl._sendJSONresponse(res, '200', dataPayload);
    }
    const { users_token_was_not_created } = UsersCtrl.errors_msg_obj;
    return UsersCtrl._sendJSONresponse(res, '500', null, [users_token_was_not_created]);

  })(req, res);
});

UsersCtrl.get('/users', null, (req, res, next) => {
  UsersCtrl._sendJSONresponse(res, '200', {}, 'public');
});

UsersCtrl.get('/users-permisions', {isPrivate: true}, (req, res, next) => {
  return UsersCtrl._sendJSONresponse(res, '200', req.loginUser.permissions);
});

module.exports = UsersCtrl;
