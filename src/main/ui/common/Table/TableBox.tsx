import React from "react";
import s from "./Table.module.scss"
import {Search} from "@mui/icons-material";
import {SearchPaks} from "../Search/SearchPaks";

export const TableBox = () => {
    return (
        <div className={s.table_container}>
            <div className={s.Table__top}>
                <SearchPaks/>
                <button className={s.add}>Add new card</button>
            </div>

        </div>
    )
};