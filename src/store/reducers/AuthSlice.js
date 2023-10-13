// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  isSignout: false,
  userId: null,
};

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    restoreToken: (state, action) => {
      return {
        ...state,
        userId: action.payload,
        isLoading: false,
      };
    },
    signIn: (state, action) => {
      return {
        ...state,
        userId: action.payload,
        isSignout: false,
      };
    },
    signOut: (state, action) => {
      return {
        ...state,
        userId: null,
        isSignout: true,
      };
    },
  },
});

export default authSlice.reducer;

export const { restoreToken, signIn, signOut } = authSlice.actions;

export const selectAuth = (store) => store.auth;
