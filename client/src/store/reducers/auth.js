import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
  email: null,
  id: null,
  firstName: null,
  lastName: null,
  error: null,
  passChangeError: null,
  image: null,
  searchResults: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN:
      return { ...state, id: action.payload.id, error: null };
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
      console.log("GET USER LOAD", action.payload);
      return {
        ...state,
        id: action.payload.id,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        image: action.payload.image,
      };
    case actionTypes.UPDATE_USER:
      console.log("REDUCER LOAD: ", action.payload);
      if (action.payload.data.length > 0) {
        return {
          ...state,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
        };
      }
      if (action.payload.errors) {
        return {
          ...state,
          error: action.payload.errors,
        };
      } else
        return {
          ...state,
          error: null,
        };
    case actionTypes.AUTH_FAIL:
      return { ...state, error: action.error };
    case actionTypes.CHANGE_PASSWORD_FAIL:
      return { ...state, passChangeError: action.error };
    case actionTypes.CHANGE_PASSWORD_SUCCESS:
      console.log("SUCCESS!!");
      return { ...state, passChangeError: null };
    case actionTypes.ADD_USER_IMAGE:
      return { ...state, image: action.payload };
    case actionTypes.SEARCH_USERS:
      return { ...state, searchResults: action.payload };
    default:
      return state;
  }
};

export default reducer;
