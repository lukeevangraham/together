import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
    images: null
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.ADD_IMAGE:
            return { ...state, images: [action.payload, ...state.images] }
        default:
            return state;
    }
}

export default reducer;