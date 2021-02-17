import adminTypes from "./admin.types";

const INITIAL_STATE = {
  users: {},
};

const adminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case adminTypes.GOT_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case adminTypes.GOT_USER:
      return {
        ...state,
        users: { ...state.users, ...action.payload },
      };
    default:
      return state;
  }
};

export default adminReducer;
