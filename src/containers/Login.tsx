import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Md5 } from 'ts-md5/dist/md5';
import '../App.scss';
import InputBox from '@components/InputBox';
import FormBox from '../components/FormBox/index';
import { StoreState } from '../types';
import { user } from '../actions';
import '../App.scss';

export class Login extends React.Component<any, {}> {
  state = {
    username: '',
    password: '',
    warning: '',
  };

  getValueName = (username: string): void => {
    this.setState({ username });
  }

  getValuePass = (password: string): void => {
    this.setState({ password: Md5.hashStr(password) });
  }

  check = (): boolean => {
    if (!this.state.username || !this.state.password) {
      this.setState({
        warning: 'plz check your form~'
      });
      setTimeout(() => {
        this.setState({
          warning: ''
        });
      }, 3000);
      return false;
    } else {
      return true;
    }
  }

  login = () => {
    const { actions } = this.props;
    if (!this.check()) {
      return;
    }

    actions.request({ username: this.state.username, password: this.state.password });
  }

  render() {
    const { isLoginPending } = this.props;
    return (
      <div className="App">
        <div className="App-intro">
          <InputBox
            isLoginPending={isLoginPending}
            getNameValue={this.getValueName}
            getPassValue={this.getValuePass}
          />
          {this.state.warning && <p style={{color: 'red'}}>{this.state.warning}</p>}
          <FormBox login={this.login}/>
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
