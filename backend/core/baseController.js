const express = require('express');
const fs = require('fs');
const path = require('path');
const server = require('../server');
const errors_msg_obj = require('../error_const');
const _middlwareUrlPattern = /(\/?[a-z]+(-?[a-z]+)*\/)+/;
const validatorProcessor = require('./validator');

class BaseController {
  constructor(url = '/api/'){
    this.router = express.Router();
    this.errors_msg_obj = errors_msg_obj;
    this.routersMiddlware = url && _middlwareUrlPattern.test(url)? [url] : [];
  }

  get(routePattern, ...rest){
    this.setMiddlware(routePattern, rest, 'get');
  }

  post(routePattern, ...rest){
    this.setMiddlware(routePattern, rest, 'post');
  }

  put(routePattern, ...rest){
    this.setMiddlware(routePattern, rest, 'put');
  }

  delete(routePattern, ...rest){
    this.setMiddlware(routePattern, rest, 'delete');
  }

  setMiddlware(routePattern, collbackArray, method){
    collbackArray.forEach(collback => {
      if( typeof collback === 'function') {
        const getMiddlware = this.router[method](routePattern, collback);
        this.routersMiddlware.push(getMiddlware);
      }
    });
  }

  _setValidator(ruleFileName){
    const validatorFilePath = path.join(
      path.parse(__dirname).dir,
      'validator_rules',
      ruleFileName);
    if (fs.existsSync(validatorFilePath)) {
      this._getValidatorRules = require(validatorFilePath);
    }
  }

  getTestValidation(testObj, validationRules, templateOff){
    let finalValidationRules;
    if(!templateOff) {
      finalValidationRules = Object.assign({},
        this._getValidatorRules ? this._getValidatorRules(errors_msg_obj) : {},
        validationRules ? validationRules : {}
        )
    } else {
      finalValidationRules = validationRules;
    }

    if(!testObj) {
      return console.error('Don`t have any object to validate');
    }
    return validatorProcessor(testObj, finalValidationRules);
  }

  initController(controllerName, medelsObject){
    controllerName.replace(/^ctrl_(.*\.js)$/, (hit, ruleFileName) =>{
      this._setValidator(ruleFileName);
    })
    this.modelsObject = medelsObject;
    server.use.apply(server, this.routersMiddlware);
  }
}

module.exports = BaseController;