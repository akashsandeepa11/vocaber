import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userLoading: false,
};

const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserLoading: (state, action) => {
      state.userLoading = action.payload;
    },
  },
});

export const { setUser, setUserLoading } = UserSlice.actions;

export const selectUser = (store) => store.user;

export default UserSlice.reducer;
