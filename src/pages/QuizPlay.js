import React, { useEffect, useState } from "react";
import ToastMsg from "../components/toast/ToastMsg";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { getQuizQuestionList } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { setAnswered, setCurrentQuestion, setQuestions, setReviewed, setSelectedOption } from "../redux/features/quizSlice";
import SingleQuestion from "./components/SingleQuestion";
import useCountdownTimer from "./components/useCountdownTimer";
import { reactIcons } from "../utils/icons";

const QuizPlay = () => {
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
  const { quizId, quizName } = useParams();
  const [fetchLoading, setFetchLoading] = useState(false);
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


  return (
    <>
      <section className="">
        <div className="py-2 px-4 bg-primary-pink mb-1 text-white">
          <div className="font-semibold mb-1 ">{quizName}</div>
          <div className="flex items-center gap-1">
            <span className="text-xl text-white">{reactIcons?.watch}</span>
            <div>
              <span className="text-sm font-semibold mr-1"> {timeToReturn} </span> <span className="text-sm font-semibold">left</span>
            </div>
          </div>


        </div>
        <div className="relative h-full">
          <SingleQuestion
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
            className={`rounded-md border-c text-sm px-6 py-2  `}
          >
            Mark & Next
          </button>
          <button
            onClick={clearSelection}
            className={`rounded-md border-c text-sm px-6 py-2  `}
          >
            Clear
          </button>
          <button
            onClick={handleNextQuestion}
            className={`rounded-md bg-primary-pink text-white text-sm px-6 py-2 `}
          >
            Save & Next
          </button>
        </div>

      </div>

    </>

  );
};

export default QuizPlay;
