import React, { useEffect, useState } from "react";
import ToastMsg from "../components/toast/ToastMsg";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getQuizInfo, getQuizQuestionList, submitQuiz } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { setAnswered, setCurrentQuestion, setQuestions, setReviewed, setSelectedOption } from "../redux/features/quizSlice";
import SingleQuestion from "./components/SingleQuestion";
import useCountdownTimer from "./components/useCountdownTimer";
import { reactIcons } from "../utils/icons";

const QuizPlay = () => {
  const navigate = useNavigate()
  const { timeToReturn } = useCountdownTimer()
  const dispatch = useDispatch()
  const {
    questions,
    currentQuestion,
    selectedOption,
    review,
    answered
  } = useSelector(state => state.quiz)
  const currentQuestionToWork = questions[currentQuestion]
  const isIncludedReview = review?.findIndex((item) => item?._id === currentQuestionToWork?._id) >= 0
  const { quizId } = useParams();
  const [fetchLoading, setFetchLoading] = useState(false);
  const [quizInfo, setQuizInfo] = useState({});
  const totalQuestions = questions.length - 1
  const isLastQuestion = totalQuestions === currentQuestion


  const getAllQuizQuestion = async (quizId) => {
    setFetchLoading(true)
    try {
      const res = await getQuizQuestionList(quizId);
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        dispatch(setQuestions(data?.quizes));
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    } finally {
      setFetchLoading(false)
    }
  };
  const handleNextQuestion = () => {
    let tempAnswered = []
    const isIncluded = answered?.findIndex((item) => item?._id === currentQuestionToWork?._id) >= 0
    dispatch(setCurrentQuestion(isLastQuestion ? 0 : currentQuestion + 1))
    clearSelection()
    if (!isIncluded && selectedOption) {
      tempAnswered = [...answered, { ...currentQuestionToWork, yourAnswer: selectedOption }]
      dispatch(setAnswered(tempAnswered))
    }
  }
  const handleMarkAndReview = () => {
    let tempReviewed = []
    dispatch(setCurrentQuestion(isLastQuestion ? 0 : currentQuestion + 1))
    clearSelection()
    if (!isIncludedReview) {
      tempReviewed = [...review, { ...currentQuestionToWork, yourAnswer: selectedOption }]
      dispatch(setReviewed(tempReviewed))
    }
  }
  const clearSelection = () => {
    dispatch(setSelectedOption(null))
  }


  useEffect(() => {
    getAllQuizQuestion(quizId);
  }, [quizId]);
  const getQuizInfoById = async (id) => {
    try {
      const res = await getQuizInfo(id);
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        setQuizInfo(data)
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      console.log(error)
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    }
  };
  useEffect(() => {
    if (quizId) {
      getQuizInfoById(quizId);
    }
  }, [quizId]);
  const handleSubmitExam = async () => {
    try {
      const questionAnswer = answered?.map((item) => {
        return {
          questionId: item._id,
          answer: item.answer,
          userAnswer: item.yourAnswer,
          isCorrect: item.answer === item.yourAnswer,
        }
      })
      const res = await submitQuiz({
        quizId,
        questionAnswer,
      });
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        navigate(`/quiz/result/${quizId}`)
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      console.log(error)
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    }

  }

  return (
    <>
      <section className=" pb-20">
        <div className="py-2 px-4 bg-primary-pink mb-1 text-white">
          <div className="font-semibold mb-1 ">{quizInfo?.name}</div>
          <div className="flex items-center gap-1">
            <span className="text-xl text-white">{reactIcons?.watch}</span>
            <div>
              <span className="text-sm font-semibold mr-1"> {timeToReturn} </span> <span className="text-sm font-semibold">left</span>
            </div>
          </div>
        </div>
        <div className="relative h-full">
          <SingleQuestion
            quizInfo={quizInfo}
            isIncludedReview={isIncludedReview}
            dispatch={dispatch}
            question={questions[currentQuestion]}
            currentQuestion={currentQuestion}
          />

        </div>
      </section>
      <div className="absolute bottom-0 px-4 py-4 w-full bg-white shadow-card border-t-2 border-t-zinc-100">
        <div className="flex items-center gap-2 justify-between">
          <button
            onClick={handleMarkAndReview}
            className={`rounded-md border-c text-xs px-4 py-2  `}
          >
            Mark & Next
          </button>
          <button
            onClick={clearSelection}
            className={`rounded-md border-c text-xs px-4 py-2  `}
          >
            Clear
          </button>
          <button
            onClick={handleNextQuestion}
            className={`rounded-md bg-primary-pink text-white text-xs px-4 py-2 `}
          >
            Save & Next
          </button>
          <button
            disabled={answered?.length === 0}
            onClick={handleSubmitExam}
            className={`rounded-md bg-primary-pink text-white text-xs px-4 py-2 `}
          >
            Submit
          </button>
        </div>

      </div>

    </>

  );
};

export default QuizPlay;
