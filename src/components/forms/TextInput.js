import React from "react";
import { ErrorMessage } from 'formik';

const TextInput = ({
  isUser,
  className,
  addonRight,
  label,
  name,
  error,
  helperText,
  labelAddon,
  isFormik = true,
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <div className="flex items-center w-full justify-between gap-4">
        {<label htmlFor="">{label}</label>}
        {labelAddon && labelAddon}
      </div>
      }
      <div className="relative">
        <input
          {...rest}
          name={name}
          className={`input-field  ${className} ${error ? "border-red-500" : "border-zinc-200"
            } ${isUser && 'bg-primary-darkBlueSupport text-white focus-visible:outline-none !border-blue-950'} `}
        />
        {addonRight ? addonRight : null}
      </div>
      {helperText && <p className="text-gray-600 text-xs">{helperText}</p>}
      {isFormik && <ErrorMessage name={name}>{msg => <div className='form-error'>{msg}</div>}</ErrorMessage>}
    </div>
  );
};

export default TextInput;
