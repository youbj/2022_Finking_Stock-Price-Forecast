import React, { useState } from 'react';
import { authService } from 'firebaseInstance';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useHistory } from 'react-router-dom';
import { dbService } from 'firebaseInstance';
import { doc, setDoc } from 'firebase/firestore';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [User, setUser] = useState('');
  const [error, setError] = useState('');

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'name') {
      setName(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      if (newAccount) {
        const data = await createUserWithEmailAndPassword(
          authService,
          email,
          password,
        );
      } else {
      }
      await setDoc(doc(dbService, 'user', email), {
        name: name,
        user: email,
        createdAt: Date.now(),
        password: password,
        usercode: '0',
      });
      history.push('/survey');
    } catch (error) {
      setError(error.message);
    }
  };
  const history = useHistory();

  const onClicklogin = () => {
    history.push('/');
  };

  return (
    <div className="signinContainer">
      <div className="backmain_si">
        <div className="signinleft">
          <text className="signintext">Finking</text>
          <div className="null"></div>
          <text style={{ fontSize: 25, paddingRight: 60 }}>
            Already Signed up?
          </text>
          <div>
            <button className="returnlogin" onClick={onClicklogin}>
              LOG IN
            </button>
          </div>
        </div>
        <div className="signinright">
          <text
            className="righttext"
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              paddingBottom: 40,
            }}
          >
            Sign up for an Account
          </text>
          <text
            className="righttext"
            style={{
              fontSize: 15,
            }}
          >
            Let`s get you all set up so you can start creating your
          </text>
          <text
            className="righttext"
            style={{
              fontSize: 15,
              paddingBottom: 40,
            }}
          >
            first finking experience.
          </text>

          <form onSubmit={onSubmit} className="container">
            <label className="righttext">Name</label>
            <input
              name="name"
              type="text"
              required
              value={name}
              onChange={onChange}
              className="authInput"
            />
            <label className="righttext">Email</label>
            <input
              name="email"
              type="text"
              required
              value={email}
              onChange={onChange}
              className="authInput"
            />
            <label className="righttext">Password</label>
            <input
              name="password"
              type="password"
              required
              value={password}
              onChange={onChange}
              className="authInput"
            />
            <input
              type="submit"
              value={'Go Finking'}
              className="authInput authSubmit"
            />
            {error && <span className="authError">{error}</span>}
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signin;
