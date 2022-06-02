import React, {useCallback} from 'react';
import Register from './Register';
import {registrationTC} from '../../bll/registrationReducer';
import {Navigate} from 'react-router-dom';
import {RootStateType} from "../../bll/store";
import {useDispatch, useSelector} from 'react-redux';

const RegistrationContainer: React.FC = React.memo(() => {
    const dispatch = useDispatch()
    const isRegistration = useSelector<RootStateType, boolean>(state => state.register.isRegistration)

    const registrationRequest = useCallback((email: string, password: string) => {
        dispatch(registrationTC({email, password})as any)
    }, [])

    if (isRegistration) {
        return <Navigate to={'/login'}/>
    }
    return <Register
        registrationRequest={registrationRequest}
    />;
});

export default RegistrationContainer;