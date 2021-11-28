import { createSelector } from 'reselect';

const selectContentList = state => state.contentList;

export const selectMovieList = createSelector(
  [selectContentList],
  contentList => contentList
);
