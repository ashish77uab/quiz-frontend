import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { getUserToken } from "../../utils/constants";
// import { toast } from "react-toastify";
// import ToastMsg from "../toast/ToastMsg";

const MainLayout = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = getUserToken()
  useEffect(() => {
    if (isLoggedIn && user?.role === 'User') {
      // toast.error(<ToastMsg title={'Please logout to view website.'} />);
      navigate('/user/dashboard')

    }

  }, [user, isLoggedIn, navigate])
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
