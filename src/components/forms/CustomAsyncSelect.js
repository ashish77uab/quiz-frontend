import React from 'react'
import AsyncSelect from 'react-select/async'
import {  ErrorMessage } from 'formik';
const CustomAsyncSelect = ({ className,
  label,
  error,
  name,
  helperText,
  isFormik = true,
  ...rest }) => {
  return (
    <div className='w-full flex flex-col gap-1'>
      {label && <label htmlFor="">{label}</label>}
      <AsyncSelect
        name={name}
        isClearable
        {...rest}
        formatOptionLabel={(option) => (
          <div className="
        flex ">
            <div>{option.flag}</div>
            <div>
              {option.label}
              <span className="text-neutral-500 ml-1">
                {option.region}
              </span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'border-1',
          input: () => 'text-lg',
          option: () => 'text-lg'
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6'
          }
        })}
      />
      {helperText && <p className="text-gray-600 text-xs">{helperText}</p>}
      {isFormik &&  <ErrorMessage name={name}>{msg => <div className='form-error'>{msg}</div>}</ErrorMessage>}
    </div>
  )
}

export default CustomAsyncSelect
