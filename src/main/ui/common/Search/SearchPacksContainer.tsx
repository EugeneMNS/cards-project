import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../../bll/store';
import s from './Search.module.scss';
import Search from './Search';
import {setSearchPackNameAC, setSortPacksValueAC} from '../../../bll/packsReducer';
import React, {useEffect} from 'react';


const SearchPacksContainer = React.memo(() => {
    const packName = useSelector<RootStateType, string>(state => state.packs.packName)
    const dispatch = useDispatch();
    const onKeyUpHandler = (value: string) => dispatch(setSearchPackNameAC(value))

    useEffect(() => {
        return () => {
            dispatch(setSearchPackNameAC(""))
        }
    }, [])

    return <div className={s.search}>
        <Search
            value={packName}
            onKeyUpHandler={onKeyUpHandler}
        />
    </div>
})

export default SearchPacksContainer;
