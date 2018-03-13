import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import Hello from './components/Hello';
import { StoreState } from './types/index';
import * as actions from './actions';
import './App.scss';

const logo = require('./logo.svg');

interface Actions {
  decrementEnthusiasm: () => void;
  incrementEnthusiasm: () => void;
}

interface Props {
  name: string;
  enthusiasmLevel: number;
  actions: Actions;
}

class App extends React.Component<Props, {}> {
  render() {
    const {name, enthusiasmLevel} = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <Hello
            name={name}
            enthusiasmLevel={enthusiasmLevel}
            onIncrement={this.props.actions.incrementEnthusiasm}
            onDecrement={this.props.actions.decrementEnthusiasm}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ languageName, enthusiasmLevel }: StoreState) {
  return {
    enthusiasmLevel,
    name: languageName,
  };
}

function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export function mergeProps(stateProps: any, dispatchProps: any, ownProps: any) {
  return { ...ownProps, ...stateProps, ...dispatchProps};
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(App);
