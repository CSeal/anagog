import { observable, action, computed } from 'mobx';
import { deleteToken } from '../services/auth';

class ActiveUserStore {
  @observable userName;
  @observable permissions;

  constructor() {
    this.userName = null;
    this.permissions = null;
  }

  @computed get getActiveUserName(){
    return this.userName;
  }

  @computed get canUpdate(){
    if(!this.permissions) {
      return false;
    }
    return this.permissions.canUpdate;
  }

  @computed get canDelete(){
    if(!this.permissions) {
      return false;
    }
    return this.permissions.canDelete;
  }

  @computed get canAddUsers(){
    if(!this.permissions) {
      return false;
    }
    return this.permissions.canAddUsers;
  }

  @action('Init active user')
  initActiveUser({userName, permissions}){
    this.userName = userName;
    this.permissions = permissions;
  }

  @action('logout')
  logOutUser = () => {
    deleteToken();
    this.userName = null;
    this.permissions = null;
  }
}

export default new ActiveUserStore();