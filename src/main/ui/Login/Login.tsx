import React, {ChangeEvent, FormEventHandler, useEffect, useRef, useState} from "react";
import s from './Login.module.css'
import classes from "../Header/Header.module.css";
import {Path} from "../Routes/Routes";
import {NavLink} from "react-router-dom";
import {log} from "util";

export const Login = () => {

    let getActiveStyle = ({isActive}: { isActive: boolean }) => isActive ? classes.active : ''


    let [email,setEmail] = useState("")
    let [password,setPassword] = useState("")

   const handleSubmit=  (event: React.FormEvent<HTMLFormElement>) => {
       event.preventDefault();
   }
const chengEmailHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    setEmail(e.currentTarget.value)
}
    const chengPasswordHandler = (e:ChangeEvent<HTMLInputElement>)=> {
        setPassword(e.currentTarget.value)
    }
  const onClickLoginHandler = () =>{
      console.log({
           email,
          password
      })
  }
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
                    <span className={s.forgText} >Forgot Password?</span>
                    <button className={s.loginbox_log}
                            onClick={onClickLoginHandler}
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
