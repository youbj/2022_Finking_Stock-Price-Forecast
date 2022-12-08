import React, { useState } from "react";
import { authService } from "firebaseInstance";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import AuthForm from "components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import imgLogo from "../img/Logo.png";
import "../loginpage.css";

const Auth = ({ userObj }) => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;

    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    }

    const data = await signInWithPopup(authService, provider);
  };
  const history = useHistory();

  const onClicksignin = () => {
    history.push("/signin");
  };

  const onForgetPw = () => {
    history.push("/password");
  };

  return (
    <div className="authContainer">
      <div className="Logo">
        <img src={imgLogo} width="300" />
      </div>
      <AuthForm />

      <div className="authBtns">
        <div>
          <button onClick={onClicksignin} className="authBtn2">
            회원 가입
          </button>
        </div>

        <button onClick={onSocialClick} name="google" className="authBtn">
          Google로 시작하기 <FontAwesomeIcon icon={faGoogle} />
        </button>
      </div>
      <div className="resetpw">
        <text className="resetpw_text" onClick={onForgetPw}>
          Forget password?
        </text>
      </div>
    </div>
  );
};
export default Auth;
