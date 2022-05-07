import {authAPI, } from "./api/auth-api";
import {Dispatch} from "redux";


// type InitialStateType = typeof initState;

const initState = {
    isLogitIn: false,
    error: null
};

export type InitialStateType = {
    // true если регистрация прошла успешно
    isLogitIn: boolean
    // если ошибка какая-то глобальная произойдет - мы запишем текст ошибки сюда
    error: string | null
}

export const loginReducer = (state :InitialStateType = initState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return  {...state, isLogitIn: action.value}
        case 'login/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state;
    }
};

export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

export const setLoginErrorAC = (error: string | null) =>
    ({type: 'login/SET-ERROR', error} as const)

type ActionsType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setLoginErrorAC>

export const LoginTC = (email: string | null, password: string | null,rememberMe:boolean) => (dispatch: Dispatch<ActionsType>) => {
    authAPI.login(email, password, rememberMe).then((res) =>{
dispatch(setIsLoggedInAC(true))
        })
        .catch((error) => {
            if (!error.response.data.isEmailValid) {
                dispatch(setLoginErrorAC("Error: " + error.response.data.error))
            } else {
                dispatch(setLoginErrorAC("Error: " + error.response.data.passwordRegExp))
            }
        })
}

