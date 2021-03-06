import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Pagination} from './Paginationn';
import {RootStateType} from '../../../bll/store';
import {setCardsCurrentPageAC, setCardsPageCountAC} from '../../../bll/cardsReducer';

export const PaginationCardsContainer = React.memo(() => {
    const dispatch = useDispatch()
    let pageCount = useSelector<RootStateType, number>(state => state.cards.pageCount)
    let cardPacksTotalCount = useSelector<RootStateType, number>(state => state.cards.cardsTotalCount)
    let page = useSelector<RootStateType, number>(state => state.cards.page)


    const currentPageHandler = useCallback((page: number) => {
        dispatch(setCardsCurrentPageAC(page))
    }, [])

    const onChangeOption = useCallback((value: number) => {
        dispatch(setCardsPageCountAC(value))
    }, [])


    return <Pagination
        cardPacksTotalCount={cardPacksTotalCount}
        pageCount={pageCount}
        onChangeOption={onChangeOption}
        page={page}
        currentPageHandler={currentPageHandler}
    />
})