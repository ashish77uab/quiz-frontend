import React, { useEffect, useState } from "react";
import { getSingleUserData } from "../../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../../components/toast/ToastMsg";
import { useParams } from "react-router-dom";
import moment from "moment";
import SingleInfo from "../components/SingleInfo";


const UserDetails = () => {
  const { userId } = useParams()
  const [user, setUser] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);
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
                <SingleInfo title={'Password'} value={user?.normalPassword} />

              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default UserDetails;
