import React, {FormEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {Navigate} from 'react-router-dom';
import {RootStateType} from '../../bll/store';
import {Register} from "../Routes/Routes"
import s from './LogIn.module.scss';
import style from '../InitCommonStyle.module.css';
import {Alert} from '@mui/material';
//import {ErrorSnackbar} from '../../common/Error/ErrorSnackbar';
import {signIn} from '../../bll/loginReducer';

const Login = React.memo(() => {
    const [email, setEmail] = useState('test1test@test.com');
    const [password, setPassword] = useState('freetest');
    const [rememberMe, setRememberMe] = useState(false);

    const isInitialized = useSelector<RootStateType, boolean>((state) => state.app.isInitialized);
    const error = useSelector<RootStateType, string>((state) => state.login.error);
    const dispatch = useDispatch();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(signIn({email, password, rememberMe})as any);
    };

    if (isInitialized) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div className={style.initCmpnentWrapper}>
            <h2 className={style.title}>Playing cards</h2>
            <h3 className={style.subtitle}>Sign In</h3>
            <form onSubmit={handleSubmit}>


                <div className={style.formBox}>

                    <label className={style.loginLabel}>Email
                        <input
                            className={style.Input}
                            value={email}
                            type="email"
                            name="email"
                            onChange={(e) => setEmail(e.currentTarget.value)}
                        />
                    </label>

                    <label className={style.loginLabel}>Password
                        <input
                            className={style.Input}
                            value={password}
                            type="password"
                            name="password"
                            onChange={(e) => setPassword(e.currentTarget.value)}
                        />
                    </label>

                    {error && (
                        <span>
            <Alert severity="error">{error}</Alert>
          </span>
                    )}
                    <div className={s.CheckBoxWrapper}>
                        <div>
                            <label className={s.CheckBoxLabel}>
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    onChange={(e) => setRememberMe(e.currentTarget.checked)}
                                />
                                Remember me
                            </label>
                        </div>
                    </div>
                </div>
                <div>
                    <NavLink className={s.linkTransparent} to={"#"}>
                        Forgot password
                    </NavLink>
                </div>
                <div>
                    <button className={style.btnBlue}>Login</button>
                </div>
            </form>
            <p className={style.textLight}>Don't have an account?</p>
            <div>
                <NavLink className={style.linkBlue} to={Register}>
                    Sign Up
                </NavLink>
            </div>
            {/*<ErrorSnackbar/>*/}
        </div>
    );
});

export default Login;