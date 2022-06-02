import {Dispatch} from "redux";
import {setAppLoading, setErrorAC, SetErrorActionType} from './appReducer';
import {registerAPI} from '../dal/registerAPI';

type InitialStateType = typeof initialState

export const initialState = {
    isRegistration: false,
    message: '',
}

type actionType = successRegistrationType | SetErrorActionType

export const registrationReducer = (state: InitialStateType = initialState, action: actionType): InitialStateType => {
    switch (action.type) {
        case "REGISTRATION/IS-REGISTRATION-SUCCESS":
            return {...state, isRegistration: true}

        default: {
            return state;
        }
    }
};

export const successRegistrationAC = (isRegistration: boolean) => {
    return {type: 'REGISTRATION/IS-REGISTRATION-SUCCESS', isRegistration } as const
}

export const registrationTC = (payload : {email: string, password: string}) => (dispatch: Dispatch) => {
    dispatch(setAppLoading("loading"))
    registerAPI.register(payload)
        .then((res)=>{
            dispatch(successRegistrationAC(true))
        })
        .catch((error)=> {
            dispatch(setErrorAC(error.response.data.error))
        })
        .finally(() => dispatch(setAppLoading("succeeded")))
}

type successRegistrationType = ReturnType<typeof successRegistrationAC>