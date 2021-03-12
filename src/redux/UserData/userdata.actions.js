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

export const setFileUpload = (percent) => ({
  type: userdataTypes.SET_FILE_UPLOAD,
  payload: percent,
});

export const setSocialLinks = (links) => ({
  type: userdataTypes.SEND_SOCIAL_LINKS,
  payload: links,
});

export const storageDelete = ({ uuid, id }) => ({
  type: userdataTypes.STORAGE_DELETE,
  uuid: uuid,
  id: id,
});

export const updateUserData = (dataType, content) => ({
  type: userdataTypes.UPDATE_USER_DATA,
  dataType: dataType,
  content: content,
});
