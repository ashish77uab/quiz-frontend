import React, { useState } from "react";
import { toast } from "react-toastify";
import { Formik, Form } from 'formik';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updatePasswordValidationSchema } from "../../utils/validation";
import TextInput from "../../components/forms/TextInput";
import { reactIcons } from "../../utils/icons";
import ToastMsg from "../../components/toast/ToastMsg";
import { updatePassword } from "../../api/api";
import { setLogout } from "../../redux/features/authSlice";

const initialState = {
  oldPassword: "",
  newPassword: "",

};
const UpdatePassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values, actionForm) => {
    setIsLoading(true)
    try {
      let formData = { ...values };
      const res = await updatePassword(formData);
      const { status, data } = res;
      if (status >= 200 && status < 300) {
        toast.success(<ToastMsg title={`Updated Successfully`} />);
        dispatch(setLogout());
        navigate('/')
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      console.log(error, 'update password error')
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    } finally { setIsLoading(false) }

  };
  return (
    <>
      <Formik
        initialValues={initialState}
        validationSchema={updatePasswordValidationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleChange,
          handleBlur,
        }) => {
          return (
            <Form className="w-full space-y-4">
              <TextInput
                isUser
                label={"Old Password"}
                type={toggle ? "text" : "password"}
                placeholder="Enter old password"
                name="oldPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.oldPassword}
                autoComplete='new-password'
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
                isUser
                label={"New Password"}
                type={toggle ? "text" : "password"}
                placeholder="Enter new password"
                name="newPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.newPassword}
                addonRight={
                  <span
                    onClick={() => setToggle(!toggle)}
                    className="w-8 h-8 ay-center cursor-pointer right-2 flex-center rounded-md hover:bg-white/80 text-lg text-gray-600"
                  >
                    {toggle ? reactIcons.eye : reactIcons.eyeslash}
                  </span>
                }
              />

              <footer className="py-4 text-center font-medium">
                <button type="submit" className="btn-outline-primary">
                  {isLoading ? 'Loading...' : 'Update'}
                </button>
              </footer>
            </Form>
          )
        }}
      </Formik>
    </>
  );
};

export default UpdatePassword;
