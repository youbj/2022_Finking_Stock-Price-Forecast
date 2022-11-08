import React from "react";
import { authService } from "firebaseInstance";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import AuthForm from "components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import imgLogo from "../img/Logo.png";
import "../loginpage.css";

const Auth = () => {
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

  return (
    <div className="authContainer">
      <div className="Logo">
        <img src={imgLogo} width="300" />
      </div>
      <AuthForm />
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          Google로 시작하기 <FontAwesomeIcon icon={faGoogle} />
        </button>
      </div>
    </div>
  );
};
export default Auth;
