import React from "react";
import CreatePost from "./CreatePost";
import Post from "./Post";
function Feed() {
  return (
    <div className="w-[50%] border border-gray-200">
      <CreatePost />
      <Post />
    </div>
  );
}

export default Feed;
