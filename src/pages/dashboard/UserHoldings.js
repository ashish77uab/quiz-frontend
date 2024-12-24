import React, { useEffect, useState } from "react";
import { deleteHolding, getUserHoldings } from "../../api/api";
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
import EditStockModal from "../../components/modals/EditStockModal";
import PurchaseHolding from "../../components/modals/PurchaseHolding";
import SellHolding from "../../components/modals/SellHolding";
import EditHoldingModal from "../../components/modals/EditHoldingModal";
const UserHoldings = () => {
  const limit = 10
  const [page, setPage] = useState(1)
  const [updateLoading, setUpdateLoading] = useState(false)
  const { userId } = useParams();
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [isEditHoldingOpen, setIsEditHoldingOpen] = useState(false);
  const [isSellOpen, setIsSellOpen] = useState(false);
  const [holding, setHolding] = useState(null);
  const [isConfirmedOpen, setIsConfirmedOpen] = useState(false);
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
  const handleDelete = async () => {
    setUpdateLoading(true)
    try {
      const res = await deleteHolding(holding?._id);
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        getUsersHoldingsData();
        toast.success(<ToastMsg title={'Deleted Successfully'} />);
        setIsConfirmedOpen(false)
        setHolding(null)

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
                {holdings?.holdings.map((holding, index) => (
                  <tr>
                    {/* <td className="w-[80px]">{index + 1}</td> */}
                    <td>{moment(holding?.date || holding?.createdAt)?.format('YYYY-MM-DD')}</td>
                    <td>{holding.name}</td>
                    <td>{holding.quantity}</td>
                    <td>{holding.quantityLeft !== null ? holding.quantityLeft : '-'}</td>
                    <td>{numberWithCommas(holding?.startPrice)}</td>
                    <td>{holding?.endPrice ? numberWithCommas(holding?.endPrice) : '-'}</td>
                    <td className="font-semibold">{holding.actionType}</td>
                    {/* <td className={` font-semibold ${holding?.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>{numberWithCommas(holding?.amount)}</td> */}
                    {holding?.diffAmount ? <td className={` font-semibold ${holding?.diffAmount < 0 ? 'text-red-500' : 'text-green-500'}`}>

                      {
                        numberWithCommas(holding?.diffAmount?.toFixed(2))
                      }

                    </td> : <td className="font-semibold">-</td>}

                    <td>
                      <div className="flex justify-end gap-2">
                        <ActionButton
                          onClick={() => {
                            setHolding(holding);
                            setIsEditHoldingOpen(true);
                          }}
                        >
                          {reactIcons.edit}
                        </ActionButton>
                        <DeleteButton
                          onClick={() => {
                            setHolding(holding);
                            setIsConfirmedOpen(true);
                          }}
                        >
                          {reactIcons.delete}
                        </DeleteButton>
                        {/* <button
                          onClick={() => {
                            setHolding(holding);
                            setIsSellOpen(true);
                          }}
                          className="btn-primary min-w-fit px-8">Sell</button> */}
                        {/* {!holding?.isSettled && <button
                          onClick={() => {
                            setHolding(holding);
                            setIsSettleOpen(true);
                          }}
                          className="btn-green min-w-fit px-8">Settle</button>} */}
                      </div>
                    </td>
                  </tr>
                ))}

                {holdings?.totalHoldings < 1 && !fetchLoading && (
                  <tr>
                    <td colSpan={11}>
                      <RenderNoData title="No holdings found." />
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
                pageCount={holdings?.totalPages} />

            </div>
          </div>
        </div>
      </div>
      {isPurchaseOpen && <PurchaseHolding
        isOpen={isPurchaseOpen}
        holding={holding || null}
        closeModal={() => {
          setIsPurchaseOpen(false);
          setHolding(null);
        }}
        fetchData={getUsersHoldingsData}
      />}
      {isSellOpen && <SellHolding
        isOpen={isSellOpen}
        holding={holding || null}
        closeModal={() => {
          setIsSellOpen(false);
          setHolding(null);
        }}
        fetchData={getUsersHoldingsData}
      />}
      {isEditHoldingOpen && <EditHoldingModal
        isOpen={isEditHoldingOpen}
        holding={holding || null}
        closeModal={() => {
          setIsEditHoldingOpen(false);
          setHolding(null);
        }}
        fetchData={getUsersHoldingsData}
      />}
      <DeleteConfirmation
        isOpen={isConfirmedOpen}
        closeModal={() => {
          setIsConfirmedOpen(false)
          setHolding(null)
        }}
        handleDelete={handleDelete}
        title={"Holding"}
        loading={updateLoading}
      />

    </>
  );
};

export default UserHoldings;
