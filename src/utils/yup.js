import { object } from 'dot-object';
import * as Yup from "yup";

const FILE_SIZE = 2 * 1024 * 1024; // 5 MB
const SUPPORTED_FORMATS = ["image/jpeg", "image/jpg", "image/png"];

export const userValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required."),
  lastName: Yup.string().required("Last name is required."),
  email: Yup.string()
    .email("Invalid email format.")
    .required("Email is required."),
  gender: Yup.string()
    .oneOf(["male", "female", "others"], "Invalid gender value.")
  ,
  password: Yup.string()
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters."),
  panImage: Yup.mixed()
    .required("PAN image is required.")
    .test(
      "fileSize",
      "PAN image size should not exceed 5 MB.",
      (value) => value && value.size <= FILE_SIZE
    )
    .test(
      "fileFormat",
      "PAN image must be in JPEG/JPG/PNG format.",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  aadharImage: Yup.mixed()
    .required("Aadhar image is required.")
    .test(
      "fileSize",
      "Aadhar image size should not exceed 5 MB.",
      (value) => value && value.size <= FILE_SIZE
    )
    .test(
      "fileFormat",
      "Aadhar image must be in JPEG/JPG/PNG format.",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  clientImage: Yup.mixed()
    .required("Client image is required.")
    .test(
      "fileSize",
      "Client image size should not exceed 5 MB.",
      (value) => value && value.size <= FILE_SIZE
    )
    .test(
      "fileFormat",
      "Client image must be in JPEG/JPG/PNG format.",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  phone: Yup.string()
    .required("Phone number is required."),
  panNumber: Yup.string()
    .required("PAN number is required."),
  aadharNumber: Yup.string()
    .required("Aadhar number is required.")
  ,
  address: Yup.string().required("Address is required."),
  bankName: Yup.string().required("Bank name is required."),
  accountNumber: Yup.string()
    .required("Account number is required.")
  ,
  ifscCode: Yup.string()
    .required("IFSC code is required.")
  ,
  accountType: Yup.string()
    .oneOf(["saving", "current"], "Invalid account type."),
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