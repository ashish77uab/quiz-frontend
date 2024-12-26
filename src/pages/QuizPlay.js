import React, { useEffect, useState } from "react";
import ToastMsg from "../components/toast/ToastMsg";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { getQuizQuestionList } from "../api/api";


const QuizPlay = () => {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);


  const getAllQuizQuestion = async (quizId) => {
    setFetchLoading(true)
    try {
      const res = await getQuizQuestionList(quizId);
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        setQuestions(data?.quizes);
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


  return (
    <section className="flex-1 px-4 py-4">
      <div className="space-y-2">
        {questions?.map((quiz, index) => {
          return (
            <div className="border-c py-4 px-4 rounded-md shadow-card cursor-pointer">
              <div>
                <p className="font-medium text-sm"> <span>Q{index + 1}. </span>  {quiz?.question}</p>
              </div>
              <div className="flex justify-between gap-4 items-start mt-2">
                <div>
                  <p className="text-sm font-semibold">Right Answer</p>
                  <div className="text-xs font-semibold text-muted">{quiz?.rightMark} marks</div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">Wrong Answer</p>
                  <div className="text-xs font-semibold text-muted">{quiz?.negativeMark} marks</div>
                </div>
              </div>



            </div>
          )
        }

        )}
      </div>


    </section>
  );
};

export default QuizPlay;
