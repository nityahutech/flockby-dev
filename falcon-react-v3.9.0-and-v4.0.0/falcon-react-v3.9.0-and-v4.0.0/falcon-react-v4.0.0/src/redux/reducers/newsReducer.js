import {
  GET_NEWS,
  GET_NEWS_SUCCESS,
  GET_NEWS_FAIL,
  CREATE_NEWS_ARTICLE,
  CREATE_NEWS_ARTICLE_SUCCESS,
  CREATE_NEWS_ARTICLE_FAIL,
} from '../actionTypes/pageTypes';

const INITIAL_STATE = {
  loading: false,
  error: '',
  payload: {},
  message: '',
};

const newsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_NEWS:
      return { ...state, error: '', loading: true };
    case GET_NEWS_SUCCESS:
      return { ...state, newsPosts: action.payload, loading: false };
    case GET_NEWS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
      case CREATE_NEWS_ARTICLE:
        return { ...state, error: '', loading: true };
      case CREATE_NEWS_ARTICLE_SUCCESS:
        return { ...state, payload: action.payload, loading: false };
      case CREATE_NEWS_ARTICLE_FAIL:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
    default:
      return state;
  }
};

export default newsReducer;
