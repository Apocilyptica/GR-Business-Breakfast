import adminTypes from "./admin.types";
import { takeLatest, call, all, put } from "redux-saga/effects";
import { rsf, ADMIN } from "../../firebase/utils";

import { gotUsers, gotUser } from "./admin.actions";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

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

export function* startSetUserRole(userData) {
  const uid = userData.payload.uid;
  const updateUser = {};
  const snapshot = yield call(rsf.firestore.getDocument, `users/${uid}`);
  const user = snapshot.data();
  let roles = user.userRoles;
  try {
    if (userData.payload.checked === true) {
      yield call(rsf.firestore.updateDocument, `users/${uid}`, {
        userRoles: [...roles, userData.payload.role],
      });
      updateUser[uid] = { ...user, userRoles: [...roles, userData.payload.role] };
    }
    if (userData.payload.checked === false) {
      const index = roles.indexOf(userData.payload.role);
      if (index > -1) {
        roles.splice(index, 1);
      }
      yield call(rsf.firestore.updateDocument, `users/${uid}`, {
        userRoles: [...roles],
      });
      updateUser[uid] = { ...user, userRoles: [...roles] };
    }
  } catch (error) {
    console.log(error);
  }
  yield put(gotUser(updateUser));
}

export function* onStartSetUserRole() {
  yield takeLatest(adminTypes.SET_USER_ROLE, startSetUserRole);
}

export function* deleteUser(payload) {
  const users = payload.payload;

  console.log(users);
  try {
    yield all(
      users.map((user) => {
        return call(rsf.firestore.deleteDocument, `users/${user}`);
      })
    );
    yield all(
      users.map((user) => {
        const filePath = "users/" + user + "/profile.jpg";
        return call(rsf.storage.deleteFile, filePath);
      })
    );
    yield all(
      users.map((user) => {
        return call(ADMIN.auth().deleteUser(user));
      })
    );
  } catch (error) {
    console.log(error);
  }
}

export function* onStartDeleteUser() {
  yield takeLatest(adminTypes.START_DELETE_USER, deleteUser);
}

export default function* adminSagas() {
  yield all([call(onStartGetUsersData), call(onStartSetUserRole), call(onStartDeleteUser)]);
}
