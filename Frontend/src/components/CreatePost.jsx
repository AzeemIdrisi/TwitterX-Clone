import axios from "axios";
import React, { useState } from "react";
import Avatar from "react-avatar";
import { FaImage } from "react-icons/fa6";
import { POST_API_END_POINT } from "../utils/constant.js";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getRefresh, getMyPosts, getIsActive } from "../redux/postSlice.js";

function CreatePost() {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { isActive } = useSelector((store) => store.posts);
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${POST_API_END_POINT}/create`,
        {
          description: content,
          id: user?._id,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(getRefresh());
      if (res.data.success) {
        toast.success(res.data.message);
      }
      setContent("");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const handleFollowing = () => {
    dispatch(getIsActive(false));
  };
  const handleForYou = () => {
    dispatch(getIsActive(true));
  };
  return (
    <div>
      <div className="w-[100%]">
        <div className="flex justify-evenly  items-center border-b border-gray-100 ">
          <div
            onClick={handleForYou}
            className={`${isActive ? "border-b-2 border-blue-600" : null}
              font-semibold hover:cursor-pointer w-full hover:bg-gray-100 text-center px-4 py-3`}
          >
            For You
          </div>
          <div
            onClick={handleFollowing}
            className={`${!isActive ? "border-b-2 border-blue-600" : null}
              font-semibold hover:cursor-pointer w-full hover:bg-gray-100 text-center px-4 py-3`}
          >
            Following
          </div>
        </div>
        <div>
          <div className="flex p-4">
            <div>
              <Avatar src="https://picsum.photos/200" round={true} size="50" />
            </div>
            <input
              className="text-xl ml-3 w-full outline-none  "
              type="text"
              placeholder="What is happening?!"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <FaImage className="ml-5" size={"20"} />
            <button
              onClick={submitHandler}
              className=" py-2 border-none px-5 text-lg rounded-full text-white font-semibold bg-[#1D9Bf0] hover:bg-[#2e86c0]"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
