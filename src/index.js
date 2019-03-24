import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { Router } from 'react-router';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './mui-theme';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { stores, history } from './store';

ReactDOM.render(
  <Provider {...stores}>
    <Router history={history}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
