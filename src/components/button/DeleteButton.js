import React from 'react'

const DeleteButton = ({ className, children, ...rest }) => {
  return (
    <button {...rest} className={`w-10 h-10 text-18 bg-red-200 hover:bg-red-300 text-red-800 rounded-md flex-center ${className}`}>
      {children}
    </button>
  )
}

export default DeleteButton
