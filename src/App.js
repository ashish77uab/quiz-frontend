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
  QuizResult,
  QuizJoin,
  Login,
  Register,
  SolutionPage
} from "./pages";
import { getUser } from "./api/api";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";
import ToastMsg from "./components/toast/ToastMsg";
import { useEffect } from "react";
import MainLayout from "./components/layout/MainLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
import RenderModal from "./RenderModal";
import ProtectedRoutes from "./ProtectedRoutes";
import { MathJaxContext } from "better-react-mathjax";
function App() {

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
  const mathJaxConfig = {
    loader: { load: ["input/tex", "output/chtml"] },
    tex: {
      inlineMath: [["\\(", "\\)"]],
      displayMath: [["\\[", "\\]"]],
    },
  };
  // useEffect(() => {
  //   // Disable right-click
  //   document.addEventListener('contextmenu', (e) => e.preventDefault());

  //   function ctrlShiftKey(e, keyCode) {
  //     return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
  //   }

  //   document.onkeydown = (e) => {
  //     // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
  //     if (
  //       e.keyCode === 123 ||
  //       ctrlShiftKey(e, 'I') ||
  //       ctrlShiftKey(e, 'J') ||
  //       ctrlShiftKey(e, 'C') ||
  //       (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
  //     )
  //       return false;
  //   };
  // }, [])
  return (
    <div className="App">
      <MathJaxContext config={mathJaxConfig}>


        <BrowserRouter>
          <RenderModal />
          <Routes>
            <Route path="/" element={<ProtectedRoutes><MainLayout /></ProtectedRoutes>}>
              <Route index element={<Home />} />
              <Route path="play-quiz/:quizId" element={<QuizPlay />} />
              <Route path="/quiz/result/:resultId/:quizId" element={<QuizResult />} />
              <Route path="/quiz-join/:quizId" element={<QuizJoin />} />
              <Route path="//quiz/answer/:questionNumber/:quizId" element={<SolutionPage />} />
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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
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
      </MathJaxContext>
    </div>
  );
}

export default App;
