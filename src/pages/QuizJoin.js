import React, { useEffect, useState } from "react";
import ToastMsg from "../components/toast/ToastMsg";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { getQuizInfo } from "../api/api";
import AttemptedQuestion from "./components/AttemptedQuestion";


const QuizJoin = () => {
  const { quizId } = useParams()
  const [quizInfo, setQuizInfo] = useState({});
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


  useEffect(() => {
    if (quizId) {
      getQuizInfoById(quizId);
    }
  }, [quizId]);



  return (
    <section className="flex-1 px-4 py-4">
      <header>
        <h6 className="text-base font-bold mb-2 text-center">{quizInfo?.name}</h6>
        <div className="flex justify-between gap-2 mt-2">
          <div className="font-semibold text-xs text-gray-600">Duration: {quizInfo?.time} Mins.</div>
          <div className="font-semibold text-xs text-gray-600">Maximum Marks: {quizInfo?.rightMark * quizInfo?.questionCount}</div>
        </div>
      </header>
      <div className="py-4 px-4">
        <ul className="list-disc space-y-2">
          <li className="text-muted text-sm"> Each question has 4 options out of which only 1 is correct.</li>
          <li className="text-muted text-sm"> You have to finish test in {quizInfo?.time} minutes.</li>
          <li className="text-muted text-sm"> You will be awarded <span className="text-green-600 font-semibold">{quizInfo?.rightMark} mark</span>  for each correct answer and <span className="text-red-600 font-semibold">{quizInfo?.negativeMark} mark</span>  will be deducted for each wrong answer.</li>
          <li className="text-muted text-sm"> There is no negative marking for the questions that you have not attempted.</li>
          <li className="text-muted text-sm"> You can write the this test only once. Make sure that you complete the test before you submit test and/or close the browser.</li>
          <li className="text-muted text-sm"> I have read the all the instructions carefully and have understood them. I agree not to cheat or use unfair means in this examination. I understand that using unfair means of any sort for my own or someone else's advantage will lead to my immediate disqualification. The decision of admin will be final in these matters and cannot be appealed.</li>
        </ul>
      </div>
      <div className="mb-4">
        <Link to={`/play-quiz/${quizId}`} className="btn-primary flex-center text-center  w-full">Start Test</Link>
      </div>
      <AttemptedQuestion quizId={quizId} />

    </section>
  );
};

export default QuizJoin;
