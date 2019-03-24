import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { inject, observer } from 'mobx-react';
import { Route, Switch, withRouter, Link} from 'react-router-dom';
import * as ROUTES from '../../navigations/routeMap';
import CreateApplicationPage from '../CreateApplicationPage/CreateApplicationPage';
import EditApplicationConfigurationPage from '../EditApplicationConfigurationPage/EditApplicationConfigurationPage'
import EditUsersPage from '../EditUsersPage/EditUsersPage';
import HostApplicationSelectionPage from '../HostApplicationSelectionPage/HostApplicationSelectionPage';

const styles = theme =>({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  paperRoot: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  }
});

@inject('routing')
@inject('activeUser')
@observer
class MainPage extends Component {
  render(){
    const {
      classes,
      activeUser,
    } = this.props;
    return (
      <>
        <header className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Manage Service Status
              </Typography>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Cansume Service Status
              </Typography>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Reports Service Status
              </Typography>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Hello {activeUser.getActiveUserName}
              </Typography>
              <Button color="inherit" onClick={this.logout}>Logout</Button>
            </Toolbar>
          </AppBar>
        </header>
        <main>
          <Paper className={classes.paperRoot} elevation={1}>
            <Link to={ROUTES.root}>Link to {ROUTES.root}</Link>{' '}
            <Link to={ROUTES.createApplication}>Link to {ROUTES.createApplication}</Link>{' '}
            <Link to={ROUTES.editApplicationConfiguration}>Link to {ROUTES.editApplicationConfiguration}</Link>{' '}
            <Link to={ROUTES.editUsers}>Link to {ROUTES.editUsers}</Link>{' '}
            <Switch>
              <Route path={ROUTES.root} exact component={HostApplicationSelectionPage}/>
              <Route path={ROUTES.createApplication} exact component={CreateApplicationPage}/>
              <Route path={ROUTES.editApplicationConfiguration} exact component={EditApplicationConfigurationPage}/>
              <Route path={ROUTES.editUsers} exact component={EditUsersPage}/>
            </Switch>
          </Paper>
        </main>
      </>
    )
  }

  logout = () => {
    const {
      activeUser,
      routing
    } = this.props;
    activeUser.logOutUser();
    routing.push(ROUTES.root);
  }
}

export default withStyles(styles)(MainPage);
/*
const { location, push, goBack } = this.props.routing;
<div >
        <span>Current pathname: {location.pathname}</span>
        <button onClick={() => push('/test')}>Change url</button>
        <button onClick={() => goBack()}>Go Back</button>
        <LoginPage />
      </div>
*/