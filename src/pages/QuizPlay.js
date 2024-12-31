import React, { useEffect, useState } from "react";
import ToastMsg from "../components/toast/ToastMsg";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getQuizInfo, getQuizQuestionList, submitQuiz } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentQuestion, setQuestions } from "../redux/features/quizSlice";
import SingleQuestion from "./components/SingleQuestion";
import useCountdownTimer from "./components/useCountdownTimer";
import { reactIcons } from "../utils/icons";
import SubmitConfirmation from "../components/modals/SubmitConfirmation";

const QuizPlay = () => {
  const [isConfirmedOpen, setIsConfirmedOpen] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)
  const navigate = useNavigate()
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
        dispatch(setQuestions(data?.quizes?.map((item) => ({ ...item, isReviewed: false, yourAnswer: null }))));
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    } finally {
      setFetchLoading(false)
    }
  };
  const handleNextQuestion = (type) => {
    if (type === 'next') {
      dispatch(setCurrentQuestion(currentQuestion + 1))
    } else {
      dispatch(setCurrentQuestion(currentQuestion - 1))
    }

  }
  const handleMarkAndReview = (type) => {
    let tempQuestion = [...questions]?.map((item) => {
      if (item?._id === currentQuestionToWork?._id) {
        return { ...item, isReviewed: type ? !item?.isReviewed : true }
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
    setUpdateLoading(true)
    try {
      const questionAnswer = questions?.map((item) => {
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
    } finally {
      setUpdateLoading(false)
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
            handleMarkAndReview={handleMarkAndReview}
            currentQuestionToWork={currentQuestionToWork}
          />

        </div>
      </section>
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
            onClick={() => handleMarkAndReview(false)}
            className={`rounded-md border-c text-xs px-4 py-2  flex-shrink-0  flex-1 `}
          >
            Mark & Next
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
    </>
  );
};

export default QuizPlay;
