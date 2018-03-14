import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import Hello from '@components/Hello';
import { StoreState } from '../types';
import * as actions from '../actions';
import '../App.scss';

interface Actions {
  decrementEnthusiasm: () => void;
  incrementEnthusiasm: () => void;
}

interface Props {
  isLoginPending: boolean;
  actions: Actions;
}

class App extends React.Component<Props, {}> {
  render() {
    const {isLoginPending} = this.props;
    return (
      <div className="App">
        <div className="App-intro">
          <Hello
            state={isLoginPending}
            onIncrement={this.props.actions.incrementEnthusiasm}
            onDecrement={this.props.actions.decrementEnthusiasm}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ isLoginPending }: StoreState) {
  return {
    isLoginPending,
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
