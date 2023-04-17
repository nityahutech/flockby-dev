import {
  GET_PAGE,
  GET_PAGE_SUCCESS,
  GET_PAGE_FAIL,
  CREATE_PAGE,
  CREATE_PAGE_SUCCESS,
  CREATE_PAGE_FAIL,
  GET_LINK_PREVIEW,
  GET_LINK_PREVIEW_SUCCESS,
  GET_LINK_PREVIEW_FAIL,
} from '../actionTypes/pageTypes';

const INITIAL_STATE = {
  loading: false,
  error: '',
  payload: {},
  linkPreviewData: {},
  message: '',
};

const pageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PAGE:
      return { ...state, error: '', loading: true };
    case GET_PAGE_SUCCESS:
      return { ...state, pagesData: action.payload, loading: false };
    case GET_PAGE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CREATE_PAGE:
      return { ...state, error: '', loading: true };
    case CREATE_PAGE_SUCCESS:
      return { ...state, payload: action.payload, loading: false };
    case CREATE_PAGE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GET_LINK_PREVIEW:
      return { ...state, error: '', loading: true };
    case GET_LINK_PREVIEW_SUCCESS:
      return { ...state, linkPreviewData: action.payload, loading: false };
    case GET_LINK_PREVIEW_FAIL:
      return {
        ...state,
        linkPreviewError: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default pageReducer;
