import axios from "axios";
import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setmessage } from "../Redux/messageSlice";

const InputMessage = () => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState("");
  const { selectedUser } = useSelector((store) => store.user);
  const { message } = useSelector((store) => store.message);

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      setMessages("");
      const response = await axios.post(
        `https://chatappbackend-production-9d4d.up.railway.app/api/message/send/${selectedUser._id}`,
        { messages },
        { withCredentials: true }
      );
      if (response.status === 200) {
        dispatch(setmessage([...(message || []), response?.data.newMessage]));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-4 py-2">
      <form onSubmit={handleMessage}>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={messages}
            placeholder="Type your message..."
            onChange={(e) => {
              setMessages(e.target.value);
            }}
            className=" w-full px-4 py-2 rounded-full bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
          />
          <button className="p-2 bg-white/10 hover:bg-white/20 text-white cursor-pointer rounded-full transition">
            <IoSend size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputMessage;
