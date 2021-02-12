import userTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  loggedIn: false,
  resetPasswordSuccess: false,
  userErr: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.UPDATE_USER_PROFILE:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...action.payload,
        },
      };
    case userTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        loggedIn: true,
        userErr: [],
      };

    case userTypes.USER_ERROR:
      return {
        ...state,
        userErr: action.payload,
      };

    case userTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordSuccess: action.payload,
      };

    case userTypes.RESET_USER_STATE:
    case userTypes.SIGN_OUT_USER_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
      };

    default:
      return state;
  }
};

export default userReducer;
