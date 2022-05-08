import React, {ChangeEvent, useState} from "react";
import s from '../Registration/Registration.module.css'
import {Button, FormGroup, Grid, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../bll/store";
import SchoolIcon from '@mui/icons-material/School';
import EmailIcon from '@mui/icons-material/Email';
import {resetPasswordTC} from "../../bll/resetPasswordReducer";

export const ResetPassword = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const emailIsSent = useSelector<RootStateType, boolean>(state => state.resetPassword.emailIsSent);
    const error = useSelector<RootStateType, string | null>(state => state.resetPassword.error);

    const [email, setEmail] = useState("")

    const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }

    const onClickRegisterHandler = () => {
        // @ts-ignore
        dispatch(resetPasswordTC(email))
        console.log({email})
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

            {/*если emailIsSent = false, то показываем форму для восстановления пароля, иначе сообщение отправки письма*/}
            {
                !emailIsSent

                ? <Grid item xs={3}
                        className={s.registrationContainer}
                >
                    <SchoolIcon style={{width: "70px", height: "70px", color: "cornflowerblue"}}/>
                    <h2>Forgot your password?</h2>
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
                        <p>Enter your email address and we will send you further instructions</p>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Button variant="contained"
                                    type="submit"
                                    color="primary"
                                    style={{borderRadius: "25px", marginTop: "30px"}}
                                    onClick={onClickRegisterHandler}
                                    disabled={!email}
                            >Send instructions</Button>
                            <p>Did you remember your password?</p>
                            <Button variant="text"
                                    type="button"
                                    color="secondary"
                                    style={{width: "160px", borderRadius: "25px"}}
                                    onClick={() => navigate('/login')}
                            >Try logging in</Button>
                        </div>
                        <div style={{color: "red", marginTop: "5px", height: "20px"}}>{error}</div>
                    </FormGroup>
                </Grid>

                : <Grid item xs={3}
                        className={s.registrationContainer}
                >
                    <EmailIcon style={{width: "70px", height: "70px", color: "cornflowerblue"}}/>
                    <h2>Check Email</h2>
                    <p>We've sent an Email with instructions to </p><span style={{color: "crimson"}}>{email}</span>
                </Grid>

            }
        </Grid>
    </>
};