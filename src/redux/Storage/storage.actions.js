import storageTypes from "./storage.types";

export const setFile = (file) => ({
  type: storageTypes.SET_FILE,
  file,
});

export const setFileURL = (url) => ({
  type: storageTypes.SET_FILE_URL,
  payload: url,
});

export const sendFile = () => ({
  type: storageTypes.SEND_FILE,
});

export const syncFileURL = () => ({
  type: storageTypes.SYNC_FILE_URL,
});
