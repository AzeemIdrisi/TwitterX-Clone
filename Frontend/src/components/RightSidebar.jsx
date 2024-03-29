import React from "react";
import Avatar from "react-avatar";
import { IoIosSearch } from "react-icons/io";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant.js";

function RightSidebar() {
  // custom hook
  const { user, otherUsers } = useSelector((store) => store.user);
  useGetOtherUsers(user?._id);

  const handleFollow = async (otherUserID) => {
    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/follow/${otherUserID}`,
        {
          id: user?._id,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

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
        {otherUsers?.map((otherUser) => {
          return (
            <>
              <div
                key={otherUser._id}
                className="my-4 flex  w-full justify-between"
              >
                <div className="flex item-center ">
                  <Link to={`profile/${otherUser?._id}`}>
                    <Avatar
                      src="https://picsum.photos/200"
                      size="40"
                      round={true}
                    />
                  </Link>
                  <Link to={`profile/${otherUser?._id}`}>
                    <div className="ml-2">
                      <h1 className="font-bold">{otherUser.name}</h1>
                      <p className="text-sm">@{otherUser.username}</p>
                    </div>
                  </Link>
                </div>
                <div>
                  <button
                    onClick={() => handleFollow(otherUser._id)}
                    className="ml-2 px-3 py-1 font-bold bg-black rounded-full cursor-pointer hover:bg-gray-800 text-white"
                  >
                    Follow
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default RightSidebar;
