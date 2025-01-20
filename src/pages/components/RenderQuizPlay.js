import React from 'react'
import SingleQuestion from './SingleQuestion'
import { reactIcons } from '../../utils/icons'
import useCountdownTimer from './useCountdownTimer'

const RenderQuizPlay = ({
    quizInfo,
    resetState,
    isLastQuestion,
    questions,
    quizId,
    currentQuestion,
    isIncludedReview,
    dispatch,
    currentQuestionToWork,
}) => {
    const { timeToReturn, time } = useCountdownTimer({ timer: quizInfo?.time })
    const isNotLeftTime = time === 0;

    return (
        <>
            {questions?.length > 0 ? <>
                <div className="py-2 px-4 bg-primary-pink mb-1 text-white">
                    <div className="font-semibold mb-1 ">{quizInfo?.name}</div>
                    <div className="flex items-center gap-1">
                        <span className="text-xl text-white">{reactIcons?.watch}</span>
                        <div>
                            <span className="text-sm font-semibold mr-1"> {timeToReturn} </span> <span className="text-sm font-semibold">left</span>
                        </div>
                    </div>
                </div>
                <div className=" h-full">
                    <SingleQuestion
                        resetState={resetState}
                        isLastQuestion={isLastQuestion}
                        timeToReturn={timeToReturn}
                        questions={questions}
                        quizId={quizId}
                        key={currentQuestion}
                        quizInfo={quizInfo}
                        isIncludedReview={isIncludedReview}
                        dispatch={dispatch}
                        question={questions[currentQuestion]}
                        currentQuestion={currentQuestion}
                        currentQuestionToWork={currentQuestionToWork}
                        isNotLeftTime={isNotLeftTime}
                    />

                </div>
            </>
                :
                <div className='py-6 text-center font-semibold'>
                    No questions found
                </div>}
        </>
    )
}

export default RenderQuizPlay