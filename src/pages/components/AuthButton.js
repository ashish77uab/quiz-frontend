import React from 'react'

const AuthButton = ({ handleSignUpClick, handleSignInClick, toggle, isMobileMenu }) => {

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleSignInClick()}
        className='btn-outline-primary'
      >
        Log In
      </button>
      <button
        onClick={() => handleSignUpClick()}
        className="btn-primary"
      >
        Sign Up
      </button>
    </div>
  )
}

export default AuthButton