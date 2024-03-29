import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";
import useGetMyPosts from "../hooks/useGetMyPosts.js";
import { CiBookmark, CiHeart } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { AiOutlineDelete } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT, POST_API_END_POINT } from "../utils/constant.js";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/postSlice.js";

function Post() {
  const { user } = useSelector((store) => store.user);
  const { tweets } = useSelector((store) => store.posts);
  const [tweetUsers, setTweetUsers] = useState({});
  const [tweetUsernames, setTweetUsernames] = useState({});
  const dispatch = useDispatch();
  useGetMyPosts(user?._id);
  useEffect(() => {
    async function fetchTweetUsers() {
      const users = {};
      const usernames = {};
      await Promise.all(
        tweets.map(async (tweet) => {
          const res = await axios.get(
            `${USER_API_END_POINT}/profile/${tweet.userID}`,
            {
              withCredentials: true,
            }
          );
          users[tweet.userID] = res.data.user.name;
          usernames[tweet.userID] = res.data.user.username;
        })
      );
      setTweetUsers(users);
      setTweetUsernames(usernames);
    }
    fetchTweetUsers();
  }, [tweets]);

  const handleLike = async (tweetID) => {
    console.log("Liking " + tweetID);
    try {
      const res = await axios.put(
        `${POST_API_END_POINT}/like/${tweetID}`,
        {
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
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  const handleDelete = async (tweetID) => {
    try {
      const res = await axios.delete(
        `${POST_API_END_POINT}/delete/${tweetID}`,

        {
          withCredentials: true,
        }
      );
      dispatch(getRefresh());
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div>
      {tweets?.map((tweet) => (
        <div key={tweet._id} className="flex p-4 w-full">
          <Avatar round={true} size="50" src="https://picsum.photos/100/100" />
          <div className="ml-2">
            <div className="flex items-center">
              <h1 className="font-bold">{tweetUsers[tweet.userID]}</h1>
              <p className="text-gray-500 ml-2 text-sm">
                @{tweetUsernames[tweet.userID]}
              </p>
              <p className="text-gray-500 ml-2">. 1m</p>
            </div>
            <div className="w-72">
              <p>{tweet.content}</p>
            </div>

            <div className="flex items-center justify-between my-2 ">
              <div className="flex item-center py-1">
                <div className="p-2 rounded-full hover:bg-green-100 cursor-pointer">
                  <GoComment size="16" />
                </div>
                <p className="mt-2 text-xs">17</p>
              </div>
              <div className="flex item-center">
                <div className="p-2 rounded-full hover:bg-red-100 cursor-pointer">
                  <CiHeart onClick={() => handleLike(tweet._id)} size="18" />
                </div>
                <p className="mt-2 text-xs">{tweet?.likes?.length}</p>
              </div>
              <div className="flex item-center">
                <div className="p-2 rounded-full hover:bg-blue-100 cursor-pointer">
                  <CiBookmark size="16" />
                </div>
                <p className="mt-2 text-xs">{tweet?.bookmarks?.length}</p>
              </div>
              {tweet.userID === user._id && (
                <div className="flex item-center">
                  <div
                    onClick={() => handleDelete(tweet?._id)}
                    className="p-2 rounded-full hover:bg-red-400 cursor-pointer"
                  >
                    <AiOutlineDelete size="16" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Post;
