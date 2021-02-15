import userdataTypes from "./userdata.types";

const initialState = {
  file: null,
  loading: false,
  loadingPercent: 0,
  url: null,
};

const userdataReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case userdataTypes.SET_FILE:
      return {
        ...state,
        file: action.file,
      };
    case userdataTypes.SET_FILE_URL:
      return {
        ...state,
        loading: false,
        url: action.payload,
      };
    case userdataTypes.SEND_FILE:
      return {
        ...state,
        loading: true,
      };
    case userdataTypes.SET_FILE_UPLOAD:
      return {
        ...state,
        loadingPercent: action.payload,
      };
    default:
      return state;
  }
};

export default userdataReducer;
