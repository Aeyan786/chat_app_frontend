import React from "react";
import InputMessage from "./InputMessage";
import Messages from "./Messages";
import { ImCancelCircle } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { setOpen, setSelectedUser } from "../Redux/userSlice";

const MessageContainer = () => {
  const dispatch = useDispatch();
  const { selectedUser, authUser, open } = useSelector((store) => store.user);

  const handleClose = () => {
    dispatch(setOpen(false));
    dispatch(setSelectedUser(null));
  };

  return (
    <div className="flex flex-col h-[80vh] max-h-screen w-full">
      {selectedUser ? (
        <>
          {/* Header */}
          <div className="flex items-center justify-between bg-zinc-500 text-white p-3 rounded-t-2xl">
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img src={selectedUser?.profilePhoto} alt="" />
                </div>
              </div>
              <h1 className="font-medium text-lg capitalize">
                {selectedUser?.fullName}
              </h1>
            </div>

            {/* Back Button (Mobile only) */}
            <div className="block [@media(min-width:751px)]:hidden">
              <button
                onClick={handleClose}
                className="text-white hover:text-red-300 transition"
                title="Back"
              >
                <ImCancelCircle size={22} />
              </button>
            </div>
          </div>

          {/* Scrollable Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-2 bg-white/5">
            <Messages />
          </div>

          {/* Input stays fixed at bottom */}
          <div className="w-full">
            <InputMessage />
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-full w-full">
          <p className="text-white capitalize text-lg font-medium text-center">
            <span className="text-3xl font-bold capitalize">
              {`Hi, ${authUser?.fullname}!`}
            </span>
            <br /> Chat with your friends and family.
          </p>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;
