import React, {useEffect} from 'react';
import {ChooseOwner} from './ChooseOwner/ChooseOwner';
import s from '../Profile/Profile.module.css';
import {getPacksTC} from '../../bll/packsReducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../bll/store';
import {Navigate} from 'react-router-dom';
import {SortingPacksType} from '../../dal/packsAPI';
//import {Sorting} from '../common/Sorting/Sorting';
import {PaginationPacksContainer} from '../common/Pagination/PaginationPacksContainer';
import {changeLayoutAC} from '../../bll/cardsReducer';
import {Title} from '../common/Title/Title';
import {TableContainer} from '../common/Table/TableContainer';
import {RangeSliderContainer} from '../common/RangeSlider/RangeSliderContainer';
import {ErrorSnackbar} from '../common/Error/ErrorSnackbar';


export const PacksList = () => {

    const dispatch = useDispatch()
    const isInitialized = useSelector<RootStateType, boolean>((state) => state.app.isInitialized);
    const withMyId = useSelector<RootStateType, boolean>(state => state.packs.withMyId)
    const page = useSelector<RootStateType, number>(state => state.packs.page)
    const sortingBy = useSelector<RootStateType, SortingPacksType | ''>(state => state.packs.sortingBy)
    const packName = useSelector<RootStateType, string>(state => state.packs.packName)
    const pageCount = useSelector<RootStateType, number>(state => state.packs.pageCount)
    const cardsValuesFromRange = useSelector<RootStateType, Array<number>>((state) => state.packs.cardsValuesFromRange);


    useEffect(() => {
        if (isInitialized) {
            dispatch(getPacksTC() as any)
        }
    }, [
        withMyId,
        page,
        pageCount,
        cardsValuesFromRange,
        packName,
        sortingBy,
        dispatch,
        isInitialized
    ])

    useEffect(() => {
        dispatch(changeLayoutAC('packs-list'))
    }, [dispatch])

    if (!isInitialized) {
        return <Navigate to={'/login'}/>;
    }

    return (
        <div className={s.container}>
            <div className={s.profile__info}>
                <div className={s.profile__ChooseOwner}>
                    <ChooseOwner/>
                </div>
                <RangeSliderContainer/>
                {/*<Sorting/>*/}
            </div>

            <div className={s.profile__main}>
                <Title value={'Packs list'}/>
                <TableContainer/>
                <PaginationPacksContainer/>
            </div>
            <ErrorSnackbar/>
        </div>

    )

}