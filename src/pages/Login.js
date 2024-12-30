import React, { useState } from "react";
import { toast } from "react-toastify";
import ToastMsg from "../components/toast/ToastMsg";
import { getUser, login } from "../api/api";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { reactIcons } from "./../utils/icons";
import TextInput from "../components/forms/TextInput";
import { loginValidationSchema } from "../utils/yup";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/authSlice";
import { Formik, Form } from 'formik';

const initialState = {
  email: "",
  password: "",
};
const Login = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

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
  const handleSubmit = async (values, actionFrom) => {
    setIsLoading(true);
    try {
      const res = await login({ ...values });
      const { status, data } = res;
      if (status >= 200 && status < 300) {
        toast.success(<ToastMsg title={`Login Successfully`} />);
        localStorage.setItem("loginToken", data.token);
        getUserData()
        if (data?.result?.role === 'Admin') {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
      console.log(error, "error login");
    } finally {
      setIsLoading(false);
    }
  };
  if (localStorage.getItem("loginToken")) {
    return <Navigate to="/" />
  }
  return (
    <div className="flex-center min-h-screen py-4 px-4 bg-pink-50">
      <Formik
        initialValues={initialState}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleChange,
          handleBlur,
        }) => {
          return (
            <Form className=" w-full space-y-2 max-w-md shadow-card bg-white rounded-md py-10 px-6 ">
              <header className="py-4 text-center heading-4 text-primary-pink">Login</header>
              <div className="space-y-4">
                <TextInput
                  label={"Email"}
                  type="text"
                  placeholder="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <TextInput
                  label="Password"
                  type={toggle ? "text" : "password"}
                  placeholder="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  addonRight={
                    <span
                      onClick={() => setToggle(!toggle)}
                      className="w-8 h-8 ay-center right-2 flex-center rounded-md hover:bg-white/80 text-lg cursor-pointer"
                    >
                      {toggle ? reactIcons.eye : reactIcons.eyeslash}
                    </span>
                  }
                />

                <div>
                  <div className="text-muted">
                    <Link
                      to="/forgot-password"
                      className="ml-2 text-blue-500 underline"
                    >
                      Forgot Password
                    </Link>
                  </div>{" "}
                </div>
                <div className="text-center">
                  <p className="text-muted">
                    Don't have an account?{" "}
                    <Link to="/register" className="ml-2 text-blue-500 underline" >
                      Create new account
                    </Link>
                  </p>{" "}
                </div>
              </div>
              <footer className="py-4 text-center font-medium">
                <button
                  type="submit"
                  className="btn-primary px-10 py-2"
                >
                  {isLoading ? "Loading..." : "Login"}
                </button>
              </footer>
            </Form>
          )
        }}
      </Formik>
    </div>
  );
};

export default Login;
