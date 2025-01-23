import React, { useEffect, useState } from "react";
import { getAllUsersList } from "../../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../../components/toast/ToastMsg";
import { numberWithCommas } from "../../utils/helpers";
import Pagination from "../../components/Pagination";
import RenderNoData from "../../components/layout/RenderNoData";
import TextInput from "../../components/forms/TextInput";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  const navigate = useNavigate();
  const limit = 10
  const [search, setSearch] = useState('');
  const [deferedValue, setDeferedValue] = useState('');
  const [users, setUsers] = useState(null);
  const [page, setPage] = useState(1);
  const [fetchLoading, setFetchLoading] = useState(false);

  const getAllUsers = async () => {
    setFetchLoading(true)
    try {
      const res = await getAllUsersList({ limit, page, search: deferedValue });
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        setUsers(data);
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
    getAllUsers();
  }, [page, deferedValue]);
  return (
    <>
      <div>
        <header className="mb-4 md:flex-row flex-col gap-2 flex md:items-center justify-between">
          <h4 className="heading-4">All Users <span className="text-sm align-middle">({numberWithCommas(users?.totalUsers)})</span> </h4>
          <div className="flex items-center justify-between gap-2">
            <TextInput
              type="text"
              placeholder="Search user by name"
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
          </div>
        </header>
        <div>
          <div className="overflow-x-auto w-full">
            <table>
              <thead>
                <tr>
                  <th className="w-[80px]">Sr.No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users?.users?.map((user, index) => {

                  return (
                    <tr>
                      <td className="w-[80px]">{limit * (page - 1) + index + 1}</td>
                      <td>{user?.fullName}</td>
                      <td><div>{user?.email}</div></td>
                      <td><div>{user?.phone}</div></td>
                      <td>
                        <div className="flex justify-center gap-2">
                          <button className={'btn-primary btn-sm'} onClick={() => {
                            navigate(`/dashboard/user/${user?._id}`)
                          }}>
                            View Details
                          </button>

                        </div>
                      </td>
                    </tr>
                  )
                }

                )}

                {users?.totalUsers < 1 && !fetchLoading && (
                  <tr>
                    <td colSpan={6}>
                      <RenderNoData title="No users found." />
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
              pageCount={users?.totalPages} />

          </div>
        </div>
      </div>
    </>
  );
};

export default AllUsers;
