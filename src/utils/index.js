import axios from "axios";

export const checkUserIsAdmin = (currentUser) => {
  if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;
  const { userRoles } = currentUser;
  if (userRoles.includes("admin")) return true;

  return false;
};

export const checkUserIsMember = (currentUser) => {
  if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;
  const { userRoles } = currentUser;
  if (
    userRoles.includes("member") ||
    userRoles.includes("speaker") ||
    userRoles.includes("silver") ||
    userRoles.includes("gold") ||
    userRoles.includes("platinum") ||
    userRoles.includes("admin")
  )
    return true;

  return false;
};

export const checkUserIsSponsor = (currentUser) => {
  if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;
  const { userRoles } = currentUser;
  if (userRoles.includes("silver") || userRoles.includes("gold") || userRoles.includes("platinum") || userRoles.includes("admin")) return true;

  return false;
};

export const checkUserIsPlatinum = (currentUser) => {
  if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;
  const { userRoles } = currentUser;
  if (userRoles.includes("platinum") || userRoles.includes("admin")) return true;

  return false;
};

export const checkUserIsSpeaker = (currentUser) => {
  if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;
  const { userRoles } = currentUser;
  if (userRoles.includes("speaker")) return true;

  return false;
};

export const apiInstance = axios.create({
  baseURL: "https://us-central1-ecommerce-website-bbf5f.cloudfunctions.net/api",
});
