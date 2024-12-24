import React, { useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import ToastMsg from "../toast/ToastMsg";
import { Form, Formik } from "formik";
import TextInput from "../forms/TextInput";
import { addDeposit } from "../../api/api";
import { toast } from "react-toastify";
import { addDepositFormSchema } from "../../utils/validation";
import { reactIcons } from "../../utils/icons";
import { serialize } from "object-to-formdata";

const SingleInfo = ({ title, value }) => {
  return <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-black opacity-70">
      {title}
    </label>
    <div className="text-base py-2 text-gray-900 font-semibold px-4 rounded-md bg-pink-100">{value}</div>

  </div>
}
const DepositMoney = ({ closeModal, setIsReRender }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values, actionForm) => {
    setIsLoading(true)
    try {
      let formData = { ...values, amount: Number(values.amount) };
      const res = await addDeposit(serialize(formData));
      const { status, data } = res;
      if (status >= 200 && status < 300) {
        toast.success(<ToastMsg title={`Request Created Successfully`} />);
        closeModal()
        actionForm.resetForm()
        setIsReRender(prev => !prev)
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      console.log(error, 'while adding depsit error')
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    } finally { setIsLoading(false) }

  };
  return (
    <Formik
      initialValues={{
        amount: "",
        screenShot: "",

      }}
      validationSchema={addDepositFormSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        handleChange,
        handleBlur,
        setFieldValue
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

            <div>
              <TextInput
                label={"Attach Transaction ScreenShot"}
                type="file"
                name="screenShot"
                onChange={(e) => {
                  setFieldValue('screenShot', e.target.files[0])
                }}
                onBlur={handleBlur}

              />
            </div>

            <footer className="py-4 font-medium">
              <button type="submit" className="btn-outline-primary">
                {isLoading ? 'Loading...' : 'Add'}
              </button>
            </footer>
          </Form>
        )
      }}
    </Formik>
  )
}
const DepositModal = ({ isOpen, closeModal, setIsReRender }) => {
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
                className="transform overflow-hidden relative flex flex-col justify-between   max-w-2xl w-full rounded-lg   bg-white   !py-0 !px-0  shadow-lg"
              >
                <div role="button" onClick={closeModal} className=" w-[36px] h-[36px] absolute top-3 right-3 rounded-full flex-center text-2xl text-white bg-primary-pink ">{reactIcons.close}</div>

                <div className="flex flex-col">
                  <header className="py-4 px-6 flex justify-between items-center border-b border-b-zinc-300">
                    <h4 className="heading-4">Deposit Funds</h4>
                  </header>

                  <div className="my-2 px-6">
                    <div>
                      <h6 className="heading-6 py-2">Bank Details</h6>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <SingleInfo title={'Account Holder Name'} value={'JAGAT ENTERPRISE'} />
                      <SingleInfo title={'Account Number'} value={'251111101003363'} />
                      <SingleInfo title={'IFSC Code'} value={'HDFC0CGMCBL'} />
                      <SingleInfo title={'Bank Name'} value={'HDFC'} />
                      {/* <SingleInfo title={'Account Holder Name'} value={'STAR ENTERPRISES'} />
                      <SingleInfo title={'Account Number'} value={'50200099063812'} />
                      <SingleInfo title={'IFSC Code'} value={'HDFC0006335'} />
                      <SingleInfo title={'Bank Name'} value={'HDFC BANK'} /> */}
                    </div>
                  </div>
                  <div className="my-2 px-6">
                    <div>
                      {/* <h6 className="heading-6 py-2">Or Deposit With QR Code</h6> */}
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* <div>
                        <img className="w-[300px] object-contain h-[300px]" src="/images/phonepe.jpeg" alt="qr-code" />
                      </div> */}
                      <div>
                        <DepositMoney setIsReRender={setIsReRender} closeModal={closeModal} />
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

export default DepositModal