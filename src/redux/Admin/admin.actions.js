import adminTypes from "./admin.types";

export const getUseresData = () => ({
  type: adminTypes.GET_USERS_DATA,
});

export const gotUsers = (users) => ({
  type: adminTypes.GOT_USERS,
  payload: users,
});
