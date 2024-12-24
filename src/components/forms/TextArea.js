import { ErrorMessage } from "formik";
import React from "react";

const TextArea = ({ className, label,name, error, helperText, isFormik = true, ...rest }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label htmlFor="">{label}</label>}
      <div className="relative">
        <textarea
          {...rest}
          name={name}
          className={`  input-field resize-none h-36 ${className}  ${
            error ? "border-red-500" : "border-zinc-200"
          }`}
        ></textarea>
      </div>
      {helperText && <p className="text-gray-600 text-xs">{helperText}</p>}
      {isFormik &&  <ErrorMessage name={name}>{msg => <div className='form-error'>{msg}</div>}</ErrorMessage>}
    </div>
  );
};

export default TextArea;
