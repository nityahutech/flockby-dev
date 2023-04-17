export const signupFunc = (params) => async (dispatch, getState) => {
  try {
    let { email, name, password } = params;

    let myHeaders = new Headers();
    dispatch({
      type: "CREATE_USER",
      loading: true,
    });
    let raw = "";
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const API_BASE_URL =
      " https://in.natureclubs.com/restful_api/user?access_token=1bc33324779cceff1f6535461948e07e9b3276f4&val[email]=" +
      email +
      "&val[full_name]=" +
      name +
      "&val[password]=" +
      password;

    fetch(API_BASE_URL, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        dispatch({
          type: "CREATE_USER_SUCCESS",
          loading: false,
        });
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  } catch (error) {
    dispatch({
      type: "CREATE_USER_ERROR",
      loading: false,
    });
    console.log("initiateSignup - error", error);
  }
};
