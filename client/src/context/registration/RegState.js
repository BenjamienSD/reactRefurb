import React, { useReducer } from 'react';
import axios from 'axios';
import regContext from './regContext';
import regReducer from './regReducer';
import {
  ADD_REGISTRATION,
  DELETE_REGISTRATION,
  REGISTRATION_ERROR,
  GET_REGISTRATIONS,
  CLEAR_CURRENT_REG,
  SET_CURRENT_REG,
} from '../types';

// init form state
const RegState = (props) => {
  const initialState = {
    registrationDefault: {
      naam: '',
      datum: '',
      startTime: '',
      endTime: '',
      soortVraag: '',
      vraag: '',
      antwoord: '',
      tijd: '',
    },
    registrations: [],
    current: null,
    error: null,
    loading: true,
  };

  // init useReducer
  const [state, dispatch] = useReducer(regReducer, initialState);

  // ACTIONS
  // get all
  const getRegistrations = async () => {
    try {
      const res = await axios.get('api/registrations');
      dispatch({ type: GET_REGISTRATIONS, payload: res.data });
    } catch (err) {
      dispatch({ type: REGISTRATION_ERROR, payload: err.message });
    }
  };

  // add
  const addRegistration = async (registration) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('api/registrations', registration, config);
      dispatch({ type: ADD_REGISTRATION, payload: res.data });
    } catch (err) {
      dispatch({ type: REGISTRATION_ERROR, payload: err.message });
    }
  };
  /* 
  // update
  const updateForm = async (form) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.put(
        `http://localhost:5000/api/tables/formulier/${form._id}`,
        form,
        config
      );
      console.log(form);
      dispatch({ type: UPDATE_FORM, payload: res.data });
    } catch (err) {
      dispatch({ type: FORM_ERROR, payload: err.message });
    }
  };
 */
  // delete
  const deleteRegistration = async (_id) => {
    try {
      await axios.delete(`api/registrations/registration/${_id}`);
      dispatch({ type: DELETE_REGISTRATION, payload: _id });
    } catch (err) {
      dispatch({ type: REGISTRATION_ERROR, payload: err.message });
    }
  };

  // set current
  const setCurrentReg = (registration) => {
    dispatch({ type: SET_CURRENT_REG, payload: registration });
  };

  // clear current
  const clearCurrentReg = (registration) => {
    dispatch({ type: CLEAR_CURRENT_REG });
  };

  return (
    <regContext.Provider
      value={{
        registrations: state.registrations,
        current: state.current,
        registrationDefault: state.registrationDefault,
        error: state.error,
        loading: state.loading,
        addRegistration,
        setCurrentReg,
        clearCurrentReg,
        deleteRegistration,
        getRegistrations,
      }}>
      {props.children}
    </regContext.Provider>
  );
};

export default RegState;
