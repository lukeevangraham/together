import * as actionTypes from "./actionTypes";
import server from "../../apis/server";

export const signIn = (formValues) => async (dispatch) => {
  console.log("Signing in!")
  try {
    const response = await server.post("/login", { ...formValues });
    dispatch({ type: actionTypes.SIGN_IN, payload: response.data });
  } catch (error) {
    console.log("Error: ", error)
  }
};

export const getUser = () => async (dispatch) => {
  const response = await server.get("user_data");
  dispatch({ type: actionTypes.GET_USER, payload: response.data });
};

export const signOut = () => async (dispatch) => {
  const response = await server.get("/logout")
  console.log("[action]: Signout clicked ", response)
  dispatch({
    type: actionTypes.SIGN_OUT,
    payload: response.data
  })
};
