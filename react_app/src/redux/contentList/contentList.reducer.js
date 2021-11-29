import ContentListActionTypes from "./contentList.types";

const INITIAL_STATE = {
  movieList: [],
  totalItems: 0,
  pagesFetched: 0,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ContentListActionTypes.SET_CONTENT_LIST:
      const {data,totalItems,pagesFetched} = action.payload;
      if(totalItems < state.pagesFetched){
        return state;
      }
      return {
        ...state,
        movieList: [...state.movieList,...data],
        totalItems: totalItems,
        pagesFetched: state.pagesFetched+parseInt(pagesFetched),
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
