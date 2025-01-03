import React, { useEffect, useState } from "react";
import { deleteQuiz, getAllQuizList } from "../../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../../components/toast/ToastMsg";
import { numberWithCommas } from "../../utils/helpers";
import Pagination from "../../components/Pagination";
import RenderNoData from "../../components/layout/RenderNoData";
import TextInput from "../../components/forms/TextInput";
import { useNavigate } from "react-router-dom";
import { reactIcons } from "../../utils/icons";
import DeleteButton from "../../components/button/DeleteButton";
import ActionButton from "../../components/button/ActionButton";
import CreateAndUpdateQuiz from "../../components/modals/CreateAndUpdateQuiz";
import DeleteConfirmation from "../../components/modals/DeleteConfirmation";

const AllQuiz = () => {
  const navigate = useNavigate();
  const limit = 10
  const [search, setSearch] = useState('');
  const [deferedValue, setDeferedValue] = useState('');
  const [quizes, setQuizes] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [page, setPage] = useState(1);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [isQuizCreateOpen, setIsQuizCreateOpen] = useState(false);
  const [isConfirmedOpen, setIsConfirmedOpen] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false)

  const getAllQuiz = async () => {
    setFetchLoading(true)
    try {
      const res = await getAllQuizList({ limit, page, search: deferedValue });
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
  const handleDelete = async () => {
    setUpdateLoading(true)
    try {
      const res = await deleteQuiz(quiz?._id);
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        getAllQuiz();
        toast.success(<ToastMsg title={'Deleted Successfully'} />);
        setIsConfirmedOpen(false)
        setQuiz(null)

      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    } finally {
      setUpdateLoading(false)
    }
  };

  useEffect(() => {
    getAllQuiz();
  }, [page, deferedValue]);
  return (
    <>
      <div>
        <header className="mb-4 flex items-center justify-between">
          <h4 className="heading-4">All Quiz <span className="text-sm align-middle">({numberWithCommas(quizes?.totalQuizes)})</span> </h4>
          <div className="flex items-center justify-between gap-2">
            <TextInput
              type="text"
              placeholder="Search quiz by name"
              name="search"
              onChange={(e) => {
                setSearch(e.target.value)
                setTimeout(() => {
                  setDeferedValue(e.target.value)
                  setPage(1)
                }, 1000);
              }}
              isFormik={false}
              value={search}
            />
            <button className="btn-primary" onClick={() => setIsQuizCreateOpen(true)}>Create Quiz</button>
          </div>
        </header>
        <div>
          <div className="overflow-x-auto w-full">
            <table>
              <thead>
                <tr>
                  <th className="w-[80px]">Sr.No</th>
                  <th>Name</th>
                  <th>Total Questions</th>
                  <th>Right answer mark</th>
                  <th>Negative answer mark</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {quizes?.quizes?.map((quiz, index) => {

                  return (
                    <tr>
                      <td className="w-[80px]">{index + 1}</td>
                      <td>{quiz?.name}</td>
                      <td><div>{quiz?.questionCount}</div></td>
                      <td><div>{quiz?.rightMark}</div></td>
                      <td><div>{quiz?.negativeMark}</div></td>
                      <td>
                        <div className="flex justify-end gap-2">
                          {quiz?.isAdded ? <button onClick={() => navigate(`/dashboard/quiz/update-question/${quiz?._id}`)} className="btn-primary">
                            Update
                          </button> : <button onClick={() => navigate(`/dashboard/quiz/add-question/${quiz?._id}`)} className="btn-primary">
                            Add
                          </button>
                          }
                          <ActionButton
                            onClick={() => {
                              setQuiz(quiz);
                              setIsQuizCreateOpen(true);
                            }}
                          >
                            {reactIcons.edit}
                          </ActionButton>
                          <DeleteButton
                            onClick={() => {
                              setQuiz(quiz);
                              setIsConfirmedOpen(true);
                            }}
                          >
                            {reactIcons.delete}
                          </DeleteButton>
                        </div>
                      </td>
                    </tr>
                  )
                }

                )}

                {quizes?.totalQuizes < 1 && !fetchLoading && (
                  <tr>
                    <td colSpan={6}>
                      <RenderNoData title="No quizes found." />
                    </td>
                  </tr>
                )}
                {fetchLoading && (
                  <tr>
                    <td colSpan={6}>
                      <div className="py-8 text-center font-semibold">Loading please wait....</div>
                    </td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>
          <div className="my-4">
            <Pagination
              handlePageClick={(page) => {
                setPage(page?.selected + 1)
              }}
              pageCount={quizes?.totalPages} />

          </div>
        </div>
      </div>
      <CreateAndUpdateQuiz
        isOpen={isQuizCreateOpen}
        quiz={quiz}
        closeModal={() => {
          setIsQuizCreateOpen(false)
          setQuiz(null)

        }}
        fetchData={getAllQuiz}
      />
      <DeleteConfirmation
        isOpen={isConfirmedOpen}
        closeModal={() => {
          setIsConfirmedOpen(false)
          setQuiz(null)
        }}
        handleDelete={handleDelete}
        title={"Quiz"}
        loading={updateLoading}
      />
    </>
  );
};

export default AllQuiz;
