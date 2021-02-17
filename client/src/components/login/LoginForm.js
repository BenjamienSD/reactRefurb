import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import AuthContext from '../../context/auth/authContext';

export default function LoginForm() {
  const authContext = useContext(AuthContext);
  const { loginUser, isAuthenticated } = authContext;
  const history = useHistory();

  // if already logged in, go to form
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/formulier');
    }
  }, [isAuthenticated, history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser({
      email,
      password,
    });
  };

  return (
    <div className='loginFormContainer'>
      <form className='form-signin' onSubmit={onSubmit}>
        <h1 className='h3 mb-5 font-weight-normal'>Gelieve in te loggen.</h1>
        <label htmlFor='inputEmail' className='sr-only'>
          Email
        </label>
        <input
          type='email'
          id='inputEmail'
          className='form-control'
          placeholder='Email'
          value={user.email}
          name='email'
          onChange={onChange}
          required
          autoFocus
        />
        <label htmlFor='inputPassword' className='sr-only'>
          Wachtwoord
        </label>
        <input
          type='password'
          id='inputPassword'
          className='form-control'
          placeholder='Wachtwoord'
          value={user.password}
          name='password'
          onChange={onChange}
          required
        />
        <button className='btn btn-lg btn-primary btn-block' type='submit'>
          Inloggen
        </button>
      </form>
    </div>
  );
}
