import {
  GET_USER_TOKEN,
  GET_USER_TOKEN_SUCCESS,
  GET_USER_TOKEN_FAIL,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGOUT_USER,
  SET_EMAIL,
} from '../actionTypes/authActionTypes';

const INITIAL_STATE = {
  loading: false,
  error: '',
  payload: {},
  message: '',
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_TOKEN:
      return { ...state, error: '', loading: true };
    case GET_USER_TOKEN_SUCCESS:
      return { ...state, token: action.sessionId, loading: false };
    case GET_USER_TOKEN_FAIL:
      return {
        ...state,
        error: 'ERROR',
        message: 'Error in getting token',
        loading: false,
      };
    case CREATE_USER:
      return { ...state, error: '', loading: true };
    case CREATE_USER_SUCCESS:
      return { ...state, currentUser: action.payload, loading: false };
    case CREATE_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case LOGIN_USER:
      return { ...state, error: '', loading: true };
    case LOGIN_USER_SUCCESS:
      return { ...state, currentUser: action.payload, loading: false };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case LOGOUT_USER:
      return { ...state, currentUser: null };
    case SET_EMAIL:
      return { ...state, email: action.payload };
    default:
      return state;
  }
};

export default authReducer;
