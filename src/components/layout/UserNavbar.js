import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reactIcons } from "../../utils/icons";
import { setLogout, setModalToggle, } from "../../redux/features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { getUserToken, userMenuLinks } from "../../utils/constants";


import React from 'react'
import MobileMenu from "../modals/MobileMenu";
import AuthButton from "../../pages/components/AuthButton";
import { useScrollToTop } from "../../hooks/useScrollToTop";



const UserNavbar = () => {
  useScrollToTop()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // const isRequireToggle = pathsRequireToggle?.includes(window.location.pathname)
  const toggle = true
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
    window.location.reload()
  };
  const handleAuthToggle = (obj) => {
    dispatch(setModalToggle(obj))
  }

  const isLoggedIn = getUserToken()
  return (
    <>
      <nav className={`flex px-2 lg:px-6 items-center py-3 lg:py-6 bg-primary-darkBlue  border-b border-b-zinc-900 shadow-sm shadow-blue-950  transition-all duration-200  sticky top-0 left-0  bg w-full z-[50] `}>
        <div className="w-full">
          <div className="flex items-center justify-between">
            <div className="mr-10">
              <Link to="/user/dashboard" className="">
                <img className={`md:w-[80px] w-[60px] `} src="/images/logo-bull.png" alt="logo" />
              </Link>
            </div>
            <div className="flex-grow  items-center lg:flex hidden">
              {userMenuLinks?.map((item) => {
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`font-semibold relative flex-center flex-col   px-8  ${item.path === window.location.pathname ? "text-white [&>div]:block" : " text-white opacity-70"
                      }`}
                  >
                    {item.title} <div className={`w-[5px] h-[5px] hidden rounded-full absolute bottom-[-4px]  ${!toggle ? 'bg-primary-white' : 'bg-primary-white'}`}></div>
                  </Link>
                )
              })}
            </div>
            <div className="flex gap-2 items-center">
              {isLoggedIn && (
                <div className="flex items-center md:gap-4 gap-2">
                  <Menu as="div" className="relative">
                    <Menu.Button
                      className={
                        "flex gap-1 text-right items-center px-2 py-2 cursor-pointer rounded-md"
                      }
                    >
                      <img
                        className="w-10 h-10 object-cover overflow-hidden border-2  border-white/30 rounded-full"
                        src={user?.clientImage || "/images/user.png"}
                        alt="user"
                      />
                      <span className={`text-white text-lg ml-1`}>{reactIcons?.arrowDown}</span>
                    </Menu.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-[300px] origin-top-right divide-y divide-blue-950 rounded-md bg-primary-darkBlueSupport border-dark shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-2 space-y-2 ">
                          <div className="flex flex-col items-center gap-1 px-2 py-4 border-b-dark mb-2">
                            <img className="w-16 h-16 rounded-full object-cover shadow-num " src={user?.clientImage} alt="" />
                            <p className="font-bold">{user?.fullName}</p>
                            <p className="text-muted text-sm font-medium">{user?.email}</p>

                          </div>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => navigate(`/user/profile`)}
                                className={`${active
                                  ? "bg-primary-pink text-white"
                                  : ""
                                  } group flex w-full items-center rounded-md px-6 py-2 text-base`}
                              >
                                Profile
                              </button>
                            )}
                          </Menu.Item>
                          {user?.role === 'Admin' && <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => navigate(`/dashboard`)}
                                className={`${active
                                  ? "bg-primary-pink text-white"
                                  : ""
                                  } group flex w-full items-center rounded-md px-6 py-2 text-base`}
                              >
                                Go to dashboard
                              </button>
                            )}
                          </Menu.Item>}

                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={handleLogout}
                                className={`${active
                                  ? "bg-primary-pink text-white"
                                  : ""
                                  } group flex w-full items-center rounded-md px-6 py-2 text-base`}
                              >
                                Log out
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              )}
              <div className="lg:block hidden">
                {!isLoggedIn && (
                  <AuthButton
                    handleSignUpClick={() => {
                      handleAuthToggle({ key: 'isSignUpOpen', value: true })
                    }}
                    handleSignInClick={() => {
                      handleAuthToggle({ key: 'isLoginOpen', value: true })
                    }}
                    toggle={toggle}
                  />
                )}
              </div>
              <div onClick={() => setIsMobileMenuOpen(true)} className={`w-10 h-10 flex-center text-3xl  lg:hidden ${toggle ? 'text-primary-gray' : 'text-white'}`}>
                {reactIcons.menu}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <MobileMenu
        handleSignUpClick={() => handleAuthToggle({ key: 'isSignUpOpen', value: true })}
        handleSignInClick={() => handleAuthToggle({ key: 'isLoginOpen', value: true })}
        toggle={toggle}
        isOpen={isMobileMenuOpen}
        closeModal={() => setIsMobileMenuOpen(false)} />
    </>
  );
};

export default UserNavbar;
