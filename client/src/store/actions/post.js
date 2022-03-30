import * as actionTypes from "./actionTypes";
import server from "../../apis/server";

// export const createPost = (formValues) => async (dispatch) => {
//   console.log("HERE GOES!")

//     const response = await server.post("/posts", { ...formValues });
//     dispatch({ type: actionTypes.CREATE_POST, payload: response.data });

// };

export const createPost = (formValues) => {
  return (dispatch) => {
    console.log("HERE [actions]: ", formValues);
    server.post("/posts", { ...formValues }).then((response) => {
      console.log("HERE IS A RESPONSE: ", response.data);
      dispatch({ type: actionTypes.CREATE_POST, payload: response.data });
    });
    // dispatch({ type: actionTypes.CREATE_POST, payload:  })
  };
};
