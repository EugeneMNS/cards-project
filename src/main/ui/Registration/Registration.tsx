import React, {useState} from "react";
import {Button, FormGroup, Grid, IconButton, InputAdornment, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

export const Registration = () => {

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    // показать/скрыть пароль
    const snowUnsnow = {
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
                <h1>It-incubator</h1>
                <h2>Sign Up</h2>
                <FormGroup>
                    <TextField variant="standard" label="Email" margin="normal"/>
                    <TextField variant="standard" type={showPassword ? "text" : "password"} label="Password"
                               margin="normal"
                               InputProps={snowUnsnow}
                    />
                    <TextField variant="standard" type={showPassword ? "text" : "password"} label="Confirm password"
                               margin="normal"
                               InputProps={snowUnsnow}
                    />
                    <div style={{alignItems: "center", justifyContent: "center"}}>
                        <Button variant="contained" type="submit" color="primary"
                                style={{width: "200px", borderRadius: "25px", marginTop: "30px"}}
                        >Register</Button>
                    </div>
                </FormGroup>
            </Grid>
        </Grid>
    </>
};