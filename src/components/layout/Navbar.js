import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reactIcons } from "../../utils/icons";
import { setLogout, setModalToggle, } from "../../redux/features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { getUserToken, navbarLinks } from "../../utils/constants";


import React from 'react'
import AuthButton from "../../pages/components/AuthButton";
import { useScrollToTop } from "../../hooks/useScrollToTop";



const Navbar = () => {
  useScrollToTop()
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
      <nav className={`flex items-center  shadow-navbar border-b border-b-zinc-50 bg-transparent transition-all duration-200 py-[10px] sticky top-0 left-0  bg w-full z-[50] ${toggle ? 'bg-white' : 'bg-transparent'}`}>
        <div className="px-4 w-full">
          <div className="flex items-center justify-between">
            <div className="">
              <Link to="/" className="">
                <span className="text-xl font-bold text-primary-pink">
                  Play Quiz
                </span>
              </Link>
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
                        className="w-10 h-10 object-cover overflow-hidden rounded-full"
                        src={user?.clientImage || "/images/user.png"}
                        alt="user"
                      />
                      <span className={`${toggle ? 'text-black' : 'text-white'}`}>{reactIcons?.arrowDown}</span>
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
                      <Menu.Items className="absolute right-0 mt-2 w-[300px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-2 space-y-2 ">
                          <div className="flex flex-col items-center gap-1 px-2 py-2 border-b border-b-zinc-300 mb-2">
                            <p className="font-bold">{user?.fullName}</p>
                            <p className="text-muted text-sm font-medium">{user?.email}</p>

                          </div>
                          {/* <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => navigate(`/profile/${user._id}`)}
                                className={`${active
                                  ? "bg-primary-pink text-white"
                                  : "text-gray-900"
                                  } group flex w-full items-center rounded-md px-6 py-2 text-base`}
                              >
                                Profile
                              </button>
                            )}
                          </Menu.Item> */}
                          {user?.role === 'Admin' && <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => navigate(`/dashboard`)}
                                className={`${active
                                  ? "bg-primary-pink text-white"
                                  : "text-gray-900"
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
                                  : "text-gray-900"
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
              {!isLoggedIn && <div className="lg:hidden block">
                <button
                  onClick={() => {
                    handleAuthToggle({ key: 'isLoginOpen', value: true })
                  }}
                  className='btn-primary px-6 min-w-fit'
                >
                  Log In
                </button>
              </div>}
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
              <div onClick={() => handleAuthToggle({ key: 'isQuestionStatusOpen', value: true })} className={`w-10 h-10 flex-center text-3xl cursor-pointer `}>
                {reactIcons.menu}
              </div>
            </div>
          </div>
        </div>
      </nav>

    </>
  );
};

export default Navbar;
