import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {RootStateType} from '../../bll/store';
import {getPacksTC} from '../../bll/packsReducer';
import s from './Profile.module.css';
import {InitialProfileStateType} from '../../bll/profileReducer';
import {SortingPacksType} from '../../dal/packsAPI';
/*import {Sorting} from '../common/Sorting/Sorting';*/
import {PaginationPacksContainer} from '../common/Pagination/PaginationPacksContainer';
import {changeLayoutAC} from '../../bll/cardsReducer';
import {Title} from '../common/Title/Title';
import {TableContainer} from '../common/Table/TableContainer';
import {ProfileInfo} from './ProfileInfo';
import {RangeSliderContainer} from '../common/RangeSlider/RangeSliderContainer';
import {ErrorSnackbar} from '../common/Error/ErrorSnackbar';


export const ProfilePage = React.memo(() => {
    const dispatch = useDispatch()
    const isInitialized = useSelector<RootStateType, boolean>((state) => state.app.isInitialized);
    const pageCount = useSelector<RootStateType, number>((state) => state.packs.pageCount);
    const profile = useSelector<RootStateType, InitialProfileStateType>(
        (state) => state.profile
    );
    const sortingBy = useSelector<RootStateType, SortingPacksType | ''>(state => state.packs.sortingBy)
    const page = useSelector<RootStateType, number>(state => state.packs.page)
    const packName = useSelector<RootStateType, string>(state => state.packs.packName)
    const cardsValuesFromRange = useSelector<RootStateType, Array<number>>((state) => state.packs.cardsValuesFromRange);

    useEffect(() => {
        if (isInitialized) {
            dispatch(getPacksTC() as any)
        }
    }, [page, pageCount, packName, sortingBy, cardsValuesFromRange, dispatch, isInitialized])


    useEffect(() => {
        dispatch(changeLayoutAC('profile'))
    }, [dispatch])




    if (!isInitialized) {
        return <Navigate to={'/login'}/>;
    }


    return (
        <div className={s.container}>

            <div className={s.profile__info}>
                <ProfileInfo
                    name={profile.name}
                    avatar={profile.avatar}
                />
                <RangeSliderContainer/>
                {/*<Sorting/>*/}
            </div>


            <div className={s.profile__main}>
                <Title value={'My packs list'}/>
                <TableContainer/>
                <PaginationPacksContainer/>
            </div>
           <ErrorSnackbar/>
        </div>
    );
});