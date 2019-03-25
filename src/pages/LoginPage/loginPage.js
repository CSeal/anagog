import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  width: 200,
})

@inject(['loginForm'])
@observer
class LoginPage extends Component {
  render() {
    const {
      classes,
      loginForm,
    } = this.props;
    const loginProps = loginForm.$('userName').bind();
    const passwordProps = loginForm.$('password').bind();
    return (
    <>
      <h1>Operational Client</h1>
      <form autoComplete='off'>
        <TextField
          {...loginProps}
          error={!!loginForm.$('userName').error}
          required
          className={classes.textField}
          margin='normal'
          autoComplete='user-name'
        />
        {loginForm.$('userName').error && (<p>{loginForm.$('userName').error}</p>)}
        <TextField
          {...passwordProps}
          error={!!loginForm.$('password').error}
          required
          className={classes.textField}
          margin='normal'
          autoComplete='current-password'
        />
        {loginForm.$('password').error && (<p>{loginForm.$('password').error}</p>)}
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit"
          onClick={loginForm.onSubmit}
          >
          Login
        </Button>
      </form>
    </>
    )
  }
}

export default withStyles(styles)(LoginPage);