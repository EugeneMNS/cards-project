import {authAPI, NewPasswordType} from "../dal/api_Srg";
import {Dispatch} from "redux";
import {redirectToLogin} from "./loginReducer";

const initialState = {
    error: null,
    isNewPasswordSet: false
}

type ActionsType =
    | ReturnType<typeof saveNewPasswordAC>
    | ReturnType<typeof setCreateNewPasswordErrorAC>
    | ReturnType<typeof redirectToLogin>

export type InitialStateType = {
    isNewPasswordSet: boolean
    error: string | null
}

export const createNewPasswordReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'CREATE-NEW-PASSWORD/SAVE-NEW-PASSWORD':
            return {...state, isNewPasswordSet: action.isNewPasswordSet}
        case 'CREATE-NEW-PASSWORD/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state;
    }
};

// actions
export const saveNewPasswordAC = (isNewPasswordSet: boolean) => ({
    type: "CREATE-NEW-PASSWORD/SAVE-NEW-PASSWORD",
    isNewPasswordSet
} as const)
export const setCreateNewPasswordErrorAC = (error: string | null) => ({
    type: "CREATE-NEW-PASSWORD/SET-ERROR",
    error
} as const)

// thunks
export const createNewPasswordTC = (data: NewPasswordType) => (dispatch: Dispatch<ActionsType>) => {
    authAPI.createNewPassword(data)
        .then((res) => {
            dispatch(saveNewPasswordAC(true))
            dispatch(redirectToLogin(true))

            console.log(res.data)
            alert("Новый пароль успешно создан, редирект на логин")
        })
        .catch((error) => {
            console.log(error.response.data.error)
            dispatch(setCreateNewPasswordErrorAC("Error: " + error.response.data.error))
        })
}

