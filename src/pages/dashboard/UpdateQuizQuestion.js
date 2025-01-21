import React, { useEffect, useState } from "react";
import TextInput from "../../components/forms/TextInput";
import { getQuizQuestionInfoById, getQuizQuestionList, updateQuestion } from "../../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../../components/toast/ToastMsg";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import { createQuizQuestionSchema } from "../../utils/validation";

import EditorCustom from "../../components/forms/EditorCustom";
import Spinner from "../../components/loaders/Spinner";
const singleObject = {
    _id: "",
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    writtenAnswer: ''
}

const UpdateQuizQuestion = () => {
    const { questionId } = useParams();
    const navigate = useNavigate();
    const [initialValue, setInitialValue] = useState(singleObject);
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);


    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            const res = await updateQuestion(values, questionId);
            const { status, data } = res;
            console.log(res)
            if (status >= 200 && status < 300) {
                toast.success(<ToastMsg title={`Updated Successfully`} />);
                navigate(-1);
            } else {
                toast.error(<ToastMsg title={data.message} />);
            }
        } catch (error) {
            console.log(error, "error");
            toast.error(<ToastMsg title={error?.response?.data?.message} />);
        } finally {
            setLoading(false)
        }
    };

    const getQuizQuestionInfo = async (id) => {
        try {
            const res = await getQuizQuestionInfoById(id);
            const { status, data } = res;
            if (status >= 200 && status <= 300) {
                const question = {
                    _id: data?._id,
                    question: data.question,
                    option1: data.option1,
                    option2: data.option2,
                    option3: data.option3,
                    option4: data.option4,
                    answer: data.answer,
                    writtenAnswer: data.writtenAnswer,
                }
                setInitialValue(question);

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
        if (questionId) {
            getQuizQuestionInfo(questionId);
        }
    }, [questionId]);


    return (
        <div className="">
            <div>
                <h2 className="text-xl font-bold text-gray-800">Update Question</h2>
            </div>
            {
                fetchLoading ? <Spinner /> :

                    <Formik
                        enableReinitialize
                        initialValues={initialValue}
                        validationSchema={createQuizQuestionSchema(initialValue)}
                        onSubmit={handleSubmit}
                    >
                        {({
                            values,
                            handleChange,
                            handleBlur,
                            setFieldValue
                        }) => {
                            return (
                                <Form className="w-full space-y-4 mt-4">
                                    <div className="flex gap-2 items-start mb-6">
                                        <div className="grid grid-cols-2 gap-4 flex-grow" >
                                            <div className="col-span-2 flex-1">
                                                <EditorCustom
                                                    label={`Question`}
                                                    onEditorChange={(newValue, editor) => {
                                                        setFieldValue(`question`, newValue)
                                                    }
                                                    }
                                                    value={values.question}
                                                    initialValue={values.question}
                                                />

                                            </div>
                                            <div className="">
                                                <TextInput
                                                    label={'Option 1'}
                                                    name={`option1`}
                                                    placeholder="Enter option 1"
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={values.option1}
                                                />

                                            </div>
                                            <div className="">
                                                <TextInput
                                                    label={'Option 2'}
                                                    name={`option2`}
                                                    placeholder="Enter option 2"
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={values.option2}
                                                />

                                            </div>
                                            <div className="">
                                                <TextInput
                                                    label={'Option 3'}
                                                    name={`option3`}
                                                    placeholder="Enter option 3"
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={values.option3}
                                                />

                                            </div>
                                            <div className="">
                                                <TextInput
                                                    label={'Option 4'}
                                                    name={`option4`}
                                                    placeholder="Enter option 4"
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={values.option4}
                                                />

                                            </div>
                                            <div className="">
                                                <TextInput
                                                    label={'Answer'}
                                                    name={`answer`}
                                                    placeholder="eg. one of A/B/C/D"
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={values.answer}
                                                />

                                            </div>
                                            <div className="col-span-2">
                                                <EditorCustom
                                                    label='Written Answer'
                                                    onEditorChange={(newValue, editor) => {
                                                        setFieldValue(`writtenAnswer`, newValue)
                                                    }
                                                    }
                                                    value={values.writtenAnswer}
                                                    initialValue={values.writtenAnswer}
                                                />
                                            </div>


                                        </div>
                                    </div>
                                    <footer className="py-4  font-medium">
                                        <button type="submit" className="btn-outline-primary">
                                            {loading ? 'Loading...' : 'Update'}
                                        </button>
                                    </footer>
                                </Form>
                            )
                        }}
                    </Formik>
            }
        </div>
    );
};

export default UpdateQuizQuestion;
