import { takeLatest, put, all, call } from 'redux-saga/effects';

import ContentListActionTypes from './contentList.types';

import {
  setContentList,
  setError
} from './contentList.actions';


export function* getMoviesList({ payload }) {
  try {
    const res = yield fetch(`http://localhost:8080/contents/${payload.pageNo}`);
    const data = yield res.json();
    console.log(data);
    yield put(setContentList(data.message.page["content-items"].content));
  } catch (error) {
    yield put(setError(error));
  }
}

export function* onFetch() {
  yield takeLatest(ContentListActionTypes.ON_FETCHING_LIST, getMoviesList);
}

export function* contentListSagas() {
  yield all([
    call(onFetch)
  ]);
}
