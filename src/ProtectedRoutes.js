import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem("loginToken")) {
    return children;
  }
  return <Navigate to="/" />;
};

ProtectedRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoutes;
