import { createSlice } from "@reduxjs/toolkit";
import defaultAvatar from "../../assets/defaultImage.png";

const initialState = {
  isAuthenticated: false,
  avatar: defaultAvatar,
  nickname: null,
  userId: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    login: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.avatar = action.payload.avatar;
      state.nickname = action.payload.nickname;
      state.userId = action.payload.userId;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
