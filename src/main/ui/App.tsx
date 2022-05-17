import React, {useEffect} from "react";
import "./App.css";
import {useDispatch, useSelector} from "react-redux";
import { Header } from "./Header/Header";
import {RootStateType, store} from "../bll/store";
import { RoutesConst } from "./Routes/Routes";
import {checkAuthMe} from "../bll/loginReducer";
import {CircularProgress} from "@mui/material";

export const App = React.memo( () => {

    const dispatch = useDispatch();
    const isInitialized = useSelector<RootStateType, boolean>(state => state.app.isInitialized)
    const redirectToLogin = useSelector<RootStateType, boolean>(state => state.login.redirectToLogin)

    useEffect(()=>{
        dispatch(checkAuthMe() as any)
        document.title = "Cards"
    }, [])

    if (!isInitialized && !redirectToLogin){
        return (
            <div
                style={{
                    position: "fixed",
                    top: "30%",
                    textAlign: "center",
                    width: "100%",
                }}
            >
                <CircularProgress />
            </div>
        );
    }

  return (
      <div className="App">
            <Header />
            <RoutesConst />
      </div>
  );
});
