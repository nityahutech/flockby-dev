import {
  CREATE_SPACE,
  CREATE_SPACE_SUCCESS,
  CREATE_SPACE_FAIL,
  GET_SPACE,
  GET_SPACE_SUCCESS,
  GET_SPACE_FAIL,
} from '../actionTypes/spaceTypes';
import unionBy from 'lodash/unionBy';
import get from 'lodash/get';

const INITIAL_STATE = {
  loading: false,
  error: '',
  payload: {},
  message: '',
};

const spaceReducer = (state = INITIAL_STATE, action) => {
  let spacesData = action.payload;
  switch (action.type) {
    case CREATE_SPACE:
      return { ...state, error: '', loading: true };
    case CREATE_SPACE_SUCCESS:
      spacesData.spacesData = unionBy(spacesData.spacesData, get(state.spacesData, 'spacesData', []), 'id');
      return { ...state, spacesData, loading: false };
    case CREATE_SPACE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GET_SPACE:
      return { ...state, error: '', loading: true };
    case GET_SPACE_SUCCESS:
      spacesData.spacesData = unionBy(spacesData.spacesData, get(state.spacesData, 'spacesData', []), 'id');
      return { ...state, spacesData, loading: false };
    case GET_SPACE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default spaceReducer;
