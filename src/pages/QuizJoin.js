import React, { useEffect, useState } from "react";
import ToastMsg from "../components/toast/ToastMsg";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { getQuizInfo, quizAttemptedResult } from "../api/api";


const QuizJoin = () => {
  const { quizId } = useParams()
  const [attemptedResult, setAttemptedResult] = useState({});
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

  const getQuizAttemptedResults = async (quizId) => {
    try {
      const res = await quizAttemptedResult(quizId);
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        setAttemptedResult(data)
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
      getQuizAttemptedResults(quizId);
    }
  }, [quizId]);



  return (
    <section className="flex-1 px-4 py-4">
      <header>
        <h6 className="text-base font-bold mb-2 text-center">{quizInfo?.name}</h6>
        <div className="flex justify-between gap-2 mt-2">
          <div className="font-semibold text-xs text-gray-600">Duration: 25 Mins.</div>
          <div className="font-semibold text-xs text-gray-600">Maximum Marks: {quizInfo?.rightMark * quizInfo?.questionCount}</div>
        </div>
      </header>
      <div className="py-4 px-4">
        <ul className="list-disc space-y-2">
          <li className="text-muted text-sm"> Each question has 4 options out of which only 1 is correct.</li>
          <li className="text-muted text-sm"> You have to finish test in 25 minutes.</li>
          <li className="text-muted text-sm"> You will be awarded <span className="text-green-600 font-semibold">{quizInfo?.rightMark} mark</span>  for each correct answer and <span className="text-red-600 font-semibold">{quizInfo?.negativeMark} mark</span>  will be deducted for each wrong answer.</li>
          <li className="text-muted text-sm"> There is no negative marking for the questions that you have not attempted.</li>
          <li className="text-muted text-sm"> You can write the this test only once. Make sure that you complete the test before you submit test and/or close the browser.</li>
          <li className="text-muted text-sm"> I have read the all the instructions carefully and have understood them. I agree not to cheat or use unfair means in this examination. I understand that using unfair means of any sort for my own or someone else's advantage will lead to my immediate disqualification. The decision of admin will be final in these matters and cannot be appealed.</li>
        </ul>
      </div>
      <div className="mb-4">
        <Link to={`/play-quiz/${quizId}`} className="btn-primary flex-center text-center  w-full">Start Test</Link>
      </div>
      <header>
        <h6 className="heading-6 mb-1"> Previously Attempted</h6>
      </header>
      <div className="space-y-2">
        {attemptedResult?.result?.map((result, index) => {
          return (
            <div className="border-c  block rounded-md shadow-card bg-white cursor-pointer">
              <div className="py-3 px-3">
                <div className="px-3 py-1 bg-green-500 mb-1 text-white font-bold inline-block rounded-md text-xs">FREE</div>
                <p className="font-semibold text-primary-grayDark mb-1"> {result?.quizDetails?.name}</p>
                <div className="flex items-center gap-1 justify-between">
                  <div className="text-xs  text-muted">
                    <span>{result?.totalMarksGot}/{result?.quizDetails?.rightMark * result?.quizDetails?.questionCount} Marks.</span>
                    <span className="ml-1">{result?.rank}/{attemptedResult?.totalParticipants} Rank</span>
                  </div>
                  <Link to={`/quiz/result/${result?._id}/${result?.quizDetails?._id}`} className="text-primary-blue text-xs">View Result</Link>
                </div>
              </div>
              <div className="py-2 px-3 bg-blue-50/50">
                <div className="text-primary-blue text-xs">English</div>
              </div>

            </div>
          )
        }

        )}
      </div>


    </section>
  );
};

export default QuizJoin;
