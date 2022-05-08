import {authAPI} from "../dal/api_Srg";
import {Dispatch} from "redux";

const initialState = {
    error: null,
}

// types
export type SetCreateNewPasswordErrorActionType = ReturnType<typeof setCreateNewPasswordErrorAC>;

type ActionsType =
    | SetCreateNewPasswordErrorActionType

export type InitialStateType = {
    // если ошибка какая-то глобальная произойдет - мы запишем текст ошибки сюда
    error: string | null
}

export const createNewPasswordReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {

        case 'CREATE-NEW-PASSWORD/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state;
    }
};

// actions
export const setCreateNewPasswordErrorAC = (error: string | null) => ({
    type: "CREATE-NEW-PASSWORD/SET-ERROR",
    error
} as const)

// thunks
export const createNewPasswordTC = (password: string, resetPasswordToken: string) => (dispatch: Dispatch<ActionsType>) => {
    authAPI.createNewPassword(password, resetPasswordToken)
        .then((res) => {
            console.log(res.data)
        })
        .catch((error) => {
            console.log(error.response.data.error)
            dispatch(setCreateNewPasswordErrorAC("Error: " + error.response.data.error))
        })
}

