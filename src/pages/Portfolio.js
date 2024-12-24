import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from 'moment'
import { useSelector } from "react-redux";
import { getUserHoldings } from "../api/api";
import ToastMsg from "../components/toast/ToastMsg";
import { numberWithCommas } from "../utils/helpers";
import RenderNoData from "../components/layout/RenderNoData";
import Pagination from "../components/Pagination";
const Portfolio = () => {
    const user = useSelector((state) => state.auth.user);
    const limit = 10
    const [page, setPage] = useState(1)
    const userId = user?._id
    const [holdings, setHoldings] = useState(null);
    const [fetchLoading, setFetchLoading] = useState(false);

    const getUsersHoldingsData = async () => {
        setFetchLoading(true)
        try {
            const res = await getUserHoldings({ page, limit, userId });
            const { status, data } = res;
            if (status >= 200 && status <= 300) {
                setHoldings(data);
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
        if (userId) {
            getUsersHoldingsData();
        }
    }, [userId, page]);

    return (
        <>
            <div className="px-4">
                <header className="mb-4 flex items-center justify-between">
                    <h3 className="heading-4">
                        Holdings ({holdings?.totalHoldings})
                    </h3>

                </header>
                <div>
                    <div className="overflow-x-auto w-full">
                        <table>
                            <thead>
                                <tr>
                                    {/* <th className="w-[80px]">Sr.No</th> */}
                                    <th>Date</th>
                                    <th>Symbol</th>
                                    <th>Net Qty.</th>
                                    <th>Qty. Left</th>
                                    <th>Avg Price</th>
                                    <th>Close Price</th>
                                    <th>Type</th>
                                    <th>P/L</th>
                                </tr>
                            </thead>
                            <tbody>
                                {holdings?.holdings.map((holding, index) => (
                                    <tr>
                                        {/* <td className="w-[80px]">{index + 1}</td> */}
                                        <td>{moment(holding?.date || holding?.createdAt)?.format('YYYY-MM-DD')}</td>
                                        <td>{holding.name}</td>
                                        <td>{holding.quantity}</td>
                                        <td>{holding.quantityLeft}</td>
                                        <td>{numberWithCommas(holding?.startPrice)}</td>
                                        <td>{holding?.endPrice ? numberWithCommas(holding?.endPrice) : '-'}</td>
                                        <td className="font-semibold">{holding.actionType}</td>
                                        {holding?.diffAmount ? <td className={` font-semibold ${holding?.diffAmount < 0 ? 'text-red-500' : 'text-green-500'}`}>

                                            {
                                                numberWithCommas(holding?.diffAmount?.toFixed(2))
                                            }

                                        </td> : <td className="font-semibold">-</td>}


                                    </tr>
                                ))}

                                {holdings?.totalHoldings < 1 && !fetchLoading && (
                                    <tr>
                                        <td colSpan={8}>
                                            <RenderNoData title="No holdings found." />
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
                            pageCount={holdings?.totalPages} />

                    </div>
                </div>
            </div>




        </>
    );
};

export default Portfolio;
