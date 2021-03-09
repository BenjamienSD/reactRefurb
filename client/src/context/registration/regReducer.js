import {
  GET_REGISTRATIONS,
  ADD_REGISTRATION,
  DELETE_REGISTRATION,
  SET_CURRENT,
  CLEAR_CURRENT,
  //UPDATE_FORM,
  REGISTRATION_ERROR,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_REGISTRATIONS:
      return {
        ...state,
        registrations: action.payload,
        loading: false,
      };
    case ADD_REGISTRATION:
      return {
        ...state,
        registrations: [action.payload, ...state.registrations],
        loading: false,
      };
    case DELETE_REGISTRATION:
      return {
        ...state,
        registrations: state.registrations.filter(
          (registration) => registration._id !== action.payload
        ),
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
        loading: false,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    /* case UPDATE_FORM:
      return {
        ...state,
        forms: state.forms.map((form) =>
          form._id === action.payload._id ? action.payload : form
        ),
        loading: false,
      }; */
    case REGISTRATION_ERROR: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }
    default:
      return state;
  }
};
