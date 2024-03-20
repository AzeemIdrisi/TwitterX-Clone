import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <div className="w-[50%]">
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
        </div>
      </div>
    </div>
  );
}

export default Profile;
