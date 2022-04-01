import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
  posts: null,
};

const postReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.CREATE_POST:
      return { ...state };
    default:
      return state;
  }
};

// export default (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     case actionTypes.CREATE_POST:
//       return { ...state };
//     default:
//       return state;
//   }
// };

export default postReducer;
