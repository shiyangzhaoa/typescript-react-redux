import * as React from 'react';
import Login from './containers/Login';
import './App.scss';

const logo = require('./assets/logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <Login />
        </div>
      </div>
    );
  }
}

export default App;
