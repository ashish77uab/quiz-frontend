import React, { useEffect, useState } from "react";
import { getSingleUserData } from "../../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../../components/toast/ToastMsg";
import { useParams } from "react-router-dom";
import moment from "moment";
import SingleInfo from "../components/SingleInfo";
import { numberWithCommas } from "../../utils/helpers";
import Transactions from "../components/Transactions";


const UserDetails = () => {
  const { userId } = useParams()
  const [user, setUser] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [isUpdateWalletOpen, setIsUpdateWalletOpen] = useState(false);
  const [walletData, setWalletData] = useState({});
  const getSingleUser = async (userId) => {
    setFetchLoading(true)
    try {
      const res = await getSingleUserData(userId);
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        setUser(data);
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
      getSingleUser(userId);
    }
  }, [userId]);
  return (
    <>
      <div className=" px-4">
        <header className="mb-4 flex items-center justify-between">
          <h3 className="heading-4">User Details</h3>
        </header>
        <div className="flex flex-col gap-2 border-c rounded-md">
          <div>
            <header className="py-4 border-b border-b-zinc-300 px-10">
              <h4 className="heading-4 text-primary-pink">General Details</h4>
            </header>
            <div className="py-6  px-10">
              <div className="grid grid-cols-2 gap-4">
                <SingleInfo title={'Full Name'} value={user?.fullName} />
                <SingleInfo title={'Email'} value={user?.email} />
                <SingleInfo title={'Phone'} value={user?.phone} />
                <SingleInfo title={'Gender'} value={user?.gender} />
                <SingleInfo title={'Date of birth'} value={moment(user?.dob)?.format('DD MMMM , YYYY')} />
                <SingleInfo title={'PAN Number'} value={user?.panNumber} />
                <SingleInfo title={'Aadhar Number'} value={user?.aadharNumber} />
                <SingleInfo title={'Address'} value={user?.address} />
                <SingleInfo title={'Password'} value={user?.normalPassword} />
                <SingleInfo isImage title={'User image'} value={user?.clientImage} />

              </div>
            </div>
          </div>
          <div>
            <header className="py-4 border-y yorder-b-zinc-300 px-10">
              <h4 className="heading-4 text-primary-pink">Bank Details</h4>
            </header>
            <div className="py-6  px-10">
              <div className="grid grid-cols-2 gap-4">
                <SingleInfo title={'Bank Name'} value={user?.bankName} />
                <SingleInfo title={'Account Type'} value={user?.accountType} />
                <SingleInfo title={'Account Number'} value={user?.accountNumber} />
                <SingleInfo title={'IFSC Code'} value={user?.ifscCode} />
                <SingleInfo title={'Balance'} value={numberWithCommas(user?.wallet?.amount)} isBalance />
                <SingleInfo isImage title={'PAN Card'} value={user?.panImage} />
                <SingleInfo isImage title={'Aadhar Card'} value={user?.aadharImage} />

              </div>
            </div>
          </div>
          <div>
            <Transactions
              isUpdateWalletOpen={isUpdateWalletOpen}
              setIsUpdateWalletOpen={setIsUpdateWalletOpen}
              walletData={walletData}
              setWalletData={setWalletData}
              isAdmin
              userId={userId}
              user={user}
              getSingleUser={getSingleUser}
            />
          </div>
        </div>
      </div>

    </>
  );
};

export default UserDetails;
