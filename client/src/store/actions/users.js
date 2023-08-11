import * as actionTypes from "./actionTypes";
import server from "../../apis/server";

export const searchUsers = (formValues) => async (dispatch) => {
  try {
    const response = await server.get(`/users/${formValues}`);
    console.log("RES: ", response);
    dispatch({ type: actionTypes.SEARCH_USERS, payload: response.data });
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

export const followUser = (data) => async (dispatch, getState) => {
  console.log("HERE: ", getState().auth.id);
  data.UserId = getState().auth.id;
  const response = await server.post(`/following/`, data);
  console.log("RES: ", response);
};
