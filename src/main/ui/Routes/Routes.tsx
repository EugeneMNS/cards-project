import React from "react";
import {  Route, Routes } from "react-router-dom";
import { Error404 } from "../Error404/Error404";
import { Registration } from "../Registration/Registration";
import { ProfilePage } from "../Profile/ProfilePage";
import { ResetPassword } from "../ResetPassword/ResetPassword";
import { CreateNewPassword } from "../CreateNewPassword/CreateNewPassword";
import { SuperComponents } from "../SuperConponents/SuperComponents"
import  Login  from "../Login/Login";

export enum Path {
    Login = "/login",
    Profile = "/profile",
    ResetPassword = "/resetPassword",
    CreateNewPassword = "/createNewPassword",
    SuperComponents = "/superComponents",
    Error404 = "/404",
    FORGOT_PATH = '/forgot',
   // Register = "/registration",

}
export const Register = "/registration"

export const RoutesConst = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<div>Empty page</div>} />
                <Route path={Path.Login} element={<Login />} />
                <Route path={Register} element={<Registration />} />
                <Route path={Path.Profile} element={<ProfilePage />} />
                <Route path={Path.ResetPassword} element={<ResetPassword />} />
                <Route
                    path={Path.CreateNewPassword}
                    element={<CreateNewPassword />}
                />
                <Route path={Path.SuperComponents} element={<SuperComponents />} />
                <Route path={Path.Error404} element={<Error404 />} />
                <Route path="*" element={Path.Error404} />
            </Routes>
        </div>
    );
};