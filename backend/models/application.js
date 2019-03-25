const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
const errors_msg_obj = require('../error_const');
const ApplicationSchema = new Schema({
  AppName: {
    type: String,
    unique: `Applications with name "VALUE" already exist`,
    lowercase: true,
    required: `Name of application must be required`,
  },
  Versions: [
    {
      Version: {
        type: String,
        set: (value) => value || moment().format('YYYY-MM-DD HH:mm'),
        select: true,
      },
      ActiveBuild: {
        type: Number,
        default: 0,
        min: 0,
        select: true,
      },
      LastBuild: {
        type: Number,
        default: 0,
        min: 0,
        select: true,
      },
      Builds: [
        {
          Build: {
            type: Number,
            require: 'Namber of build must be required',
            min: 1,
            select: true,
          },
          Comment: {
            type: String,
            required: `Comment must be required`,
            select: true,
          }
        }
      ]
    }
  ],
}, {
  timestamps: true,
});

ApplicationSchema.static('findWithPublicFields', function(params, callback) {
  return this.find(params, callback).select({ "__v": 0, "createdAt": 0, "updatedAt": 0 });
});
/* UserSchema.pre('save', function(next) {
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
} */

const Application = mongoose.model('application', ApplicationSchema);
Application.init().then( Application => {
  console.log('Application model was created')
  if(process.env.NODE_ENV === 'production'){
    return;
  }
  Application.estimatedDocumentCount({}, (err, applicationCount) => {
    if (err) {
      return console.warn(err);
    }
    if (applicationCount !== 0) {
      return;
    }

    const initApplications = [
      {
        AppName: 'com.anagog.discovery',
        Versions: [
          {
            Version: null,
            ActiveBuild: 6,
            LastBuild: 6,
            Builds: [
              {
                Build: 1,
                Comment: 'Default Config for Stage #1',
              },
              {
                Build: 2,
                Comment: 'Default Config for Stage #2',
              },
              {
                Build: 3,
                Comment: 'Default Config for Stage #3',
              },
              {
                Build: 4,
                Comment: 'Default Config for Stage #4',
              },
              {
                Build: 5,
                Comment: 'Default Config for Stage #5',
              },
              {
                Build: 6,
                Comment: 'Update URL for schedule and profile reports',
              },
            ],
          },
          {
            Version: '2018-12-18 13:00',
            ActiveBuild: 10,
            LastBuild: 10,
            Builds: [
              {
                Build: 1,
                Comment: 'Stging Default #1',
              },
              {
                Build: 2,
                Comment: 'Stging Default #2',
              },
              {
                Build: 3,
                Comment: 'Stging Default #3',
              },
              {
                Build: 4,
                Comment: 'Stging Default #4',
              },
              {
                Build: 5,
                Comment: 'Stging Default #5',
              },
              {
                Build: 6,
                Comment: 'Stging Default #6',
              },
              {
                Build: 7,
                Comment: 'Stging Default #7',
              },
              {
                Build: 8,
                Comment: 'Stging Default #8',
              },
              {
                Build: 9,
                Comment: 'Update Urls to staging and change path of scedule and profile',
              },
              {
                Build: 10,
                Comment: 'Update Urls to staging and change path of scedule and profile',
              },
            ],
          },
        ],
      },
      {
        AppName: 'com.anagog.jedai.jedaidemo',
        Versions: [
          {
            Version: '2019-01-22 14:00',
            ActiveBuild: 6,
            LastBuild: 6,
            Builds: [
              {
                Build: 1,
                Comment: 'Default Config for Stage #1',
              },
              {
                Build: 2,
                Comment: 'Default Config for Stage #2',
              },
              {
                Build: 3,
                Comment: 'Default Config for Stage #3',
              },
              {
                Build: 4,
                Comment: 'Default Config for Stage #4',
              },
              {
                Build: 5,
                Comment: 'Default Config for Stage #5',
              },
              {
                Build: 6,
                Comment: 'Update schedule and profile urls and set historical reports to 60 minutes and 10 minutes retry',
              },
            ],
          },
          {
            Version: undefined,
            ActiveBuild: 9,
            LastBuild: 9,
            Builds: [
              {
                Build: 1,
                Comment: 'Stging Default #1',
              },
              {
                Build: 2,
                Comment: 'Stging Default #2',
              },
              {
                Build: 3,
                Comment: 'Stging Default #3',
              },
              {
                Build: 4,
                Comment: 'Stging Default #4',
              },
              {
                Build: 5,
                Comment: 'Stging Default #5',
              },
              {
                Build: 6,
                Comment: 'Stging Default #6',
              },
              {
                Build: 7,
                Comment: 'Stging Default #7',
              },
              {
                Build: 8,
                Comment: 'Stging Default #8',
              },
              {
                Build: 9,
                Comment: 'Update Urls for profile and schedule',
              },
            ],
          },
        ],
      },
    ];

    Application.insertMany(initApplications, function(err, apps){
      if (err) {
        console.warn(err);
      }
      console.log('Moks applications were insert');
    });
    /*     User.create({
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
    }); */
  });
});
module.exports = Application;
