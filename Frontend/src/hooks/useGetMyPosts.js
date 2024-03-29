import axios from "axios";
import { POST_API_END_POINT } from "../utils/constant.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts } from "../redux/postSlice.js";

const useGetMyPosts = (id) => {
  const dispatch = useDispatch();
  const { refresh, isActive } = useSelector((store) => store.posts);

  const fetchFollowingPosts = async () => {
    try {
      const res = await axios.get(
        `${POST_API_END_POINT}/followingPosts/${id}`,
        {
          withCredentials: true,
        }
      );
      console.log(res?.data?.tweets);
      dispatch(getMyPosts(res?.data?.tweets));
    } catch (error) {
      console.log(error);
    }
  };
  const fetchMyPosts = async () => {
    try {
      const res = await axios.get(`${POST_API_END_POINT}/allPosts/${id}`, {
        withCredentials: true,
      });
      dispatch(getMyPosts(res?.data?.tweets));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isActive) {
      fetchMyPosts();
    } else {
      fetchFollowingPosts();
    }
  }, [id, refresh, isActive]);
};

export default useGetMyPosts;
