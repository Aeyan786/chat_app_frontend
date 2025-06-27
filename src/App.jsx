import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { setOnlineUsers } from "./Redux/userSlice";
import { setSocket } from "./Redux/socketSlice";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute";
import UserRoutes from "./ProtectedRoutes/UserRoutes";

const App = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((store) => store.user);

  useEffect(() => {
    if (authUser) {
      const socketio = io("https://chatappbackend-production-9d4d.up.railway.app/", {
        query: {
          userId: authUser?.id,
        },
      });
      dispatch(setSocket(socketio));

      socketio?.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
      return () => {
        socketio?.close();
      };
    }
  }, [authUser]);

  return (
    <div className="flex justify-center items-center p-4 h-screen">
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <UserRoutes>
              <Signup />
            </UserRoutes>
          }
        />
        <Route
          path="/"
          element={
            <UserRoutes>
              <Login />
            </UserRoutes>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
