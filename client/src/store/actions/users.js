import * as actionTypes from "./actionTypes";
import server from "../../apis/server";

export const searchUsers = (formValues) => async (dispatch) => {
  try {
    const response = await server.get(`/users/${formValues}`);
    dispatch({ type: actionTypes.SEARCH_USERS, payload: response.data });
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

export const followUser = (data) => async (dispatch, getState) => {
  data.UserId = getState().auth.id;
  const response = await server.post(`/following/`, data);
  dispatch({ type: actionTypes.FOLLOW_USER, payload: response.data });
  // console.log("RES: ", response);
};

export const unfollowUser = (unfollowUserId) => async (dispatch, getState) => {
  const response = await server.delete(
    `/following/${unfollowUserId}/${getState().auth.id}`
  );
  dispatch({ type: actionTypes.UNFOLLOW_USER, payload: unfollowUserId });
};
