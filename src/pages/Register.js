import React, { useState } from "react";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ToastMsg from "../components/toast/ToastMsg";
import { register } from "../api/api";
import { reactIcons } from "../utils/icons";
import TextInput from "../components/forms/TextInput";
import { userValidationSchema } from "../utils/yup";
import { serialize } from 'object-to-formdata'
import ReactSelect from "../components/forms/ReactSelect";
import { useDispatch } from "react-redux";
import { setModalToggle, setUser } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
const genders = [{ label: "Male", value: "male" }, { label: "Female", value: "female" }, { label: "Others", value: "others" }]
const accounts = [{ label: "Saving", value: "saving" }, { label: "Current", value: "current" }]
const initialState = {
  firstName: "",
  lastName: "",
  dob: "",
  email: "",
  gender: "others",
  panImage: "",
  aadharImage: "",
  clientImage: "",
  phone: "",
  panNumber: "",
  aadharNumber: "",
  address: "",
  bankName: "",
  accountNumber: "",
  ifscCode: "",
  accountType: "saving",
  password: "",
  confirmPassword: "",
};
const Register = ({ closeModal }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [select, setSelect] = useState({
    gender: { label: 'Others', value: 'others' },
    account: { label: 'Savings', value: 'saving' },
  });
  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleAuthToggle = (obj) => {
    dispatch(setModalToggle(obj))
  }
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
        closeModal()
        handleReset();
        navigate("/wishlist");
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      console.log(error, 'register error')
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    } finally { setIsLoading(false) }

  };
  return (
    <>
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
            <Form className="w-full space-y-2">
              <h3 className="py-4 heading-4 text-center capitalize">
                Create new account
              </h3>
              <div className="px-4 lg:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
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
                <div>
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
                <div>
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
                <div>
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
                <div>
                  <TextInput
                    label={"Pan Number"}
                    type="text"
                    placeholder="pan number"
                    name="panNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.panNumber}
                  />
                </div>
                <div>
                  <TextInput
                    label={"PAN Image"}
                    type="file"
                    name="panImage"
                    onChange={(e) => {
                      setFieldValue('panImage', e.target.files[0])
                    }}
                    onBlur={handleBlur}

                  />
                </div>
                <div>
                  <TextInput
                    label={"Aadhar Number"}
                    type="text"
                    placeholder="aadhar number"
                    name="aadharNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.aadharNumber}
                  />
                </div>
                <div>
                  <TextInput
                    label={"Aadhar Image"}
                    type="file"
                    name="aadharImage"
                    onChange={(e) => {
                      setFieldValue('aadharImage', e.target.files[0])
                    }}
                    onBlur={handleBlur}

                  />
                </div>
                <div>
                  <TextInput
                    label={"Client Image"}
                    type="file"
                    name="clientImage"
                    onChange={(e) => {
                      setFieldValue('clientImage', e.target.files[0])
                    }}
                    onBlur={handleBlur}

                  />
                </div>
                <div>
                  <TextInput
                    label={"Address"}
                    type="text"
                    placeholder="address"
                    name="address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                  />
                </div>

                <div>
                  <TextInput
                    label={"Bank Name"}
                    type="text"
                    placeholder="bank name"
                    name="bankName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bankName}
                  />
                </div>
                <div>
                  <TextInput
                    label={"Account Number"}
                    type="text"
                    placeholder="account number"
                    name="accountNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.accountNumber}
                  />
                </div>

                <div>
                  <TextInput
                    label={"IFSC Code"}
                    type="text"
                    placeholder="IFSC Code"
                    name="ifscCode"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.ifscCode}
                  />
                </div>
                <div>
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
                <div>
                  <ReactSelect
                    name='accountType'
                    label={"Select Account Type"}
                    options={accounts}
                    value={select?.account}
                    onChange={(e) => {
                      setFieldValue('accountType', e?.value)
                      setSelect({ ...select, account: e })

                    }}
                  />
                </div>
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
                <div>
                  <p className="text-muted">
                    Already have an account?{" "}
                    <button type="button" onClick={() => {
                      handleAuthToggle({ key: 'isSignUpOpen', value: false })
                      handleAuthToggle({ key: 'isLoginOpen', value: true })
                    }} className="ml-2 text-blue-500 underline" >
                      Login
                    </button>
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
    </>
  );
};

export default Register;
