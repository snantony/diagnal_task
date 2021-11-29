import { takeLatest, put, all, call } from "redux-saga/effects";
import axios from "axios";

import ContentListActionTypes from "./contentList.types";

import { setContentList, setError } from "./contentList.actions";

export function* getMoviesList({ payload }) {
  try {
    const res = yield axios({
      method: "GET",
      url: `http://localhost:8080/contents/${payload.pageNo}`,
      params: {
        q: payload.query,
      },
    });
    console.log(res);
    const { page } = res.data.message.data;
    yield put(
      setContentList({
        data: page["content-items"].content,
        totalItems: page["total-content-items"],
        pagesFetched: page["page-size-returned"],
      })
    );
  } catch (error) {
    yield put(setError(error));
  }
}

export function* onFetch() {
  yield takeLatest(ContentListActionTypes.ON_FETCHING_LIST, getMoviesList);
}

export function* contentListSagas() {
  yield all([call(onFetch)]);
}
