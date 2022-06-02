import React from 'react';
import {Forgot} from './Forgot';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../bll/store';
import {setErrorAC} from '../../bll/appReducer';
import {forgotPasswordTC} from '../../bll/forgotReducer';


const ForgotPasswordContainer: React.FC = () => {
    const dispatch = useDispatch()
    const isRequestSend = useSelector<RootStateType, boolean>(state => state.forgotPassword.isRequestSend)
    const setError = (value: string) => {
        dispatch(setErrorAC(value))
    }
    const forgotPasswordRequest = (value: string) => {
        dispatch(forgotPasswordTC(value) as any)
    }

    return <Forgot
        isRequestSend={isRequestSend}
        setError={setError}
        forgotPasswordRequest={forgotPasswordRequest}
    />;
};

export default ForgotPasswordContainer;
