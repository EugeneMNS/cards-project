import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../../bll/store';
import s from './Search.module.scss';
import {InitialCardsStateType, setSearchСardQuestionAC} from '../../../bll/cardsReducer';
import Search from './Search';
import React, {useCallback, useEffect} from 'react';



const SearchCardsContainer = React.memo(() => {
    const cardQuestion = useSelector<RootStateType, string>(state => state.cards.cardQuestion)
    const cardsLength = useSelector<RootStateType, number>(state => state.cards.cards.length)

    const disabled = (cardsLength: number) => {
       if( cardsLength === 0) {
           return true
       }
    }
    const withMyId = useSelector<RootStateType, boolean>(state => state.packs.withMyId)
    const dispatch = useDispatch();
    const onKeyUpHandler = useCallback((value: string) => dispatch(setSearchСardQuestionAC(value)), [])



    return <div className={s.search}>
        <Search
            value={cardQuestion}
            onKeyUpHandler={onKeyUpHandler}
        />
    </div>
});

export default SearchCardsContainer;
