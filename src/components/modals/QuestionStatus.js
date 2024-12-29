import React, { useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { reactIcons } from "../../utils/icons";
import { useSelector } from "react-redux";

const QuestionStatus = ({ isOpen, closeModal }) => {
    const dialogRef = useRef(null);
    const {
        questions,
        review,
        answered,
        currentQuestion
    } = useSelector((state) => state.quiz);
    const totalQuestions = questions.length;
    const totalReviewed = review.length;
    const totalAnswered = answered.length;
    const totalUnseen = totalQuestions - 1 - currentQuestion;
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
                                className=" overflow-hidden relative  !rounded-md     transition-all max-w-lg w-full  bg-white !px-4  h-full   shadow-lg"
                            >
                                <div className="flex justify-between items-center gap-4  py-4">
                                    <Link to={'/'} onClick={closeModal}>
                                        <span className="text-xl font-bold text-primary-pink">
                                            Play Quiz
                                        </span>
                                    </Link>
                                    <div ref={dialogRef} className=""></div>

                                    <div onClick={closeModal} className=" w-[32px] h-[32px] rounded-full flex-center text-2xl text-white bg-primary-pink ">{reactIcons.close}</div>
                                </div>
                                <div className="flex flex-grow flex-col gap-1 mt-4">
                                    <div className="grid grid-cols-2 gap-4 pb-4 border-b border-b-gray-200">
                                        <div className="flex items-center gap-2">
                                            <div className="min-w-[20px]">
                                                <span className="text-lg block text-primary-pink">{reactIcons.starFill}</span>
                                            </div>
                                            <span className="text-xs font-medium">Marked for review</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="min-w-[20px]">
                                                <span className="w-3 h-3 block rounded-full bg-primary-gray"></span>
                                            </div>
                                            <span className="text-xs font-medium">Unattempted</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="min-w-[20px]">
                                                <span className="w-3 h-3 ml-1 block rounded-full bg-primary-pink"></span>
                                            </div>
                                            <span className="text-xs font-medium">Attempted</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="min-w-[20px]">
                                                <span className="w-3 h-3 block rounded-full border-2 border-gray-400"></span>
                                            </div>
                                            <span className="text-xs font-medium">Unseen</span>
                                        </div>
                                    </div>
                                </div>
                                <div className=" mt-4">
                                    <div className="flex items-center gap-4 ">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg block text-primary-pink">{reactIcons.starFill}</span>
                                            <span className="text-sm font-medium">{totalReviewed}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-3 h-3 block rounded-full bg-primary-gray"></span>
                                            <span className="text-sm font-medium">{totalQuestions - totalAnswered}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-3 h-3  block rounded-full bg-primary-pink"></span>
                                            <span className="text-sm font-medium">{totalAnswered}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-3 h-3 block rounded-full border-2 border-gray-400"></span>
                                            <span className="text-sm font-medium">{totalUnseen}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center flex-wrap gap-2 mt-4">
                                    {questions?.map((question, index) => {
                                        const isMarkedForReview = review?.findIndex((item) => item?._id === question?._id) >= 0
                                        const isUnattempted = answered?.findIndex((item) => item?._id === question?._id) < 0 && index < currentQuestion
                                        const isattempted = answered?.findIndex((item) => item?._id === question?._id) >= 0
                                        return (
                                            <div key={question._id} className="flex items-center gap-2 relative">
                                                {isMarkedForReview && <span className="text-lg absolute top-[-4px] right-[-4px] block text-primary-pink">{reactIcons.starFill}</span>}
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