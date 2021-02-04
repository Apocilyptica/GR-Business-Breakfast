import storageTypes from "./storage.types";
import { call, all, put, takeEvery, select, takeLatest } from "redux-saga/effects";

import { getCurrentUser, handleUserProfile, rsf } from "../../firebase/utils";
import { setFileURL } from "./storage.actions";

export function* getSnapshotFromUserAuth(user, additionalData = {}) {
  try {
    const userRef = yield call(handleUserProfile, { userAuth: user, additionalData });
    const snapshot = yield userRef.get();
    const userID = snapshot.id;
    const filePath = "users/" + userID + "/profile.jpg";
    const url = yield call(rsf.storage.getDownloadURL, filePath);
    yield put(setFileURL(url));
  } catch (err) {
    // console.log(err);
  }
}

export function* syncFileUrl() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    console.error(error);
  }
}

export function* sendFileSaga(action) {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    const userID = yield select((state) => state.user.currentUser.id);
    const filePath = "users/" + userID + "/profile.jpg";
    const file = yield select((state) => state.storage.file);
    const task = rsf.storage.uploadFile(filePath, file);
    task.on("state_changed", (snapshot) => {
      const pct = (snapshot.bytesTransferred * 100) / snapshot.totalBytes;
      console.log(`${pct}%`);
    });

    // Wait for upload to complete
    yield task;

    yield call(syncFileUrl);
  } catch (error) {
    console.log(error);
  }
}

export function* rootSaga() {
  yield all([takeEvery(storageTypes.SEND_FILE, sendFileSaga)]);

  yield call(syncFileUrl);
}

export function* onPageLoad() {
  yield all([takeLatest(storageTypes.SYNC_FILE_URL, syncFileUrl)]);
}
export default function* userSagas() {
  yield all([call(rootSaga), call(onPageLoad)]);
}
