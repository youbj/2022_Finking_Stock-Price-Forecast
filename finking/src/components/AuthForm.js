import React, { useState } from 'react';
import { authService } from 'firebaseInstance';
import { signInWithEmailAndPassword } from 'firebase/auth';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await signInWithEmailAndPassword(
        authService,
        email,
        password,
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <text className="authtext">Email</text>
        <input
          name="email"
          type="text"
          required
          value={email}
          onChange={onChange}
          className="authInput"
        />
        <text className="authtext">Password</text>
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
          value={'Log in'}
          className="authInput authSubmit"
        />
        {error && <span className="authError">{error}</span>}
      </form>
    </>
  );
};

export default AuthForm;
