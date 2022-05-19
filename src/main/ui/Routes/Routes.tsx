import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import { Error404 } from "../Error404/Error404";
import { Registration } from "../Registration/Registration";
import { ProfilePage } from "../Profile/ProfilePage";
import { ResetPassword } from "../ResetPassword/ResetPassword";
import { CreateNewPassword } from "../CreateNewPassword/CreateNewPassword";
import  Login  from "../Login/Login";
import {PacksList} from "../PacksList/PacksList";
import {CardsPage} from "../common/Cards/CardsPage";
import {Learning} from "../Learning/Learning";

export const SIGN_IN_PATH = '/login';
export const REGISTER_PATH = '/register';
export const FORGOT_PATH = '/forgot';
export const PROFILE_PATH = '/profile';
export const PACKS_LIST_PATH = '/packs-list';
export const RECOVERY_PATH = '/set-new-password/:token';
export const CREATE_NEW_PASSWORD_PATH = '/createNewPassword"'

export const RoutesConst = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<ProfilePage/>} />
                <Route path={SIGN_IN_PATH} element={<Login />} />
                <Route path={REGISTER_PATH} element={<Registration />} />
                <Route path={PROFILE_PATH} element={<ProfilePage />} />
                <Route path={RECOVERY_PATH} element={<ResetPassword />} />
                <Route path={PACKS_LIST_PATH} element={<PacksList/>}/>

                <Route path={CREATE_NEW_PASSWORD_PATH + "/:token"} element={<CreateNewPassword />}/>

                <Route path={'404'} element={<Error404 />} />
                <Route path="*" element={<Navigate to='/404'/>} />
               <Route path={'/learn/:packId/:packName'} element={<Learning/>}/>
                <Route path={'pack/:packId/:packName'} element={<CardsPage/>}/>
            </Routes>
        </div>
    );
};