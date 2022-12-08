import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { authService } from "firebaseInstance";

const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "email") {
      setEmail(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      sendPasswordResetEmail(authService, email).then(() => {});
      onClicklogin();
    } catch (error) {
      setError(error.message);
    }
  };

  const onClicklogin = () => {
    history.push("/");
  };

  return (
    <div className="signinContainer">
      <div>
        <button className="exit" onClick={onClicklogin}>
          X
        </button>
      </div>
      <div>
        <p>비밀번호 재설정</p>
      </div>
      <form onSubmit={onSubmit} className="container">
        <input
          name="email"
          type="text"
          placeholder="이메일"
          required
          value={email}
          onChange={onChange}
          className="authInput"
        />

        <input type="submit" value={"확인"} className="authInput authSubmit" />
        {error && <span className="authError">{error}</span>}
      </form>
    </div>
  );
};

export default Forgotpassword;
