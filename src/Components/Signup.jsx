import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { LoaderIcon } from "react-hot-toast";

const Signup = () => {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const respnonse = await axios.post(
        "https://chatappbackend-production-9d4d.up.railway.app/api/user/register",
        user
      );
      if (respnonse.status === 200) {
        toast.success(respnonse.data.message);
        navigate("/")
      }
    } catch (error) {
      console.log(error);
      if (error) {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl w-full max-w-md bg-white/10 backdrop-blur-md p-8 shadow-xl border border-white/20 overflow-y-auto">
      <h1 className="text-white text-4xl font-bold text-center mb-6">
        Sign Up
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          autoComplete="name"
          className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-gray-300 text-white outline-gray-500 outline-1  focus:ring-2 focus:ring-white/30"
          onChange={(e) => {
            setUser({ ...user, fullName: e.target.value });
          }}
        />
        <input
          type="username"
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
          className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-gray-300 text-white outline-gray-500 outline-1 focus:ring-2 focus:ring-white/30"
          autoComplete="new-password"
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-gray-300 text-white outline-gray-500 outline-1 focus:ring-2 focus:ring-white/30"
          autoComplete="new-password"
          onChange={(e) => {
            setUser({ ...user, confirmPassword: e.target.value });
          }}
        />
        <div className="flex items-center gap-6 text-white">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="male"
              className="accent-white w-4 h-4"
              onChange={(e) => {
                setUser({ ...user, gender: e.target.value });
              }}
            />
            <span>Male</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="female"
              className="accent-white w-4 h-4"
              onChange={(e) => {
                setUser({ ...user, gender: e.target.value });
              }}
            />
            <span>Female</span>
          </label>
        </div>
        {loading ? (
          <button
            disabled={loading}
            className="w-full cursor-pointer py-3 rounded-lg bg-white/20 text-white font-semibold hover:bg-white/30 transition flex items-center justify-center gap-4   "
          >
            <LoaderIcon className="animate" /> Please Wait
          </button>
        ) : (
          <button className="w-full cursor-pointer py-3 rounded-lg bg-white/20 text-white font-semibold hover:bg-white/30 transition">
            Create Account
          </button>
        )}
        <span className="text-white text-sm">
          <Link to="/">Already have an account?</Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
