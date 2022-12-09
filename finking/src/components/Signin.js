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
          password
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
      history.push('/');
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
      <div>
        <button className="exit" onClick={onClicklogin}>
          X
        </button>
      </div>
      <div>
        <p>회원가입</p>
      </div>
      <form onSubmit={onSubmit} className="container">
        <input
          name="name"
          type="text"
          placeholder="이름"
          required
          value={name}
          onChange={onChange}
          className="authInput"
        />
        <input
          name="email"
          type="text"
          placeholder="이메일"
          required
          value={email}
          onChange={onChange}
          className="authInput"
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          value={password}
          onChange={onChange}
          className="authInput"
        />
        <input type="submit" value={'확인'} className="authInput authSubmit" />
        {error && <span className="authError">{error}</span>}
      </form>
    </div>
  );
};
export default Signin;
