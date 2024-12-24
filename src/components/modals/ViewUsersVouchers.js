import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";


const ViewUsersVouchers = ({ isOpen, closeModal, vouchers, }) => {

  const handleReset = () => {
    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[1000]" onClose={handleReset}>
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
          <div className="flex min-h-full items-center justify-center p-4 text-center">
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
                className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <Dialog.Title as="h4" className="heading-4 text-center">
                  Users Vouchers
                </Dialog.Title>
                <div className="mt-2 min-h-[400px]">
                  <div className=" w-full">
                    <div className="py-6">
                      <div className="flex items-center gap-1 py-2">
                        <b className="w-[80px]">SR. No</b>
                        <b className="flex-1">Voucher Name</b>
                        <b className="flex-1">Code</b>
                      </div>
                      <div className="space-y-1">
                        {
                          vouchers.map((voucher, index) => (
                            <div key={index} className="flex items-center gap-1">
                              <div className="w-[80px]">{index+1}</div>
                              <div className="flex-1">{voucher.name}</div>
                              <div className="flex-1">{voucher.code}</div>
                            </div>
                          ))}
                      </div>
                     
                       {vouchers.length === 0 && <div>No vouchers found.</div>}

                      
                     
                    </div>
                  </div>
                </div>
               

                
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ViewUsersVouchers;
