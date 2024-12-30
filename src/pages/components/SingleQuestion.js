import React from 'react'
import { setSelectedOption } from '../../redux/features/quizSlice'
import { answerObj } from '../../utils/constants'
import { useSelector } from 'react-redux'
import useQuestionTime from './useQuestionTime'
import { reactIcons } from '../../utils/icons'


const Option = ({ text, num, dispatch }) => {
    const { selectedOption } = useSelector(state => state.quiz)
    const handleSelectOption = (num) => {
        const isAlreadySelected = selectedOption === answerObj[num]
        dispatch(setSelectedOption(isAlreadySelected ? null : answerObj[num]))
    }

    return (
        <div onClick={() => handleSelectOption(num)} className={`flex items-center bg-white gap-4 rounded-md py-5 px-4 border ${answerObj[num] === selectedOption ? 'border-primary-pink' : 'border-zinc-200'}`}>
            <span className='font-semibold'>{answerObj[num]}.</span>
            <span className='font-medium'>{text}</span>
        </div>
    )

}
const SingleQuestion = ({ question, currentQuestion, dispatch, isIncludedReview, quizInfo }) => {
    const { questionTimer } = useQuestionTime()
    return (
        <div className="cursor-pointer">
            <div className="flex items-center justify-between gap-4 py-4 px-4 bg-pink-50">
                <div className='flex items-center gap-2'>
                    <div className='w-8 h-8 flex-center rounded-full font-medium bg-primary-gray text-white'>{currentQuestion + 1}</div>
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
                <div className="flex items-center gap-1">
                    {isIncludedReview ? <span className="text-2xl text-primary-pink">{reactIcons?.starFill}</span> : <span className="text-2xl">{reactIcons?.star}</span>}
                </div>
            </div>
            <div className='py-4 px-4'>
                <div className='mb-6'>
                    <p className="font-medium text-base"> {question?.question}</p>
                </div>
                <div className='space-y-4'>
                    <Option text={question?.option1} num={'1'} dispatch={dispatch} />
                    <Option text={question?.option2} num={'2'} dispatch={dispatch} />
                    <Option text={question?.option3} num={'3'} dispatch={dispatch} />
                    <Option text={question?.option4} num={'4'} dispatch={dispatch} />

                </div>
            </div>

        </div>
    )
}

export default SingleQuestion