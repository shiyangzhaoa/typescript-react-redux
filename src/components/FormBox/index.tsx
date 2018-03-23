import * as React from 'react';
import './index.scss';

interface Props {
  isLoginPending: boolean;
  login: () => void;
  loginout: () => void;
}

const FormBox = (props: Props) => (
  <div className="form-box">
    <button className="Button btn-login" onClick={props.login}>{props.isLoginPending ? '登陆中...' : '登陆'}</button>
    <button className="Button btn-loginout" onClick={props.loginout}>登出</button>
  </div>
);

export default FormBox;