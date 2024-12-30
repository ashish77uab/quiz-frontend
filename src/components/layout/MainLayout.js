import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";


const MainLayout = () => {


  return (
    <div className="flex flex-col justify-between min-h-screen max-w-md mx-auto border-x border-x-zinc-100">
      <Navbar />
      <div className="flex-grow flex flex-col relative bg-blue-50/50">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
