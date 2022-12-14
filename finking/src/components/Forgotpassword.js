import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { authService } from 'firebaseInstance';
import pw from '../img/pw.png';
const Forgotpassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === 'email') {
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
    history.push('/');
  };

  return (
    <div className="backdrop">
      <div className="signinContainer">
        <div className="pwcontainer1">
          <div className="pwtop">
            <img src={pw} width="60" style={{ marginLeft: 30 }} />
            <p
              className="inline nomargin fonts30"
              style={{ paddingTop: 10, paddingLeft: 20 }}
            >
              Forget Password?
            </p>
          </div>
          <form onSubmit={onSubmit} className="pwcontainer">
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <text className="inline" style={{ width: 100, marginLeft: 50 }}>
                Full Name
              </text>
              <input name="name" type="text" className="pwInput inline" />
            </div>
            <div className="flex">
              <text className="inline" style={{ width: 100, marginLeft: 50 }}>
                Email
              </text>
              <input
                name="email"
                type="text"
                required
                value={email}
                onChange={onChange}
                className="pwInput flex"
              />
            </div>
            <div className="flex" style={{ marginTop: 10 }}>
              <input type="submit" value={'Yes'} className="pwyes authSubmit" />
              <button className="pwno inline" onClick={onClicklogin}>
                No
              </button>
            </div>
            {error && <span className="authError">{error}</span>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgotpassword;
