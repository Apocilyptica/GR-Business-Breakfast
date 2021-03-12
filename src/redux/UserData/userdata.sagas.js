import userdataTypes from "./userdata.types";
import { call, all, put, takeLatest } from "redux-saga/effects";

import { getCurrentUser, getCurrentUserRef, /*handleUserProfile,*/ rsf } from "../../firebase/utils";
// import { setFileURL, setFileUpload } from "./userdata.actions";
import { updateUserProfile } from "../User/user.actions";

export function* startStorageDelete({ uuid, id }) {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    const snapshot = yield getSnapshotFromUserData(userAuth);
    const userID = snapshot.id;
    const filePath = "users/" + userID + "/" + uuid;
    yield call(rsf.firestore.deleteDocument, `users/${userID}/images/${id}`);
    yield call(rsf.storage.deleteFile, filePath);
  } catch (error) {
    console.log(error);
  }
}

export function* onStartStorageDelete() {
  yield takeLatest(userdataTypes.STORAGE_DELETE, startStorageDelete);
}

export function* getSnapshotFromUserData(user) {
  try {
    const userRef = yield call(getCurrentUserRef, { userAuth: user });
    const snapshot = yield userRef.get();
    return snapshot;
  } catch (error) {
    console.log(error);
  }
}

export function* updateUserData({ dataType, content }) {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    const snapshot = yield getSnapshotFromUserData(userAuth);
    const userID = snapshot.id;
    yield call(rsf.firestore.updateDocument, `users/${userID}`, {
      [dataType]: content,
    });
    yield put(updateUserProfile({ [dataType]: content }));
  } catch (error) {
    console.log(error);
  }
}

export function* onUpdateUserData() {
  yield takeLatest(userdataTypes.UPDATE_USER_DATA, updateUserData);
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

export function* sendSocialLinks({ payload }) {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    const snapshot = yield getSnapshotFromUserData(userAuth);
    const userID = snapshot.id;
    yield call(rsf.firestore.updateDocument, `users/${userID}`, {
      socialLinks: payload,
    });
    yield put(updateUserProfile({ socialLinks: payload }));
  } catch (error) {
    console.log(error);
  }
}

export function* onSendSocialLinks() {
  yield takeLatest(userdataTypes.SEND_SOCIAL_LINKS, sendSocialLinks);
}

// export function* getSnapshotFromUserAuth(user) {
//   try {
//     const userRef = yield call(handleUserProfile, { userAuth: user });
//     const snapshot = yield userRef.get();
//     const userID = snapshot.id;
//     const filePath = "users/" + userID + "/profile.jpg";
//     const url = yield call(rsf.storage.getDownloadURL, filePath);
//     yield call(rsf.firestore.updateDocument, `users/${userID}`, {
//       photoURL: url,
//     });

//     yield put(updateUserProfile({ profilePhotoURL: url }));
//     yield put(setFileURL(url));
//   } catch (err) {
//     // console.log(err);
//   }
// }

// export function* syncFileUrl() {
//   try {
//     const userAuth = yield getCurrentUser();
//     if (!userAuth) return;
//     yield getSnapshotFromUserAuth(userAuth);
//   } catch (error) {
//     console.error(error);
//   }
// }

// export function* sendFileSaga(action) {
//   try {
//     const userAuth = yield getCurrentUser();
//     if (!userAuth) return;
//     const userID = yield select((state) => state.user.currentUser.id);
//     const filePath = "users/" + userID + "/profile.jpg";
//     const file = yield select((state) => state.userdata.file);
//     const task = rsf.storage.uploadFile(filePath, file);
//     task.on("state_changed", (snapshot) => {
//       const pct = (snapshot.bytesTransferred * 100) / snapshot.totalBytes;
//       console.log(`${pct}%`);
//       setFileUpload(pct);
//     });

//     // Wait for upload to complete
//     yield task;

//     yield call(syncFileUrl);
//   } catch (error) {
//     console.log(error);
//   }
// }

// export function* rootSaga() {
//   yield all([takeEvery(userdataTypes.SEND_FILE, sendFileSaga)]);

//   yield call(syncFileUrl);
// }

export default function* userSagas() {
  yield all([call(onSetBioStart), call(onSendSocialLinks), call(onStartStorageDelete), call(onUpdateUserData)]);
}
