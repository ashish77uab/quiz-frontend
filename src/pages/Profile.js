import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ToastMsg from "../components/toast/ToastMsg";
import Spinner from "../components/loaders/Spinner";
import { getUser } from "../api/api";
import { setUser } from "../redux/features/authSlice";
import moment from "moment";
import UpdatePassword from "./components/UpdatePassword";
import SingleInfo from "./components/SingleInfo";
import { useSearchParams } from "react-router-dom";



const ACTIVE_TAB = {
    profile: 'profile',
    password: 'password',
}
const Profile = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentTab = searchParams.get("tab") || ACTIVE_TAB.profile;
    const [activeTab, setActiveTab] = useState(currentTab)
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const getUserData = async () => {
        try {
            const res = await getUser();
            const { status, data } = res;
            if (status >= 200 && status < 300) {
                dispatch(setUser(data));
            } else {
                toast.error(<ToastMsg title={"Something went wrong"} />);
            }
        } catch (error) {
            console.log(error, "error");
        }
    };
    useEffect(() => {
        if (activeTab === ACTIVE_TAB?.profile)
            getUserData();
    }, [activeTab]);
    const handleActiveTab = (tab) => {
        setSearchParams({ tab }, { replace: true });
        setActiveTab(tab);
    }




    return (
        <>
            {isLoading && <Spinner />}

            <div className=" ">
                <div className="container relative py-10">
                    <div className="flex lg:flex-row flex-col  border-dark rounded-md ">
                        <div className="flex-shrink-0 lg:w-[300px] border-dark border-t-0 border-l-0 border-b-0 p-6">
                            <div className="flex flex-col lg:gap-4 gap-2">
                                <button onClick={() => {
                                    handleActiveTab(ACTIVE_TAB.profile)
                                }} className={`${activeTab === ACTIVE_TAB?.profile ? 'btn-primary' : 'btn-outline-primary'}`}>Profile</button>
                                <button onClick={() => {
                                    handleActiveTab(ACTIVE_TAB.password)
                                }} className={`${activeTab === ACTIVE_TAB?.password ? 'btn-primary' : 'btn-outline-primary'}`}>Change Password</button>
                            </div>

                        </div>
                        <div className="flex-grow ">
                            {activeTab === ACTIVE_TAB?.profile && <>
                                <div>
                                    <header className="py-4 border-b-dark  px-4 lg:px-10">
                                        <h4 className="heading-4 ">General Details</h4>
                                    </header>
                                    <div className="py-6  px-4 lg:px-10">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                            <SingleInfo isUser title={'Full Name'} value={user?.fullName} />
                                            <SingleInfo isUser title={'Email'} value={user?.email} />
                                            <SingleInfo isUser title={'Phone'} value={user?.phone} />
                                            <SingleInfo isUser title={'Gender'} value={user?.gender} />
                                            <SingleInfo isUser title={'Date of birth'} value={moment(user?.dob)?.format('DD MMMM , YYYY')} />
                                            <SingleInfo isUser title={'PAN Number'} value={user?.panNumber} />
                                            <SingleInfo isUser title={'Aadhar Number'} value={user?.aadharNumber} />
                                            <SingleInfo isUser title={'Address'} value={user?.address} />
                                            <SingleInfo isUser isImage title={'Your image'} value={user?.clientImage} />

                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <header className="py-4 border-dark border-x-0 px-4 lg:px-10">
                                        <h4 className="heading-4 ">Bank Details</h4>
                                    </header>
                                    <div className="py-6  px-4 lg:px-10">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                            <SingleInfo isUser title={'Bank Name'} value={user?.bankName} />
                                            <SingleInfo isUser title={'Account Type'} value={user?.accountType} />
                                            <SingleInfo isUser title={'Account Number'} value={user?.accountNumber} />
                                            <SingleInfo isUser title={'IFSC Code'} value={user?.ifscCode} />
                                            <SingleInfo isUser isImage title={'PAN Card'} value={user?.panImage} />
                                            <SingleInfo isUser isImage title={'Aadhar Card'} value={user?.aadharImage} />

                                        </div>
                                    </div>
                                </div>
                            </>}
                            {activeTab === ACTIVE_TAB?.password && <>
                                <div>
                                    <header className="py-4  border-b-dark px-4 lg:px-10">
                                        <h4 className="heading-4 text-white">Change Password</h4>
                                    </header>
                                    <div className="py-6  px-4 lg:px-10">
                                        <div className="max-w-xl">
                                            <UpdatePassword />
                                        </div>
                                    </div>
                                </div>

                            </>}
                        </div>
                    </div>

                </div>
            </div>

        </>
    );
};

export default Profile;
