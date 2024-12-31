import React, { useState } from 'react'
import { setCurrentQuestion, setQuestions } from '../../redux/features/quizSlice'
import { answerObj } from '../../utils/constants'
import { useSelector } from 'react-redux'
import useQuestionTime from './useQuestionTime'
import { reactIcons } from '../../utils/icons'
import DangerouslySetHtml from './DangerouslySetHtml'
import { useNavigate } from 'react-router-dom'
import { submitQuiz } from '../../api/api'
import ToastMsg from '../../components/toast/ToastMsg'
import { toast } from 'react-toastify'
import SubmitConfirmation from '../../components/modals/SubmitConfirmation'


const Option = ({
    text,
    num,
    dispatch,
    currentQuestionToWork,
    question,
}) => {
    const { questions } = useSelector(state => state.quiz)
    const handleSelectOption = (num) => {
        let tempQuestion = [...questions]?.map((item) => {
            if (item?._id === currentQuestionToWork?._id) {
                let isAlreadySelected = item?.yourAnswer === answerObj[num]
                return { ...item, yourAnswer: isAlreadySelected ? null : answerObj[num] }
            } else {
                return item
            }
        })
        dispatch(setQuestions(tempQuestion))

    }
    const renderClassName = (question) => {
        if (question?.yourAnswer === answerObj[num]) {
            return 'border-primary-pink'
        }
        return 'border-zinc-200'
    }

    return (
        <div onClick={() => handleSelectOption(num)} className={`flex cursor-pointer items-center bg-white gap-4 rounded-md py-5 px-4 border ${renderClassName(question)}`}>
            <span className='font-semibold'>{answerObj[num]}.</span>
            <span className='font-medium'>{text}</span>
        </div>
    )

}
const SingleQuestion = ({ question, questions, isLastQuestion, timeToReturn, quizId, currentQuestion, dispatch, isIncludedReview, quizInfo, currentQuestionToWork }) => {

    const [isConfirmedOpen, setIsConfirmedOpen] = useState(false)
    const [updateLoading, setUpdateLoading] = useState(false)
    const navigate = useNavigate()
    const { questionTimer, questionTime } = useQuestionTime(question?.questionTime || 0)
    const handleNextQuestion = (type) => {
        if (type === 'next') {
            dispatch(setCurrentQuestion(currentQuestion + 1))
        } else {
            dispatch(setCurrentQuestion(currentQuestion - 1))
        }
        let tempQuestion = [...questions]?.map((item) => {
            if (item?._id === currentQuestionToWork?._id) {

                return { ...item, questionTimer, questionTime }
            } else {
                return item
            }
        })
        dispatch(setQuestions(tempQuestion))

    }
    const handleMarkAndReview = (type) => {
        let tempQuestion = [...questions]?.map((item) => {
            if (item?._id === currentQuestionToWork?._id) {
                return { ...item, isReviewed: type ? !item?.isReviewed : true, questionTimer, questionTime }
            } else {
                return item
            }
        })
        if (!type) {
            dispatch(setCurrentQuestion(isLastQuestion ? 0 : currentQuestion + 1))
        }
        dispatch(setQuestions(tempQuestion))
    }
    const clearSelection = () => {
        let tempQuestion = [...questions]?.map((item) => {
            if (item?._id === currentQuestionToWork?._id) {
                return { ...item, yourAnswer: null }
            } else {
                return item
            }
        })
        dispatch(setQuestions(tempQuestion))
    }
    const handleSubmitExam = async () => {
        setUpdateLoading(true)
        try {
            const questionAnswer = questions?.map((item, index) => {
                return {
                    questionId: item._id,
                    questionNumber: index + 1,
                    answer: item.answer,
                    userAnswer: item.yourAnswer,
                    isCorrect: item.yourAnswer ? item.answer === item.yourAnswer : null,
                    questionTimer: item?.questionTimer,
                    questionTime: item?.questionTime
                }
            })
            const res = await submitQuiz({
                quizId,
                questionAnswer,
            });
            const { status, data } = res;
            if (status >= 200 && status <= 300) {
                navigate(`/quiz/result/${data?._id}/${quizId}`, { replace: true })
                dispatch(setCurrentQuestion(0))
            } else {
                toast.error(<ToastMsg title={data.message} />);
            }
        } catch (error) {
            console.log(error)
            toast.error(<ToastMsg title={error?.response?.data?.message} />);
        } finally {
            setUpdateLoading(false)
        }

    }
    return (
        <div>
            <div className="flex items-center justify-between gap-4 py-4 px-4 bg-pink-50">
                <div className='flex items-center gap-2'>
                    <div className={`w-8 h-8 flex-center rounded-full font-medium text-white  ${question?.yourAnswer ? 'bg-primary-blue ' : 'bg-primary-gray '}`}>{currentQuestion + 1}</div>
                    <div className="flex items-center gap-1">
                        <span className="text-xl text-primary-pink">{reactIcons?.watch}</span>
                        <div>
                            <span className="text-xs font-semibold mr-1"> {questionTimer} </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className='bg-green-200   px-3 py-1 rounded-md text-xs'>+ {quizInfo?.rightMark}</div>
                        <div className='bg-red-200   px-3 py-1 rounded-md text-xs'>- {quizInfo?.negativeMark}</div>
                    </div>

                </div>
                <div onClick={() => handleMarkAndReview(true)} className="flex items-center gap-1">
                    {isIncludedReview ? <span className="text-2xl text-primary-pink">{reactIcons?.starFill}</span> : <span className="text-2xl">{reactIcons?.star}</span>}
                </div>
            </div>
            <div className='py-4 px-4'>
                <div className='mb-6'>
                    <DangerouslySetHtml html={question?.question} />
                </div>
                <div className='space-y-4'>
                    <Option question={question} text={question?.option1} num={'1'} dispatch={dispatch} currentQuestionToWork={currentQuestionToWork} />
                    <Option question={question} text={question?.option2} num={'2'} dispatch={dispatch} currentQuestionToWork={currentQuestionToWork} />
                    <Option question={question} text={question?.option3} num={'3'} dispatch={dispatch} currentQuestionToWork={currentQuestionToWork} />
                    <Option question={question} text={question?.option4} num={'4'} dispatch={dispatch} currentQuestionToWork={currentQuestionToWork} />

                </div>
            </div>

            <div className="absolute bottom-0 px-4 py-4 w-full bg-white shadow-card border-t-2 border-t-zinc-100">
                <div className="flex items-center gap-2 justify-between mb-2">
                    <button
                        disabled={currentQuestion === 0}
                        onClick={() => handleNextQuestion('prev')}
                        className={`btn-secondary btn-sm  min-w-[100px] `}
                    >
                        Prev
                    </button>
                    <button
                        disabled={isLastQuestion}
                        onClick={() => handleNextQuestion('next')}
                        className={`btn-secondary btn-sm  min-w-[100px] `}
                    >
                        Next
                    </button>
                </div>
                <div className="flex items-center gap-2 justify-between">
                    <button
                        onClick={isIncludedReview ? () => handleMarkAndReview(true) : () => handleMarkAndReview(false)}
                        className={`rounded-md border-c text-xs px-4 py-2  flex-shrink-0  flex-1 ${isIncludedReview ? 'border-primary-pink text-primary-pink' : ''} `}
                    >
                        {isIncludedReview ? 'Marked' : 'Mark & Next'}
                    </button>
                    <button
                        onClick={clearSelection}
                        className={`rounded-md border-c text-xs px-4 py-2 flex-1  `}
                    >
                        Clear
                    </button>
                    <button
                        // disabled={questions?.length === 0}
                        onClick={() => setIsConfirmedOpen(true)}
                        className={`btn-primary btn-sm flex-1 `}
                    >
                        Submit
                    </button>
                </div>

            </div>
            <SubmitConfirmation
                isOpen={isConfirmedOpen}
                closeModal={() => {
                    setIsConfirmedOpen(false)
                }}
                handleDelete={handleSubmitExam}
                title={"Quiz"}
                loading={updateLoading}
                Timer={timeToReturn}
            />

        </div>
    )
}

export default SingleQuestion