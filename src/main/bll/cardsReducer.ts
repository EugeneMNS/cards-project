import {AnyAction, Dispatch} from 'redux';
import {
    CardRequestType,
    CardResponseType,
    cardsApi,
    CardsResponseType,
    CardsType
} from '../dal/cardsAPI';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {RootStateType} from "./store";
import {rateApi} from '../dal/rateAPI';
import {setAppLoading, setErrorAC, SetErrorActionType, setInitializedAC} from './appReducer';
import {CardPacksType} from '../dal/packsAPI';
import {logOut, redirectToLogin} from './loginReducer';
import {setUserProfile} from './profileReducer';
import {
    setCardPacksPageCountAC,
    setCardsPacksCountFromRangeAC,
    setSortPacksValueAC,
    setWithMyIdAC
} from './packsReducer';

export type InitialCardsStateType = {
    cards: CardResponseType[],
    cardsTotalCount: number
    maxGrade: number | null
    minGrade: number | null
    page: number
    pageCount: number
    packUserId: string | null
    myCurrentGrade: number
    layout: 'profile' | 'packs-list'
    // currentPack: CardPacksType | null
    cardQuestion: string, //for search
}

const initialState: InitialCardsStateType = {
    cards: [],
    cardsTotalCount: 10,
    maxGrade: null,
    minGrade: null,
    page: 1,
    pageCount: 10,
    packUserId: null,
    myCurrentGrade: 1,
    layout: 'profile',
    // currentPack: null,
    cardQuestion: '', //for search
};

export const cardsReducer = (state: InitialCardsStateType = initialState, action: ActionsType): InitialCardsStateType => {
    switch (action.type) {
        case 'CARDS/SET-CARDS': {
            return {...state, ...action.cards}
        }
        case 'CARDS/SET-CARDS-CURRENT-PAGE': {
            return {...state, page: action.page}
        }
        case 'CARDS/SET-CARDS-PAGE-COUNT': {
            return {...state, pageCount: action.pageCount}
        }
        case 'CARDS/SET-MY-CURRENT-GRADE': {
            return {...state, myCurrentGrade: action.value}
        }
        case 'CARDS/UPDATE-GRADE':
            return {
                ...state,
                cards: state.cards.map(card => card.cardsPack_id === action.id ? {...card, grade: action.grade} : card)
            }
        case 'CARDS/CHANGE-LAYOUT': {
            return {...state, layout: action.value}
        }
        //case 'CARDS/SET-CURRENT-PACK': {
        //     return {...state, currentPack: action.value}
        // }
        case 'CARDS/SET-SEARCH-QUESTION-NAME':
            return {...state, cardQuestion: action.cardQuestion}

        default:
            return state;
    }
};


export const setCardsAC = (cards: CardsResponseType | {cards: CardResponseType[]}) => ({
    type: 'CARDS/SET-CARDS',
    cards
} as const);


export const AddCardsAC = (cards: CardsResponseType) => ({
    type: 'CARDS/ADD-CARDS',
    cards
} as const);

export const setCardsCurrentPageAC = (page: number) =>
    ({type: 'CARDS/SET-CARDS-CURRENT-PAGE', page} as const)
export const setCardsPageCountAC = (pageCount: number) =>
    ({type: 'CARDS/SET-CARDS-PAGE-COUNT', pageCount} as const)
export const setMyCurrentGradeAC = (value: number) =>
    ({type: 'CARDS/SET-MY-CURRENT-GRADE', value} as const)
export const updateGradeAC = (grade: number, id: string) => ({type: 'CARDS/UPDATE-GRADE', grade, id} as const)
export const changeLayoutAC = (value: 'profile' | 'packs-list') =>
    ({type: 'CARDS/CHANGE-LAYOUT', value} as const)
// export const setCurrentPackAC = (value: CardPacksType) =>
//     ({type: 'CARDS/SET-CURRENT-PACK', value} as const)
export const setSearch??ardQuestionAC = (cardQuestion: string) =>
    ({type: 'CARDS/SET-SEARCH-QUESTION-NAME', cardQuestion} as const)

export type GetCardsActionType = ReturnType<typeof setCardsAC>
export type AddCardsActionType = ReturnType<typeof AddCardsAC>

