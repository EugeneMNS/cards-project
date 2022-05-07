import {authAPI} from "../dal/api_Srg";
import {Dispatch} from "redux";

const initialState = {
    isRegisterIn: false,
    error: null
}

// types
export type SetIsRegisterInActionType = ReturnType<typeof setIsRegisterInAC>;
export type SetRegisterErrorActionType = ReturnType<typeof setRegisterErrorAC>;

type ActionsType =
    | SetIsRegisterInActionType
    | SetRegisterErrorActionType

export type InitialStateType = {
    // true если регистрация прошла успешно
    isRegisterIn: boolean
    // если ошибка какая-то глобальная произойдет - мы запишем текст ошибки сюда
    error: string | null
}

export const registrationReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "REGISTER/SET-IS-REGISTER-IN":
            return {...state, isRegisterIn: action.value}
        case 'REGISTER/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state;
    }
};

// actions
export const setIsRegisterInAC = (value: boolean) => ({type: 'REGISTER/SET-IS-REGISTER-IN', value} as const)
export const setRegisterErrorAC = (error: string | null) => ({type: "REGISTER/SET-ERROR", error} as const)

// thunks
export const registerTC = (email: string | null, password: string | null) => (dispatch: Dispatch<ActionsType>) => {
    authAPI.register(email, password)
        .then((res) => {
            dispatch(setIsRegisterInAC(true))
            console.log(res.data.addedUser)
        })
        .catch((error) => {
            console.log(error.response.data.error)
            if (!error.response.data.isEmailValid) {
                dispatch(setRegisterErrorAC("Error: " + error.response.data.error))
            } else {
                dispatch(setRegisterErrorAC("Error: " + error.response.data.passwordRegExp))
            }
        })
}