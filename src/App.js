import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { ToastContainer, toast } from "react-toastify";
import {
  Dashboard,
  ForgotPassword,
  Home,
  AllUsers,
  ResetPassword,
  Profile,
  UserDetails,
  Pricing,
  ContactUs,
  AboutUs,
  AllTransactions,
  UserStocks,
  Strategy,
  UserDashboard,
  Markets,
  NetPosition,
  Portfolio,
  UserHoldings
} from "./pages";
import { getUser } from "./api/api";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/features/authSlice";
import ToastMsg from "./components/toast/ToastMsg";
import { useEffect } from "react";
import MainLayout from "./components/layout/MainLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
import RenderModal from "./RenderModal";
import UserLayout from "./components/layout/UserLayout";
import Funds from "./pages/components/Funds";
import ProtectedRoutes from "./ProtectedRoutes";
function App() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
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
    if (localStorage.getItem("loginToken")) {
      getUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <RenderModal />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path='/pricing' element={<Pricing />} />
            <Route path='/contact' element={<ContactUs />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path='/strategy' element={<Strategy />} />
          </Route>
          <Route path="/user" element={<ProtectedRoutes><UserLayout /></ProtectedRoutes>}>
            <Route index element={<UserDashboard />} />
            <Route path='dashboard' element={<UserDashboard />} />
            <Route path='funds' element={<Funds user={user} />} />
            <Route path='portfolio' element={<Portfolio />} />
            <Route path='markets' element={<Markets />} />
            <Route path="net-position" element={<NetPosition />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/dashboard" element={<ProtectedRoutes><DashboardLayout /></ProtectedRoutes>}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<AllUsers />} />
            <Route path="transactions" element={<AllTransactions />} />
            <Route path="user/:userId" element={<UserDetails />} />
            <Route path="user-stocks/:userId" element={<UserStocks />} />
            <Route path="user-holdings/:userId" element={<UserHoldings />} />
          </Route>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/passwordReset" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        className={
          "lg:w-[500px] text-16 font-semibold w-full max-w-full  m-auto p-0 !font-poppins"
        }
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        limit={3}
      />
    </div>
  );
}

export default App;
