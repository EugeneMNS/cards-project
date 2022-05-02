import React from "react";
import s from './Login.module.css'

export const Login = () => {
    return (
        <div className={s.mainblock}>
            <div className={s.loginbox}>
                <h1>it-incubator</h1>
                <form className={s.loginbox_form} >
                    <input type="text" placeholder="Email"/>
                    <input type='text' placeholder="password"/>
                    <span>Forgot Password</span>
                    <button>Login</button>
                </form>
                <h6>Don't have account?</h6>
                <button>Sign Up</button>
            </div>
        </div>
    )
};