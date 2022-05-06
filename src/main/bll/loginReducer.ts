import {authAPI, LoginParamsType, LoginResponseType} from "./api/auth-api";
import {Dispatch} from "redux";
import {log} from "util";

type InitStateType = typeof initState;

const initState = {
    email: '',
    password: '',
    rememberMe: false
};

export const loginReducer = (state = initState, action: ActionsType): InitStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return  {...state, email: action.email,password: action.password,rememberMe: action.rememberMe}

        default:
            return state;
    }
};

export const setIsLoggedInAC = (email:string,password:string,rememberMe:boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', email,password,rememberMe} as const)
type ActionsType = ReturnType<typeof setIsLoggedInAC>

export const LoginTC = (data:LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    authAPI.login(data).then((res) =>{
dispatch(setIsLoggedInAC(data.email,data.password,data.rememberMe))

        })
}

