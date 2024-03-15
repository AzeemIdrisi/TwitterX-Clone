import React from "react";
import Feed from "./Feed";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

function home() {
  return (
    <div className="flex justify-between w-[80%] mx-auto">
      <LeftSidebar />
      <Feed />
      <RightSidebar />
    </div>
  );
}

export default home;
