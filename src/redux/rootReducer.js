import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Reducers

export const rootReducer = combineReducers({});

const configStorage = {
  key: "root",
  storage,
  whitelist: [],
};

export default persistReducer(configStorage, rootReducer);
