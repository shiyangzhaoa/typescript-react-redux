import * as React from 'react';
import './index.scss';

interface Props {
  isLoginPending: boolean;
}

const InputBox = (props: Props) => (
  <div className="login-box">
    <input type="text" className="login-name" placeholder="username"/>
    <input type="password" className="login-pass" placeholder="password"/>
  </div>
);

export default InputBox;