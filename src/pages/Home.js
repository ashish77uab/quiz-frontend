import React, { useEffect, useState } from "react";
import ToastMsg from "../components/toast/ToastMsg";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getAllQuizList } from "../api/api";
import { getUserToken } from "../utils/constants";


const Home = () => {
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
      <header>
        <h6 className="heading-6 mb-1"> All Tests</h6>
      </header>
      <div className="space-y-2 mb-6">
        {quizes?.quizes?.map((quiz) => {
          return (
            <Link key={quiz?._id} to={`/quiz-join/${quiz?._id}`} className="border-c  block rounded-md shadow-card bg-white cursor-pointer">
              <div className="py-3 px-3">
                <div className="px-3 py-1 bg-green-500 mb-1 text-white font-bold inline-block rounded-md text-xs">FREE</div>
                <p className="font-semibold text-primary-grayDark mb-1"> {quiz?.name}</p>
                <div className="flex items-center gap-1 justify-between">
                  <div className="text-xs  text-muted"><span>{quiz?.questionCount} Qs .</span>  <span>25 mins.</span> <span>{quiz?.rightMark * quiz?.questionCount} Marks</span></div>
                  <div className="text-primary-blue text-xs">Join Test</div>
                </div>
              </div>
              <div className="py-2 px-3 bg-blue-50/50">
                <div className="text-primary-blue text-xs">English</div>
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
