import React, { useState } from 'react';
import { authService } from 'firebaseInstance';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import AuthForm from 'components/AuthForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';

import {
  faTwitter,
  faGoogle,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import imgLogo from '../img/Logo 1.png';
import '../loginpage.css';

const Auth = ({ userObj }) => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;

    let provider;
    if (name === 'google') {
      provider = new GoogleAuthProvider();
    }

    const data = await signInWithPopup(authService, provider);
  };
  const history = useHistory();

  const onClicksignin = () => {
    history.push('/signin');
  };

  const onForgetPw = () => {
    history.push('/password');
  };

  return (
    <div className="authContainer">
      <div className="backmain">
        <div className="authleft">
          <div className="Logo">
            <img src={imgLogo} width="250" />
          </div>
          <AuthForm />
          <div className="resetpw">
            <text className="resetpw_text" onClick={onForgetPw}>
              Forget password?
            </text>
          </div>
          <div className="loginnull"></div>
          <div className="authBtns">
            <button
              onClick={onSocialClick}
              name="google"
              className="authBtn"
            ></button>
            <div className="signin">
              <text className="inlinetext">Not registered yet?</text>
              <button onClick={onClicksignin} className="authBtn2">
                Sign In
              </button>
            </div>
          </div>
        </div>
        <div className="authrigth"></div>
      </div>
    </div>
  );
};
export default Auth;
