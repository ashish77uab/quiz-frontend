import React, { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import TextInput from "../forms/TextInput";
import {
  createQuiz,
  updateQuiz,
} from "../../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../toast/ToastMsg";
import { Form, Formik } from "formik";
import { createQuizValidationSchema } from "../../utils/validation";
const initialState = {
  name: '',
  questionCount: '',
  rightMark: '',
  negativeMark: '',
  time: '',
};
const CreateAndUpdateQuiz = ({ isOpen, quiz, closeModal, fetchData }) => {
  const [loading, setLoading] = useState(false)
  const [initialValue, setInitialValue] = useState(initialState)
  const handleSubmit = async (values, actionForm) => {
    setLoading(true)
    try {
      const res = quiz ? await updateQuiz({ ...values }, quiz?._id) : await createQuiz({ ...values });
      const { status, data } = res;
      if (status >= 200 && status < 300) {
        toast.success(<ToastMsg title={quiz ? `Updated Successfully` : `Created Successfully`} />);
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
    setInitialValue({
      name: quiz?.name,
      questionCount: quiz?.questionCount,
      rightMark: quiz?.rightMark,
      negativeMark: quiz?.negativeMark,
      time: quiz?.time,
    })
  }, [quiz])


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
                  {quiz ? 'Create' : 'Update'} Quiz
                </Dialog.Title>
                <Formik
                  enableReinitialize
                  initialValues={initialValue}
                  validationSchema={createQuizValidationSchema}
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
                          label={"Name of the quiz"}
                          placeholder="Enter name of the quiz"
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}

                        />
                        <TextInput
                          label={"No of questions will be in the quiz"}
                          placeholder="eg. 20"
                          type='number'
                          name="questionCount"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.questionCount}

                        />
                        <TextInput
                          type='number'
                          label={"Positive marks of the question"}
                          placeholder="eg. 4"
                          name="rightMark"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.rightMark}

                        />
                        <TextInput
                          type='number'
                          label={"Negative marks of the question"}
                          placeholder="eg. 1"
                          name="negativeMark"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.negativeMark}
                        />
                        <TextInput
                          type='number'
                          label={"Time of the quiz (in mins) "}
                          placeholder="eg. 25"
                          name="time"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.time}
                        />


                        <footer className="py-4  font-medium">
                          <button type="submit" className="btn-outline-primary">
                            {loading ? 'Loading...' : 'Create'}
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

export default CreateAndUpdateQuiz;
