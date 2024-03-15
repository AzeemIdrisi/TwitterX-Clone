import React from "react";
import Avatar from "react-avatar";
import { FaImage } from "react-icons/fa6";

function CreatePost() {
  return (
    <div>
      <div className="w-[100%]">
        <div className="flex justify-evenly  items-center border-b border-gray-200 ">
          <div className="font-semibold hover:cursor-pointer w-full hover:bg-gray-100 text-center px-4 py-3">
            For You
          </div>
          <div className="font-semibold  hover:cursor-pointer w-full hover:bg-gray-100 text-center px-4 py-3">
            Following
          </div>
        </div>
        <div>
          <div className="flex p-4">
            <div>
              <Avatar round={true} size="50" />
            </div>
            <input
              className="text-xl ml-3 w-full outline-none  "
              type="text"
              placeholder="What is happening?!"
              name=""
              id=""
            />
          </div>
          <div className="flex justify-between items-center p-4 border-b border-gray-300">
            <FaImage className="ml-5" size={"20"} />
            <button className=" py-2 border-none px-5 text-lg rounded-full text-white font-semibold bg-[#1D9Bf0] hover:bg-[#2e86c0]">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
