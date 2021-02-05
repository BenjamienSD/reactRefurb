import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../types';

// init form state
const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  // init useReducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  // ACTIONS
  // there is currently no need for front end registration functionality
  /* 
  // register user
  const registerUser = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application-json',
      },
    };
    try {
      const res = await axios.post('/api/users/register', formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      loadUser()
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };
 */

  // load user
  const loadUser = async () => {
    // load token into global header
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get('api/users/current');
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

  // login user - get user token
  const loginUser = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('api/users/login', formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      console.log(err);
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // logout user
  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <authContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        loginUser,
        loadUser,
        logout,
      }}>
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
