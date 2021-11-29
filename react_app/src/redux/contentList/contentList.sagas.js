import { takeLatest, put, all, call } from "redux-saga/effects";
import axios from "axios";

import ContentListActionTypes from "./contentList.types";

import {
  setContentList,
  setSearchedContentList,
  setError,
} from "./contentList.actions";

export function* getMoviesList({ payload }) {
  const { pageNo, query, type } = payload;
  try {
    const res = yield axios({
      method: "GET",
      url: `http://localhost:8080/contents/${pageNo}`,
      params: {
        q: query,
      },
    });
    console.log(res);
    const { page } = res.data.message.data;
    if (type === "search") {
      yield put(
        setSearchedContentList({
          title: page.title,
          data: page["content-items"].content,
          totalItems: page["total-content-items"],
          pagesFetched: page["page-size-returned"],
        })
      );
    }
    if (type === "scroll") {
      yield put(
        setContentList({
          title: page.title,
          data: page["content-items"].content,
          totalItems: page["total-content-items"],
          pagesFetched: page["page-size-returned"],
        })
      );
    }
  } catch (error) {
    yield put(setError(error));
  }
}

export function* onFetch() {
  yield takeLatest(ContentListActionTypes.ON_FETCHING_LIST, getMoviesList);
}

export function* onSearch() {
  yield takeLatest(ContentListActionTypes.ON_SEARCH, getMoviesList);
}

export function* contentListSagas() {
  yield all([call(onFetch), call(onSearch)]);
}
