import axios from "axios";
import { POST_API_END_POINT } from "../utils/constant.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts } from "../redux/postSlice.js";

const useGetMyPosts = (id) => {
  const dispatch = useDispatch();
  const { refresh } = useSelector((store) => store.posts);
  useEffect(() => {
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
    console.log("Going to call fetchMyPosts");
    fetchMyPosts();
  }, [id, refresh]);
};

export default useGetMyPosts;
