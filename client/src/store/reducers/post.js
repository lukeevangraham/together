import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
  posts: null,
};

const postReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.CREATE_POST:
      return { ...state };
    case actionTypes.FETCH_POSTS:
      return { ...state, posts: action.payload };
    case actionTypes.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload.id),
      };
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
