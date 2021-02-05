import {
  GET_FORMS,
  ADD_FORM,
  DELETE_FORM,
  SET_CURRENT,
  CLEAR_CURRENT,
  //UPDATE_FORM,
  FORM_ERROR,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_FORMS:
      return {
        ...state,
        forms: action.payload,
        loading: false,
      };
    case ADD_FORM:
      return {
        ...state,
        forms: [action.payload, ...state.forms],
        loading: false,
      };
    case DELETE_FORM:
      return {
        ...state,
        forms: state.forms.filter((form) => form._id !== action.payload),
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
    case FORM_ERROR: {
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
