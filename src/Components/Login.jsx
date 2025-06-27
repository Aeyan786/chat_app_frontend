import axios from "axios";
import React, { useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import { setAuthUser } from "../Redux/userSlice";

const Login = () => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await axios.post(
        "https://chatappbackend-production-9d4d.up.railway.app//api/user/login",
        user,{withCredentials:true}
      );
      if ((response.status === 200)) {
        toast.success("Logged In Successfully");
        dispatch(setAuthUser(response.data))
        
        navigate("/home")
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="rounded-2xl w-full max-w-md bg-white/10 backdrop-blur-md p-8 shadow-xl border border-white/20 overflow-y-auto">
      <h1 className="text-white text-4xl font-bold text-center mb-6">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
        type="text"
          placeholder="Username"
          autoComplete="username"
          className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-gray-300 text-white outline-gray-500 outline-1 focus:ring-2 focus:ring-white/30"
          onChange={(e) => {
            setUser({ ...user, userName: e.target.value });
          }}
        />

        <input
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-gray-300 text-white outline-gray-500 outline-1 focus:ring-2 focus:ring-white/30"
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
        />

        {loading ? (
          <button
            disabled={loading}
            className="w-full cursor-pointer py-3 rounded-lg bg-white/20 text-white font-semibold hover:bg-white/30 transition flex items-center justify-center gap-4   "
          >
            <LoaderIcon className="animate" /> Please Wait
          </button>
        ) : (
          <button className="w-full cursor-pointer py-3 rounded-lg bg-white/20 text-white font-semibold hover:bg-white/30 transition">
            Login
          </button>
        )}
        <span className="text-white text-sm">
          <Link to="/signup">Doesn't have an account?</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
