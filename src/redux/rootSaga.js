import { all, fork } from "redux-saga/effects";

// Sagas
import userSagas from "./User/user.sagas";
import userdataSagas from "./UserData/userdata.sagas";

export default function* rootSaga() {
  yield all([fork(userSagas), fork(userdataSagas)]);
}
