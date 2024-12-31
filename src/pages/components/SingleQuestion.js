import React from 'react'
import { setQuestions } from '../../redux/features/quizSlice'
import { answerObj } from '../../utils/constants'
import { useSelector } from 'react-redux'
import useQuestionTime from './useQuestionTime'
import { reactIcons } from '../../utils/icons'
import DangerouslySetHtml from './DangerouslySetHtml'


const Option = ({ text, num, dispatch, currentQuestionToWork, question }) => {
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
        <div onClick={() => handleSelectOption(num)} className={`flex items-center bg-white gap-4 rounded-md py-5 px-4 border ${renderClassName(question)}`}>
            <span className='font-semibold'>{answerObj[num]}.</span>
            <span className='font-medium'>{text}</span>
        </div>
    )

}
const SingleQuestion = ({ question, currentQuestion, dispatch, isIncludedReview, quizInfo, handleMarkAndReview, currentQuestionToWork }) => {
    const { questionTimer } = useQuestionTime()
    return (
        <div className="cursor-pointer">
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

        </div>
    )
}

export default SingleQuestion