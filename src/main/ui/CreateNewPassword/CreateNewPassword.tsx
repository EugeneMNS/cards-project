import React, {ChangeEvent, useState} from "react";
import s from '../Registration/Registration.module.css'
import {Button, FormGroup, Grid, IconButton, InputAdornment, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import SchoolIcon from '@mui/icons-material/School';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {RootStateType} from "../../bll/store";
import {createNewPasswordTC} from "../../bll/createNewPasswordReducer";
import {useParams} from "react-router-dom";

export const CreateNewPassword = () => {

    const token = useParams();

    const dispatch = useDispatch();
    const error = useSelector<RootStateType, string | null>(state => state.createNewPassword.error);

    const [password, setPassword] = useState("")

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

    const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    const onClickRegisterHandler = () => {
        if (token) {
            // @ts-ignore
            dispatch(createNewPasswordTC(password, token))
            console.log({password, token})
        }
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
                <h2>Create new password</h2>
                <FormGroup>
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
                    <p>Create new password and we will send you further instructions to email</p>
                    <div style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                        <Button variant="contained"
                                type="submit"
                                color="primary"
                                style={{borderRadius: "25px", marginTop: "30px"}}
                                onClick={onClickRegisterHandler}
                                disabled={!password}
                        >Create new password</Button>
                    </div>
                    <div style={{color: "red", marginTop: "10px", height: "50px"}}>{error}</div>
                </FormGroup>
            </Grid>
        </Grid>
    </>
}