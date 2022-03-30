import * as actionTypes from "./actionTypes";
import server from "../../apis/server";

// export const createPost = (formValues) => async (dispatch) => {
//   console.log("HERE GOES!")

//     const response = await server.post("/posts", { ...formValues });
//     dispatch({ type: actionTypes.CREATE_POST, payload: response.data });

// };

export const createPost = (formValues) => {
  console.log("HERE [actions]: ", formValues);
  return (dispatch) => {
    server.post("/posts", { ...formValues }).then((response) => {
      dispatch({ type: actionTypes.CREATE_POST, payload: response.data });
    });
    // dispatch({ type: actionTypes.CREATE_POST, payload:  })
  };
};
