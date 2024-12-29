import React, { useEffect, useState } from "react";
import ToastMsg from "../components/toast/ToastMsg";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getQuizQuestionList, quizDashboard } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from "../redux/features/quizSlice";
import useCountdownTimer from "./components/useCountdownTimer";

const QuizResult = () => {
  const navigate = useNavigate()
  const { timeToReturn } = useCountdownTimer()
  const dispatch = useDispatch()
  const {
    questions
  } = useSelector(state => state.quiz)
  const { quizId } = useParams();
  const [fetchLoading, setFetchLoading] = useState(false);
  const [dashboardInfo, setDashboardInfo] = useState({});


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


  useEffect(() => {
    getAllQuizQuestion(quizId);
  }, [quizId]);
  const getQuizDashboardData = async (id) => {
    try {
      const res = await quizDashboard(id);
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        setDashboardInfo(data)
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
      getQuizDashboardData(quizId);
    }
  }, [quizId]);

  console.log(dashboardInfo, 'dashboardInfo')
  return (
    <>
      <section className="">

      </section>


    </>

  );
};

export default QuizResult;
