import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import style from "./index.module.scss";
import classnames from 'classnames';
import { Card } from "antd";
interface HomeList {
  title: string;
  count: number;
}
export default function Home() {
  const router = useHistory()
  useEffect(() => {
    console.log(router)
    // Update the document title using the browser API
    // document.title = `You clicked ${count} times`;
  },[router])
  const [homeList, setList] = useState([
    {
      title: "用户数",
      count: 10000,
    },
    {
      title: "昨日收益",
      count: 20000,
    },
  ]);
  return (
    <div className={style.cardlLyout}>
      {homeList.map((item: HomeList) => (
        <Card className={style.mr25} key={item.title} style={{ width: 200 }}>
          <div className={classnames(style.textRight,style.card)}>
            <div className={style.width50}></div>
            <div className={style.width50}>
              <div> {item.title}</div>
              <div> {item.count}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
