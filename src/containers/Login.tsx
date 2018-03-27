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

interface State {
  loginname: string;
  password:  string;
  warning:   string;
}

export class Login extends React.Component<any, State> {
  state = {
    loginname: '',
    password: '',
    warning: '',
  };

  componentWillReceiveProps(nextProps: StoreState) {
    const { isLoginPending } = this.props;
    if (
      nextProps.isLoginPending !== isLoginPending &&
      nextProps.isLoginPending === false && 
      nextProps.token
    ) {
      this.setState({
        warning: '登陆成功~'
      });
      this.clearMsg();
    } else if (
      nextProps.isLoginPending !== isLoginPending &&
      nextProps.isLoginPending === false && 
      nextProps.error
    ) {
      this.setState({
        warning: '登陆失败~'
      });
      this.clearMsg();
    }
  }

  getValueName = (loginname: string): void => {
    this.setState({ loginname });
  }

  getValuePass = (password: string): void => {
    this.setState({ password: Md5.hashStr(password).toString() });
  }

  check = (): boolean => {
    if (!this.state.loginname || !this.state.password) {
      this.setState({
        warning: 'plz check your form~'
      });
      this.clearMsg();
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

    actions.request({ loginname: this.state.loginname, password: this.state.password });
  }

  loginout = () => {
    const { actions } = this.props;
    actions.out();
  }

  public clearMsg = () => {
    setTimeout(() => {
      this.setState({
        warning: ''
      });
    }, 3000);
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
          <FormBox login={this.login} isLoginPending={isLoginPending} loginout={this.loginout}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ isLoginPending, token, error }: StoreState) {
  return {
    isLoginPending,
    token,
    error,
  };
}

function mapDispatchToProps(dispatch: any) {
  return { actions: bindActionCreators(user, dispatch) };
}

export default connect<any>(mapStateToProps, mapDispatchToProps)(Login);
