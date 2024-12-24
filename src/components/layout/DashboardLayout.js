import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { reactIcons } from "../../utils/icons";
import { links } from "./../../utils/constants";
import { useSelector } from "react-redux";

const DashboardLayout = () => {
  const [sideBarOpen, setSidebarOpen] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate()
  useEffect(() => {
    if (user?.role) {
      if (user?.role !== 'Admin') {
        navigate('/')
      }
    }
  }, [user?.role])

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <div className="sticky py-6 flex-shrink-0 z-50 top-0  flex justify-between gap-6 items-center px-8 border-b border-b-zinc-200">
        <Link className="heading-3" to={"/dashboard"}>
          Admin
        </Link>
        <div className="flex gap-2 items-center">
          <div className="flex gap-2 items-center">
            <span className="font-semibold text-2xl">{user?.fullName}</span>
            <div className="w-12 h-12 rounded-full cursor-pointer text-white bg-primary-pink flex-center">
              <span className="text-18   font-semibold capitalize">{user?.fullName?.[0]}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[calc(100%-104px)] flex flex-1">
        <div
          className={`relative border-r border-r-zinc-200 duration-300    h-full flex flex-col  justify-between py-4 gap-3 ${sideBarOpen ? "w-[235px] items-start" : "w-[72px]  items-center"
            }`}
        >
          <div
            className={`flex flex-col py-4  ${sideBarOpen ? " items-start px-4" : " items-center"
              }  h-full w-full flex-1 overflow-y-auto gap-3 custom-scroll-sm`}
          >
            {links.map((link) => (
              <>
                {sideBarOpen ? (
                  <NavLink
                    key={link.title}
                    to={link.path}
                    end
                    className={({ isActive }) =>
                      ` py-3 w-full px-2 text-[16px] font-semibold md:text-[32px] gap-4 cursor-pointer flex  items-center hover:text-primary-pink rounded-md md:rounded-lg  ${isActive && "text-primary-pink"
                      }`
                    }
                  >
                    {" "}
                    <span className="text-[26px] ">{link.icon}</span>
                    <span className="text-[16px]  ">{link.title}</span>
                  </NavLink>
                ) : (
                  <NavLink
                    key={link.title}
                    to={link.path}
                    end
                    className={({ isActive }) =>
                      `w-[50px] flex justify-center items-center  h-[50px] text-[16px] md:text-[32px] cursor-pointer  hover:bg-amber-200 rounded-md md:rounded-lg  ${isActive && "[&_span]:bg-amber-200"
                      }`
                    }
                  >
                    <span className="w-[30px] h-[30px] md:w-[50px] md:h-[50px] text-[16px] md:text-[32px] cursor-pointer flex-center hover:bg-amber-200 rounded-md md:rounded-lg ">
                      {link.icon}
                    </span>
                  </NavLink>
                )}
              </>
            ))}
          </div>
          {sideBarOpen ? (
            <div className="px-4 w-full">
              <Link
                to="/"
                className=" flex py-2 w-full px-2 flex-1 text-[16px] md:text-[32px] gap-4 cursor-pointer  items-center hover:bg-amber-200 rounded-md md:rounded-lg "
              >
                <span className="text-[32px] ">{reactIcons.goback}</span>
                <span className="text-[16px]  ">Go to Web</span>
              </Link>
            </div>
          ) : (
            <Link to="/" className="">
              <span className="w-[30px] h-[30px] md:w-[50px] md:h-[50px] text-[16px] md:text-[32px] cursor-pointer flex-center hover:bg-red-300 hover:text-red-800 rounded-md md:rounded-lg  ">
                {reactIcons.goback}
              </span>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className={`w-8 h-8 z-10 duration-200 absolute top-4 -right-4 rounded-full flex-center bg-white text-black border-c  ${sideBarOpen ? "rotate-180" : "rotate-0"
              }`}
          >
            {reactIcons.arrowright}
          </button>
        </div>
        <div
          className="flex-1 py-6 px-8 overflow-y-auto h-full "
          id="scrollableDiv"
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
