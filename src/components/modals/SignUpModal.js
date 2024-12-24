import React, { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Register from '../../pages/Register'
import { reactIcons } from "../../utils/icons";

const SignUpModal = ({ isOpen, closeModal}) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[1000]" onClose={()=>{}}>
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
                    <div className="flex min-h-full items-center justify-center p-4 ">
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
                                className="transform relative overflow-hidden max-w-7xl w-full  bg-white !rounded-xl  !py-10  lg:!px-10 shadow-lg"
                            >
                                <div role="button" onClick={closeModal} className=" w-[36px] h-[36px] absolute top-3 right-3 rounded-full flex-center text-2xl text-white bg-primary-pink ">{reactIcons.close}</div>
                                <Register closeModal={closeModal}/>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default SignUpModal