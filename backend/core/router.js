const path = require('path');
const fs = require('fs');

const setRoutes = (controllerDirPath, modelDirPath) => {
  if(fs.existsSync(controllerDirPath)){
    const ctrlNameRegExp = /^ctrl_.*/;
    const modelNameRegExp = /\w+\.js$/;
    const cotrollersFileName = fs.readdirSync(controllerDirPath);
    const modelsFileName = fs.existsSync(modelDirPath) && fs.readdirSync(modelDirPath);
    const models = modelsFileName && modelsFileName.reduce((acc, modelFileName) => {
      if (modelNameRegExp.test(modelFileName)) {
        acc[modelFileName.replace(/\.js$/, '')] = require(path.join(modelDirPath, modelFileName));
      }
      return acc;
    }, {});
    const validModels = models || !!Object.keys(models).length;
    cotrollersFileName.forEach((controller) => {
      if(ctrlNameRegExp.test(controller)){
        const controllersInstanse = require(path.join(controllerDirPath, controller));
        controllersInstanse.initController(controller, validModels);
      }
    });
    return true;
  }
  return false;
}

module.exports = setRoutes;