import React, { useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { reactIcons } from "../../utils/icons";
import useQuestionStatus from "../../hooks/useQuestionStatus";

const QuestionStatus = ({ isOpen, closeModal }) => {
    const dialogRef = useRef(null);
    const {
        totalQuestions,
        totalReviewed,
        totalAnswered,
        questions,
        currentQuestion,
        handleQuestionStatusClick
    } = useQuestionStatus()
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

                <div className="fixed inset-0 overflow-y-auto p-2">
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
                                className=" overflow-hidden relative  !rounded-md     transition-all max-w-md w-full  bg-white !px-4  h-full   shadow-lg"
                            >
                                <div className="flex justify-between items-center gap-4  py-4">
                                    <Link to={'/'} onClick={closeModal}>
                                        <span className="text-xl font-bold text-primary-pink">
                                            Play Quiz
                                        </span>
                                    </Link>
                                    <div ref={dialogRef} className=""></div>

                                    <div onClick={closeModal} className=" w-[32px] cursor-pointer h-[32px] rounded-full flex-center text-2xl text-white bg-primary-pink ">{reactIcons.close}</div>
                                </div>

                                <div className=" my-4">
                                    <ul className="space-y-2 gap-4 divide-y divide-slate-200 ">

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
                                <div className="flex items-center flex-wrap gap-8 mt-8">
                                    {questions?.map((question, index) => {
                                        const isMarkedForReview = question?.isReviewed
                                        const isUnattempted = question?.yourAnswer === null && question?.isReviewed === false
                                        const isattempted = question?.yourAnswer
                                        return (
                                            <div onClick={() => {
                                                handleQuestionStatusClick(index)
                                                closeModal()
                                            }
                                            } key={question._id} className="flex cursor-pointer  items-center gap-2 relative">
                                                {isMarkedForReview && <span className="text-lg absolute top-[-10px] right-[-8px] block text-primary-pink">{reactIcons.starFill}</span>}
                                                <div className={`w-8 h-8 flex-center text-base font-medium rounded-full border  border-primary-gray
                                                 ${isattempted ? 'bg-primary-pink border-none text-white' : ''}
                                                 ${isUnattempted ? 'bg-primary-gray text-white' : ''}
                                                  ${isMarkedForReview ? 'bg-primary-blue text-white border-0' : ''}
                                                ${currentQuestion === index ? 'border-primary-blue text-primary-blue' : ''}
                                                `}>{index + 1}</div>
                                            </div>
                                        )
                                    })}

                                </div>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default QuestionStatus