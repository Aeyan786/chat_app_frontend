import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import OtherUsers from "./OtherUsers";
import useGetOtherUsers from "../Hooks/useGetOtherUsers";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setAuthUser, setSelectedUser } from "../Redux/userSlice";

const SideBar = () => {
  const [searchUser, setSearchUser] = useState("");
  const [filterUser, setFilterUser] = useState([]);
  useGetOtherUsers();
  const dispatch = useDispatch();
  const { otherUser } = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered =
      otherUser?.length > 0
        ? otherUser?.filter((user) => {
            return user?.fullName
              .toLowerCase()
              .includes(searchUser?.toLowerCase() || "");
          })
        : [];
    setFilterUser(filtered);
    
  },[searchUser,otherUser]);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/user/logout",
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        dispatch(setSelectedUser(null));
        dispatch(setAuthUser(null));
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <form>
        <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-2 shadow-md border border-white/20 focus-within:ring-2 focus-within:ring-white/30">
          <input
            type="text"
            value={searchUser}
            className="flex-grow bg-transparent outline-none text-white placeholder-gray-300"
            placeholder="Search..."
            onChange={(e) => {
              setSearchUser(e.target.value);
            }}
          />
          <button className="text-white hover:text-gray-300 transition">
            <IoSearch size={20} />
          </button>
        </div>
      </form>
      <div className="my-10 overflow-y-scroll h-[300px] ">
        {!otherUser ? (
          <p>Users not found</p>
        ) : (
          filterUser?.map((e, i) => {
            return (
              <div key={i}>
                <OtherUsers users={e} />
              </div>
            );
          })
        )}
      </div>
      <div className="mt-5">
        <button onClick={handleLogout} className="btn btn-soft rounded-2xl">
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
