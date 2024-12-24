import React, { useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ToastMsg from "../toast/ToastMsg";
import { Form, Formik } from "formik";
import TextInput from "../forms/TextInput";
import { withdrawFund } from "../../api/api";
import { toast } from "react-toastify";
import { withdrawFundFormSchema } from "../../utils/validation";
import { reactIcons } from "../../utils/icons";
import { updateUserWallet } from "../../redux/features/authSlice";


const WithdrawMoney = ({ closeModal, setIsReRender }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values, actionForm) => {
    setIsLoading(true)
    try {
      let formData = { ...values, amount: Number(values.amount) };
      const res = await withdrawFund(formData);
      const { status, data } = res;
      if (status >= 200 && status < 300) {
        toast.success(<ToastMsg title={`Request Created Successfully`} />);
        dispatch(updateUserWallet(Number(values.amount)))
        closeModal()
        actionForm.resetForm()
        setIsReRender(prev => !prev)
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      console.log(error, 'while withdrawing fund error')
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    } finally { setIsLoading(false) }

  };
  return (
    <Formik
      initialValues={{
        amount: "",
        panNumber: "",

      }}
      validationSchema={withdrawFundFormSchema}
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
            <TextInput
              label={"PAN Number"}
              placeholder="Enter PAN number"
              name="panNumber"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.panNumber}

            />

            <footer className="py-4 font-medium">
              <button type="submit" className="btn-outline-primary">
                {isLoading ? 'Loading...' : 'Request'}
              </button>
            </footer>
          </Form>
        )
      }}
    </Formik>
  )
}
const WithdrawModal = ({ isOpen, closeModal, setIsReRender }) => {
  const dialogRef = useRef(null);
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
                className="transform overflow-hidden relative flex flex-col justify-between   max-w-lg w-full rounded-lg   bg-white   !py-0 !px-0  shadow-lg"
              >
                <div role="button" onClick={closeModal} className=" w-[36px] h-[36px] absolute top-3 right-3 rounded-full flex-center text-2xl text-white bg-primary-pink ">{reactIcons.close}</div>

                <div className="flex flex-col">
                  <header className="py-4 px-6 flex justify-between items-center border-b border-b-zinc-300">
                    <h4 className="heading-4">Withdraw Fund</h4>
                  </header>


                  <div className="my-2 px-6">

                    <div className="grid grid-cols-1 gap-4">

                      <div>
                        <WithdrawMoney setIsReRender={setIsReRender} closeModal={closeModal} />
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

export default WithdrawModal