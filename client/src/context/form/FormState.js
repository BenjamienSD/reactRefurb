import React, { useReducer } from 'react';
import axios from 'axios';
import formContext from './formContext';
import formReducer from './formReducer';
import {
  ADD_FORM,
  DELETE_FORM,
  SET_CURRENT,
  CLEAR_CURRENT,
  //UPDATE_FORM,
  FORM_ERROR,
  GET_FORMS,
} from '../types';

// init form state
const FormState = (props) => {
  const initialState = {
    formDefault: {
      id: '',
      doorverwijs: false,
      betaalWijze: '',
      andereBetaalWijze: '',
      infoProviders: false,
      infoWifi: false,
      prijsKlasse: false,
      softwarePakket: false,
      datum: '',
      dossierNummer: '',
      contactPersoon: '',
      digiLocatie: '',
      medeWerker: '',
      doelGroep: '',
      klant: '',
      product: '',
      kopie: false,
      infoMap: false,
      infoHardware: false,
      infoGarantie: false,
      infoSoftware: false,
      infoBeego: false,
      werkingDigipunt: false,
    },
    forms: [],
    current: null,
    error: null,
    loading: true,
  };

  // init useReducer
  const [state, dispatch] = useReducer(formReducer, initialState);

  // ACTIONS
  // get all
  const getForms = async () => {
    try {
      const res = await axios.get('api/tables');
      dispatch({ type: GET_FORMS, payload: res.data });
    } catch (err) {
      dispatch({ type: FORM_ERROR, payload: err.message });
    }
  };

  // add
  const addForm = async (form) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('api/forms', form, config);
      dispatch({ type: ADD_FORM, payload: res.data });
    } catch (err) {
      dispatch({ type: FORM_ERROR, payload: err.message });
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
  const deleteForm = async (_id) => {
    try {
      await axios.delete(`api/tables/formulier/${_id}`);
      dispatch({ type: DELETE_FORM, payload: _id });
    } catch (err) {
      dispatch({ type: FORM_ERROR, payload: err.message });
    }
  };

  // set current
  const setCurrent = (form) => {
    dispatch({ type: SET_CURRENT, payload: form });
  };

  // clear current
  const clearCurrent = (form) => {
    dispatch({ type: CLEAR_CURRENT });
  };

  return (
    <formContext.Provider
      value={{
        forms: state.forms,
        current: state.current,
        formDefault: state.formDefault,
        error: state.error,
        loading: state.loading,
        addForm,
        setCurrent,
        clearCurrent,
        deleteForm,
        // updateForm,
        getForms,
      }}>
      {props.children}
    </formContext.Provider>
  );
};

export default FormState;
