import React, { useEffect, useState } from "react";
import ToastMsg from "../components/toast/ToastMsg";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { getAllQuizList } from "../api/api";
import { getUserToken } from "../utils/constants";


const Home = () => {
  const navigate = useNavigate();
  const limit = 10
  const [quizes, setQuizes] = useState(null);
  const [page, setPage] = useState(1);
  const [fetchLoading, setFetchLoading] = useState(false);
  const isLoggedIn = getUserToken()

  const getAllQuiz = async () => {
    setFetchLoading(true)
    try {
      const res = await getAllQuizList({ limit, page, search: '' });
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        setQuizes(data);
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
    getAllQuiz();
  }, [page, isLoggedIn]);


  return (
    <section className="flex-1 px-4 py-4">
      <div className="space-y-2">
        {quizes?.quizes?.map((quiz, index) => {
          return (
            <Link to={`/play-quiz/${quiz?._id}/${quiz?.name}`} className="border-c py-3 px-3 block rounded-md shadow-card cursor-pointer">
              <div>
                <p className="font-semibold text-primary-pink"> {quiz?.name}</p>
                <div>
                  <div className="text-xs font-semibold text-muted"><span>Total questions:</span> <span>{quiz?.questionCount}</span></div>
                </div>
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



            </Link>
          )
        }

        )}
      </div>


    </section>
  );
};

export default Home;
