import { API_BASE_URL } from 'fby-common/dist/config';
import {
  GET_POST,
  GET_POST_SUCCESS,
  GET_POST_FAIL,
  GET_PAGE,
  GET_PAGE_SUCCESS,
  GET_PAGE_FAIL,
  CREATE_PAGE,
  CREATE_PAGE_SUCCESS,
  CREATE_PAGE_FAIL,
  CREATE_POST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  GET_NEWS,
  GET_NEWS_SUCCESS,
  GET_NEWS_FAIL,
  CREATE_NEWS_ARTICLE,
  CREATE_NEWS_ARTICLE_SUCCESS,
  CREATE_NEWS_ARTICLE_FAIL,
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAIL,
  GET_LINK_PREVIEW,
  GET_LINK_PREVIEW_SUCCESS,
  GET_LINK_PREVIEW_FAIL,
} from 'redux/actionTypes/pageTypes';
import FormData from 'form-data';
import get from 'lodash/get';
import { checkUser } from 'redux/services';

export const getPage = (payload) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_PAGE,
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

    const response = await fetch(`${API_BASE_URL}/v1/getPages`, requestOptions);
    const pagesData = await response.json();

    if (response.status === 200) {
      dispatch({
        type: GET_PAGE_SUCCESS,
        message: "SUCCESS",
        loading: false,
        payload: pagesData,
      });
    } else {
      dispatch({
        type: GET_PAGE_FAIL,
        error: pagesData,
        loading: false,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_PAGE_FAIL,
      error: err,
      loading: false,
    });
  }
};

export const createPage = payload => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_PAGE,
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
    const requestOptions = {
      method: 'POST',
      headers,
      body,
      redirect: 'follow',
    };


    return await fetch(
      `${API_BASE_URL}/v1/form/createPage`,
      requestOptions
    ).then((response) => {
      const respData = response.json();

      if (response.status === 200) {
        dispatch({
          type: CREATE_PAGE_SUCCESS,
          message: "SUCCESS",
          loading: false,
          payload: respData,
        });
        return respData;
      } else {
        dispatch({
          type: CREATE_PAGE_FAIL,
          error: respData,
          loading: false,
        });
        return respData;
      }
    });
  } catch (err) {
    dispatch({
      type: CREATE_PAGE_FAIL,
      error: err,
      loading: false,
    });
  }
}; 

export const composeANewPost = payload => async (dispatch, getState) => {
  try {
    let headers = new Headers();
    payload.authorUserId = get(getState().authReducer, 'currentUser.userId', '');
    payload.type = 'post';
    const body = JSON.stringify(payload);

    const { sessionId = "" } = await checkUser(dispatch);
    headers.append('Content-Type', 'application/json');
    headers.append(
      'Authorization',
      `Bearer ${sessionId}`,
    );
    const requestOptions = {
      method: 'POST',
      headers,
      body,
      redirect: 'follow',
    };

    return await fetch(
      `${API_BASE_URL}/v1/post/create`,
      requestOptions
    ).then((response) => {
      const respData = response.json();

      if (response.status === 200) {
        return respData;
      } else {
        return respData;
      }
    });
  } catch (err) {
  }
};

export const getPost = (payload) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_POST,
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
      `${API_BASE_URL}/v1/getPost`,
      requestOptions
    ).then((response) => {
      const respData = response.json();

      if (response.status === 200) {
        dispatch({
          type: GET_POST_SUCCESS,
          message: "SUCCESS",
          loading: false,
          payload: respData,
        });
        return respData;
      } else {
        dispatch({
          type: GET_POST_FAIL,
          error: respData,
          loading: false,
        });
        return respData;
      }
    });
  } catch (err) {
    dispatch({
      type: GET_POST_FAIL,
      error: err,
      loading: false,
    });
  }
};

export const createPost = payload => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_POST,
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
    const requestOptions = {
      method: 'POST',
      headers,
      body,
      redirect: 'follow',
    };

    return await fetch(
      `${API_BASE_URL}/v1/form/createExternalPost`,
      requestOptions
    ).then((response) => {
      const respData = response.json();

      if (response.status === 200) {
        dispatch({
          type: CREATE_POST_SUCCESS,
          message: "SUCCESS",
          loading: false,
          payload: respData,
        });
        return respData;
      } else {
        dispatch({
          type: CREATE_POST_FAIL,
          error: respData,
          loading: false,
        });
        return respData;
      }
    });
  } catch (err) {
    dispatch({
      type: CREATE_POST_FAIL,
      error: err,
      loading: false,
    });
  }
};

