import { all, fork } from "redux-saga/effects";

// Sagas
import userSagas from "./User/user.sagas";
import storageSagas from "./Storage/storage.sagas";

export default function* rootSaga() {
  yield all([fork(userSagas), fork(storageSagas)]);
}
