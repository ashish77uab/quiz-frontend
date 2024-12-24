import React, { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import TextInput from "../forms/TextInput";
import {
  sellHolding,
} from "../../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../toast/ToastMsg";
import { Form, Formik } from "formik";
import { holdingSellValidationSchema } from "../../utils/validation";
import { useParams } from "react-router-dom";
const initialState = {
  name: '',
  quantity: '',
  endPrice: '',
};
const SellHolding = ({ isOpen, closeModal, holding, fetchData }) => {
  const { userId } = useParams();
  const [loading, setLoading] = useState(false)
  const [initialValue, setInitialValue] = useState(initialState)
  const handleSubmit = async (values, actionForm) => {
    setLoading(true)
    try {
      const res = await sellHolding({ ...values, userId, holdingId: holding?._id });
      const { status, data } = res;
      if (status >= 200 && status < 300) {
        toast.success(<ToastMsg title={`Selled Successfully`} />);
        actionForm.resetForm();
        closeModal()
        fetchData()
        setInitialValue(initialState)
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      console.log(error, "error");
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    } finally {
      setLoading(false)
    }
  };
  useEffect(() => {
    if (holding) {
      setInitialValue({
        ...initialState,
        ...holding,
        actionType: 'Sell',
        quantity: holding.quantityLeft
      });
    }
  }, [holding]);
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[1000]" onClose={closeModal}>
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
                className="w-full max-w-xl transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <Dialog.Title as="h4" className="heading-4 text-center">
                  Sell Holding
                </Dialog.Title>
                <Formik
                  enableReinitialize
                  initialValues={initialValue}
                  validationSchema={holdingSellValidationSchema(holding?.quantityLeft)}
                  onSubmit={handleSubmit}
                >
                  {({
                    values,
                    handleChange,
                    handleBlur,
                  }) => {
                    return (
                      <Form className="w-full space-y-4 mt-4">
                        <TextInput
                          type='number'
                          label={"Quantity of Holding"}
                          placeholder="eg. 4"
                          name="quantity"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.quantity}

                        />
                        <TextInput
                          type='number'
                          label={"Close Price"}
                          placeholder="eg. 400"
                          name="endPrice"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.endPrice}

                        />
                        <div>
                          <TextInput
                            label={"Date of Selling Holding"}
                            type="datetime-local"
                            placeholder="choose date"
                            name="date"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.date}
                          />
                        </div>
                        <footer className="py-4  font-medium">
                          <button type="submit" className="btn-outline-primary">
                            {loading ? 'Loading...' : holding ? 'Update' : 'Create'}
                          </button>
                        </footer>
                      </Form>
                    )
                  }}
                </Formik>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SellHolding;
