import * as React from 'react';
import './index.scss';

interface Props {
  login: () => void;
}

const FormBox = (props: Props) => (
  <div className="form-box">
    <button className="btn-login" onClick={props.login}>登陆</button>
  </div>
);

export default FormBox;