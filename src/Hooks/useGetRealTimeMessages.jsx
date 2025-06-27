import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setmessage } from "../Redux/messageSlice";

const useGetRealTimeMessages = () => {
  const { socket } = useSelector((store) => store.socket);
  const { message } = useSelector((store) => store.message);
  const dispatch = useDispatch();
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      dispatch(setmessage([...(message || []), newMessage]));
    });
  }, [socket, message, setmessage]);
};

export default useGetRealTimeMessages;
