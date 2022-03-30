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