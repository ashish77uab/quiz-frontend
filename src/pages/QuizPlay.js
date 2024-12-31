import React, { useEffect, useState } from "react";
import ToastMsg from "../components/toast/ToastMsg";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { getQuizInfo, getQuizQuestionList } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import SingleQuestion from "./components/SingleQuestion";
import useCountdownTimer from "./components/useCountdownTimer";
import { reactIcons } from "../utils/icons";
import { setCurrentQuestion, setQuestions } from "../redux/features/quizSlice";

const QuizPlay = () => {

  const { timeToReturn } = useCountdownTimer()
  const dispatch = useDispatch()
  const {
    questions,
    currentQuestion,
  } = useSelector(state => state.quiz)
  const currentQuestionToWork = questions[currentQuestion]
  const isIncludedReview = questions?.findIndex((item) => item?._id === currentQuestionToWork?._id && item?.isReviewed) >= 0
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
        dispatch(setQuestions(data?.quizes?.map((item) => ({ ...item, isReviewed: false, yourAnswer: null, questionTime: 0, questionTimer: '' }))));
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    } finally {
      setFetchLoading(false)
    }
  };


  const resetState = () => {
    dispatch(setQuestions([]))
    dispatch(setCurrentQuestion(0))
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

    return () => {
      resetState()
    }
  }, [quizId]);


  return (
    <>
      <section className=" pb-28">
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
          />

        </div>
      </section>

    </>
  );
};

export default QuizPlay;
