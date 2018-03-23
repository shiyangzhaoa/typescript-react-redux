import * as React from 'react';
import './index.scss';

interface Props {
  isLoginPending: boolean;
  getNameValue: Function;
  getPassValue: Function;
}

const InputBox = (props: Props) => {
  return (
    <div className="login-box">
      <input
        type="text"
        autoComplete="off"
        className="login-name"
        placeholder="loginname"
        onChange={(evt: any) => props.getNameValue(evt.target.value)}
      />
      <input
        type="password"
        autoComplete="off"
        className="login-pass"
        placeholder="password"
        onChange={(evt: any) => props.getPassValue(evt.target.value)}
      />
    </div>
  );
};

export default InputBox;