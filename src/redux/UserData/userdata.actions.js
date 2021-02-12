import userdataTypes from "./userdata.types";

export const setFile = (file) => ({
  type: userdataTypes.SET_FILE,
  file,
});

export const setFileURL = (url) => ({
  type: userdataTypes.SET_FILE_URL,
  payload: url,
});

export const sendFile = () => ({
  type: userdataTypes.SEND_FILE,
});

export const sendBio = (content) => ({
  type: userdataTypes.SEND_BIO,
  payload: content,
});
