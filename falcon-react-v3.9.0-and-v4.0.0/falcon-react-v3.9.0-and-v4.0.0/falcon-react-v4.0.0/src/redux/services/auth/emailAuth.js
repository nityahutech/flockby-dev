const log = console.log;
import { API_BASE_URL } from "fby-common/dist/config";
import {
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGOUT_USER,
  GET_USER_TOKEN,
  GET_USER_TOKEN_FAIL,
  GET_USER_TOKEN_SUCCESS,
  SET_EMAIL,
  SIGNOUT_REQUEST,
} from "redux/actionTypes/authActionTypes";
import get from "lodash/get";
import { authFireBase } from "fby-common";

const HOST_BASE_URL = "http://rjs.natureclubs.net";

export const logoutUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LOGOUT_USER });
    return await authFireBase()
      .signOut()
      .then(() => {
        // Sign-out successful.
        dispatch({ type: SIGNOUT_REQUEST });
        dispatch({ type: LOGOUT_USER });
        return true;
      })
      .catch((error) => {
        // An error happened.
        log("logoutUser - error", error);
        return false;
      });
  } catch (error) {
    log("logoutUser - error", error);
  }
};

export const getFirebaseUser = () => {
  return new Promise(resolve => authFireBase().onAuthStateChanged(user => resolve(user)));
}

export const checkUser = async (dispatch) => {
  dispatch({
    type: GET_USER_TOKEN,
  });
  const user = await getFirebaseUser();
  if (user) {
    return await authFireBase()
      .currentUser.getIdToken(true)
      .then((idToken) => {
        dispatch({
          type: GET_USER_TOKEN_SUCCESS,
          status: true,
          sessionId: idToken,
        });
        return { status: true, sessionId: idToken };
      })
      .catch((error) => {
        dispatch({
          type: GET_USER_TOKEN_FAIL,
          status: false,
          error,
        });
        return { status: false, sessionId: '' };
      })
  } else {
    // Have to add an alert 
    log('Please sign in!');
    return { status: false, sessionId: '' };
  }
}

export const getUserToken = async (dispatch) => {
  try {
    dispatch({
      type: GET_USER_TOKEN,
    });
    return await authFireBase()
      .currentUser.getIdToken(true)
      .then((idToken) => {
        return dispatch({
          type: GET_USER_TOKEN_SUCCESS,
          status: true,
          sessionId: idToken,
        });
      })
      .catch((error) => {
        return dispatch({
          type: GET_USER_TOKEN_FAIL,
          status: false,
          error,
        });
      });
  } catch (error) {
    return dispatch({
      type: GET_USER_TOKEN_FAIL,
      error,
      status: false,
    });
  }
};

const initiateAuth = (params) => async (dispatch, getState) => {
  try {
    let { isNewUser, uid, email, displayName, phoneNumber, photoURL } = params;
    const { sessionId = "" } = await getUserToken(dispatch, getState);

    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    headers.append("Authorization", `Bearer ${sessionId}`);

    log("isNewUser", isNewUser);
    let response = null;
    if (isNewUser) {
      dispatch({
        type: CREATE_USER,
        loading: true,
      });
      displayName = displayName.split(" ");
      const body = JSON.stringify({
        uid,
        email,
        network: "wildapp",
        firstName: displayName[0],
        lastName: get(displayName, `${[1]}`, ""),
        phoneNumber,
        imageURLs: photoURL,
      });
      let requestOptions = {
        method: "POST",
        headers,
        body,
      };

      const resp = await fetch(
        `${API_BASE_URL}/v1/auth/createUser`,
        requestOptions
      ).then((response) => response);

      response = await resp.text();

      if (resp.status === 200) {
        response = JSON.parse(response);
        log("response", response);
        dispatch({
          type: CREATE_USER_SUCCESS,
          loading: false,
          payload: response,
        });
      } else {
        response = JSON.parse(response);
        dispatch({
          type: CREATE_USER_FAIL,
          loading: false,
          payload: response,
        });
      }
    } else {
      dispatch({
        type: LOGIN_USER,
        loading: true,
      });
      const body = JSON.stringify({
        email,
        network: "wildapp",
      });
      let requestOptions = {
        method: "POST",
        headers,
        body,
      };

      const resp = await fetch(
        `${API_BASE_URL}/v1/auth/getUser`,
        requestOptions
      ).then((response) => response);

      response = await resp.text();
      if (resp.status === 200) {
        response = JSON.parse(response);
        log("response", response);
        dispatch({
          type: LOGIN_USER_SUCCESS,
          loading: false,
          payload: response,
        });
      } else {
        response = JSON.parse(response);
        dispatch({
          type: LOGIN_USER_FAIL,
          loading: false,
          payload: response,
        });
      }
    }
  } catch (error) {
    log("initiateAuth - error", error);
  }
};

export const loginViaGoogle = () => async (dispatch, getState) => {
  try {
    return new Promise(async (resolve, reject) => {
      const provider = new authFireBase.GoogleAuthProvider();
      authFireBase()
        .signInWithPopup(provider)
        .then(async (result) => {
          const { isNewUser } = result.additionalUserInfo;
          let { uid, email, displayName, phoneNumber, photoURL } = result.user;

          await dispatch(
            initiateAuth({
              isNewUser,
              uid,
              email,
              displayName,
              phoneNumber,
              photoURL,
            })
          );
          resolve();
        })
        .catch((error) => {
          log("error", error);
          reject(error);
        });
    });
  } catch (error) {
    log("loginViaGoogle - error", error);
  }
};

export const loginViaLink = (emailObj) => async (dispatch, getState) => {
  try {
    const email = get(emailObj, 'emailId');
    const redirectUri = get(emailObj, 'redirectUri', '/')
    log("loginViaLink - email", email);
    dispatch({ type: SET_EMAIL, payload: email });
    const linkParams = {
      url: `${HOST_BASE_URL}/auth/verifyLink?redirectUri=` + redirectUri,
      handleCodeInApp: true,
    };

    await authFireBase().sendSignInLinkToEmail(email, linkParams);
  } catch (error) {
    log("loginViaLink - error", error);
  }
};

export const verifyLoginLink = (link = "") => async (dispatch, getState) => {
  try {
    const { email = "" } = getState().authReducer;
    if (authFireBase().isSignInWithEmailLink(link)) {
      if (!email) {
        email = log("No email address provided");
      }

      return new Promise((resolve, reject) => {
        authFireBase()
          .signInWithEmailLink(email, link)
          .then(async (result) => {
            const { isNewUser } = result.additionalUserInfo;
            const {
              uid,
              email,
              displayName,
              phoneNumber,
              photoURL,
            } = result.user;
            await dispatch(
              initiateAuth({
                isNewUser,
                uid,
                email,
                displayName,
                phoneNumber,
                photoURL,
              })
            );
            resolve();
          })
          .catch((error) => {
            log("error - ", error);
            reject(error);
          });
      });
    } else {
      log("Not authorized link!");
    }
  } catch (error) {
    log("verifyLoginLink - error", error);
  }
};
