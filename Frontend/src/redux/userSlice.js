import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    otherUsers: null,
    profile: null,
  },
  reducers: {
    //multiple actions
    getUser: (state, action) => {
      state.user = action.payload;
    },
    getOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    getMyProfile: (state, action) => {
      state.profile = action.payload;
    },
    followToggle: (state, action) => {
      if (state.user.following.includes(action.payload)) {
        //removing userID from following
        state.user.following = state.user.following.filter((itemID) => {
          return itemID !== action.payload;
        });
      } else {
        state.user.following.push(action.payload);
      }
    },
  },
});

export const { getUser, getOtherUsers, getMyProfile, followToggle } =
  userSlice.actions;
export default userSlice.reducer;
