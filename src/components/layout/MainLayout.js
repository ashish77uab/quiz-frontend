import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";


const MainLayout = () => {


  return (
    <div className="flex flex-col justify-between min-h-screen max-w-xl mx-auto border-x border-x-zinc-100">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
