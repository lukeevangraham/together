import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
  posts: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.CREATE_POST:
      console.log("REDUCER: ", action.payload)
      return { ...state };
    default:
      return state;
  }
};
