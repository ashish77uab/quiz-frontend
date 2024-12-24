import React, { useEffect, useState } from "react";
import { getAllUsersList } from "../../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../../components/toast/ToastMsg";
import { numberWithCommas } from "../../utils/helpers";
import { reactIcons } from "../../utils/icons";
import Pagination from "../../components/Pagination";
import RenderNoData from "../../components/layout/RenderNoData";
import ActionButton from "../../components/button/ActionButton";
import SendVoucherNotification from "../../components/modals/SendVoucherNotification";
import ViewUsersVouchers from "../../components/modals/ViewUsersVouchers";
import TextInput from "../../components/forms/TextInput";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  const navigate = useNavigate();
  const limit = 10
  const [isViewVoucherOpen, setIsViewVoucherOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [deferedValue, setDeferedValue] = useState('');
  const [isSendNotificationOpen, setIsSendNotificationOpen] = useState(false);
  const [users, setUsers] = useState(null);
  const [vouchers, setVouchers] = useState(null);
  const [userVoucher, setUserVoucher] = useState([]);
  const [page, setPage] = useState(1);
  const [userId, setUserId] = useState(null)
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
        <header className="mb-4 flex items-center justify-between">
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
                  <th>Balance</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users?.users?.map((user, index) => {

                  return (
                    <tr>
                      <td className="w-[80px]">{index + 1}</td>
                      <td>{user?.fullName}</td>
                      <td><div>{user?.email}</div></td>
                      <td><div>{user?.phone}</div></td>
                      <td><b className={`${user?.wallet?.amount < 0 ? 'text-red-500' : ''}`}>Rs. {numberWithCommas(user?.wallet?.amount?.toFixed(2))}</b></td>
                      <td>
                        <div className="flex justify-center gap-2">
                          <button className={'btn-primary btn-sm'} onClick={() => {
                            navigate(`/dashboard/user/${user?._id}`)
                          }}>
                            View Details
                          </button>
                          <button className={'btn-outline-primary btn-sm'} onClick={() => {
                            navigate(`/dashboard/user-stocks/${user?._id}`)
                          }}>
                            View Stocks
                          </button>
                          <button className={'btn-outline-primary btn-sm'} onClick={() => {
                            navigate(`/dashboard/user-holdings/${user?._id}`)
                          }}>
                            View Holdings
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
