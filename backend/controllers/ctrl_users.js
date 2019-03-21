const BaseController = require('../core/baseController')
const UsersCtrl = new BaseController();

UsersCtrl.get('/users/', (req, res, next) => {
  const users = UsersCtrl.users_tb;
  const resp = [];
  for( let key in users){
    const currentUser = Object.assign({}, users[key]);
    delete currentUser.password;
    resp.push(currentUser);
  }
  res.send(resp)
});

UsersCtrl.get('/users/:id', (req, res, next) => {
  const users = UsersCtrl.users_tb;
  const { id }  = req.params;
  if(!users[id]) {
    const {user_not_found} = UsersCtrl.errors_msg_obj;
    return res.send(user_not_found);
  }
  const curr_user = Object.assign({}, users[id])
  delete curr_user.password;
  res.send(curr_user);
});

UsersCtrl.post('/users/', (req, res, next) => {
  const {
    user_doesnt_have_an_id
  } = UsersCtrl.errors_msg_obj;
  res.send(user_doesnt_have_an_id);
})

UsersCtrl.post('/users/:email', (req, res, next) => {
  const users = UsersCtrl.users_tb;
  const { email }  = req.params;
  const { body } = req;
  const {
    user_id_allready_exists,
  } = UsersCtrl.errors_msg_obj;

  if(users[email]) {
    return res.send(user_id_allready_exists);
  }
  const newUser = Object.assign({}, body, {email});
  const errors = UsersCtrl.getTestValidation(newUser);

  if(errors){
    return res.send(errors);
  };

  users[email] = newUser;
  res.send(users[email]);
})

UsersCtrl.put('/users/', (req, res, next) => {
  const {
    user_doesnt_have_an_id
  } = UsersCtrl.errors_msg_obj;
  res.send(user_doesnt_have_an_id);
})

UsersCtrl.put('/users/:email', (req, res, next) => {
  const users = UsersCtrl.users_tb;
  const { email }  = req.params;
  const { user_id_doesnt_exists } = UsersCtrl.errors_msg_obj;
  const { body } = req;

  if(!users[email]) {
    return res.send(user_id_doesnt_exists);
  }
  const updateUser = Object.assign({}, user[email], body, {email})
  const errors = UsersCtrl.getTestValidation(updateUser);

  if(errors){
    return res.send(errors);
  };

  users[email] = updateUser;
  res.send(users[email]);
})

UsersCtrl.delete('/users/', (req, res, next) => {
  const {
    user_doesnt_have_an_id
  } = UsersCtrl.errors_msg_obj;
  res.send(user_doesnt_have_an_id);
})

UsersCtrl.delete('/users/:email', (req, res, next) => {
  const users = UsersCtrl.users_tb;
  const { email}  = req.params;
  const { user_id_doesnt_exists } = UsersCtrl.errors_msg_obj;

  if(!users[email]) {
    return res.send(user_id_doesnt_exists);
  }

  delete users[email];
  res.send({delete_user: email});
});

module.exports = UsersCtrl;
