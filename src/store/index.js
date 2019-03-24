import { createBrowserHistory } from 'history';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import MobxForm from './mobxForm';
//#Stores
import activeUserStore from './userStore';
//#Forms
import loginformLogic from '../formLogic/LoginFormLogic';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

export const stores = {
  routing: routingStore,
  activeUser: activeUserStore,
  loginForm: MobxForm( loginformLogic({activeUser: activeUserStore, routing: routingStore}) ),
};

export const history = syncHistoryWithStore(browserHistory, routingStore);