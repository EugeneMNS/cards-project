import React from "react";
import s from './Search.module.scss'

export const SearchPaks = () => {
    return (
        <input className={s.searchInput}
               type="text"
               placeholder={"Search cards..."}
               />
    )
};