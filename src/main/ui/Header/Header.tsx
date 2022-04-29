import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";
import { Path } from "../Routes/Routes";



export const Header = () => {
    let getActiveStyle = ({isActive}:{isActive:boolean})=> isActive ? classes.active: ''
    return (
        <nav className={classes.nav}>
            <div className={classes.item}>
                <NavLink to={Path.Login} className={getActiveStyle}>
                    Log in
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