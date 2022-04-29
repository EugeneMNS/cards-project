import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { Header } from "./Header/Header";
import { store } from "../bll/store";
import { RoutesConst } from "./Routes/Routes";

export const App = () => {
  return (
      <div className="App">
        <HashRouter>
          <Provider store={store}>
            <Header />
            <RoutesConst />
          </Provider>
        </HashRouter>
      </div>
  );
};
