import { useDispatch, useSelector } from 'react-redux';
import { setCurrentQuestion } from '../redux/features/quizSlice';

const useQuestionStatus = () => {
    const dispatch = useDispatch();
    const {
        questions,
        currentQuestion
    } = useSelector((state) => state.quiz);

    const handleQuestionStatusClick = (currentQuestion) => {
        dispatch(setCurrentQuestion(currentQuestion))
    }
    const totalQuestions = questions.length;
    const totalReviewed = questions?.filter(item => item?.isReviewed).length;
    const totalAnswered = questions?.filter(item => item?.yourAnswer).length;
    return {
        totalQuestions,
        totalReviewed,
        totalAnswered,
        questions,
        currentQuestion,
        handleQuestionStatusClick
    }
}

export default useQuestionStatus