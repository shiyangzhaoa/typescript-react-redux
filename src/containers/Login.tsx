import * as React from 'react';
import { connect } from 'react-redux';
import Hello from '@components/Hello';
import { StoreState } from '../types';
import { user } from '../actions';
import '../App.scss';

const App = (props: any) => {
  const {isLoginPending} = props;
  return (
    <div className="App">
      <div className="App-intro">
        <Hello
          state={isLoginPending}
        />
      </div>
    </div>
  );
};

function mapStateToProps({ isLoginPending }: StoreState) {
  return {
    isLoginPending,
  };
}

export default connect(mapStateToProps, { user })(App);
