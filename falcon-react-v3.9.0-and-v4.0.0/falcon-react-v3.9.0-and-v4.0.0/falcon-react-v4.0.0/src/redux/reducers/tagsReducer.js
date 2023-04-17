import {
  GET_TAGS,
  GET_TAGS_SUCCESS,
  GET_TAGS_FAIL,
  CREATE_TAG,
  CREATE_TAG_SUCCESS,
  CREATE_TAG_FAIL,
} from '../actionTypes/tagsTypes';

const INITIAL_STATE = {
  loading: false,
  error: '',
  payload: {},
  message: '',
};

const tagsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TAGS:
      return { ...state, error: '', loading: true };
    case GET_TAGS_SUCCESS:
      return { ...state, tagsData: action.payload, loading: false };
    case GET_TAGS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CREATE_TAG:
      return { ...state, error: '', loading: true };
    case CREATE_TAG_SUCCESS:
      return { ...state, tagsData: action.payload, loading: false };
    case CREATE_TAG_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default tagsReducer;
