import {
  CREATE_POST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  GET_POST,
  GET_POST_SUCCESS,
  GET_POST_FAIL,
} from 'redux/actionTypes/pageTypes';

const INITIAL_STATE = {
  loading: false,
  error: '',
  payload: {},
  message: '',
};

const postReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_POST:
      return { ...state, error: '', loading: true };
    case GET_POST_SUCCESS:
      return { ...state, postsData: action.payload, loading: false };
    case GET_POST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CREATE_POST:
      return { ...state, error: '', loading: true };
    case CREATE_POST_SUCCESS:
      return { ...state, payload: action.payload, loading: false };
    case CREATE_POST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default postReducer;
