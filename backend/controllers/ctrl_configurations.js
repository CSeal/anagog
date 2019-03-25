const BaseController = require('../core/baseController')
const ConfigurationsCtrl = new BaseController();

ConfigurationsCtrl.get('configuration', {isPrivate: true}, (req, res, next) => {
  res.send('to do in the fiature :)')
});
module.exports = ConfigurationsCtrl;