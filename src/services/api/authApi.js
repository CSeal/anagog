import { BaseApi } from './baseApi';

class AuthApi extends BaseApi {
  constructor({baseURL, devMode}){
    super(baseURL);
    this.devMode = devMode;
  }

  async getLogin(bodyParams){
    return await this._post({route: 'login', bodyParams, devMode: this.devMode});
  }

}

export default new AuthApi({devMode: false});