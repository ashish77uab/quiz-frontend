import React, { useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { toast } from "react-toastify";
import ToastMsg from "../toast/ToastMsg";

import ReactSelect from "../forms/ReactSelect";
import { socketConnect } from "../../api/api";


const SendVoucherNotification = ({ isOpen, closeModal, formData, userId, loading }) => {
  const socketRef=useRef();
  const [selectedVoucher, setSelectedVoucher] = useState(null)
  const [voucherArray, setVoucherArray] = useState([])

  const handleReset = () => {
    closeModal();
  };
  useEffect(() => {
    if (formData) {
      const tempData = formData?.map((item) => ({ label: item?.name, value: item?._id }))
      setVoucherArray(tempData)
      setSelectedVoucher(tempData?.[0])
    }
  }, [formData])

  const handleSubmit = () => {
    if (!socketRef.current){
      socketRef.current = socketConnect('notifications')
    }
    if (socketRef.current) {
      socketRef.current?.emit('send-notification-admin', { userId: userId, voucherId: selectedVoucher?.value });
      toast.success(<ToastMsg title="Sent Successfully" />);
      handleReset()

    }else{
      toast.error(<ToastMsg title="Unable to connect to the server. Please try again later." />);
    }
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
                onSubmit={handleSubmit}
                as="form"
                className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <Dialog.Title as="h4" className="heading-4 text-center">
                  Send Notification
                </Dialog.Title>
                <div>
                  <div className="mt-2 min-h-[400px]">
                    <div className=" w-full">
                      <div className="grid grid-cols-1 gap-x-4 gap-y-2 py-6">
                        <div className="flex flex-col gap-1">
                          <ReactSelect
                            label={"Choose voucher"}
                            options={voucherArray}
                            value={selectedVoucher || voucherArray[0]}
                            onChange={(e) => {
                              setSelectedVoucher(e);
                            }}
                          />
                        </div>
                       

                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end gap-6 items-center">
                    <button type="button" onClick={handleSubmit} className="btn-primary">
                      {loading ? 'loading...' : 'Send'}
                    </button>
                    <button onClick={closeModal} className="btn-red">
                      Cancel
                    </button>
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

export default SendVoucherNotification;
