import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyProfile } from "../redux/userSlice.js";

const useGetProfile = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`, {
          withCredentials: true,
        });
        dispatch(getMyProfile(res?.data?.user));
      } catch (error) {
        console.log(error);
      }
    };
    console.log("Going to call fetchMyProfile");
    fetchMyProfile();
  }, [id]);
};

export default useGetProfile;
