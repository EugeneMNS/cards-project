import React from "react";
import s from './Login.module.css'
import classes from "../Header/Header.module.css";
import {Path} from "../Routes/Routes";
import {NavLink} from "react-router-dom";

export const Login = () => {
    let getActiveStyle = ({isActive}: { isActive: boolean }) => isActive ? classes.active : ''

    return (
        <div className={s.mainblock}>
            <div className={s.loginbox}>
                <h1>it-incubator</h1>
                <h3>Sign in</h3>
                <form className={s.loginbox_form}>
                    <input className={s.input} type="text" placeholder="Email"/>
                    <input className={s.input} type='text' placeholder="password"/>
                    <span className={s.forgText} >Forgot Password?</span>
                    <button className={s.loginbox_log}>Login</button>

                </form>
                <h6>Don't have account?</h6>
                <NavLink to={Path.Registration} className={getActiveStyle}>
                    <button>Sign Up</button>
                </NavLink>
            </div>
        </div>
    )
};