import React from 'react'
import SignUpModal from './components/modals/SignUpModal'
import { useDispatch, useSelector } from 'react-redux';
import { setModalToggle } from './redux/features/authSlice';
import LoginModal from './components/modals/LoginModal';

const RenderModal = () => {
    const { isLoginOpen, isSignUpOpen } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const handleAuthToggle = (obj) => {
        dispatch(setModalToggle(obj))
    }
    return (
        <>
            <SignUpModal
                isOpen={isSignUpOpen}
                handleAuthToggle={handleAuthToggle}
                closeModal={() => {
                    handleAuthToggle({ key: 'isSignUpOpen', value: false })
                }} />
            <LoginModal
                isOpen={isLoginOpen}
                handleAuthToggle={handleAuthToggle}
                closeModal={() => {
                    handleAuthToggle({ key: 'isLoginOpen', value: false })
                }}
            />
        </ >
    )
}

export default RenderModal