import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Pagination} from './Paginationn';
import {RootStateType} from '../../../bll/store';
import {setCardPacksCurrentPageAC, setCardPacksPageCountAC} from '../../../bll/packsReducer';

export const PaginationPacksContainer = React.memo(() => {
    const dispatch = useDispatch()
    const pageCount = useSelector<RootStateType, number>(state => state.packs.pageCount)
    const cardPacksTotalCount = useSelector<RootStateType, number>(state => state.packs.cardPacksTotalCount)
    const page = useSelector<RootStateType, number>(state => state.packs.page)

    const currentPageHandler = (page: number) => {
        dispatch(setCardPacksCurrentPageAC(page))
    }

    const onChangeOption = (value: number) => {
        dispatch(setCardPacksPageCountAC(value))
    }

    return <Pagination
        cardPacksTotalCount={cardPacksTotalCount}
        pageCount={pageCount}
        onChangeOption={onChangeOption}
        page={page}
        currentPageHandler={currentPageHandler}
    />
})