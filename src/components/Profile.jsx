import React from "react";
import Avatar from "react-avatar";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <div className="w-[50%] border-l border-r border-gray-200">
      <div>
        <div className="flex items-center">
          <Link
            to={"/"}
            className="cursor-pointer hover:bg-gray-100 p-2 rounded-full"
          >
            <IoArrowBack size={"25px"} />
          </Link>
          <div className="mx-2 p-2">
            <h1 className="font-bold text-lg ">Azeem Idrisi</h1>
            <p className="text-sm ">10 posts</p>
          </div>
        </div>
        <div>
          <img
            src="https://pbs.twimg.com/profile_banners/714313671464198145/1641743172/1500x500"
            alt="Banner"
          />
          <div className=" w-fit border-4 border-white absolute top-44 ml-2 rounded-full">
            <Avatar
              src="https://picsum.photos/200
"
              round={true}
              size="120"
            />
          </div>
          <div className="text-right">
            <button className="text-sm hover:bg-gray-200 font-semibold m-2 rounded-full px-4 py-1 border-2 border-gray-400">
              Edit Profile
            </button>
          </div>
          <div className="m-4">
            <h1 className="font-bold text-xl ">Azeem Idrisi</h1>
            <p className="">@AzeemIdrisi</p>
          </div>
          <div className="m-4 text-sm">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum culpa
              harum, optio quod expedita.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
