import React, { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import TextInput from "../forms/TextInput";
import {
  updateStock,
} from "../../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../toast/ToastMsg";
import { Form, Formik } from "formik";
import { stockValidationSchema } from "../../utils/validation";
import { useParams } from "react-router-dom";
import moment from "moment";
const initialState = {
  name: '',
  quantity: '',
  startPrice: '',
  actionType: 'Buy',
  quantityLeft: '',
};
const EditStockModal = ({ isOpen, closeModal, stock, fetchData }) => {
  const [isChecked, setIsChecked] = useState(false)
  const isBuyStock = stock?.actionType === 'Buy'
  const [isBuy, setIsBuy] = useState(isBuyStock)
  const { userId } = useParams();
  const [loading, setLoading] = useState(false)
  const [initialValue, setInitialValue] = useState(initialState)
  const handleSubmit = async (values, actionForm) => {
    setLoading(true)
    try {
      let tempData = { ...values, actionType: isBuy ? 'Buy' : 'Sell' }
      if (isBuyStock) {
        tempData.amount = Number(values.startPrice) * Number(values.quantity)
      }
      const res = await updateStock(
        { ...tempData, userId },
        stock?._id,
        isChecked
      );
      const { status, data } = res;
      if (status >= 200 && status < 300) {
        toast.success(<ToastMsg title={`Updated Successfully`} />);
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
    if (stock) {
      setInitialValue({
        ...stock,
        userId: stock?.userId,
        date: moment(stock.date).format('YYYY-MM-DDTHH:mm')
      });
    }
  }, [stock]);
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
                  Update Stock
                </Dialog.Title>
                <Formik
                  enableReinitialize
                  initialValues={initialValue}
                  validationSchema={stockValidationSchema}
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
                          label={"Symbol"}
                          placeholder="Enter symbol"
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}

                        />
                        <TextInput
                          type='number'
                          label={"Quantity of Stock"}
                          placeholder="eg. 4"
                          name="quantity"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.quantity}

                        />
                        <TextInput
                          type='number'
                          label={"Avg price"}
                          placeholder="eg. 400"
                          name="startPrice"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.startPrice}

                        />
                        <>
                          <TextInput
                            type='number'
                            label={"Close price"}
                            placeholder="eg. 200"
                            name="endPrice"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.endPrice}
                          />
                          <TextInput
                            type='number'
                            label={"Change profit and loss"}
                            placeholder="eg. 200"
                            name="diffAmount"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.diffAmount}
                            helperText={'Note: make negative for loss'}
                            labelAddon={
                              <input
                                className="w-5 h-5"
                                type="checkbox"
                                checked={isChecked}
                                name=""
                                id=""
                                onChange={(e) => setIsChecked(e.target.checked)}
                              />
                            }
                          />
                          <TextInput
                            type='number'
                            label={"Quantity Left"}
                            placeholder="eg. 200"
                            name="quantityLeft"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values?.quantityLeft}
                          />

                        </>
                        <div>
                          <TextInput
                            label={"Date of Stock"}
                            type="datetime-local"
                            placeholder="choose date"
                            name="date"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.date}
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              id="buy"
                              name="actionType"
                              value="Buy"
                              checked={isBuy}
                              className="w-6 h-6 cursor-pointer"
                              onChange={(e) => setIsBuy(true)}
                            />
                            <label className=" cursor-pointer text-lg" htmlFor="buy">
                              Buy
                            </label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              id="sell"
                              name="actionType"
                              value="Sell"
                              checked={!isBuy}
                              className="w-6 h-6 cursor-pointer"
                              onChange={(e) => setIsBuy(false)}
                            />
                            <label className=" cursor-pointer text-lg" htmlFor="sell">
                              Sell
                            </label>
                          </div>
                        </div>


                        <footer className="py-4  font-medium">
                          <button type="submit" className="btn-outline-primary">
                            {loading ? 'Loading...' : stock ? 'Update' : 'Create'}
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

export default EditStockModal;
