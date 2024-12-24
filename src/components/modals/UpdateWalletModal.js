import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import ToastMsg from "../toast/ToastMsg";
import { Form, Formik } from "formik";
import TextInput from "../forms/TextInput";
import { updateWallet } from "../../api/api";
import { toast } from "react-toastify";
import { updateWalletSchema } from "../../utils/validation";
import { reactIcons } from "../../utils/icons";


const UpdateWalletAmount = ({ closeModal, walletData, getSingleUser }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values, actionForm) => {
    setIsLoading(true)
    try {
      let formData = { amount: Number(values.amount) };
      const res = await updateWallet(walletData?.userId, formData);
      const { status, data } = res;
      if (status >= 200 && status < 300) {
        toast.success(<ToastMsg title={`Updated Successfully`} />);
        closeModal()
        getSingleUser(walletData?.userId)
        actionForm.resetForm()
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      console.log(error, 'while updating fund error')
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    } finally { setIsLoading(false) }

  };
  return (
    <>

      <Formik
        enableReinitialize
        initialValues={{
          amount: walletData?.amount,

        }}
        validationSchema={updateWalletSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleChange,
          handleBlur,
        }) => {
          return (
            <Form className="w-full space-y-4">
              <TextInput
                type='number'
                label={"Amount"}
                placeholder="Enter amount"
                name="amount"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.amount}

              />
              <footer className="py-4 font-medium">
                <button type="submit" className="btn-outline-primary">
                  {isLoading ? 'Loading...' : 'Update'}
                </button>
              </footer>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}
const UpdateWalletModal = ({ isOpen, closeModal, walletData, getSingleUser }) => {
  return (
    <Transition appear show={isOpen} as={Fragment} >
      <Dialog as="div" className="relative z-[1000]" onClose={closeModal} >
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
                className="transform overflow-hidden relative flex flex-col justify-between   max-w-lg w-full rounded-lg   bg-white   !py-0 !px-0  shadow-lg"
              >
                <div role="button" onClick={closeModal} className=" w-[36px] h-[36px] absolute top-3 right-3 rounded-full flex-center text-2xl text-white bg-primary-pink ">{reactIcons.close}</div>

                <div className="flex flex-col">
                  <header className="py-4 px-6 flex justify-between items-center border-b border-b-zinc-300">
                    <h4 className="heading-4">Update Wallet</h4>
                  </header>


                  <div className="my-2 px-6">

                    <div className="grid grid-cols-1 gap-4">

                      <div>
                        <UpdateWalletAmount getSingleUser={getSingleUser} closeModal={closeModal} walletData={walletData} />
                      </div>
                    </div>
                  </div>


                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default UpdateWalletModal