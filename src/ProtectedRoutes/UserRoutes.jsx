import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserRoutes = ({ children }) => {
  const { authUser } = useSelector((store) => store.user);

  if (authUser) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default UserRoutes;
