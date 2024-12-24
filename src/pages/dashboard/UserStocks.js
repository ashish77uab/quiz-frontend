import React, { useEffect, useState } from "react";
import { deleteStock, getUserStocks, settleStock } from "../../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../../components/toast/ToastMsg";
import ActionButton from "../../components/button/ActionButton";
import { reactIcons } from "../../utils/icons";
import DeleteButton from "../../components/button/DeleteButton";
import DeleteConfirmation from "../../components/modals/DeleteConfirmation";
import { useParams } from "react-router-dom";
import RenderNoData from "../../components/layout/RenderNoData";
import PurchaseStock from "../../components/modals/PurchaseStock";
import { numberWithCommas } from "../../utils/helpers";
import Pagination from "../../components/Pagination";
import SellStock from "../../components/modals/SellStock";
import moment from 'moment'
import SettleConfimation from "../../components/modals/SettleConfimation";
import EditStockModal from "../../components/modals/EditStockModal";
const UserStocks = () => {
  const limit = 10
  const [page, setPage] = useState(1)
  const [updateLoading, setUpdateLoading] = useState(false)
  const { userId } = useParams();
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [isEditStockOpen, setIsEditStockOpen] = useState(false);
  const [isSettleOpen, setIsSettleOpen] = useState(false);
  const [isSellOpen, setIsSellOpen] = useState(false);
  const [stock, setStock] = useState(null);
  const [isConfirmedOpen, setIsConfirmedOpen] = useState(false);
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
  const handleDelete = async () => {
    setUpdateLoading(true)
    try {
      const res = await deleteStock(stock?._id);
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        getUsersStocksData();
        toast.success(<ToastMsg title={'Deleted Successfully'} />);
        setIsConfirmedOpen(false)
        setStock(null)

      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    } finally {
      setUpdateLoading(false)
    }
  };
  const handleConfirm = async () => {
    setUpdateLoading(true)
    try {
      const res = await settleStock(stock?._id, stock);
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        getUsersStocksData();
        toast.success(<ToastMsg title={'Settled Successfully'} />);
        setIsSettleOpen(false)
        setStock(null)

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
          <button
            onClick={() => setIsPurchaseOpen(true)}
            className="btn-primary"
          >
            Purchase
          </button>
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
                  {/* <th>Total Amount</th> */}
                  <th>P/L</th>

                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {stocks?.stocks.map((stock, index) => (
                  <tr>
                    {/* <td className="w-[80px]">{index + 1}</td> */}
                    <td>{moment(stock?.date || stock?.createdAt)?.format('YYYY-MM-DD')}</td>
                    <td>{stock.name}</td>
                    <td>{stock.quantity}</td>
                    <td>{stock.quantityLeft !== null ? stock.quantityLeft : '-'}</td>
                    <td>{numberWithCommas(stock?.startPrice)}</td>
                    <td>{stock?.endPrice ? numberWithCommas(stock?.endPrice) : '-'}</td>
                    <td className="font-semibold">{stock.actionType}</td>
                    {/* <td className={` font-semibold ${stock?.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>{numberWithCommas(stock?.amount)}</td> */}
                    {stock?.diffAmount ? <td className={` font-semibold ${stock?.diffAmount < 0 ? 'text-red-500' : 'text-green-500'}`}>

                      {
                        numberWithCommas(stock?.diffAmount?.toFixed(2))
                      }

                    </td> : <td className="font-semibold">-</td>}

                    <td>
                      <div className="flex justify-end gap-2">
                        <ActionButton
                          onClick={() => {
                            setStock(stock);
                            setIsEditStockOpen(true);
                          }}
                        >
                          {reactIcons.edit}
                        </ActionButton>
                        <DeleteButton
                          onClick={() => {
                            setStock(stock);
                            setIsConfirmedOpen(true);
                          }}
                        >
                          {reactIcons.delete}
                        </DeleteButton>
                        {/* <button
                          onClick={() => {
                            setStock(stock);
                            setIsSellOpen(true);
                          }}
                          className="btn-primary min-w-fit px-8">Sell</button> */}
                        {/* {!stock?.isSettled && <button
                          onClick={() => {
                            setStock(stock);
                            setIsSettleOpen(true);
                          }}
                          className="btn-green min-w-fit px-8">Settle</button>} */}
                      </div>
                    </td>
                  </tr>
                ))}

                {stocks?.totalStocks < 1 && !fetchLoading && (
                  <tr>
                    <td colSpan={11}>
                      <RenderNoData title="No stocks found." />
                    </td>
                  </tr>
                )}
                {fetchLoading && (
                  <tr>
                    <td colSpan={11}>
                      <div className="py-8 text-center font-semibold">Loading please wait....</div>
                    </td>
                  </tr>
                )}

              </tbody>
            </table>
            <div className="my-4">
              <Pagination
                handlePageClick={(page) => {
                  setPage(page?.selected + 1)
                }}
                pageCount={stocks?.totalPages} />

            </div>
          </div>
        </div>
      </div>
      {isPurchaseOpen && <PurchaseStock
        isOpen={isPurchaseOpen}
        stock={stock || null}
        closeModal={() => {
          setIsPurchaseOpen(false);
          setStock(null);
        }}
        fetchData={getUsersStocksData}
      />}
      {isSellOpen && <SellStock
        isOpen={isSellOpen}
        stock={stock || null}
        closeModal={() => {
          setIsSellOpen(false);
          setStock(null);
        }}
        fetchData={getUsersStocksData}
      />}
      {isEditStockOpen && <EditStockModal
        isOpen={isEditStockOpen}
        stock={stock || null}
        closeModal={() => {
          setIsEditStockOpen(false);
          setStock(null);
        }}
        fetchData={getUsersStocksData}
      />}
      <DeleteConfirmation
        isOpen={isConfirmedOpen}
        closeModal={() => {
          setIsConfirmedOpen(false)
          setStock(null)
        }}
        handleDelete={handleDelete}
        title={"Stock"}
        loading={updateLoading}
      />
      <SettleConfimation
        isOpen={isSettleOpen}
        closeModal={() => {
          setIsSettleOpen(false)
          setStock(null)
        }}
        handleConfirm={handleConfirm}
        title={"Stock"}
        loading={updateLoading}
      />
    </>
  );
};

export default UserStocks;
