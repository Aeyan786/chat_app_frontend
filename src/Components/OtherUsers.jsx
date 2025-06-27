import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpen, setSelectedUser } from "../Redux/userSlice";

const OtherUsers = ({ users }) => {
  const dispatch = useDispatch();
  const handleSelectedUser = (user) => {
    dispatch(setOpen(true))
    dispatch(setSelectedUser(user));
  };
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);
  const isOnline = onlineUsers?.includes(users?._id)

  return (
    <div
      onClick={() => {
        handleSelectedUser(users);
      }}
      className={`border-b border-gray-600 flex items-center gap-2 p-2 rounded-md cursor-pointer
        ${
          selectedUser?._id === users?._id
            ? "bg-zinc-300 text-black"
            : "bg-none text-white"
        }
        hover:bg-zinc-300 hover:text-black transition`}
    >
      <div className={`avatar ${isOnline? "avatar-online": "" }`}>
        <div className="w-10 rounded-full">
          <img src={users?.profilePhoto} alt="" />
        </div>
      </div>

      <h1 className="font-medium capitalize">{users?.fullName}</h1>
    </div>
  );
};

export default OtherUsers;
