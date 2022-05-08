import {authAPI} from "../dal/api_Srg";
import {Dispatch} from "redux";

const initialState = {
    emailIsSent: false,
    error: null
}

// types
export type SetEmailIsSentActionType = ReturnType<typeof setEmailIsSentInAC>;
export type SetRegisterErrorActionType = ReturnType<typeof setResetPasswordErrorAC>;

type ActionsType =
    | SetEmailIsSentActionType
    | SetRegisterErrorActionType

export type InitialStateType = {
    // true если сообщение отправлено на почту
    emailIsSent: boolean
    // если ошибка какая-то глобальная произойдет - мы запишем текст ошибки сюда
    error: string | null
}

export const resetPasswordReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "RESET-PASSWORD/SENT-EMAIL":
            return {...state, emailIsSent: action.value}
        case 'RESET-PASSWORD/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state;
    }
};

// actions
export const setEmailIsSentInAC = (value: boolean) => ({type: 'RESET-PASSWORD/SENT-EMAIL', value} as const)
export const setResetPasswordErrorAC = (error: string | null) => ({type: "RESET-PASSWORD/SET-ERROR", error} as const)

// thunks
export const resetPasswordTC = (email: string) => (dispatch: Dispatch<ActionsType>) => {
    authAPI.resetPassword(email)
        .then((res) => {
            dispatch(setEmailIsSentInAC(true))
            console.log(res.data.info)
        })
        .catch((error) => {
            console.log(error.response.data.error)
            dispatch(setResetPasswordErrorAC("Error: " + error.response.data.error))
        })
}