import React from 'react'
import SignUpModal from './components/modals/SignUpModal'
import { useDispatch, useSelector } from 'react-redux';
import { setModalToggle } from './redux/features/authSlice';
import LoginModal from './components/modals/LoginModal';
import QuestionStatus from './components/modals/QuestionStatus';

const RenderModal = () => {
    const { isLoginOpen, isSignUpOpen, isQuestionStatusOpen } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const handleToggle = (obj) => {
        dispatch(setModalToggle(obj))
    }
    return (
        <>
            <SignUpModal
                isOpen={isSignUpOpen}
                handleAuthToggle={handleToggle}
                closeModal={() => {
                    handleToggle({ key: 'isSignUpOpen', value: false })
                }} />
            <LoginModal
                isOpen={isLoginOpen}
                handleAuthToggle={handleToggle}
                closeModal={() => {
                    handleToggle({ key: 'isLoginOpen', value: false })
                }}
            />
            <QuestionStatus
                isOpen={isQuestionStatusOpen}
                closeModal={() => handleToggle({ key: 'isQuestionStatusOpen', value: false })} />
        </ >
    )
}

export default RenderModal