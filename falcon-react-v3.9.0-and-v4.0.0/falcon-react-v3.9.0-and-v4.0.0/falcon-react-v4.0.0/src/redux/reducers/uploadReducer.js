import {
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAIL,
} from '../actionTypes/pageTypes';

const INITIAL_STATE = {
  loading: false,
  error: '',
  payload: {},
  message: '',
};

const uploadReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE:
      return { ...state, error: '', loading: true };
    case UPLOAD_IMAGE_SUCCESS:
      return { ...state, payload: action.payload, loading: false };
    case UPLOAD_IMAGE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default uploadReducer;
