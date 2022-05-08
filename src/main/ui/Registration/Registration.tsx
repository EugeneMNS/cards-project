import React, {ChangeEvent, useState} from "react";
import s from './Registration.module.css'
import {Button, FormGroup, Grid, IconButton, InputAdornment, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {Navigate, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../bll/store";
import {registerTC} from "../../bll/registrationReducer";
import SchoolIcon from '@mui/icons-material/School';

export const Registration = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const isRegisterIn = useSelector<RootStateType, boolean>((state) => state.registration.isRegisterIn);
    const error = useSelector<RootStateType, string | null>(state => state.registration.error);

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    // показать/скрыть пароль
    const snowHide = {
        endAdornment: (
            <InputAdornment position="end">
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                >
                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                </IconButton>
            </InputAdornment>
        )
    }

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }
    const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }
    const changeConfirmPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.currentTarget.value)
    }

    const onClickRegisterHandler = () => {
        // @ts-ignore
        dispatch(registerTC(email, password))
        console.log({email, password, confirmPassword})
    }

    if (isRegisterIn) {
        return <Navigate to={"/login"}/>
    }

    return <>
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{minHeight: '80vh'}}
        >
            <Grid item xs={3}
                  className={s.registrationContainer}
            >
                <SchoolIcon style={{width: "70px", height: "70px", color: "cornflowerblue"}}/>
                <h2>Sign Up</h2>
                <FormGroup>
                    <TextField id="email"
                               variant="standard"
                               type="email"
                               label="Email"
                               margin="normal"
                               onChange={changeEmailHandler}
                               required
                               value={email}
                    />
                    <TextField id="password"
                               variant="standard"
                               type={showPassword ? "text" : "password"}
                               label="Password"
                               margin="normal"
                               InputProps={snowHide}
                               onChange={changePasswordHandler}
                               required
                               value={password}
                    />
                    <TextField id="confirmPassword"
                               variant="standard"
                               type={showPassword ? "text" : "password"}
                               label="Confirm password"
                               margin="normal"
                               InputProps={snowHide}
                               onChange={changeConfirmPasswordHandler}
                               required
                               value={confirmPassword}
                               error={confirmPassword !== password}
                               helperText={confirmPassword !== password ? "password mismatch" : null}
                    />
                    <div style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                            <Button variant="outlined"
                                    type="button"
                                    color="secondary"
                                    style={{width: "120px", borderRadius: "25px", marginTop: "30px"}}
                                    onClick={() => navigate('/login')}
                            >Login</Button>
                            <Button variant="contained"
                                    type="submit"
                                    color="primary"
                                    style={{width: "120px", borderRadius: "25px", marginTop: "30px"}}
                                    onClick={onClickRegisterHandler}
                                    disabled={!email || !password || !confirmPassword}
                            >Register</Button>
                    </div>
                    <div style={{color: "red", marginTop: "10px", height: "25px"}}>{error}</div>
                </FormGroup>
            </Grid>
        </Grid>
    </>
};