import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import { getAdminLogin as GetAdminLogin } from "@api/index";
import style from "./index.module.scss";
import classnames from "classnames";
import { Card } from "antd";
import { getIndex as GetIndex } from "@api/home";
interface HomeList {
  title: string;
  count: number;
}
export default function Home(aa: any) {
  // const router = useHistory();
  useEffect(() => {
    getIndex();
  }, []);

  async function getIndex() {
    const { totalUser, totalMoney } = await GetIndex();
    setHomeList([
      { ...homeList[0], count: totalUser },
      { ...homeList[0], count: totalMoney },
    ]);
  }
  const [homeList, setHomeList] = useState([
    {
      title: "用户数",
      count: 0,
    },
    {
      title: "昨日收益",
      count: 0,
    },
  ]);
  return (
    <div className={style.cardlLyout}>
      {homeList.map((item: HomeList,index) => (
        <Card className={style.mr25} key={index} style={{ width: 200 }}>
          <div className={classnames(style.textRight, style.card)}>
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
