import React, { useEffect, useState } from "react";
import { getQuizQuestionList } from "../../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../../components/toast/ToastMsg";
import { useNavigate, useParams } from "react-router-dom";
import RenderNoData from "../../components/layout/RenderNoData";
import DangerouslySetHtml from "../components/DangerouslySetHtml";
import ActionButton from "../../components/button/ActionButton";
import { reactIcons } from "../../utils/icons";



const ViewQuizQuestion = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [questions, setQuestions] = useState({});


    const getQuizQuestions = async (id) => {
        setFetchLoading(true)
        try {
            const res = await getQuizQuestionList(id);
            const { status, data } = res;
            if (status >= 200 && status <= 300) {
                setQuestions(data);

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
            getQuizQuestions(quizId);
        }
    }, [quizId]);


    return (
        <div className="">
            <div className="mb-4 flex justify-between">
                <h2 className="text-xl font-bold text-gray-800">All Questions</h2>
                <button className="btn-primary" onClick={() => navigate(`/dashboard/quiz/add-question/${quizId}`)}>
                    Add Question
                </button>
            </div>
            <div>
                <div className="overflow-x-auto w-full space-y-2">

                    {questions?.questions?.map((question, index) => {

                        return (
                            <div className="p-4 rounded-md shaodw-price border-c">
                                <div className="flex justify-between gap-2 items-start">
                                    <div className="flex-grow">
                                        <div>
                                            <div className="flex items-start gap-2">
                                                <span>{index + 1}</span> <DangerouslySetHtml html={question?.question} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 my-4">
                                            <div className="text-sm"> A. {question?.option1}</div>
                                            <div className="text-sm"> B. {question?.option2}</div>
                                            <div className="text-sm"> C. {question?.option3}</div>
                                            <div className="text-sm"> D. {question?.option3}</div>

                                        </div>
                                        <div>
                                            <DangerouslySetHtml html={question?.writtenAnswer} />
                                        </div>
                                    </div>
                                    <div>
                                        <ActionButton
                                            onClick={() => navigate(`/dashboard/quiz/update-question/${question?._id}`)}
                                        >
                                            {reactIcons.edit}
                                        </ActionButton>
                                    </div>
                                </div>




                            </div>
                        )
                    }

                    )}

                    {questions?.questions?.length < 1 && !fetchLoading && (
                        <div>
                            <RenderNoData title="No questions found." />
                        </div>
                    )}
                    {fetchLoading && (
                        <div>
                            <div className="py-8 text-center font-semibold">Loading please wait....</div>
                        </div>
                    )}


                </div>

            </div>
        </div>
    );
};

export default ViewQuizQuestion;
