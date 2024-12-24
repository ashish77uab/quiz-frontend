import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from 'moment'
import { useSelector } from "react-redux";
import { getUserStocks } from "../api/api";
import ToastMsg from "../components/toast/ToastMsg";
import { numberWithCommas } from "../utils/helpers";
import RenderNoData from "../components/layout/RenderNoData";
import Pagination from "../components/Pagination";
const NetPosition = () => {
    const user = useSelector((state) => state.auth.user);
    const limit = 10
    const [page, setPage] = useState(1)
    const userId = user?._id
    const [stocks, setStocks] = useState(null);
    const [fetchLoading, setFetchLoading] = useState(false);

    const getUsersStocksData = async () => {
        setFetchLoading(true)
        try {
            const res = await getUserStocks({ page, limit, userId });
            const { status, data } = res;
            if (status >= 200 && status <= 300) {
                setStocks(data);
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
            getUsersStocksData();
        }
    }, [userId, page]);

    return (
        <>
            <div className="px-4">
                <header className="mb-4 flex items-center justify-between">
                    <h3 className="heading-4">
                        Scrip ({stocks?.totalStocks})
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
                                {stocks?.stocks.map((stock, index) => (
                                    <tr>
                                        {/* <td className="w-[80px]">{index + 1}</td> */}
                                        <td>{moment(stock?.date || stock?.createdAt)?.format('YYYY-MM-DD')}</td>
                                        <td>{stock.name}</td>
                                        <td>{stock.quantity}</td>
                                        <td>{stock.quantityLeft}</td>
                                        <td>{numberWithCommas(stock?.startPrice)}</td>
                                        <td>{stock?.endPrice ? numberWithCommas(stock?.endPrice) : '-'}</td>
                                        <td className="font-semibold">{stock.actionType}</td>
                                        {stock?.diffAmount ? <td className={` font-semibold ${stock?.diffAmount < 0 ? 'text-red-500' : 'text-green-500'}`}>

                                            {
                                                numberWithCommas(stock?.diffAmount?.toFixed(2))
                                            }

                                        </td> : <td className="font-semibold">-</td>}


                                    </tr>
                                ))}

                                {stocks?.totalStocks < 1 && !fetchLoading && (
                                    <tr>
                                        <td colSpan={8}>
                                            <RenderNoData title="No stocks found." />
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
                            pageCount={stocks?.totalPages} />

                    </div>
                </div>
            </div>




        </>
    );
};

export default NetPosition;
