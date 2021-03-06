import { combineReducers } from "redux";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// Reducers
import userReducer from "./User/user.reducers";
import styleReducer from "./Styles/styles.reducers";
import userdataReducer from "./UserData/userdata.reducers";
import adminReducer from "./Admin/admin.reducers";

export const rootReducer = combineReducers({
  user: userReducer,
  style: styleReducer,
  userdata: userdataReducer,
  admindata: adminReducer,
});

// const configStorage = {
//   key: "root",
//   storage,
//   whitelist: [],
// };

// export default persistReducer(
//   {
//     configStorage,
//   },
//   rootReducer
// );

export default rootReducer;
