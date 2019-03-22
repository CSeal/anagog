const express = require('express');
const fs = require('fs');
const path = require('path');
const server = require('../server');
const errors_msg_obj = require('../error_const');
const _middlwareUrlPattern = /(\/?[a-z]+(-?[a-z]+)*\/)+/;
const validatorProcessor = require(path.join(__dirname, 'validator.js'));
const passport = require('passport');
class BaseController {
  constructor(url = '/api/'){
    this.router = express.Router();
    this.errors_msg_obj = errors_msg_obj;
    this.routersMiddlware = url && _middlwareUrlPattern.test(url)? [url] : [];
    this.passport = passport;
    this._privateMiddlware = this._privateMiddlware.bind(this);
  }

  get(routePattern, options, ...rest){
    this.setMiddlware(routePattern, options && options.isPrivate, rest, 'get');
  }

  post(routePattern, options, ...rest){
    this.setMiddlware(routePattern, options && options.isPrivate, rest, 'post');
  }

  put(routePattern, options, ...rest){
    this.setMiddlware(routePattern, options && options.isPrivate, rest, 'put');
  }

  delete(routePattern, options, ...rest){
    this.setMiddlware(routePattern, options && options.isPrivate, rest, 'delete');
  }

  _privateMiddlware(req, res, next){
    this.passport.authenticate('jwt', (err, user, info) => {
      if (err) {
        const { some_server_error } = this.errors_msg_obj;
        return this._sendJSONresponse(res, '500', null, [some_server_error, err]);
      }
      if (!user) {
        const {
          user_not_found,
          user_is_not_authorized,
        } = this.errors_msg_obj;
        return this._sendJSONresponse(res, '401', null, [user_not_found, user_is_not_authorized], info.message);
      }
      req.loginUser = user;
      next();
    })(req, res);
  }

  setMiddlware(routePattern, isPrivate, collbackArray, method){
    if (isPrivate) {
      collbackArray.unshift(this._privateMiddlware);
    }
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

  _sendJSONresponse(res, status, payload, errors, message){
    const respBody = {
      status: (new RegExp('^2')).test(status),
      data: payload || {},
      errors: errors || [],
      message: message || "",
    };
    return res.status(status).send(respBody);
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