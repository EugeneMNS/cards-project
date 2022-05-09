import React from "react";
import s from './Search.module.scss'

export const SearchPacks = () => {
    return (
        <input className={s.searchInput}
               type="text"
               placeholder={"Search cards..."}
               />
    )
};