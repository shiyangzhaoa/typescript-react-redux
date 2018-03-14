import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../App.scss';
import InputBox from '@components/InputBox';
import FormBox from '../components/FormBox/index';
import { StoreState } from '../types';
import { user } from '../actions';
import '../App.scss';

export class Login extends React.Component<any, {}> {
  render() {
    console.log(this.props);
    const { isLoginPending, actions } = this.props;
    return (
      <div className="App">
        <div className="App-intro">
          <InputBox isLoginPending={isLoginPending} />
          <FormBox user={actions}/>
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

function mapDispatchToProps(dispatch: any) {
  return { actions: bindActionCreators(user, dispatch) };
}

export default connect<any>(mapStateToProps, mapDispatchToProps)(Login);
