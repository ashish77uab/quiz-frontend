import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import { userMenuLinks } from "../../utils/constants";

const UserLayout = () => {
  return (
    <>
      <div className="flex flex-col justify-between min-h-screen bg-primary-darkBlue text-white text-sm user-layout">
        <UserNavbar />
        <div className="flex-grow px-2 lg:px-6 py-4 lg:pb-0 pb-20">
          <Outlet />
        </div>
      </div>
      <div className="flex md:hidden items-center fixed w-full py-3 bottom-0 bg-primary-darkBlueSupport border-t border-t-primary-darkBlue">
        {userMenuLinks?.map((item) => {
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `font-semibold cursor-pointer flex-1 relative flex-center flex-col   px-1  ${isActive ? "text-primary-pink " : " text-white "
                }`}
            >

              <div className="text-xl">{item.icon}</div>
              <div className="text-[9px] mt-2">{item.title}</div>
            </NavLink>
          )
        })}
      </div>
    </>
  );
};

export default UserLayout;
