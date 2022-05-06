
import {ThunkAction} from 'redux-thunk';
import { RootStateType} from '../bll/store';
import {AnyAction} from 'redux';
import {setAppLoading, setErrorAC, setInitializedAC} from '../bll/appReducer';
import {authApi} from '../dal/authApi';
import {UserDomainType} from '../dal/api';



//types
export type SetAppStatusActionType = SetUserProfileType;
export type SetUserProfileType = ReturnType<typeof setUserProfile>;
export type ProfileActions = SetAppStatusActionType;
export type InitialProfileStateType = typeof initialProfileState;

const initialProfileState = {
    _id: "",
    email: "",
    name: "",
    avatar: "",
    publicCardPacksCount: 0,
    created: "",
    updated: "",
    isAdmin: false,
    verified: false,
    rememberMe: false,
    error: "",
    token: "",
    tokenDeathTime: 0,
    __v: 0,
};

export const profileReducer = (
    state: InitialProfileStateType = initialProfileState,
    action: ProfileActions
): InitialProfileStateType => {
    switch (action.type) {
        case 'ProfilePage/SET_USER_PROFILE': {
            return {
                ...state,
                ...action.userData,
            };
        }

        default:
            return state;
    }
};

export const setUserProfile = (userData: UserDomainType) =>
    ({ type: "ProfilePage/SET_USER_PROFILE", userData } as const);



export const changeUserName = (name: string): ThunkAction<void, RootStateType, unknown, AnyAction> => (dispatch) => {
    dispatch(setAppLoading("loading"))
    authApi.changeName(name)
        .then((res) => {
            dispatch(setUserProfile(res.data.updatedUser))
        })
        .catch((err) => {
            dispatch(setErrorAC(err.response.data.error))
            if(err.response.data.error === "you are not authorized /ᐠ-ꞈ-ᐟ\\") {
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


            }
        })
        .finally(() => dispatch(setAppLoading("idle")))
}

