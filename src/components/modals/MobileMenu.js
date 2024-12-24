import React, { useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { reactIcons } from "../../utils/icons";
import AuthButton from "../../pages/components/AuthButton";
import { getUserToken, navbarLinks, userMenuLinks } from "../../utils/constants";
import { useSelector } from "react-redux";

const MobileMenu = ({ isOpen, closeModal, handleSignUpClick, handleSignInClick, toggle }) => {
    const isLoggedIn = getUserToken()
    const dialogRef = useRef(null);
    const { user } = useSelector((state) => state.auth);
    const mobileLinks = user?.role === 'User' ? userMenuLinks : navbarLinks
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[1000]" onClose={closeModal} initialFocus={dialogRef ? dialogRef : undefined}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex h-full w-full items-center justify-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className="transform overflow-hidden relative flex flex-col justify-between   w-full h-full  bg-white   !pt-4  lg:!px-10 shadow-lg"
                            >
                                <div className="flex justify-between items-center gap-4 px-4">
                                    <Link to={'/'} onClick={closeModal}>
                                        <img className="w-[150px]" src="/images/logo.png" alt="logo" />
                                    </Link>
                                    <div ref={dialogRef} className=""></div>

                                    <div onClick={closeModal} className=" w-[36px] h-[36px] rounded-full flex-center text-2xl text-white bg-primary-pink ">{reactIcons.close}</div>
                                </div>
                                <div className="flex flex-grow flex-col gap-1 pt-8">
                                    {mobileLinks?.map((item) => {
                                        return (
                                            <Link
                                                onClick={closeModal}
                                                key={item.path}
                                                to={item.path}
                                                className={`font-semibold py-3 flex items-center gap-2  'text-gray-800 hover:text-primary-pink '  px-6  ${item.path === window.location.pathname ? "text-primary-pink [&>div]:block" : ""
                                                    }`}
                                            >
                                                {item.title} <div className="w-[5px] h-[5px] hidden rounded-full bg-primary-pink"></div>
                                            </Link>
                                        )
                                    })}
                                </div>
                                {!isLoggedIn && <div className="px-6 py-4 border-t border-t-zinc-100">
                                    <AuthButton
                                        isMobileMenu
                                        handleSignUpClick={() => {
                                            handleSignUpClick()
                                            closeModal()
                                        }}
                                        handleSignInClick={() => {
                                            handleSignInClick()
                                            closeModal()
                                        }}
                                        toggle={toggle}
                                    />
                                </div>}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default MobileMenu