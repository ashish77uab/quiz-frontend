import React, { useEffect, useState } from 'react'
import ToastMsg from '../../components/toast/ToastMsg';
import { toast } from 'react-toastify';
import { getUserTransactions } from '../../api/api';
import moment from 'moment';
import RenderNoData from '../../components/layout/RenderNoData';
import { numberWithCommas } from '../../utils/helpers';
import { ACTIVE_TYPE, TRANSACTION_STATUS } from '../../utils/constants';
import Pagination from '../../components/Pagination';
import UpdateWalletModal from '../../components/modals/UpdateWalletModal';

const Transactions = ({
    userId,
    isAdmin,
    user,
    isUpdateWalletOpen,
    setIsUpdateWalletOpen,
    walletData,
    setWalletData,
    getSingleUser
}) => {
    const [actionType, setActionType] = useState(ACTIVE_TYPE.deposit)
    const [query, setQuery] = useState({
        page: 1,
        limit: 10
    })
    const [isLoading, setIsLoading] = useState(false);
    const [transactions, setTransactions] = useState({});

    const getTransactions = async () => {
        try {
            const res = await getUserTransactions({ ...query, actionType, userId });
            const { status, data } = res;
            if (status >= 200 && status < 300) {
                setTransactions(data);
            } else {
                toast.error(<ToastMsg title={"Something went wrong"} />);
            }
        } catch (error) {
            console.log(error, "error");
        }
    };
    useEffect(() => {
        if (userId)
            getTransactions();
    }, [actionType, query, userId]);
    const renderStatusClassName = (status) => {
        if (status === TRANSACTION_STATUS.accepted) {
            return 'text-green-500'
        }
        if (status === TRANSACTION_STATUS.rejected) {
            return 'text-red-500'
        }
        return 'text-primary-gray'
    }
    return (
        <>
            <div className=''>
                <header className={`  ${isAdmin ? ' border-b border-b-zinc-300 px-10 py-4' : 'border-b-dark pb-4 '}`}>
                    <h4 className={`heading-4  ${isAdmin ? 'text-primary-pink' : 'text-white'}`}>Transactions</h4>
                </header>
                <div className={` ${isAdmin ? 'py-6 px-4  md:px-10' : 'py-4'}`}>
                    <div className="flex lg:flex-row flex-col lg:items-center justify-between gap-4">
                        <div className="flex gap-4 items-center">
                            <button onClick={() => {
                                setActionType(ACTIVE_TYPE.deposit)
                            }} className={`${actionType === ACTIVE_TYPE?.deposit ? 'btn-primary' : 'btn-outline-primary'}`}>Deposit</button>
                            <button onClick={() => {
                                setActionType(ACTIVE_TYPE.withdraw)
                            }} className={`${actionType === ACTIVE_TYPE?.withdraw ? 'btn-primary' : 'btn-outline-primary'}`}>Withdraw</button>
                        </div>
                        <div className='flex items-center gap-2'>
                            <span>Balance:</span>
                            <b className={`${user?.wallet?.amount < 0 ? 'text-red-500' : ''}`}>Rs. {numberWithCommas(user?.wallet?.amount?.toFixed(2))}</b>
                            {isAdmin && <button onClick={() => {
                                setIsUpdateWalletOpen(true)
                                setWalletData({
                                    userId: user?._id,
                                    amount: user?.wallet?.amount,
                                })
                            }} className='btn-outline-primary'>Update Amount</button>}
                        </div>
                    </div>
                    <div className='my-6 w-full overflow-x-auto'>
                        <table>
                            <thead>
                                <th>Sr.No</th>
                                <th>Amount</th>
                                <th>Image</th>
                                <th>Status</th>
                                <th>Transaction Type</th>
                                <th>Date</th>
                            </thead>
                            <tbody>
                                {transactions?.transactions?.map((transaction, index) => (
                                    <tr>
                                        <td>{query?.limit * (query?.page - 1) + index + 1}</td>
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
                                        <td className={`font-semibold ${renderStatusClassName(transaction?.status)}`}>{transaction?.status}</td>
                                        <td className={`font-semibold `}>{transaction?.actionType}</td>
                                        <td className='whitespace-nowrap'>{moment(transaction?.createdAt).format('DD MMM , YYYY hh:mm a')}</td>
                                    </tr>
                                ))}
                                {transactions?.totalPages < 1 && <tr>
                                    <td colSpan={6}>
                                        <RenderNoData title={'No transactions found'} />
                                    </td>

                                </tr>}
                            </tbody>
                        </table>

                    </div>
                    <div className="my-4">
                        <Pagination
                            handlePageClick={(page) => {
                                setQuery(prev => ({ ...prev, page: page?.selected + 1 }))
                            }}
                            pageCount={transactions?.totalPages} />

                    </div>
                </div>

                <div>

                </div>
            </div>
            {isAdmin && <UpdateWalletModal getSingleUser={getSingleUser} isOpen={isUpdateWalletOpen} walletData={walletData} closeModal={() => setIsUpdateWalletOpen(false)} />}
        </>
    )
}

export default Transactions