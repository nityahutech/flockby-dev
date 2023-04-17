import { API_BASE_URL } from 'fby-common/dist/config';
import get from 'lodash/get';
import {
  GET_TAGS_FAIL,
  GET_TAGS_SUCCESS,
  GET_TAGS,
  CREATE_TAG,
  CREATE_TAG_SUCCESS,
  CREATE_TAG_FAIL,
} from 'redux/actionTypes/tagsTypes';
import { checkUser } from 'redux/services';

export const getTags = payload => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_TAGS,
      loading: true,
    });
    let headers = new Headers();
    const body = JSON.stringify(payload);

    const { sessionId = "" } = await checkUser(dispatch);
    headers.append('Content-Type', 'application/json');
    headers.append(
      'Authorization',
      `Bearer ${sessionId}`,
    );
    let requestOptions = {
      method: 'POST',
      headers,
      body,
      redirect: 'follow',
    };

    return await fetch(
      `${API_BASE_URL}/v1/getTag`,
      requestOptions
    ).then((response) => {
      const respData = response.json();

      if (response.status === 200) {
        dispatch({
          type: GET_TAGS_SUCCESS,
          message: "SUCCESS",
          loading: false,
          payload: respData,
        });
        return respData;
      } else {
        dispatch({
          type: GET_TAGS_FAIL,
          error: respData,
          loading: false,
        });
        return respData;
      }
    });
  } catch (err) {
    dispatch({
      type: GET_TAGS_FAIL,
      error: err,
      loading: false,
    });
  }
};

export const createTag = payload => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_TAG,
      loading: true,
    });
    let headers = new Headers();
    const body = JSON.stringify(payload);

    const { sessionId = "" } = await checkUser(dispatch);
    headers.append('Content-Type', 'application/json');
    headers.append(
      'Authorization',
      `Bearer ${sessionId}`,
    );
    let requestOptions = {
      method: 'POST',
      headers,
      body,
      redirect: 'follow',
    };

    return await fetch(
      `${API_BASE_URL}/v1/form/createTag`,
      requestOptions
    ).then((response) => {
      const respData = response.json();

      if (response.status === 200) {
        dispatch({
          type: CREATE_TAG_SUCCESS,
          message: "SUCCESS",
          loading: false,
          payload: respData,
        });
        return respData;
      } else {
        dispatch({
          type: CREATE_TAG_FAIL,
          error: respData,
          loading: false,
        });
        return respData;
      }
    });
  } catch (err) {
    dispatch({
      type: CREATE_TAG_FAIL,
      error: err,
      loading: false,
    });
  }
};

