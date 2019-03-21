const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator')

mongoose.plugin(uniqueValidator);

const UserSchema = new Schema({
  userName: {
    type: String,
    unique: 'User with name "VALUE" already exist',
    lowercase: true,
    required: 'UserName is required',
  },
  password: {
    type: String,
    required: 'Password is required',
  },
}, {
  timestamp: true,
});

UserSchema.statics.createFields = ['userName', 'password'];

UserSchema.pre('save', function(next) {
  if ( !this.isModified('password') ) {
    return next();
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

UserSchema.methods.comparePasswords = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.statics.findOneWithPublicFields = function(params, callback) {
  return this.findOne(params, callback).select({password: 0, _id: 0, __v: 0, createdAt: 0, updatedAt: 0 });
};
const User = mongoose.model('user', UserSchema);
User.init().then( User => {
  User.findOne({userName: 'admin'}, (err, adminUser) => {
    if (err) {
      return console.warn(err);
    }
    if (adminUser !== null) {
      return console.log(' admin was already created');
    }
    User.create({
      userName: 'admin',
      password: 'anagog',
    }, (err, admin) => {
      if (err) {
        return console.log(err);
      }
      return console.log('Admin was created');
    });
  });
});
module.exports = User;
