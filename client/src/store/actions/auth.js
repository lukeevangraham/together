import * as actionTypes from "./actionTypes";
import server from "../../apis/server";

export const signIn = (formValues) => async (dispatch) => {
  console.log("Signing in!");
  try {
    const response = await server.post("/login", { ...formValues });
    dispatch({ type: actionTypes.SIGN_IN, payload: response.data });
  } catch (error) {
    console.log("Error: ", error.message);
    error.message === "Request failed with status code 401"
      ? dispatch({
          type: actionTypes.AUTH_FAIL,
          error: { ...error, message: "Invalid email address or password" },
        })
      : dispatch({ type: actionTypes.AUTH_FAIL, error: error });
  }
};

export const getUser = () => async (dispatch) => {
  console.log("getting user!");
  const response = await server.get("user_data");
  dispatch({ type: actionTypes.GET_USER, payload: response.data });
};

export const signOut = () => async (dispatch) => {
  const response = await server.get("/logout");
  console.log("[action]: Signout clicked ", response);
  dispatch({
    type: actionTypes.SIGN_OUT,
    payload: response.data,
  });
};

export const updateUser = (formValues) => async (dispatch) => {
  try {
    const response = await server.put("/user_data", { ...formValues });
    dispatch({
      type: actionTypes.UPDATE_USER,
      payload: {
        data: response.data,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
      },
    });
    // if (response.data.length > 0) {
    //   console.log("special getUser");
    //   const getResponse = await server.get("user_data");
    //   dispatch({ type: actionTypes.GET_USER, payload: getResponse.data });
    //   getUser();
    // }
    signIn();
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

export const changePassword = (formValues) => async (dispatch) => {
  try {
    const response = await server.put("/change_password", { ...formValues });
    console.log("RES: ", response);
    dispatch({ type: actionTypes.CHANGE_PASSWORD_SUCCESS })
  } catch (error) {
    console.log("ERROR: ", error);
    error.message === "Request failed with status code 401"
      ? dispatch({
          type: actionTypes.CHANGE_PASSWORD_FAIL,
          error: { ...error, message: "Invalid current password" },
        })
      : dispatch({ type: actionTypes.AUTH_FAIL, error: error });
  }
};
