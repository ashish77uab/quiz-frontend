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
  UserDetails,
  AllTransactions,
  UserStocks,
  UserHoldings,
  AllQuiz,
  AddQuizQuestion,
  UpdateQuizQuestion,
  QuizPlay,
  QuizResult
} from "./pages";
import { getUser } from "./api/api";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/features/authSlice";
import ToastMsg from "./components/toast/ToastMsg";
import { useEffect } from "react";
import MainLayout from "./components/layout/MainLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
import RenderModal from "./RenderModal";
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
            <Route path="play-quiz/:quizId/:quizName" element={<QuizPlay />} />
            <Route path="/quiz/result/:quizId" element={<QuizResult />} />
          </Route>
          <Route path="/dashboard" element={<ProtectedRoutes><DashboardLayout /></ProtectedRoutes>}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<AllUsers />} />
            <Route path="quiz" element={<AllQuiz />} />
            <Route path="quiz/add-question/:quizId" element={<AddQuizQuestion />} />
            <Route path="quiz/update-question/:quizId" element={<UpdateQuizQuestion />} />
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
