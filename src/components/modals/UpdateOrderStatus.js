import React, { useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { addCategory, socketConnect, updateCategory, updateOrderStatus } from "../../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../toast/ToastMsg";
import { colorsOptions } from "../../utils/constants";
import ReactSelect from "../forms/ReactSelect";
import TextInput from "../forms/TextInput";
const statusArray=[
  {
  value: '',
  label: 'Choose status'
},
  {
  value: 'Pending',
  label: 'Pending'
},{
  value: 'Processed',
  label: 'Processed'
},
{
  value: 'Delivered',
  label: 'Delivered'
},
{
  value: 'Rejected',
  label: 'Rejected'
}
]

const UpdateOrderStatus = ({ isOpen, closeModal, formData, fetchData }) => {
  const socketRef=useRef()
  if(!socketRef.current){
    socketRef.current = socketConnect('notifications');

  }
  const [status, setStatus] = useState(statusArray[0])
  const [message, setMessage] = useState('')

  const handleReset = () => {
    closeModal();
    setMessage('')
  };
  useEffect(( )=>{
    if (formData && formData.status) {
      setStatus({ label: formData?.status, value: formData?.status })
    }
  }, [formData])
  const handleSubmit = async (value) => {
    try {
      if(!status?.value){
        toast.error(<ToastMsg title={"Please select a status"} />);
        return;
      }
      if (!message && !message?.trim()){
        toast.error(<ToastMsg title={"Please enter message"} />);
        return;
      }
      const res = await updateOrderStatus({ status: status?.value, id: formData.id});
      const { status:resStatus, data } = res;
      if (resStatus >= 200 && resStatus < 300) {
        toast.success(<ToastMsg title={`Updated Successfully`} />);
        handleReset();
        fetchData()
      
        if (socketRef.current) {
          socketRef.current?.emit('send-notification', { userId: formData?.userId, message :message});

        } else {
          toast.error(<ToastMsg title="Unable to connect to the server. Please try again later." />);
        }
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      console.log(error, "error");
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
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
                  Change order status
                </Dialog.Title>
                <div className="mt-2 min-h-[400px]">
                  <div className=" w-full">
                    <div className="grid grid-cols-1 gap-x-4 gap-y-2 py-6">
                      
                      <div className="flex flex-col gap-1">
                        <ReactSelect
                          label={"Choose order status to"}
                          options={statusArray}
                          value={status || statusArray[0]}
                          onChange={(e) => {
                            setStatus(e);
                          }}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <TextInput
                          name="message"
                          label={"Message"}
                          placeholder="Enter message about order status"
                          value={message}
                          onChange={(e)=>setMessage(e.target.value)}
                        />
                      </div>
                      
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end gap-6 items-center">
                  <button type="button" onClick={handleSubmit} className="btn-primary">
                  Submit
                  </button>
                  <button type="button" onClick={closeModal} className="btn-red">
                    Cancel
                  </button>
                </div>

                
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UpdateOrderStatus;
