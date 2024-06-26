import React from "react";
import { MdHomeFilled } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../utils/constant.js";
import toast from "react-hot-toast";
import axios from "axios";
import { getUser, getMyProfile, getOtherUsers } from "../redux/userSlice.js";

function LeftSidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(getUser(null));
        dispatch(getOtherUsers(null));
        dispatch(getMyProfile(null));
        toast.success(res?.data?.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);

      console.log(error);
    }
  };
  return (
    <div className="w-[20%]">
      <div>
        <div className="my-4 px-4 py-4">
          <img
            className="w-[25%] invert"
            src="https://www.nikon.com.au/media/wysiwyg/ZLogo.png"
            alt="logo"
          />
        </div>
        <div className="my-4">
          <Link
            to="/"
            className="flex items-center my-3 px-4 py-2 hover:bg-gray-100 rounded-lg hover:cursor-pointer"
          >
            <div>
              <MdHomeFilled size="25px" />
            </div>
            <h1 className="font-bold text-lg ml-2">Home</h1>
          </Link>
          <div className="flex items-center my-3 px-4 py-2 hover:bg-gray-100 rounded-lg hover:cursor-pointer">
            <div>
              <IoIosSearch size="25px" />
            </div>
            <h1 className="font-semibold text-lg ml-2">Explore</h1>
          </div>
          <div className="flex items-center my-3 px-4 py-2 hover:bg-gray-100 rounded-lg hover:cursor-pointer">
            <div>
              <IoIosNotificationsOutline size="25px" />
            </div>
            <h1 className="font-semibold text-lg ml-2">Notifications</h1>
          </div>
          <Link
            to={`/profile/${user?._id}`}
            className="flex items-center my-3 px-4 py-2 hover:bg-gray-100 rounded-lg hover:cursor-pointer"
          >
            <div>
              <CiUser size="25px" />
            </div>
            <h1 className="font-semibold text-lg ml-2">Profile</h1>
          </Link>
          <div className="flex items-center my-3 px-4 py-2 hover:bg-gray-100 rounded-lg hover:cursor-pointer">
            <div>
              <CiBookmark size="25px" />
            </div>
            <h1 className="font-semibold text-lg ml-2">Bookmarks</h1>
          </div>
          <div
            onClick={logoutHandler}
            className="flex items-center my-3 px-4 py-2 hover:bg-gray-100 rounded-lg hover:cursor-pointer"
          >
            <div>
              <IoIosLogOut size="25px" />
            </div>
            <h1 className="font-semibold text-lg ml-2">Logout</h1>
          </div>
          <button className="my-2 py-2 border-none w-full text-lg rounded-full text-white font-semibold bg-[#1D9Bf0] hover:bg-[#2e86c0]">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeftSidebar;
