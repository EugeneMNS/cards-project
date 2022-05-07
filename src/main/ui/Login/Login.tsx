import React, {ChangeEvent, FormEventHandler, useEffect, useRef, useState} from "react";
import s from './Login.module.css'
import classes from "../Header/Header.module.css";
import {Path} from "../Routes/Routes";
import {Navigate, NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginReducer, LoginTC, setIsLoggedInAC} from "../../bll/loginReducer";

import {RootStateType} from "../../bll/store";

export const Login = () => {

    let getActiveStyle = ({isActive}: { isActive: boolean }) => isActive ? classes.active : ''
    const isLogitIn = useSelector<RootStateType, boolean>((state) => state.login.isLogitIn);
    const error = useSelector<RootStateType, string | null>(state => state.login.error);


    const [email,setEmail] = useState<string>("")
    const [password,setPassword] = useState<string>("")
    const [remember, setRemember] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

const chengEmailHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    setEmail(e.currentTarget.value)
}
    const chengPasswordHandler = (e:ChangeEvent<HTMLInputElement>)=> {
        setPassword(e.currentTarget.value)
    }
    const onCheck =(e:ChangeEvent<HTMLInputElement>) => {
        setRemember(e.currentTarget.checked)
    }
    const handleSubmit=  (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        // @ts-ignore
        dispatch(LoginTC(email,password,remember))
    }

    if (isLogitIn) {
        return <Navigate to={"/profile"}/>
    }
    // if (!isLogitIn) {
    //     return <Navigate to={"/profile"}/>
    // }

    return (
        <div className={s.mainblock}>
            <div className={s.loginbox}>
                <h1>it-incubator</h1>
                <h3>Sign in</h3>
                <form className={s.loginbox_form} onSubmit={handleSubmit}>
                    <input className={s.input}

                           type="text"
                           placeholder="Email"
                           // onChange={(e)=>setEmail(e.target.value)}
                           onChange={chengEmailHandler}
                           value={email}


                    />
                    <input className={s.input}

                           type='password'
                           placeholder="Password"
                           onChange={chengPasswordHandler}
                           value={password}


                    />
                    <div>
                        <label>
                            <input type={"checkbox"}  checked={remember} onChange={onCheck}/>
                            remember me
                        </label>
                    </div>
                    <span className={s.forgText} >Forgot Password?</span>
                    <button className={s.loginbox_log}

                    >Login</button>

                </form>
                <h6>Don't have account?</h6>
                <NavLink to={Path.Registration} className={getActiveStyle}>
                    <button>Sign Up</button>
                </NavLink>
            </div>
        </div>
    )
};
