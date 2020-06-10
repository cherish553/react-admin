import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import classnames from 'classnames';
import { Card } from "antd";
interface HomeList {
  title: string;
  count: number;
}
export default function userList() {
    return(
        <div>
        <Card className={style.w100}>

        </Card>
        </div>
    )
}
