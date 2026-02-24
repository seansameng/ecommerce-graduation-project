import api from "./axios";

export const getMyProfile = () => {
  return api.get("/users/me");
};

export const updateMyProfile = (data) => {
  return api.put("/users/me", data);
};

export const changeMyPassword = (data) => {
  return api.put("/users/me/password", data);
};
