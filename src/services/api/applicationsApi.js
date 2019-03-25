import { BaseApi } from './baseApi';

class ApplicationsApi extends BaseApi {
  constructor({baseURL, devMode}){
    super(baseURL);
    this.devMode = devMode;
  }

  async getApplications(){
    return await this._get({route: 'applications', needAuth: true, devMode: this.devMode});
  }

}

export default new ApplicationsApi({devMode: false});