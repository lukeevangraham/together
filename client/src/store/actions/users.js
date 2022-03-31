import * as actionTypes from "./actionTypes";
import server from "../../apis/server";

export const searchUsers = (formValues) => async (dispatch) => {
  console.log("VALUES: ", formValues);
  try {
    const response = await server.get(`/users/${formValues}`);
    dispatch({ type: actionTypes.SEARCH_USERS, payload: response.data });
  } catch (error) {
    console.log("ERROR: ", error);
  }
};
