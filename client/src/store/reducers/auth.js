import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
  email: null,
  id: null,
  firstName: null,
  lastName: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN:
      return { ...state, email: action.payload.email };
    case actionTypes.SIGN_OUT:
      return { ...state, email: null, id: null, firstName: null, lastName: null };
    case actionTypes.SIGN_UP:
      return { ...state, email: action.payload };
    case actionTypes.GET_USER:
      return {
        ...state,
        email: action.payload.email,
        id: action.payload.id,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
      };
    default:
      return state;
  }
};

export default reducer;
