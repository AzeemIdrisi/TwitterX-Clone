import React from "react";
import Avatar from "react-avatar";
import { IoIosSearch } from "react-icons/io";

function RightSidebar() {
  return (
    <div className="w-[%]">
      <div className="my-2 p-3 bg-gray-100 rounded-full w-full flex items-center">
        <IoIosSearch size="22" />
        <input
          className="text-gray-500 outline-none bg-transparent rounded-full w-full px-2"
          type="text"
          placeholder="Search"
          name=""
          id=""
        />
      </div>
      <div className="p-4 my-5 bg-gray-100 rounded-lg w-full ">
        <h1 className="font-bold text-xl">Who to follow</h1>
        <div className="my-4 flex items-center w-full justify-between">
          <Avatar src="https://picsum.photos/200" size="40" round={true} />
          <div className="ml-2">
            <h1 className="font-bold">Prince</h1>
            <p className="text-sm">@PrinceChandra</p>
          </div>
          <div>
            <button className="ml-2 px-3 py-1 font-bold bg-black rounded-full cursor-pointer hover:bg-gray-800 text-white">
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightSidebar;
