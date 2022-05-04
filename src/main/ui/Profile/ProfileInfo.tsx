import React, {useRef} from 'react'
import s from './Profile.module.css';
import {TextField} from "@mui/material";
import defaultProfilePhoto from "../../default-avatar.jpg";
import {useDispatch} from "react-redux";


type ProfileInfoPropsType ={
    avatar: any
    name: string
}

export const ProfileInfo = (props: ProfileInfoPropsType) => {

    // const dispatch = useDispatch()
    // const inRef = useRef<HTMLInputElement>(null)


    return(
        <div className={s.profile__infoPage}>
            <div style={{paddingTop: '20px', marginBottom: '15px'}}>
                <div className={s.editAvatar}>

                    <img src={defaultProfilePhoto}
                         className={s.profile__photo}
                    />
                </div>
            </div>

            <div className={s.profile__textName}>
                <TextField variant={'standard'}
                           value={'Title'}
                           />

            </div>

        </div>
    )
};