export const getNews = payload => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_NEWS,
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
    const requestOptions = {
      method: 'POST',
      headers,
      body,
      redirect: 'follow',
    };

    return await fetch(
      `${API_BASE_URL}/v1/news/get`,
      requestOptions
    ).then((response) => {
      const respData = response.json();
      if (response.status === 200) {
        dispatch({
          type: GET_NEWS_SUCCESS,
          message: "SUCCESS",
          loading: false,
          payload: respData,
        });
        return respData;
      } else {
        dispatch({
          type: GET_NEWS_FAIL,
          error: respData,
          loading: false,
        });
        return respData;
      }
    });
  } catch (err) {
    dispatch({
      type: GET_NEWS_FAIL,
      error: err,
      loading: false,
    });
  }
};

export const createArticle = payload => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_NEWS_ARTICLE,
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
    const requestOptions = {
      method: 'POST',
      headers,
      body,
      redirect: 'follow',
    };

    return await fetch(
      `${API_BASE_URL}/v1/form/createArticle`,
      requestOptions
    ).then((response) => {
      const respData = response.json();

      if (response.status === 200) {
        dispatch({
          type: CREATE_NEWS_ARTICLE_SUCCESS,
          message: "SUCCESS",
          loading: false,
          payload: respData,
        });
        return respData;
      } else {
        dispatch({
          type: CREATE_NEWS_ARTICLE_FAIL,
          error: respData,
          loading: false,
        });
        return respData;
      }
    });
  } catch (err) {
    dispatch({
      type: CREATE_NEWS_ARTICLE_FAIL,
      error: err,
      loading: false,
    });
  }
};

export const uploadImage = payload => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPLOAD_IMAGE,
      loading: true,
    });
    let headers = new Headers();
    let formData = new FormData();
    if (get(payload, 'file')) {
      formData.append('file', payload.file);
    }

    if (get(payload, 'croppedImage')) {
      formData.append('croppedImage', payload.croppedImage);
    }

    const { sessionId = "" } = await checkUser(dispatch);
    headers.append(
      'Authorization',
      `Bearer ${sessionId}`,
    );

    const requestOptions = {
      method: 'POST',
      headers,
      body: formData,
      redirect: 'follow',
    };

    return await fetch(`${API_BASE_URL}/v1/form/upload`, requestOptions).then(
      response => {
        const payloadData = response.json();
        if (response.status === 200) {
          dispatch({
            type: UPLOAD_IMAGE_SUCCESS,
            message: 'SUCCESS',
            loading: false,
            payload: payloadData,
          });
          return payloadData;
        } else {
          dispatch({
            type: UPLOAD_IMAGE_FAIL,
            error: payloadData,
            loading: false,
          });
        }
      },
    );
  } catch (err) {
    dispatch({
      type: UPLOAD_IMAGE_FAIL,
      error: err,
      loading: false,
    });
  }
};

export const getLinkPreview = payload => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_LINK_PREVIEW,
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
    const requestOptions = {
      method: 'POST',
      headers,
      body,
      redirect: 'follow',
    };

    return await fetch(
      `${API_BASE_URL}/v1/getLinkPreview`,
      requestOptions,
    ).then(response => {
      const payloadData = response.json();
      if (response.status === 200) {
        dispatch({
          type: GET_LINK_PREVIEW_SUCCESS,
          message: 'SUCCESS',
          loading: false,
          payload: payloadData,
        });
        return payloadData;
      } else {
        dispatch({
          type: GET_LINK_PREVIEW_FAIL,
          error: payloadData,
          loading: false,
        });
      }
    });
  } catch (err) {
    dispatch({
      type: GET_LINK_PREVIEW_FAIL,
      error: err,
      loading: false,
    });
  }
};

export const getSlug = (payload) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'GET_SLUG',
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
      `${API_BASE_URL}/v1/slug/get`,
      requestOptions
    ).then((response) => {
      const respData = response.json();

      if (response.status === 200) {
        dispatch({
          type: 'GET_SLUG_SUCCESS',
          message: "SUCCESS",
          loading: false,
          payload: respData,
        });
        return respData;
      } else {
        dispatch({
          type: 'GET_SLUG_FAIL',
          error: respData,
          loading: false,
        });
        return respData;
      }
    });
  } catch (err) {
    dispatch({
      type: 'GET_SLUG_FAIL',
      error: err,
      loading: false,
    });
  }
};
