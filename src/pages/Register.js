import React, { useState } from "react";
import { toast } from "react-toastify";
import { Formik, Form } from 'formik';
import ToastMsg from "../components/toast/ToastMsg";
import { register } from "../api/api";
import { reactIcons } from "../utils/icons";
import TextInput from "../components/forms/TextInput";
import { userValidationSchema } from "../utils/yup";
import { serialize } from 'object-to-formdata'
import ReactSelect from "../components/forms/ReactSelect";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/authSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";
const genders = [{ label: "Male", value: "male" }, { label: "Female", value: "female" }, { label: "Others", value: "others" }]
const initialState = {
  firstName: "",
  lastName: "",
  dob: "",
  email: "",
  gender: "others",
  phone: "",
  password: "",
  confirmPassword: "",
};
const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [select, setSelect] = useState({
    gender: { label: 'Others', value: 'others' },
    account: { label: 'Savings', value: 'saving' },
  });
  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = () => {
    setSelect({
      gender: '',
      account: '',
    })
  };

  const handleSubmit = async (values, actionForm) => {
    setIsLoading(true)
    try {
      let formData = { ...values };
      delete formData.confirmPassword;
      const res = await register(serialize(formData));
      const { status, data } = res;
      if (status >= 200 && status < 300) {
        toast.success(<ToastMsg title={`Register Successfully`} />);
        localStorage.setItem("loginToken", data.token);
        dispatch(setUser(data?.user));
        handleReset();
        navigate("/");
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      console.log(error, 'register error')
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    } finally { setIsLoading(false) }

  };
  if (localStorage.getItem("loginToken")) {
    return <Navigate to="/" />
  }
  return (
    <div className="flex-center min-h-screen py-4 px-4 bg-pink-50">
      <Formik
        initialValues={initialState}
        validationSchema={userValidationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          setFieldValue,
          handleChange,
          handleBlur,
        }) => {
          return (
            <Form className="w-full space-y-2 max-w-md shadow-card bg-white rounded-md py-10 px-6 ">
              <h3 className="mb-2 heading-4 text-center capitalize">
                Create new account
              </h3>
              <div className=" grid grid-cols-2 gap-4">
                <TextInput
                  label={"First Name"}
                  type="text"
                  placeholder="first name"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                />

                <TextInput
                  label={"Last Name"}
                  type="text"
                  placeholder="last name"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                />
                <div className="col-span-2">
                  <TextInput
                    label={"Email"}
                    type="text"
                    placeholder="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </div>
                <div className="col-span-2">
                  <TextInput
                    label={"Phone"}
                    type="text"
                    placeholder="phone"
                    name="phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                  />
                </div>
                <div className="col-span-2">
                  <TextInput
                    label={"Date of birth"}
                    type="date"
                    placeholder="choose date"
                    name="dob"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dob}
                  />
                </div>
                <div className="col-span-2">
                  <ReactSelect
                    name='gender'
                    label={"Select Gender"}
                    options={genders}
                    value={select?.gender}
                    onChange={(e) => {
                      setFieldValue('gender', e?.value)
                      setSelect({ ...select, gender: e })

                    }}
                  />
                </div>
                <div className="col-span-2">
                  <TextInput
                    label={"Password"}
                    type={toggle ? "text" : "password"}
                    placeholder="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    addonRight={
                      <span
                        onClick={() => setToggle(!toggle)}
                        className="w-8 h-8 ay-center cursor-pointer right-2 flex-center rounded-md hover:bg-white/80 text-lg text-gray-600"
                      >
                        {toggle ? reactIcons.eye : reactIcons.eyeslash}
                      </span>
                    }
                  />
                </div>
                <div className="col-span-2">
                  <TextInput
                    label={"Confirm Password"}
                    type={toggle ? "text" : "password"}
                    placeholder="confirm password"
                    name="confirmPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    addonRight={
                      <span
                        onClick={() => setToggle(!toggle)}
                        className="w-8 h-8 ay-center cursor-pointer right-2 flex-center rounded-md hover:bg-white/80 text-lg text-gray-600"
                      >
                        {toggle ? reactIcons.eye : reactIcons.eyeslash}
                      </span>
                    }
                  />
                </div>
                <div className="col-span-2">
                  <p className="text-muted">
                    Already have an account?{" "}
                    <Link to={'/login'} className="ml-2 text-blue-500 underline" >
                      Login
                    </Link>
                  </p>{" "}
                </div>
              </div>
              <footer className="py-4 text-center font-medium">
                <button type="submit" className="btn-outline-primary">
                  {isLoading ? 'Loading...' : 'Create'}
                </button>
              </footer>
            </Form>
          )
        }}
      </Formik>
    </div>
  );
};

export default Register;
