import React, { useEffect, useState } from "react";
import { numberWithCommas } from "../../utils/helpers";
import { getDashboardData } from "../../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../../components/toast/ToastMsg";

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({})
    const [fetchLoading, setFetchLoading] = useState({})
    const fetchDashboardData = async () => {

        setFetchLoading(true)
        try {
            const res = await getDashboardData();
            const { status, data } = res;
            if (status >= 200 && status <= 300) {
                setDashboardData(data);
            } else {
                toast.error(<ToastMsg title={data.message} />);
            }
        } catch (error) {
            toast.error(<ToastMsg title={error?.response?.data?.message} />);
        } finally {
            setFetchLoading(false)
        }
    }
    useEffect(() => {
        fetchDashboardData()
    }, [])



    return (
        <div>
            <header className="mb-4 flex items-center justify-between">
                <h3 className="heading-3">Dashboard</h3>
            </header>
            <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mb-10">
                <div className="bg-white border border-zinc-100 rounded-md p-6 shadow-card">
                    <h5 className="heading-5">Total Users</h5>
                    <p className="font-semibold text-xl text-primary-pink">{numberWithCommas(dashboardData?.totalUsers)}</p>
                </div>
                <div className="bg-white border border-zinc-100 rounded-md p-6 shadow-card">
                    <h5 className="heading-5">Total Transactions</h5>
                    <p className="font-semibold text-xl text-primary-pink">{numberWithCommas(dashboardData?.totalTransactions)}</p>
                </div>
                <div className="bg-white border border-zinc-100 rounded-md p-6 shadow-card">
                    <h5 className="heading-5">Total Pending Transactions</h5>
                    <p className="font-semibold text-xl text-primary-pink">{numberWithCommas(dashboardData?.pendingTransactions)}</p>
                </div>
                <div className="bg-white border border-zinc-100 rounded-md p-6 shadow-card">
                    <h5 className="heading-5">Total Deposit</h5>
                    <p className="font-semibold text-xl text-primary-pink">Rs. {numberWithCommas(dashboardData?.totalDepositAmount)}</p>
                </div>
                <div className="bg-white border border-zinc-100 rounded-md p-6 shadow-card">
                    <h5 className="heading-5">Total Withdrawal</h5>
                    <p className="font-semibold text-xl text-primary-pink">Rs. {numberWithCommas(dashboardData?.totalWithdrawalAmount)}</p>
                </div>
                <div className="bg-white border border-zinc-100 rounded-md p-6 shadow-card">
                    <h5 className="heading-5">Highest Deposit</h5>
                    <p className="font-semibold text-xl text-primary-pink">Rs. {numberWithCommas(dashboardData?.highestDepositAmount)}</p>
                </div>
                <div className="bg-white border border-zinc-100 rounded-md p-6 shadow-card">
                    <h5 className="heading-5">Highest Withdrawal</h5>
                    <p className="font-semibold text-xl text-primary-pink">Rs. {numberWithCommas(dashboardData?.highestWithdrawalAmount)}</p>
                </div>

            </div>

        </div>
    );
};

export default Dashboard;
