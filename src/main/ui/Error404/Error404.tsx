import {
    Alert,
    AlertTitle,
} from "@mui/material";
import s from "./Error404.module.scss";
import emptyProfilePhoto from "../image/elon-musk-smoke.gif";
import React from "react";

export const Error404 = () => {
    return (
        <div className={s.Error}>
            <Alert  className={s.Error} severity="error">
                <AlertTitle className={s.AlertError}>ERROR 404</AlertTitle>
                <h2> Uh no</h2>
                <p className={s.TextTitle}>Ты по-моему перепутал</p>
                <img className={s.mask} src={emptyProfilePhoto} />
            </Alert>

        </div>
    );
};