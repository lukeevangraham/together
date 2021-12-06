import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
  email: null,
  id: null,
  firstName: null,
  lastName: null,
  error: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN:
      return { ...state, email: action.payload.email };
    case actionTypes.SIGN_OUT:
      return {
        ...state,
        email: null,
        id: null,
        firstName: null,
        lastName: null,
      };
    case actionTypes.SIGN_UP:
      return { ...state, email: action.payload };
    case actionTypes.GET_USER:
      return {
        ...state,
        id: action.payload.id,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
      };
    case actionTypes.UPDATE_USER:
      console.log("REDUCER LOAD: ", action.payload);
      if (action.payload.errors) {
        return {
          ...state,
          error: action.payload.errors,
        };
      } else
        return {
          ...state,
          error: null
        };
    default:
      return state;
  }
};

export default reducer;
