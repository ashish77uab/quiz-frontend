import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import useQuestionStatus from "../../hooks/useQuestionStatus";
import { reactIcons } from "../../utils/icons";

const SubmitConfirmation = ({ isOpen, closeModal, handleDelete, title, loading, Timer }) => {
  const {
    totalQuestions,
    totalReviewed,
    totalAnswered,
    questions,
    currentQuestion
  } = useQuestionStatus()
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
                as="div"
                className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all"
              >

                <div className="w-full">
                  <div className=" my-4 w-full">
                    <ul className="space-y-2 gap-4 divide-y divide-slate-200 ">
                      <li className="py-3 flex items-center gap-4 justify-between">
                        <div className="flex items-center gap-4 ">
                          <span className="text-xl  ">{reactIcons.watch}</span>
                          <span className="text-base font-medium text-gray-500 ">Time Left</span>
                        </div>
                        <span className="text-lg font-semibold ">{Timer}</span>
                      </li>
                      <li className="py-3 flex items-center gap-4 justify-between">
                        <div className="flex items-center gap-4 ">
                          <span className="text-lg  ">{reactIcons.starFill}</span>
                          <span className="text-base font-medium text-gray-500 ">Marked</span>
                        </div>
                        <span className="text-lg font-semibold ">{totalReviewed}</span>
                      </li>
                      <li className="py-3 flex items-center gap-4 justify-between">
                        <div className="flex items-center gap-4 ">
                          <span className="w-3 h-3 block rounded-full bg-primary-gray"></span>
                          <span className="text-base font-medium text-gray-500 ">UnAttempted</span>
                        </div>
                        <span className="text-lg font-semibold ">{totalQuestions - totalAnswered}</span>
                      </li>
                      <li className="py-3 flex items-center gap-4 justify-between">
                        <div className="flex items-center gap-4 ">
                          <span className="w-3 h-3  block rounded-full bg-primary-pink"></span>
                          <span className="text-base font-medium text-gray-500 ">Attempted</span>
                        </div>
                        <span className="text-lg font-semibold ">{totalAnswered}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <h6 className="heading-6">  Are you sure you want to submit this {title}?</h6>
                <div className="mt-4 flex justify-center gap-6 items-center">
                  <button onClick={handleDelete} className="btn-primary">
                    {loading ? 'submitting...' : 'Yes'}
                  </button>
                  <button onClick={closeModal} className="btn-red">
                    No
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

export default SubmitConfirmation;
