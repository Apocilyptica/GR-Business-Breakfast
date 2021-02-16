import adminTypes from "./admin.types";
import { takeLatest, call, all, put } from "redux-saga/effects";
import { rsf } from "../../firebase/utils";

import { gotUsers } from "./admin.actions";

export function* getUsersData() {
  const snapshot = yield call(rsf.firestore.getCollection, "users");
  let users;
  snapshot.forEach((user) => {
    users = {
      ...users,
      [user.id]: user.data(),
    };
  });

  yield put(gotUsers(users));
}

export function* onStartGetUsersData() {
  yield takeLatest(adminTypes.GET_USERS_DATA, getUsersData);
}

export default function* adminSagas() {
  yield all([call(onStartGetUsersData)]);
}
