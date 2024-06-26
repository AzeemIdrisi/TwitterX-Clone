import React from "react";
import Avatar from "react-avatar";
import { IoArrowBack } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import useGetProfile from "../hooks/useGetProfile";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../utils/constant.js";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/postSlice.js";
import axios from "axios";
import { followToggle } from "../redux/userSlice.js";
function Profile() {
  const dispatch = useDispatch();
  const { user, profile } = useSelector((store) => store.user);
  const { id } = useParams();
  useGetProfile(id);

  const handleFollowUnfollow = async () => {
    if (user.following.includes(id)) {
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/unfollow/${id}`,
          {
            id: user?._id,
          },
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(followToggle(id));
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
        console.log(error);
      }
    } else {
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/follow/${id}`,
          {
            id: user?._id,
          },
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(followToggle(id));
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
        console.log(error);
      }
    }
  };
  return (
    <div className="w-[45%] border-l border-r border-gray-200">
      <div>
        <div className="flex items-center">
          <Link
            to={"/"}
            className="cursor-pointer hover:bg-gray-100 p-2 rounded-full"
          >
            <IoArrowBack size={"25px"} />
          </Link>
          <div className="mx-2 p-2">
            <h1 className="font-bold text-lg ">{profile?.name}</h1>
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
            {user?._id === id ? (
              <button className="text-sm hover:bg-gray-200 font-semibold m-2 rounded-full px-4 py-1 border-2 border-gray-400">
                Edit Profile
              </button>
            ) : (
              <button
                onClick={handleFollowUnfollow}
                className=" text-white bg-black hover:bg-gray-800 font-bold m-4 rounded-full px-4 py-1 "
              >
                {user.following.includes(id) ? "Following" : "Follow"}
              </button>
            )}
          </div>
          <div className="mx-4 my-10">
            <h1 className="font-bold text-xl ">{profile?.name}</h1>
            <p className="">@{profile?.username}</p>
          </div>
          <div className="m-4 text-sm">
            <p>When you are down, The only place to go is up!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
