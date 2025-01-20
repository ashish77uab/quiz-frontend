import React, { useEffect, useState } from "react";
import ToastMsg from "../components/toast/ToastMsg";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getQuizInfo, getQuizQuestionList } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentQuestion, setQuestions } from "../redux/features/quizSlice";
import RenderQuizPlay from "./components/RenderQuizPlay";
import Spinner from "../components/loaders/Spinner";
import ExitQuizConfirmation from "../components/modals/ExitQuizConfirmation";
import { setModalToggle } from "../redux/features/authSlice";
import { reactIcons } from "../utils/icons";
const QuizPlay = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    questions,
    currentQuestion,
  } = useSelector(state => state.quiz)
  const [isConfirm, setIsConfirm] = useState(false)
  const currentQuestionToWork = questions[currentQuestion]
  const isIncludedReview = questions?.findIndex((item) => item?._id === currentQuestionToWork?._id && item?.isReviewed) >= 0
  const { quizId } = useParams();
  const [fetchLoading, setFetchLoading] = useState(false);
  const [quizInfo, setQuizInfo] = useState({});
  const [quizInfoLoading, setQuizInfoLoading] = useState(true);
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
    } finally {
      setQuizInfoLoading(false)
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
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      const confirmationMessage = "You have an active quiz session. Are you sure you want to leave?";
      e.returnValue = confirmationMessage; // For most browsers
      return confirmationMessage; // For some older browsers
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload); // Cleanup
    };
  }, []);
  useEffect(() => {
    // Prevent going back using the browser back button
    const handleBackButton = (event) => {
      setIsConfirm(true)
      return
      // const confirmationMessage = "You have an active quiz session. Are you sure you want to leave?";
      // if (window.confirm(confirmationMessage)) {
      //   window.history.pushState(null, '', window.location.href); // Stay on the same page
      // } else {
      //   // Allow user to go back
      //   window.history.back();
      // }
    };

    // Add the popstate event listener
    window.addEventListener('popstate', handleBackButton);

    // Push a new state to the history to intercept the back button
    window.history.pushState(null, '', window.location.href);

    return () => {
      // Clean up the event listener
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);
  const handlYesConfirm = () => {
    setIsConfirm(false)
    navigate(-1) // Stay on the same page
  }
  const handlNoConfirm = () => {
    setIsConfirm(false)
    window.history.pushState(null, '', window.location.href); // Stay on the same page
  }

  const handleToggle = (obj) => {
    dispatch(setModalToggle(obj))
  }

  return (
    <>
      <div className={`flex items-center min-h-[65px]  shadow-navbar border-b border-b-zinc-100 bg-transparent transition-all duration-200 py-[10px] sticky top-0 left-0  bg w-full z-[50] bg-white`}>
        <div className="px-4 w-full">
          <div className="flex items-center justify-between">
            <div onClick={() => navigate(-1)} className="flex items-center cursor-pointer gap-2">
              <span role="button" className="text-2xl  font-bold ">
                {reactIcons.goback}
              </span>
              <span className="font-semibold"> Leave Test</span>
            </div>
            <div onClick={() => handleToggle({ key: 'isQuestionStatusOpen', value: true })} className={`w-10 h-10 flex-center text-3xl cursor-pointer `}>
              {reactIcons.menu}
            </div>
          </div>
        </div>
      </div>
      <section className=" pb-28">
        {
          quizInfoLoading || fetchLoading ? (
            <Spinner />
          ) :
            <RenderQuizPlay
              resetState={resetState}
              isLastQuestion={isLastQuestion}
              questions={questions}
              quizId={quizId}
              quizInfo={quizInfo}
              isIncludedReview={isIncludedReview}
              dispatch={dispatch}
              question={questions[currentQuestion]}
              currentQuestion={currentQuestion}
              currentQuestionToWork={currentQuestionToWork}


            />
        }


      </section>
      <ExitQuizConfirmation isOpen={isConfirm} handleYes={handlYesConfirm} closeModal={handlNoConfirm} />

    </>
  );
};

export default QuizPlay;
