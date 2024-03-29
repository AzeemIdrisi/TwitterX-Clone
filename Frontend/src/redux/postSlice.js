import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    tweets: null,
    refresh: false,
  },
  reducers: {
    //multiple actions
    getMyPosts: (state, action) => {
      state.tweets = action.payload;
    },
    getRefresh: (state) => {
      state.refresh = !state.refresh;
    },
  },
});

export const { getMyPosts, getRefresh } = postSlice.actions;
export default postSlice.reducer;
