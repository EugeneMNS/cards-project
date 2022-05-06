import React, {ChangeEvent, useState} from "react";
import {Button, FormGroup, Grid, IconButton, InputAdornment, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

export const Registration = () => {

    const navigate = useNavigate();

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
        console.log({email, password, confirmPassword})
    }

    return <>
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{minHeight: '100vh'}}
        >
            <Grid item xs={3}
                  style={{
                      backgroundColor: "#e7f3ef",
                      borderRadius: "10px",
                      width: "400px",
                      height: "400px",
                      padding: "40px"
                  }}
            >
                <form onSubmit={onClickRegisterHandler}>
                    <h1>It-incubator</h1>
                    <h2>Sign Up</h2>
                    <FormGroup>
                        <TextField id="email"
                                   variant="standard"
                                   type="email"
                                   label="Email"
                                   margin="normal"
                                   onChange={changeEmailHandler}
                                   required
                        />
                        <TextField id="password"
                                   variant="standard"
                                   type={showPassword ? "text" : "password"}
                                   label="Password"
                                   margin="normal"
                                   InputProps={snowHide}
                                   onChange={changePasswordHandler}
                                   required
                        />
                        <TextField id="confirmPassword"
                                   variant="standard"
                                   type={showPassword ? "text" : "password"}
                                   label="Confirm password"
                                   margin="normal"
                                   InputProps={snowHide}
                                   onChange={changeConfirmPasswordHandler}
                                   required
                                   error={confirmPassword !== password}
                                   helperText={confirmPassword !== password ? "password mismatch" : null}
                        />
                        <div style={{alignItems: "center", justifyContent: "center"}}>
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <Button variant="outlined"
                                        type="button"
                                        color="primary"
                                        style={{width: "150px", borderRadius: "25px", marginTop: "30px"}}
                                        onClick={() => navigate('/login')}
                                >Login</Button>
                                <Button variant="contained"
                                        type="submit"
                                        color="primary"
                                        style={{width: "150px", borderRadius: "25px", marginTop: "30px"}}
                                >Register</Button>
                            </div>
                        </div>
                    </FormGroup>
                </form>
            </Grid>
        </Grid>
    </>
};