import adminTypes from "./admin.types";

export const getUseresData = () => ({
  type: adminTypes.GET_USERS_DATA,
});

export const gotUsers = (users) => ({
  type: adminTypes.GOT_USERS,
  payload: users,
});

export const gotUser = (user) => ({
  type: adminTypes.GOT_USER,
  payload: user,
});

export const setUserRole = (uid, role, checked) => ({
  type: adminTypes.SET_USER_ROLE,
  payload: { uid, role, checked },
});

export const startDeleteUser = (users) => ({
  type: adminTypes.START_DELETE_USER,
  payload: users,
});
