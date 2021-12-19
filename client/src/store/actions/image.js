import * as actionTypes from "../actions/actionTypes";
import server from "../../apis/server";
// import res from "express/lib/response";

export const addImage = (imageData) => async (dispatch) => {
    console.log("adding image")
    try {
        const response = await server.post("/addImage", imageData)
        dispatch({ type: actionTypes.ADD_IMAGE, payload: response.data })
    } catch (error) {
        console.log("Error: ", error.message)
        dispatch({ type: actionTypes.GET_ERRORS, payload: error.response.data })
    }

}