import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import useGetMessages from "../Hooks/useGetMessages";
import useGetRealTimeMessages from "../Hooks/useGetRealTimeMessages";

const Messages = () => {
  const scroll = useRef();
  const { selectedUser, authUser } = useSelector((store) => store.user);
  const { message } = useSelector((store) => store.message);

  useGetRealTimeMessages();
  useGetMessages();

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return isNaN(date)
      ? "just now"
      : date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
  };

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <>
      {message &&
        message?.map((e, i) => {
          return (
            <div
              ref={scroll}
              className={`chat ${
                authUser?.id === e?.senderId ? "chat-end" : "chat-start"
              }`}
              key={i}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={`${
                      authUser?.id === e?.senderId
                        ? authUser?.profilePhoto
                        : selectedUser?.profilePhoto
                    }`}
                  />
                </div>
              </div>
              <div className="chat-header">
                <time className="text-xs text-white opacity-50">
                  {formatTime(e?.createdAt || new Date())}
                </time>
              </div>
              <div
                className={`chat-bubble ${
                  authUser?.id === e?.senderId ? "chat-bubble-neutral" : ""
                }`}
              >
                {e?.messages}
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Messages;
