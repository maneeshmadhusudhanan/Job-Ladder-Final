import React from "react";
import { Navigate } from "react-router-dom";

// Higher-Order Component for Protected Routes
const withProtectedRoute = (WrappedComponent, role) => {
  return (props) => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    // Log to verify token and role are being read correctly
    console.log("Token:", token);
    console.log("Role:", userRole);

    if (!token) {
      // Redirect to login if no token
      return <Navigate to="/login" />;
    }

    if (role && role !== userRole) {
      // Redirect if the user does not have the required role
      return <Navigate to="/" />;
    }

    // If authenticated and authorized, render the WrappedComponent
    return <WrappedComponent {...props} />;
  };
};

export default withProtectedRoute;