type ActionsType =
    GetCardsActionType
    | ReturnType<typeof setCardsCurrentPageAC>
    | ReturnType<typeof setCardsPageCountAC>
    | ReturnType<typeof setMyCurrentGradeAC>
    | ReturnType<typeof updateGradeAC>
    | SetErrorActionType
    | ReturnType<typeof setAppLoading>
    | ReturnType<typeof changeLayoutAC>
    // | ReturnType<typeof setCurrentPackAC>
    | ReturnType<typeof setSearch??ardQuestionAC>

// thunk

export const getCardsTC = (payload: CardsType):ThunkAction<void, RootStateType, unknown, AnyAction> =>
    (dispatch, getState: () => RootStateType) => {
        const {
            page,
            pageCount,
            cardQuestion,
        } = getState().cards;
        dispatch(setAppLoading("loading"))
        cardsApi.getCards({
            page,
            pageCount,
            cardQuestion,
            ...payload
        })
            .then((res) => {
                dispatch(setCardsAC(res.data))
            })
            .catch((err) => {
                dispatch(setErrorAC(err.response.data.error))
                if(err.response.data.error === "you are not authorized /???-???-???\\") {
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
                    dispatch(setSortPacksValueAC(""))
                }
            })
            .finally(() =>
                dispatch(setAppLoading("idle"))
            )
    }

export const sendCardTC = (payload: CardRequestType, cardsPack_id: string): ThunkAction<void, RootStateType, unknown, AnyAction> =>
    (dispatch) => {
        dispatch(setAppLoading("loading"))
        cardsApi.sendCard({...payload})
            .then((res) => {
                dispatch(getCardsTC({cardsPack_id}))
            })
            .catch((err) => {
                dispatch(setErrorAC(err.response.data.error))
            })
            .finally(() => dispatch(setAppLoading("succeeded")))
    }

export const createCardTC = (cardsPack_id: string, question: string, answer: string): ThunkAction<void, RootStateType, unknown, AnyAction> =>
    (dispatch) => {
        dispatch(setAppLoading("loading"))
        cardsApi.sendCard({
            cardsPack_id,
            question,
            answer
        })
            .then(() => {
                dispatch(getCardsTC({cardsPack_id}))
            })
            .catch((err) => {
                dispatch(setErrorAC(err.response.data.error))
                if(err.response.data.error === "you are not authorized /???-???-???\\") {
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
                    dispatch(setSortPacksValueAC(""))
                }
            })
            .finally(() => dispatch(setAppLoading("succeeded")))
    }


export const deleteCardTC = (id: string, cardsPack_id: string): ThunkAction<void, RootStateType, unknown, AnyAction> => (dispatch) => {
    dispatch(setAppLoading("loading"))
    cardsApi.deleteCard(id)
        .then((res) => {
            dispatch(getCardsTC({cardsPack_id}))
        })
        .catch((err) => {
            dispatch(setErrorAC(err.response.data.error))
            if(err.response.data.error === "you are not authorized /???-???-???\\") {
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
                dispatch(setSortPacksValueAC(""))
            }
        })
        .finally(() => dispatch(setAppLoading("succeeded")))
}

export const updateCardTC = (cardsPack_id: string, cardId: string, question: string, answer: string)
    : ThunkAction<void, RootStateType, unknown, AnyAction> =>
    (dispatch) => {
        dispatch(setAppLoading("loading"))
        cardsApi.updateCard({
            _id: cardId,
            question: question,
            answer: answer
        })
            .then((res) => {
                dispatch(getCardsTC({cardsPack_id}))
            })
            .catch((err) => {
                dispatch(setErrorAC(err.response.data.error))
                if(err.response.data.error === "you are not authorized /???-???-???\\") {
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
                    dispatch(setSortPacksValueAC(""))
                }
            })
            .finally(() => dispatch(setAppLoading("succeeded")))
    }

export const updateGradeTC = (card_id: string) =>
    (dispatch: Dispatch, getState: () => RootStateType) => {

        const {
            myCurrentGrade
        } = getState().cards

        dispatch(setAppLoading("loading"))

        rateApi.updateGrade(myCurrentGrade, card_id)
            .then((res) => {
                dispatch(updateGradeAC(myCurrentGrade, card_id))
            })
            .catch(e => {
                dispatch(setErrorAC(e.response.data.error))
                if(e.response.data.error === "you are not authorized /???-???-???\\") {
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
                    dispatch(setSortPacksValueAC(""))
                }
            })
            .finally(() => dispatch(setAppLoading("succeeded")))
    }