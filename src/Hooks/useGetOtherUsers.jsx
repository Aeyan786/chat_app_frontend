import React, { useEffect } from "react";
import axios from "axios";
import {setOtherUser} from "../Redux/userSlice";
import { useDispatch } from "react-redux";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/user/get", {
          withCredentials: true,
        });
        if (response.status === 200) {
          dispatch(setOtherUser(response.data.AllOtherUsers));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchOtherUsers();
  },[dispatch,]);
};

export default useGetOtherUsers;
