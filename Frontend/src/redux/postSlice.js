import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    tweets: null,
    refresh: false,
    isActive: true,
  },
  reducers: {
    //multiple actions
    getMyPosts: (state, action) => {
      state.tweets = action.payload;
    },
    getRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    getIsActive: (state, action) => {
      state.isActive = action.payload;
    },
  },
});

export const { getMyPosts, getRefresh, getIsActive } = postSlice.actions;
export default postSlice.reducer;
