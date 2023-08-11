import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
  posts: null,
};

const postReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.CREATE_POST:
      const newPost = {
        id: action.payload.id,
        body: action.payload.body,
        UserId: action.payload.UserId,
        createdAt: new Date(),
      };
      return {
        ...state,
        posts: [newPost, ...state.posts],
      };
    case actionTypes.FETCH_POSTS:
      return { ...state, posts: action.payload };
    case actionTypes.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload.id),
      };
    case actionTypes.EDIT_POST:
      return {
        ...state,
        posts: state.posts.map(function (post) {
          if (post.id === action.payload.id) {
            return { ...post, body: action.payload.body };
          } else {
            return post;
          }
        }),
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
