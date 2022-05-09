import React from "react";
import s from "./Profile.module.css"
import {ProfileInfo} from "./ProfileInfo";
import {TableContainer} from "../common/Table/TableContainer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../bll/store";
import {InitialProfileStateType} from "../../bll/profileReducer";
import {Navigate} from 'react-router-dom';
import {Title} from '../common/Title/Title'


export const ProfilePage = () => {

    const dispatch = useDispatch()
    const profile = useSelector<RootStateType, InitialProfileStateType>(
        (state)=>state.profile
    )
    const isInitialized = useSelector<RootStateType, boolean>((state) => state.app.isInitialized);

    if (!isInitialized){
        return <Navigate to={'/login'}/>
    }
    return (
    <div className={s.container}>
      <div className={s.profile__info}>
        <ProfileInfo
        name={profile.name}
        avatar={"ava"}
        />
      </div>

      <div className={s.profile__main}>
          <Title value={'My packs list'}/>
        <TableContainer/>

      </div>

    </div>
  )
};