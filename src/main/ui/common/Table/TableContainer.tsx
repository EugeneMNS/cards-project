import React, {useCallback, useState} from 'react';
import s from './Table.module.scss';
import {useSelector} from 'react-redux';
import {RootStateType} from "../../../bll/store";
import {EditPack} from '../../Modals/EditPack';
import {DeletePack} from '../../Modals/DeletePack';
import {AddPack} from '../../Modals/AddPack';
import {CardPacksType} from '../../../dal/packsAPI';
import {Table} from './Table';
import {SearchPacks} from "../Search/SearchPacks";


export const TableContainer = React.memo(() => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [deleteMode, setDeleteMode] = useState<boolean>(false);
    const [addMode, setAddMode] = useState<boolean>(false);

    const [pack, setPack] = useState<CardPacksType | null>(null);

    //список всех паков
    const packsList = useSelector<RootStateType, CardPacksType[]>((state) => state.packs.cardPacks);

    const userId = useSelector<RootStateType, string>((state) => state.profile._id);


    const editModeOn = useCallback((pack: CardPacksType) => {
        setPack(pack)
        setEditMode(true)
    }, [])

    const deleteModeOn = useCallback((pack: CardPacksType) => {
        setPack(pack)
        setDeleteMode(true)
    }, [])



    return (<div className={s.table_container}>
            <div className={s.Table__top}>
                <SearchPacks/>
                <button className={s.add}
                        onClick={() => setAddMode(true)}> Add new pack</button>
            </div>
            {addMode && <AddPack setAddMode={setAddMode}/>}
            {pack && editMode && <EditPack pack={pack} setEditMode={setEditMode}/>}
            {pack && deleteMode && <DeletePack pack={pack} setDeleteMode={setDeleteMode}/>}

            {packsList[0]
                ? <Table packsList={packsList}
                         userId={userId}
                         deleteModeOn={deleteModeOn}
                         editModeOn={editModeOn}
                />
                : <div className={s.noItemText}>There are no packs. Click add new pack to create.</div>
            }
        </div>

    )

})