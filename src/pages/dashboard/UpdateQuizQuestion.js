import React, { useEffect, useState } from "react";
import TextInput from "../../components/forms/TextInput";
import { getQuizQuestionList, updateQuestion } from "../../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../../components/toast/ToastMsg";
import { useNavigate, useParams } from "react-router-dom";
import { FieldArray, Form, Formik } from "formik";
import { createQuizQuestionSchema } from "../../utils/validation";

import EditorCustom from "../../components/forms/EditorCustom";
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
const initialState = {
    questions: [
        singleObject
    ],

};
const UpdateQuizQuestion = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const [initialValue, setInitialValue] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);


    const handleSubmit = async (values) => {
        setLoading(true)
        const tempForm = { quizId: quizId, ...values }
        try {
            const res = updateQuestion(tempForm);
            const { status, data } = res;
            if (status >= 200 && status < 300) {
                toast.success(<ToastMsg title={`${quizId ? 'Updated' : 'Added'} Successfully`} />);
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

    const getQuizQuestions = async (id) => {
        setFetchLoading(true)
        try {
            const res = await getQuizQuestionList(id);
            const { status, data } = res;
            if (status >= 200 && status <= 300) {
                const questions = data?.quizes?.map((item) => ({
                    _id: item?._id,
                    question: item.question,
                    option1: item.option1,
                    option2: item.option2,
                    option3: item.option3,
                    option4: item.option4,
                    answer: item.answer,
                    writtenAnswer: item.writtenAnswer,
                }))
                setInitialValue({ questions });

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
        <div className="py-4 px-4">
            <Formik
                enableReinitialize
                initialValues={initialValue}
                validationSchema={createQuizQuestionSchema(initialValue?.questions?.length)}
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
                            <FieldArray name="questions">
                                {({ insert, remove, push }) => (
                                    <div>
                                        {values?.questions?.length > 0 &&
                                            values?.questions?.map((question, index) => (
                                                <div className="flex gap-2 items-start mb-6">
                                                    <div className="grid grid-cols-2 gap-4 flex-grow" key={index}>
                                                        <div className="col-span-2 flex-1">
                                                            <EditorCustom
                                                                label={`Question ${index + 1}`}
                                                                onEditorChange={(newValue, editor) => {
                                                                    setFieldValue(`questions.${index}.question`, newValue)
                                                                }
                                                                }
                                                                value={question.question}
                                                                initialValue={question.question}
                                                            />

                                                        </div>
                                                        <div className="">
                                                            <TextInput
                                                                label={'Option 1'}
                                                                name={`questions.${index}.option1`}
                                                                placeholder="Enter option 1"
                                                                type="text"
                                                                onChange={handleChange}
                                                                value={question.option1}
                                                            />

                                                        </div>
                                                        <div className="">
                                                            <TextInput
                                                                label={'Option 2'}
                                                                name={`questions.${index}.option2`}
                                                                placeholder="Enter option 2"
                                                                type="text"
                                                                onChange={handleChange}
                                                                value={question.option2}
                                                            />

                                                        </div>
                                                        <div className="">
                                                            <TextInput
                                                                label={'Option 3'}
                                                                name={`questions.${index}.option3`}
                                                                placeholder="Enter option 3"
                                                                type="text"
                                                                onChange={handleChange}
                                                                value={question.option3}
                                                            />

                                                        </div>
                                                        <div className="">
                                                            <TextInput
                                                                label={'Option 4'}
                                                                name={`questions.${index}.option4`}
                                                                placeholder="Enter option 4"
                                                                type="text"
                                                                onChange={handleChange}
                                                                value={question.option4}
                                                            />

                                                        </div>
                                                        <div className="">
                                                            <TextInput
                                                                label={'Answer'}
                                                                name={`questions.${index}.answer`}
                                                                placeholder="eg. one of A/B/C/D"
                                                                type="text"
                                                                onChange={handleChange}
                                                                value={question.answer}
                                                            />

                                                        </div>
                                                        <div className="col-span-2">
                                                            <EditorCustom
                                                                label='Written Answer'
                                                                onEditorChange={(newValue, editor) => {
                                                                    setFieldValue(`questions.${index}.writtenAnswer`, newValue)
                                                                }
                                                                }
                                                                value={question.writtenAnswer}
                                                                initialValue={question.writtenAnswer}
                                                            />
                                                        </div>


                                                    </div>
                                                    <div className=" flex items-center gap-2 py-6 ">
                                                        {/* <DeleteButton
                                                            type='button'
                                                            className={'text-3xl'}
                                                            onClick={() => remove(index)}
                                                        >
                                                            {reactIcons.minus}
                                                        </DeleteButton>
                                                        <ActionButton
                                                            type='button'
                                                            className={'text-3xl'}
                                                            onClick={() => push(singleObject)}
                                                        >
                                                            {reactIcons.plus}
                                                        </ActionButton> */}
                                                    </div>

                                                </div>
                                            ))}

                                    </div>
                                )}
                            </FieldArray>
                            <footer className="py-4  font-medium">
                                <button type="submit" className="btn-outline-primary">
                                    {loading ? 'Loading...' : 'Update'}
                                </button>
                            </footer>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    );
};

export default UpdateQuizQuestion;
