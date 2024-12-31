import React, { useState } from 'react'
import { setResultCurrentQuestion } from '../../redux/features/quizSlice'
import { answerObj } from '../../utils/constants'
import { reactIcons } from '../../utils/icons'
import DangerouslySetHtml from './DangerouslySetHtml'


const Option = ({
    text,
    num,
    question,
    isShowSolution
}) => {
    const isCorrect = question?.answer === answerObj[num] && isShowSolution
    const isWrong = question?.userAnswer !== null && question?.userAnswer === answerObj[num] && isShowSolution

    const renderClassName = () => {
        if (isCorrect) {
            return 'border-green-500'
        }
        else if (isWrong) {
            return 'border-red-500'
        }
        return 'border-zinc-200'
    }

    return (
        <div className={`flex cursor-pointer items-center bg-white gap-4 rounded-md py-5 px-4 border ${renderClassName(question)}`}>
            <div className="flex items-center gap-2 flex-1">
                <span className='font-semibold'>{answerObj[num]}.</span>
                <span className='font-medium'>{text}</span>
            </div>
            <div>
                {isCorrect && <div className="p-1 rounded-full bg-green-100 text-sm text-green-900 flex-center">{reactIcons.check}</div>}
                {isWrong && isCorrect !== isWrong && <div className="p-1 rounded-full bg-red-100 text-sm text-red-900 flex-center">{reactIcons.close}</div>}
            </div>
        </div>
    )

}
const SingleQuestionSolution = ({ question, isLastQuestion, quizInfo, currentQuestion, dispatch, currentQuestionToWork }) => {
    const [isShowSolution, setIsShowSolution] = useState(false)

    const { questionTimer } = question
    const handleNextQuestion = (type) => {
        if (type === 'next') {
            dispatch(setResultCurrentQuestion(currentQuestion + 1))
        } else {
            dispatch(setResultCurrentQuestion(currentQuestion - 1))
        }

    }

    const isAttempted = question?.isCorrect !== null
    const isCorrect = question?.isCorrect === true


    return (
        <div>
            <div className="flex items-center justify-between gap-4 py-4 px-4 bg-pink-50">
                <div className='flex items-center gap-2'>
                    <div className={`w-8 h-8 rounded-full font-semibold flex-center  text-xs ${isAttempted ? isCorrect ? 'text-white bg-green-500' : 'text-white bg-red-500' : 'text-black bg-gray-200'}`}>{currentQuestion + 1}</div>
                    <div className="flex items-center gap-1">
                        <span className="text-xl text-primary-pink">{reactIcons?.watch}</span>
                        <div>
                            <span className="text-xs font-semibold mr-1"> {questionTimer} </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className={`${isAttempted && isCorrect ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100'} font-semibold  px-3 py-1 rounded-md text-xs`}>+ {quizInfo?.rightMark}</div>
                        <div className={`${isAttempted && !isCorrect ? 'text-red-600 bg-red-100' : 'text-gray-600 bg-gray-100'}  font-semibold px-3 py-1 rounded-md text-xs`}>- {quizInfo?.negativeMark}</div>
                    </div>

                </div>

            </div>
            <div className='py-4 px-4'>
                <div className='mb-6'>
                    <DangerouslySetHtml html={question?.question?.question} />
                </div>
                <div className='space-y-4'>
                    <Option isShowSolution={isShowSolution} question={question} text={question?.question?.option1} num={'1'} dispatch={dispatch} currentQuestionToWork={currentQuestionToWork} />
                    <Option isShowSolution={isShowSolution} question={question} text={question?.question?.option2} num={'2'} dispatch={dispatch} currentQuestionToWork={currentQuestionToWork} />
                    <Option isShowSolution={isShowSolution} question={question} text={question?.question?.option3} num={'3'} dispatch={dispatch} currentQuestionToWork={currentQuestionToWork} />
                    <Option isShowSolution={isShowSolution} question={question} text={question?.question?.option4} num={'4'} dispatch={dispatch} currentQuestionToWork={currentQuestionToWork} />

                </div>
                <div className='my-4'>
                    <button onClick={() => setIsShowSolution(prev => !prev)} className='btn-outline-primary w-full'> View Solution</button>
                </div>
                {isShowSolution && <div className='mb-6 p-4 bg-white rounded-md'>
                    <DangerouslySetHtml html={question?.question?.writtenAnswer} />
                </div>}
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


            </div>


        </div>
    )
}

export default SingleQuestionSolution