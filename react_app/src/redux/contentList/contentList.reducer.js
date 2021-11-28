import ContentListActionTypes from "./contentList.types";

const INITIAL_STATE = {
  movieList: [],
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ContentListActionTypes.SET_CONTENT_LIST:
      return {
        ...state,
        movieList: action.payload,
        error: null,
      };
    case ContentListActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
