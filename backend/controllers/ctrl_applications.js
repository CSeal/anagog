const BaseController = require('../core/baseController')
const ApplicationsCtrl = new BaseController();

ApplicationsCtrl.get('/applications', {isPrivate: true}, (req, res, next) => {
  ApplicationsCtrl.modelsObject.application.findWithPublicFields({}, function (err, applications) {
    if (err) {
      return ApplicationsCtrl._sendJSONresponse(res, '500', {}, err);
    }
    ApplicationsCtrl._sendJSONresponse(res, '200', applications);
  })
});

module.exports = ApplicationsCtrl;
