import React, { useEffect, useState } from "react";
import { getAllTransactionsList, updatTransactionStatus } from "../../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../../components/toast/ToastMsg";
import { numberWithCommas } from "../../utils/helpers";
import Pagination from "../../components/Pagination";
import RenderNoData from "../../components/layout/RenderNoData";
import { useNavigate } from "react-router-dom";
import { TRANSACTION_STATUS } from "../../utils/constants";
import moment from 'moment'
import Spinner from "../../components/loaders/Spinner";
import ReactSelect from "../../components/forms/ReactSelect";
import { reactIcons } from "../../utils/icons";
import ActionButton from "../../components/button/ActionButton";
import EditTransactionModal from "../../components/modals/EditTransactionModal";
const ActionTypeArr = [
  { label: 'Filter by action type', value: '' },
  { label: 'Deposit', value: 'Deposit' },
  { label: 'Withdraw', value: 'Withdraw' },
]
const StatusArr = [
  { label: 'Filter by status', value: '' },
  { label: 'Rejected', value: 'Rejected' },
  { label: 'Accepted', value: 'Accepted' },
  { label: 'Pending', value: 'Pending' },
]
const AllTransactions = () => {
  const navigate = useNavigate();
  const limit = 10
  const [search, setSearch] = useState('');
  const [transaction, setTransaction] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deferedValue, setDeferedValue] = useState('');
  const [transactions, setTransactions] = useState(null);
  const [page, setPage] = useState(1);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [filter, setFilter] = useState({
    status: '',
    actionType: ''
  })


  const getAllTransactions = async () => {
    setFetchLoading(true)
    try {
      const res = await getAllTransactionsList({ limit, page, search: deferedValue, status: filter?.status?.value || '', actionType: filter?.actionType?.value || '' });
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        setTransactions(data);
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    } finally {
      setFetchLoading(false)
    }
  };
  const handleUpdateStatus = async (transactionStatus, transactionId, userId, amount) => {
    setUpdateLoading(true)
    try {
      const res = await updatTransactionStatus({ transactionId, status: transactionStatus, userId, amount });
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        toast.success(<ToastMsg title={transactionStatus === 'Accepted' ? 'Accepted Successfylly' : 'Rejected Successfully'} />);
        getAllTransactions()
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
    getAllTransactions();
  }, [page, deferedValue, filter]);
  const renderStatusClassName = (status) => {
    if (status === TRANSACTION_STATUS.accepted) {
      return 'text-green-800'
    }
    if (status === TRANSACTION_STATUS.rejected) {
      return 'text-red-800'
    }
    return 'text-primary-gray'
  }
  return (
    <>
      {updateLoading && <Spinner />}
      <div>
        <header className="mb-4 flex items-center justify-between">
          <h4 className="heading-4">All Transactions <span className="text-sm align-middle">({numberWithCommas(transactions?.totalTransactions)})</span> </h4>

        </header>
        <div>
          <div className="flex items-center flex-wrap  gap-4 mb-4">
            {/* <div className="flex items-center gap-2">
              <label htmlFor="" className="font-medium">Search:</label>
              <TextInput
                type="text"
                placeholder="Search by transaction Id"
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
            </div> */}
            <div className=" flex items-center gap-2">
              <label htmlFor="" className="font-medium flex-shrink-0">Action Type:</label>
              <div className="min-w-[250px]">
                <ReactSelect
                  name='actionType'
                  options={ActionTypeArr}
                  value={filter?.actionType}
                  isFormik={false}
                  onChange={(e) => {
                    setFilter({ ...filter, actionType: e })
                    setPage(1)

                  }}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="" className="font-medium flex-shrink-0">Status:</label>
              <div className="min-w-[250px]">
                <ReactSelect
                  name='status'
                  options={StatusArr}
                  value={filter?.status}
                  isFormik={false}
                  onChange={(e) => {
                    setFilter({ ...filter, status: e })
                    setPage(1)

                  }}
                />
              </div>

            </div>

          </div>
        </div>
        <div>
          <div className="overflow-x-auto w-full">
            <table>
              <thead>
                <tr>
                  <th className="w-[80px]">Sr.No</th>
                  <th>Name of User</th>
                  <th>Email</th>
                  <th>Amount</th>
                  <th>Image</th>
                  <th>Transaction Type</th>
                  {/* <th>Transaction Id</th> */}
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions?.transactions?.map((transaction, index) => {

                  return (
                    <tr>
                      <td className="w-[80px]">{limit * (page - 1) + index + 1}</td>
                      <td>{transaction?.user?.fullName}</td>
                      <td>{transaction?.user?.email}</td>
                      <td>
                        <b>Rs. {numberWithCommas(transaction?.amount)}</b>
                      </td>
                      <td>
                        <div className="flex items-center justify-center">
                          {transaction?.screenShot ? <a rel="noreferrer" title="View image by clicking" href={transaction?.screenShot} target="_blank">
                            <img className="max-w-[60px] my-2 object-contain max-h-[60px]" alt={'screenshot'} src={transaction?.screenShot} />
                          </a> : '-'}
                        </div>
                      </td>
                      <td>{transaction?.actionType}</td>
                      {/* <td>{transaction?.transactionId}</td> */}
                      <td>{moment(transaction?.createdAt).format('DD MMM,YYYY')}</td>
                      {
                        transaction?.status === 'Pending' ? <td>
                          <div className="flex items-center justify-center gap-4">
                            <button
                              onClick={() => handleUpdateStatus('Accepted', transaction?._id, transaction?.user?._id, transaction?.amount)}
                              className="btn-sm btn-green min-w-max"

                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleUpdateStatus('Rejected', transaction?._id, transaction?.user?._id, transaction?.amount)}
                              className="btn-sm btn-red min-w-max"

                            >
                              Reject
                            </button>
                            <ActionButton
                              onClick={() => {
                                setTransaction(transaction);
                                setIsEditOpen(true);
                              }}
                            >
                              {reactIcons.edit}
                            </ActionButton>
                          </div>
                        </td> :
                          <td className={`font-semibold ${renderStatusClassName(transaction?.status)}`}>{transaction?.status}</td>
                      }
                      <td>

                      </td>



                    </tr>
                  )
                }

                )}
                {transactions?.totalTransactions < 1 && !fetchLoading && (
                  <tr>
                    <td colSpan={8}>
                      <RenderNoData title="No transactions found." />
                    </td>
                  </tr>
                )}
                {fetchLoading && (
                  <tr>
                    <td colSpan={8}>
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
              pageCount={transactions?.totalPages} />

          </div>
        </div>
      </div>
      {isEditOpen && <EditTransactionModal
        isOpen={isEditOpen}
        transaction={transaction || null}
        closeModal={() => {
          setIsEditOpen(false);
          setTransaction(null);
        }}
        fetchData={getAllTransactions}
      />}
    </>
  );
};

export default AllTransactions;
