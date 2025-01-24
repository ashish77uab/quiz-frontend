import React, { useEffect, useState } from 'react'
import { quizAttemptedResult } from '../../api/api';
import { toast } from 'react-toastify';
import ToastMsg from '../../components/toast/ToastMsg';
import { Link } from 'react-router-dom';
import InfiniteScrollComponent from '../../components/InfiniteScrollComponent';
const AttemptedQuestion = ({ quizId }) => {
    const limit = 10;
    const [attemptedResult, setAttemptedResult] = useState({});
    const [page, setPage] = useState(1)
    const loadMoreData = () => {
        setPage(page + 1)
    }
    const [fetchLoading, setFetchLoading] = useState(false);
    const getQuizAttemptedResults = async (quizId, page) => {
        setFetchLoading(true)
        try {
            const res = await quizAttemptedResult(quizId, page, limit);
            const { status, data } = res;
            if (status >= 200 && status <= 300) {
                if (page === 1) {
                    setAttemptedResult(data)
                } else {
                    setAttemptedResult({ ...data, result: [...attemptedResult.result, ...data.result] });
                }
            } else {
                toast.error(<ToastMsg title={data.message} />);
            }
        } catch (error) {
            console.log(error)
            toast.error(<ToastMsg title={error?.response?.data?.message} />);
        } finally {
            setFetchLoading(false)
        }
    };
    useEffect(() => {
        if (quizId) {
            getQuizAttemptedResults(quizId, page);
        }
    }, [quizId, page]);
    return (
        <div>
            {attemptedResult?.count > 0 && <header>
                <h6 className="heading-6 mb-1"> Previously Attempted</h6>
            </header>}

            <div className='my-2 scrollable-content'>
                <InfiniteScrollComponent
                    hasMore={attemptedResult?.result?.length < attemptedResult?.count}
                    fetchData={loadMoreData}
                    length={attemptedResult?.result?.length}
                    limit={limit}
                    totalPages={attemptedResult?.totalPages}
                    page={page}
                >
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
                                            <Link to={`/quiz/result/${result?._id}/${result?.quizDetails?._id}?isAttempted=true`} className="text-primary-blue text-xs">View Result</Link>
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
                </InfiniteScrollComponent>
            </div>

        </div>

    )
}

export default AttemptedQuestion