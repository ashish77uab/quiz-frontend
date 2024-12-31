import React from 'react'
import { useSelector } from 'react-redux';

const useQuestionStatus = () => {
    const {
        questions,
        currentQuestion
    } = useSelector((state) => state.quiz);
    const totalQuestions = questions.length;
    const totalReviewed = questions?.filter(item => item?.isReviewed).length;
    const totalAnswered = questions?.filter(item => item?.yourAnswer).length;
    return {
        totalQuestions,
        totalReviewed,
        totalAnswered,
        questions,
        currentQuestion
    }
}

export default useQuestionStatus