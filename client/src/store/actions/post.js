import * as actionTypes from "./actionTypes";
import server from "../../apis/server";

export const createPost = (formValues) => async (dispatch) => {
  try {
    const response = await server.post("/posts", { ...formValues });
    dispatch({ type: actionTypes.CREATE_POST, payload: response.data });
  } catch (error) {
    console.log("[Post Action]: ", error);
  }
};

export const fetchPosts = () => async (dispatch) => {
  const response = await server.get("/posts");
  dispatch({ type: actionTypes.FETCH_POSTS, payload: response.data });
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    const response = await server.delete(`/posts/${postId}`);
    console.log("RESPONSE: ", response);
    dispatch({
      type: actionTypes.DELETE_POST,
      payload: { id: postId, res: response },
    });
  } catch (error) {
    console.log("error: ", error);
  }
};

export const editPost = (postInfo) => async (dispatch) => {
  try {
    const response = await server.put(`/posts`, {
      body: postInfo.body,
      id: postInfo.id,
    });
    dispatch({
      type: actionTypes.EDIT_POST,
      payload: postInfo,
    });
  } catch (error) {
    console.log("E: ", error);
  }
};
