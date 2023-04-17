import { authFireBase, firestoreDB } from "../firebase/firebaseService";
import { toast } from "react-toastify";
import { get } from "lodash";

const log = console.log;

export const getFirebaseUser = () => {
  return new Promise((resolve) =>
    authFireBase().onAuthStateChanged((user) => resolve(user))
  );
};

export const logoutUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "LOGOUT_USER" });
    return await authFireBase()
      .signOut()
      .then(() => {
        // Sign-out successful.
        dispatch({ type: "LOGOUT_USER_SUCCESS" });
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

const appVerifier = () => {
  if (window.recaptchaVerifier) {
    return;
  }

  window.recaptchaVerifier = new authFireBase.RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "invisible",
    }
  );

  window.recaptchaVerifier.render();
  return;
};

export const verifyPhoneContactUs = (params) => async (dispatch, getState) => {
  const { phone, otp } = params;
  appVerifier();
  const provider = new authFireBase.PhoneAuthProvider();
  return await provider
    .verifyPhoneNumber(phone, window.recaptchaVerifier)
    .then(function (verificationId) {
      return authFireBase.PhoneAuthProvider.credential(verificationId, otp);
    })
    .then(function (phoneCredential) {
      return phoneCredential;
    })
    .catch(function (error) {
      toast.error(error.message);
      return null;
    });
};

export const contactUs = (params) => async (dispatch, getState) => {
  const { name, email, phone, message } = params;
  appVerifier();
  firestoreDB
    .collection("contact")
    .add({
      name,
      email,
      phone,
      message,
    })
    .then(function (docRef) {
      return docRef.id;
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
      return error;
    });
};

export const verifyPhone = (params) => async (dispatch, getState) => {
  const { phone } = params;
  // 'recaptcha-container' is the ID of an element in the DOM.
  dispatch({
    type: "VERIFY_USER",
    loading: true,
  });
  appVerifier();
  const provider = new authFireBase.PhoneAuthProvider();
  return provider
    .verifyPhoneNumber(phone, window.recaptchaVerifier)
    .then(function (verificationId) {
      dispatch({
        type: "VERIFY_USER_SUCCESS",
        loading: false,
      });
      return verificationId;
    })
    .catch(function (error) {
      dispatch({
        type: "VERIFY_USER_FAIL",
        loading: false,
        error: error.message,
      });
    });
};

export const linkPhoneNumber = (params) => async (dispatch, getState) => {
  const { verificationCode, verificationId } = params;
  let credential = authFireBase.PhoneAuthProvider.credential(
    verificationId,
    verificationCode
  );

  let currentUser = authFireBase().currentUser;
  return await currentUser
    .linkWithCredential(credential)
    .then(function (result) {
      return result;
    })
    .catch(function (error) {
      toast.error(error.message);
      return null;
    });
};

export const updateUser = (params) => async (dispatch, getState) => {
  dispatch({
    type: "UPDATE_USER_FIREBASE",
    loading: true,
  });

  try {
    let {
      dateOfBirth,
      gender,
      zipCode = "",
      mobileStatus = "unverified",
      phone = "",
    } = params;
    const uid = authFireBase().currentUser && authFireBase().currentUser.uid;
    let docRef = firestoreDB.collection("users").doc(uid);
    let o = {};
    return await docRef
      .get()
      .then(function (thisDoc) {
        if (thisDoc.exists) {
          if (dateOfBirth) {
            o.dateOfBirth = dateOfBirth;
          }

          if (gender) {
            o.gender = gender;
          }

          if (zipCode) {
            o.zipCode = zipCode;
          }

          if (mobileStatus) {
            o.mobileStatus = mobileStatus;
          }

          if (phone) {
            o.phoneNumber = phone;
          }

          o.status = "updated";
          docRef.update(o);
        } else {
          //new user
          signupOnFirebase(params);
        }
        dispatch({
          type: "UPDATE_USER_FIREBASE_SUCCESS",
          loading: false,
        });
        return thisDoc.id;
      })
      .catch(function (error) {
        toast(error.message);
        dispatch({
          type: "UPDATE_USER_FIREBASE_FAIL",
          loading: false,
        });
        return error;
      });
  } catch (error) {
    log("User already exists");
  }
};

