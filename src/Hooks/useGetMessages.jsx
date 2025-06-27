import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setmessage } from "../Redux/messageSlice";

const useGetMessages = () => {
  const { selectedUser,authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedUser) {
        try {
          const response = await axios.get(
            `http://localhost:4000/api/message/get/${selectedUser?._id}`,
            { withCredentials: true }
          );
          if (response.status === 200) {
            dispatch(setmessage(response.data.getMessage));
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchMessages();
  }, [selectedUser]);
};

export default useGetMessages;
