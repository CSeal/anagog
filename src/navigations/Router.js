import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Route, Switch} from 'react-router-dom';
import { isLoggedIn } from '../services/auth';
import * as ROUTES from './routeMap';

//Test
import LoginPage from '../pages/LoginPage/loginPage'
import MainPage from '../pages/MainPage/MainPage'


@inject('routing')
@inject('activeUser')
@observer
class Router extends Component {
  render() {
    const { activeUser } = this.props;
    const ContentComponent = activeUser.getActiveUserName && isLoggedIn() ? MainPage : LoginPage;
    return (
      <Switch>
        <Route path={ROUTES.root} component={ContentComponent}/>
        <Route render={ ({location}) => {
          return(
          <h2>404 Page {location.pathname} not found</h2>
          )
        }}/>
      </Switch>
    )
  }
}
export default Router;

