import styleTypes from "./styles.types";

export const setDarkMode = (value) => ({
  type: styleTypes.DARK_MODE,
  payload: value,
});
