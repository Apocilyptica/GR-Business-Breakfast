import storageTypes from "./storage.types";

const initialState = {
  file: null,
  loading: false,
  url: null,
};

const storageReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case storageTypes.SET_FILE:
      return {
        ...state,
        file: action.file,
      };
    case storageTypes.SET_FILE_URL:
      return {
        ...state,
        loading: false,
        url: action.payload,
      };
    case storageTypes.SEND_FILE:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default storageReducer;
