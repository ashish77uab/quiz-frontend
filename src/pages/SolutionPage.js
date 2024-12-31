import React, { useEffect, useState } from "react";
import ToastMsg from "../components/toast/ToastMsg";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { getQuizInfo } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import SingleQuestionSolution from "./components/SingleQuestionSolution";
import { setResultCurrentQuestion } from "../redux/features/quizSlice";

const SolutionPage = () => {
  const [quizInfo, setQuizInfo] = useState({});
  const dispatch = useDispatch()
  const {
    singleResult,
    resultCurrentQuestionNum
  } = useSelector(state => state.quiz)
  const { questionNumber, quizId } = useParams();
  const questions = singleResult?.result?.[0]?.questionAnswer
  const currentQuestion = resultCurrentQuestionNum
  const currentQuestionToWork = questions?.[currentQuestion]
  const totalQuestions = questions.length - 1
  const isLastQuestion = totalQuestions === currentQuestion

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
    }
  }, [quizId]);
  useEffect(() => {

    dispatch(setResultCurrentQuestion(Number(questionNumber)))

  }, [questionNumber])


  return (
    <>
      <section className=" pb-28">

        <div className=" h-full">
          <SingleQuestionSolution
            isLastQuestion={isLastQuestion}
            quizInfo={quizInfo}
            questions={questions}
            key={currentQuestion}
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

export default SolutionPage;
