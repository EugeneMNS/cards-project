import {setAppLoading, setErrorAC, SetErrorActionType, setInitializedAC} from '../bll/appReducer';
import {authAPI, LoginDataType} from '../dal/authAPI';
import {Dispatch} from 'redux';
import {
    setCardPacksPageCountAC,
    setCardsPacksCountFromRangeAC,
    setSortPacksValueAC,
    setWithMyIdAC
} from './packsReducer';
import {changeLayoutAC, setCardsPageCountAC} from './cardsReducer';
import {setUserProfile, SetUserProfileType} from './profileReducer';


export type LoginState = {
    error: string
    redirectToLogin: boolean
};

export const loginInitialState: LoginState = {
    error: '',
    redirectToLogin: false,
};

export const loginReducer = (
    state: LoginState = loginInitialState,
    action: LoginActions
) => {
    switch (action.type) {
        case 'LOGIN/ERROR': {
            return {...state, error: action.error};
        }
        case 'LOGIN/REDIRECT-TO-LOGIN': {
            return {...state, redirectToLogin: action.value};
        }
        default: {
            return state;
        }
    }
};

export const loginError = (error: string) => ({type: 'LOGIN/ERROR', error} as const);
export const redirectToLogin = (value: boolean) => ({type: 'LOGIN/REDIRECT-TO-LOGIN', value} as const);


export type LoginActions =
    | SetUserProfileType
    | ReturnType<typeof loginError>
    | ReturnType<typeof redirectToLogin>
    | SetErrorActionType


export const signIn = (payload: LoginDataType) => (dispatch: Dispatch) => {
    dispatch(setAppLoading("loading"))
    authAPI
        .login(payload)
        .then((res) => {
            // dispatch(loginSuccess());
            dispatch(setUserProfile(res.data));
            dispatch(setInitializedAC(true))
            dispatch(loginError(''));
            dispatch(setErrorAC(null))
        })
        .catch((err) => {
            const error = err.response
                ? err.response.data.error
                : err.message + ', more details in the console';
            console.log('Error: ', {...err});
            dispatch(loginError(error));
            // dispatch(setErrorAC(error))
        })
        .finally(() => dispatch(setAppLoading("succeeded")))
};


export const checkAuthMe = () => (dispatch: Dispatch) => {
    dispatch(setAppLoading("loading"))
    authAPI.me()
        .then((res) => {
            //dispatch(setAppLoading(false))
            dispatch(setInitializedAC(true));
            dispatch(setUserProfile(res.data))
            dispatch(redirectToLogin(false))
            dispatch(setErrorAC(null))
        })
        .catch((err) => {
            console.log(err.response.data.error)
            dispatch(redirectToLogin(true))
        })
        .finally(() => dispatch(setAppLoading("idle")))
}


export const logOut = () => (dispatch: Dispatch) => {
    dispatch(setAppLoading("loading"))
    authAPI
        .logOut()
        .then((res) => {
            dispatch(setInitializedAC(false))
            dispatch(setUserProfile({
                _id: '',
                email: '',
                name: '',
                avatar: '',
                publicCardPacksCount: 0,
                created: '',
                updated: '',
                isAdmin: false,
                verified: false,
                rememberMe: false,
                error: '',
                token: '',
                tokenDeathTime: 0,
                __v: 0
            }));
             dispatch(setCardPacksPageCountAC(10))
             dispatch(setCardsPageCountAC(10))
             dispatch(setCardsPacksCountFromRangeAC([0, 1000]))
            dispatch(redirectToLogin(true))

            dispatch(setWithMyIdAC(true))
           dispatch(changeLayoutAC("profile"))
           //  dispatch(setSortPacksValueAC(""))
        })
        .catch((err) => {
            const error = err.response
                ? err.response.data.error
                : err.message + ', more details in the console';
            console.log('Error: ', {...err});
            dispatch(loginError(error));
            dispatch(setErrorAC(error))
        })
        .finally(() => dispatch(setAppLoading("idle")))
};

