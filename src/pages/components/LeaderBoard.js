import React, { useEffect, useState } from 'react'
import { getQuizResultLeaderBoard } from '../../api/api';
import { toast } from 'react-toastify';
import ToastMsg from '../../components/toast/ToastMsg';
import InfiniteScrollComponent from '../../components/InfiniteScrollComponent';
import { Tab } from '../QuizResult';

const LeaderBoard = ({ quizId, selectedTab }) => {
    const limit = 20;
    const [page, setPage] = useState(1)
    const [leaderboard, setLeaderboard] = useState({})
    const loadMoreData = () => {
        setPage(page + 1)
    }

    const getQuizResultLeaderBoardData = async (quizId, page) => {
        try {
            const res = await getQuizResultLeaderBoard(quizId, page, limit);
            const { status, data } = res;
            if (status >= 200 && status <= 300) {
                if (page === 1) {
                    setLeaderboard(data)
                } else {
                    setLeaderboard({ ...data, result: [...leaderboard.result, ...data.result] });
                }
            } else {
                toast.error(<ToastMsg title={data.message} />);
            }
        } catch (error) {
            console.log(error)
            toast.error(<ToastMsg title={error?.response?.data?.message} />);
        }
    };
    useEffect(() => {
        if (quizId && selectedTab === Tab.Leaderboard) {
            getQuizResultLeaderBoardData(quizId, page);
        }
    }, [quizId, page, selectedTab]);

    function getRandomNumber() {
        return Math.floor(Math.random() * 10);
    }

    const returnClassColor = (index) => {
        const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-pink-500', 'bg-purple-500', 'bg-gray-500', 'bg-orange-500', 'bg-indigo-500', 'bg-teal-500'];
        return colors[index % 10];
    }
    return (
        <div className='px-4'>
            {leaderboard?.count > 0 && <>
                <header className='pt-4'>
                    <h6 className="heading-6 mb-1"> Leaderboard</h6>
                </header>
                <div className='my-2 scrollable-content '>
                    <InfiniteScrollComponent
                        hasMore={leaderboard?.result?.length < leaderboard?.count}
                        fetchData={loadMoreData}
                        length={leaderboard?.result?.length}
                        limit={limit}
                        totalPages={leaderboard?.totalPages}
                        page={page}
                    >
                        <div className="space-y-2">
                            {leaderboard?.result?.map((result, index) => {
                                const totalMarks = result?.quiz?.questionCount * result?.quiz?.rightMark
                                return (
                                    <div className="border-c   block rounded-md shadow-card bg-white cursor-pointer">
                                        <div className='flex justify-between gap-4 p-4 items-center'>
                                            <div className='flex items-center gap-4'>
                                                <div className={`  text-sm font-semibold  text-primary-gray flex-center`}>
                                                    {result?.rank}
                                                </div>
                                                <div className={`w-10 h-10 rounded-full ${returnClassColor(index)} text-white flex-center`}>
                                                    {result?.userDetails?.fullName?.[0]}
                                                </div>
                                            </div>
                                            <div className='flex-grow'>
                                                <div className='font-medium'> {result?.userDetails?.fullName}</div>


                                            </div>
                                            <div className='text-sm font-semibold'>
                                                <span className=''>{result?.totalMarksGot}</span> / <span>{totalMarks}</span>
                                            </div>


                                        </div>

                                    </div>
                                )
                            }

                            )}
                        </div>
                    </InfiniteScrollComponent>
                </div>

            </>}
        </div>

    )
}

export default LeaderBoard