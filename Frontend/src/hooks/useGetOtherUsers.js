import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOtherUsers } from "../redux/userSlice.js";

const useGetOtherUsers = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/others/${id}`, {
          withCredentials: true,
        });
        dispatch(getOtherUsers(res?.data?.otherUsers));
      } catch (error) {
        console.log(error);
      }
    };
    console.log("Going to call fetchOtherUsers");
    fetchOtherUsers();
  }, [id]);
};

export default useGetOtherUsers;
