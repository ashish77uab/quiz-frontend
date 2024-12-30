import React, { useEffect, useState } from "react";
import ToastMsg from "../components/toast/ToastMsg";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { quizSingleResult } from "../api/api";
import { reactIcons } from "../utils/icons";

const Tab = {
  Analysis: 'Analysis',
  Solution: 'Solution',
  Leaderboard: 'Leaderboard'
}


const QuizResult = () => {
  const [selectedTab, setSelectedTab] = useState(Tab.Analysis)
  const { resultId, quizId } = useParams()
  const [singleResult, setSingleResult] = useState({})
  const getResultInfo = async (resultId) => {
    try {
      const res = await quizSingleResult(resultId, quizId);
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        setSingleResult(data)
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      console.log(error)
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    }
  };
  useEffect(() => {
    if (resultId) {
      getResultInfo(resultId);
    }
  }, [resultId]);
  const questionAnswer = singleResult?.result?.[0]?.questionAnswer
  return (
    <section className="">

      <div className="flex items-center border-b border-b-gray-100 bg-white">
        {Object.values(Tab)?.map((item) => (
          <div role="button" onClick={() => setSelectedTab(item)} className={`relative font-semibold py-4 flex-1 text-center ${item === selectedTab && ' text-primary-pink '}`}>
            {item}
            {selectedTab === item && <div className="absolute bottom-0 w-full h-[2px] bg-primary-pink"></div>}
          </div>
        ))}


      </div>

      {selectedTab === Tab.Analysis && <div className="px-4 py-3 space-y-2">
        <div className="flex items-center justify-between border-c p-3 bg-white rounded-md shadow-card">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-red-100 text-lg text-red-700 flex-center">{reactIcons.flag}</div>
            <div className="text-sm font-semibold">Rank</div>
          </div>
          <div>
            <span className="font-semibold">{singleResult?.result?.[0]?.rank} </span>/ <span className="text-[13px]">{singleResult?.totalParticipants}</span>
          </div>
        </div>
        <div className="flex items-center justify-between border-c p-3 bg-white rounded-md shadow-card">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-violet-100 text-lg text-violet-700 flex-center">{reactIcons.trophy}</div>
            <div className="text-sm font-semibold">Score</div>
          </div>
          <div>
            <span className="font-semibold">{singleResult?.result?.[0]?.totalMarksGot} </span>/ <span className="text-[13px]">{singleResult?.result?.[0]?.quizDetails?.questionCount * singleResult?.result?.[0]?.quizDetails?.rightMark}</span>
          </div>
        </div>
        <div className="border-c p-3 bg-white rounded-md shadow-card">
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-blue-100 text-lg text-blue-700 flex-center">{reactIcons.notes}</div>
              <div className="text-sm font-semibold">Qs. Attempted</div>
            </div>
            <div>
              <span className="font-semibold">{singleResult?.result?.[0]?.questionAttempted} </span>/ <span className="text-[13px]">{singleResult?.result?.[0]?.quizDetails?.questionCount}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 justify-center mt-2">
            <div className="flex items-center gap-1 bg-blue-50 p-2 rounded-md">
              <div className="p-1 rounded-full bg-green-100 text-sm text-green-900 flex-center">{reactIcons.check}</div>
              <div className="text-xs font-semibold ">Correct: <span className="ml-1 font-semibold">{singleResult?.result?.[0]?.rightAnswerCount}</span></div>

            </div>
            <div className="flex items-center gap-1 bg-blue-50 p-2 rounded-md">
              <div className="p-1 rounded-full bg-red-100 text-sm text-red-900 flex-center">{reactIcons.close}</div>
              <div className="text-xs font-semibold ">Wrong: <span className="ml-1 font-semibold">{singleResult?.result?.[0]?.wrongAnswerCount}</span></div>

            </div>
            <div className="flex items-center gap-1 bg-blue-50 p-2 rounded-md">
              <div className="p-1 rounded-full bg-gray-100 text-sm text-gray-900 flex-center">{reactIcons.question}</div>
              <div className="text-xs font-semibold ">Unattempted: <span className="ml-1 font-semibold">{singleResult?.result?.[0]?.quizDetails?.questionCount - singleResult?.result?.[0]?.questionAttempted}</span></div>

            </div>
          </div>
        </div>
      </div>}

      {selectedTab === Tab.Solution && <>
        <div className="space-y-2 py-4 px-4">
          {questionAnswer?.map((item, index) => {
            return <div key={index} className="p-3 rounded-md bg-white border-c ">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1"></div>
              </div>
            </div>
          })}
        </div>
      </>}

    </section>



  );
};

export default QuizResult;
