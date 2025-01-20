import { object } from 'dot-object';
import * as Yup from "yup";

const FILE_SIZE = 2 * 1024 * 1024; // 5 MB
const SUPPORTED_FORMATS = ["image/jpeg", "image/jpg", "image/png"];

export const userValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required."),
  lastName: Yup.string().required("Last name is required."),
  dob: Yup.date().required("Date of birth is required."),
  email: Yup.string()
    .email("Invalid email format.")
    .required("Email is required."),
  gender: Yup.string()
    .oneOf(["male", "female", "others"], "Invalid gender value.")
  ,
  password: Yup.string()
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters."),



  phone: Yup.string()
    .required("Phone number is required."),



  confirmPassword:
    Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password not matched')
      .required('Confirm password is required'),

});
export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format.")
    .required("Email is required."),
  password: Yup.string()
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters."),
});


/**
 *
 * @param {*} error
 * @returns
 */
export const parseYupError = (error) => {
  const message = {};
  error.inner.forEach((err) => {
    if (!message[err.path]) {
      message[err.path] = err.message;
    }
  });
  console.log(error.inner, 'error');
  return object(message);
};
/**
 *
 * @param {*} error
 * @returns
 */
export const isYupError = (error) => error?.name === 'ValidationError';