/**
 * Signup on firebase
 * @param user object
 */

export const addSource = (params) => async (dispatch, getState) => {
  const { userId, dom, src, url = "" } = params;
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  try {
    firestoreDB.collection("sources").doc(userId).set({
      dom,
      src,
      url,
      userId,
      timestamp: today,
    });
  } catch (error) {
    log("There was an error on adding sources");
  }
};

/**
 * Signup on firebase
 * @param user object
 */

export const signupOnFirebase = (params) => async (dispatch, getState) => {
  try {
    const user = authFireBase().currentUser;
    let { firstName, lastName, email, password } = params;

    dispatch({
      type: "CREATE_USER_FIREBASE",
      loading: true,
    });
    if (user != null) {
      dispatch({
        type: "CREATE_USER_FIREBASE_ERROR",
        loading: false,
        user,
      });
      return user;
    } else {
      return await authFireBase()
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          // Signed in
          if (
            result &&
            result.user &&
            get(result, "user.emailVerified") === false
          ) {
            result.user.sendEmailVerification().then(function () {
              log("email verification sent to user");
            });
          }
          firestoreDB.collection("users").doc(result.user.uid).set({
            uid: result.user.uid,
            firstName,
            lastName,
            email,
            password,
            status: "created",
          });

          dispatch({
            type: "CREATE_USER_FIREBASE_SUCCESS",
            loading: false,
            payload: result.user,
          });
          return result.user;
          // ...
        })
        .catch((error) => {
          toast.error(error.message);
          dispatch({
            type: "CREATE_USER_FIREBASE_ERROR",
            loading: false,
            error,
          });
          return null;
          // ..
        });
    }
  } catch (error) {
    log("initiateAuth - error", error);
  }
};

const updateUserData = (id, gender, zipCode = "", dateOfBirth = "") => {
  try {
    let genderCode = "1";
    if (gender === "Male") {
      genderCode = "1";
    } else if (gender === "Female") {
      genderCode = "2";
    } else {
      genderCode = "0";
    }

    const API_BASE_URL =
      "https://us-central1-nature-clubs-production.cloudfunctions.net/api/v1/updateUser";

    const body = {
      id,
      gender: genderCode,
      postal_code: zipCode,
      dob: dateOfBirth,
    };

    fetch(API_BASE_URL, {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((result) => {
        if (get(result, "message") === "success") {
          setTimeout(function () {
            // window.location.href = "https://in.natureclubs.com/user/login/";
          }, 200);
        }
      })
      .catch((error) => log("error", error));
  } catch (error) {
    log("initiateSignup - error", error);
  }
};

export const signupFunc = (params) => async (dispatch, getState) => {
  try {
    let {
      email,
      firstName,
      lastName,
      password,
      zipCode,
      gender,
      dateOfBirth,
    } = params;
    dispatch({
      type: "CREATE_USER",
      loading: true,
    });
    const name = firstName + " " + lastName;

    const API_BASE_URL =
      "https://us-central1-nature-clubs-production.cloudfunctions.net/api/v1/user";

    const body = {
      full_name: name,
      email,
      password,
      postal_code: zipCode,
    };

    fetch(API_BASE_URL, {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((result) => {
        if (get(result, "message") === "success") {
          dispatch({
            type: "CREATE_USER_SUCCESS",
            loading: false,
          });
          log(result);
          updateUserData(
            get(result, "response.data.user_id", ""),
            gender,
            zipCode,
            dateOfBirth
          );
        }
      })
      .catch((error) => log("error", error));
  } catch (error) {
    dispatch({
      type: "CREATE_USER_ERROR",
      loading: false,
    });
    log("initiateSignup - error", error);
  }
};
