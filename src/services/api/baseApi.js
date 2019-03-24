import axios from 'axios';
import tokenService from '../auth';
const qs = require('qs');

export class BaseApi {

  _methods = {
    GET: 'get',
    POST: 'post',
    PATCH: 'patch',
    PUT: 'put',
    DELETE: 'delete',
  };
  //_requestDevMode = false;
  tokenService = tokenService;

  static instanse = null;

  static getBaseUrl(){
    return process.env.REACT_APP_DOMAIN_URI + process.env.REACT_APP_API_URI;
  }

  static getInstance(){
    if (!BaseApi.instanse) {
      BaseApi.instanse = new BaseApi(BaseApi.getBaseUrl());
    }
    return BaseApi.instanse;
  }

  constructor(baseURL){
    if (!BaseApi.instanse) {
      this._axios = axios.create({
        baseURL: baseURL || BaseApi.getBaseUrl(),
        headers: {
          "Accept":"application/json; charset=utf-8",
          "X-Requested-With": "XMLHttpRequest",
        },
        paramsSerializer: function (params) {
          return qs.stringify(params, {arrayFormat: 'brackets'});
        },
      });
      BaseApi.instanse = this;
    }
    return this;
  }

  _isMethodExist(method){
    switch(method) {
      case this._methods.GET:
      return true;
      case this._methods.POST:
      return true;
      case this._methods.PUT:
      return true;
      case this._methods.DELETE:
      return true;
      default:
      return false;
    }
  }

  async _getRequest({url = null, method, route, getParams, bodyParams, needAuth = false, headers = {}, formData = false, devMode = false}){
    const correctUrlRegExp = /^(http|https):\/\//i
    if (!this._isMethodExist(method)) {
      throw [`This is not correct method ${method}`];
    }

    const config = {
      url: route,
      method,
    };

    if (url && correctUrlRegExp.test(url)) {
      config.baseURL = url;
    }

    if (needAuth) {
      const token = this.tokenService.getToken();
      if(!this.tokenService.isLoggedIn()) {
        throw [`User is not Authorized or token is not valid`];
      }
      config.headers = {'Authorization':`Bearer ${token}`};
    }
    if (formData && bodyParams) {
      config.header = {...config.headers, "Content-Type": "multipart/form-data"};
      const data = new FormData;
      for (let fieldName in bodyParams) {
        data.append(fieldName, bodyParams[fieldName]);
      }
      config.data = data;
    } else {
      config.headers = {...config.headers, "Content-Type": "application/json"};
    }

    config.headers = {...config.headers, ...headers};

    if (getParams && method === this._methods.GET) {
      config.params = getParams;
    }

    if (bodyParams && !formData && (method === this._methods.POST || method === this._methods.PUT)) {
      config.data = bodyParams;
    }
    return await BaseApi.instanse._axios.request(config).then( response => {
      if (devMode) {
        console.log('request dev mode -- ', response);
      }

      const {data} = response;
      if (!data.status) {
        console.warn(data.message);
        const errorResponse ={
          status: data.status,
          message: data.message,
          errors: data.errors,
        };
        throw errorResponse;
      }

      const rezult = {
        message: data.message,
        status: data.status,
      };

      if (data.data) {
        rezult.data = {...data.data};
        if (rezult.data.token) {
          this.tokenService.setToken(rezult.data.token);
          delete rezult.data.token;
        }
      }
      return rezult;
    }).catch(this._requestErrorHandler);
  }

  _requestErrorHandler(errorResponse){
    if (process.env.NODE_ENV === 'development') {
      console.error(errorResponse);
    }
    return errorResponse;
  }

  async _get({url, route, getParams, needAuth, headers, devMode}){
    return await this._getRequest({url, method: this._methods.GET, route, getParams, needAuth, headers, devMode}).
    then(rezult => rezult).catch(this._requestErrorHandler);
  }

  async _post({url, route, bodyParams, needAuth, headers, formData, devMode}){
    return await this._getRequest({url, method: this._methods.POST, route, bodyParams, needAuth, headers, formData, devMode}).
    then(rezult => rezult).catch(this._requestErrorHandler);
  }

  async _update({url, route, bodyParams, needAuth, headers, formData, devMode}){
    return await this._getRequest({url, method: this._methods.PUT, route, bodyParams, needAuth, headers, formData, devMode}).
    then(rezult => rezult).catch(this._requestErrorHandler);
  }

  async _delete({route, needAuth, headers, devMode}){
    return await this._getRequest({method: this._methods.DELETE, route, needAuth, headers, devMode}).
    then(rezult => rezult).catch(this._requestErrorHandler);
  }
}

export default BaseApi.getInstance();
