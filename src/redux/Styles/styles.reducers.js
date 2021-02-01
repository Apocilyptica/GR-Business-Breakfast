import styleTypes from "./styles.types";

const INITIALSTATE = {
  darkMode: false,
};

const styleReducer = (state = INITIALSTATE, action) => {
  switch (action.type) {
    case styleTypes.DARK_MODE:
      return {
        ...state,
        darkMode: action.payload,
      };

    default:
      return state;
  }
};

export default styleReducer;
