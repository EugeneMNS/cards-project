import React from "react";
import s from "./Profile.module.css"
import {Title} from "@mui/icons-material";
import {ProfileInfo} from "./ProfileInfo";


export const Profile = () => {


    return (
    <div className={s.container}>
      <div className={s.profile__info}>
        <ProfileInfo
        name={'Name'}
        avatar={"ava"}
        />
      </div>

      <div className={s.profile__main}>
        Cards block
      </div>

    </div>
  )
};