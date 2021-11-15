import * as actionTypes from "./actionTypes";
import server from "../../apis/server";

export const signIn = (formValues) => async (dispatch) => {
  const response = await server.post("/login", { ...formValues });

  dispatch({ type: actionTypes.SIGN_IN, payload: response.data });
};

export const getUser = () => async (dispatch) => {
  const response = await server.get("user_data");
  dispatch({ type: actionTypes.GET_USER, payload: response.data });
};

export const signOut = () => {
  return {
    type: actionTypes.SIGN_OUT,
  };
};
