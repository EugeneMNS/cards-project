import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";
import { Path } from "../Routes/Routes";
import {useSelector} from "react-redux";
import {RootStateType} from "../../bll/store";



export const Header = () => {
    const isLogitIn = useSelector<RootStateType, boolean>((state) => state.login.isLogitIn);
    let getActiveStyle = ({isActive}:{isActive:boolean})=> isActive ? classes.active: ''
let logIsLog = ()=>isLogitIn ? "Log out":"Log in"

    return (
        <nav className={classes.nav}>
            <div className={classes.item}>

                <NavLink to={Path.Login} className={getActiveStyle}>
                    {logIsLog}
                </NavLink>

            </div>
            <div className={classes.item}>
                <NavLink to={Path.Registration} className={getActiveStyle}>
                    Registration
                </NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to={Path.Profile} className={getActiveStyle}>
                    Profile
                </NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to={Path.ResetPassword} className={getActiveStyle}>
                    Reset password
                </NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to={Path.CreateNewPassword} className={getActiveStyle}>
                    Create new password
                </NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to={Path.SuperComponents} className={getActiveStyle}>
                    SuperComponents
                </NavLink>
            </div>
        </nav>
    );
};