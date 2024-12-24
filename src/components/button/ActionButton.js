import React from 'react'

const ActionButton = ({className,children,...rest}) => {
  return (
    <button {...rest} className={`w-10 h-10 text-xl bg-primary-pink text-white hover:bg-primary-pink/50 rounded-md flex-center ${className}`}>
      {children}
    </button>
  )
}

export default ActionButton
