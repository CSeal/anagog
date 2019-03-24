const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const uniqueValidator = require('mongoose-unique-validator')
const jwt = require('jsonwebtoken');
const errors_msg_obj = require('../error_const');

mongoose.plugin(uniqueValidator);

const UserSchema = new Schema({
  userName: {
    type: String,
    unique: 'User with name "VALUE" already exist',
    lowercase: true,
    required: 'UserName must be required',
  },
  password: {
    type: String,
    validate: {
      validator: function(password){
        return /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
      },
      message: errors_msg_obj.password_must_be_valid.error_msg,
    }
  },
  salt: {
    type: String
  },
  permissions: {
    canUpdate: {
      type: Boolean,
      default: false,
    },
    canDelete: {
      type: Boolean,
      default: false,
    },
    canAddUsers: {
      type: Boolean,
      default: false,
    }
  }
}, {
  timestamps: true,
});

UserSchema.pre('save', function(next) {
  if ( !this.isModified('password') ) {
    return next();
  }
  this.salt = crypto.randomBytes(128).toString('base64');
  this.password = crypto.pbkdf2Sync(this.password, this.salt, 1, 128, 'sha1');
  next();
});

UserSchema.methods.comparePasswords = function(password) {
  if (!password) return false;
  if (!this.password) return false;
  return crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1') == this.password;
};

UserSchema.static('findOneWithPublicFields', function(params, callback) {
  return this.findOne(params, callback).select({"password": 0, "_id": 0, "__v": 0, "salt": 0, "createdAt": 0, "updatedAt": 0 });
});


UserSchema.methods.generateJWT = function(payload) {
  const secret = 'Anagog';
  const options = {
    expiresIn: '1d',
  };
  if (!payload || secret === "") {
    return false;
  }
  return jwt.sign(payload, secret, options);
}

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
      password: 'Anagog22',
      permissions: {
        canUpdate: true,
        canDelete: true,
        canAddUsers: true,
      }
    }, (err) => {
      if (err) {
        return console.log(err);
      }
      return console.log('Admin was created');
    });
  });
});
module.exports = User;
