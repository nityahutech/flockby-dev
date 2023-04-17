import { API_BASE_URL } from "fby-common/dist/config";
import {
  CREATE_SPACE,
  CREATE_SPACE_SUCCESS,
  CREATE_SPACE_FAIL,
  GET_SPACE,
  GET_SPACE_SUCCESS,
  GET_SPACE_FAIL,
} from 'redux/actionTypes/spaceTypes';
import { checkUser } from 'redux/services';

export const createSpace = (payload) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_SPACE,
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
      method: "POST",
      headers,
      body,
      redirect: "follow",
    };

    return await fetch(
      `${API_BASE_URL}/v1/form/createSpace`,
      requestOptions
    ).then((response) => {
      const respData = response.json();

      if (response.status === 200) {
        dispatch({
          type: CREATE_SPACE_SUCCESS,
          message: "SUCCESS",
          loading: false,
          payload: respData,
        });
        return respData;
      } else {
        dispatch({
          type: CREATE_SPACE_FAIL,
          error: respData,
          loading: false,
        });
        return respData;
      }
    });
  } catch (err) {
    dispatch({
      type: CREATE_SPACE_FAIL,
      error: err,
      loading: false,
    });
  }
};

export const getSpace = (payload) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_SPACE,
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
      method: "POST",
      headers,
      body,
      redirect: "follow",
    };

    return await fetch(
      `${API_BASE_URL}/v1/getSpace`,
      requestOptions
    ).then((response) => {
      const respData = response.json();

      if (response.status === 200) {
        dispatch({
          type: GET_SPACE_SUCCESS,
          message: "SUCCESS",
          loading: false,
          payload: respData,
        });
        return respData;
      } else {
        dispatch({
          type: GET_SPACE_FAIL,
          error: respData,
          loading: false,
        });
        return respData;
      }
    });
  } catch (err) {
    dispatch({
      type: GET_SPACE_FAIL,
      error: err,
      loading: false,
    });
  }
};
