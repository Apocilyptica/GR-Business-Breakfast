import userdataTypes from "./userdata.types";
import { call, all, put, takeEvery, select, takeLatest } from "redux-saga/effects";

import { getCurrentUser, getCurrentUserRef, handleUserProfile, rsf } from "../../firebase/utils";
import { setFileURL } from "./userdata.actions";
import { updateUserProfile } from "../User/user.actions";

export function* getSnapshotFromUserData(user) {
  try {
    const userRef = yield call(getCurrentUserRef, { userAuth: user });
    const snapshot = yield userRef.get();
    return snapshot;
  } catch (error) {
    console.log(error);
  }
}

export function* setBio({ payload }) {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    const snapshot = yield getSnapshotFromUserData(userAuth);
    const userID = snapshot.id;
    yield call(rsf.firestore.updateDocument, `users/${userID}`, {
      bio: payload,
    });
    yield put(updateUserProfile({ bio: payload }));
  } catch (error) {
    console.log(error);
  }
}

export function* onSetBioStart() {
  yield takeLatest(userdataTypes.SEND_BIO, setBio);
}

export function* getSnapshotFromUserAuth(user) {
  try {
    const userRef = yield call(handleUserProfile, { userAuth: user });
    const snapshot = yield userRef.get();
    const userID = snapshot.id;
    const filePath = "users/" + userID + "/profile.jpg";
    const url = yield call(rsf.storage.getDownloadURL, filePath);
    yield call(rsf.firestore.updateDocument, `users/${userID}`, {
      photoURL: url,
    });

    yield put(updateUserProfile({ photoURL: url }));
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
    const file = yield select((state) => state.userdata.file);
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
  yield all([takeEvery(userdataTypes.SEND_FILE, sendFileSaga)]);

  yield call(syncFileUrl);
}

export default function* userSagas() {
  yield all([call(rootSaga), call(onSetBioStart)]);
}