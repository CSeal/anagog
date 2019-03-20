import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('routing')
@observer
class App extends Component {
  render() {
    const { location, push, goBack } = this.props.routing;
    return (
      <div >
        <span>Current pathname: {location.pathname}</span>
        <button onClick={() => push('/test')}>Change url</button>
        <button onClick={() => goBack()}>Go Back</button>
      </div>
    );
  }
}

export default App;
