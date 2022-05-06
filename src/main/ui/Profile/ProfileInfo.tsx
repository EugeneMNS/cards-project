import React, {KeyboardEvent, useEffect, useRef, useState} from 'react'
import s from './Profile.module.css';
import {TextField} from "@mui/material";
import defaultProfilePhoto from "../../default-avatar.jpg";
import {useDispatch} from "react-redux";
import {changeUserName} from "../../bll/profileReducer";


type ProfileInfoPropsType ={
    avatar?: any
    name: string
}

export const ProfileInfo = (props: ProfileInfoPropsType) => {
    const [title, setTitle]=useState(props.name)

    const [editProfileMode, setEditProfileMode] = useState(false);
    const dispatch = useDispatch()
    const inRef = useRef<HTMLInputElement>(null)


    const onBlur = () => {
        setEditProfileMode(false)
        if (title !== props.name) {
            dispatch(changeUserName(title)as any)
        }
    }
    // @ts-ignore
    const onEnterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            setEditProfileMode(false)
            if (title !== props.name) {
                dispatch(changeUserName(title) as any)
            }
        }
    }

    useEffect(()=>{
        setTitle(props.name)
    },[props.name])

    return(
        <div className={s.profile__infoPage}>
            <div style={{paddingTop: '20px', marginBottom: '15px'}}>


                    <img src={defaultProfilePhoto}
                         className={s.profile__photo}
                    />

            </div>

            <div className={s.profile__textName}>
                <TextField variant={'standard'}
                           value={title ? title : 'User Name'}
                           onBlur={onBlur}
                           autoFocus
                           onKeyPress={onEnterPressHandler}
                           onChange={(e) => setTitle(e.currentTarget.value)}
                           />

            </div>

        </div>
    )
};
