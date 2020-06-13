import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import { useHistory } from "react-router-dom";
import classnames from "classnames";
import { Card, Input, Button, Table, Select, DatePicker } from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
import "moment/locale/zh-cn";
const { Option } = Select;
const { RangePicker } = DatePicker;
interface HomeList {
  title: string;
  count: number;
}
export default function CommentList() {
  let router = useHistory();
  const [serachForm, setSerachForm] = useState({
    userName: "cherish",
    phone: "15628771443",
  });
  const [userList, setuserList] = useState([
    {
      key: 1,
      userName: "cherish",
      phone: "15628771443",
      dealCount: 100,
      lastLoginDate: "2020-6-5",
      a: "2020-6-5",
      b: "2020-6-5",
    },
  ]);
  const [userColumn, setuserColumn] = useState([
    {
      title: "订单号",
      dataIndex: "userName",
    },
    {
      title: "买家名称",
      dataIndex: "phone",
    },
    {
      title: "交易金额",
      dataIndex: "lastLoginDate",
    },
    {
      title: "交易时间",
      dataIndex: "a",
    },
    {
      title: "操作",
      dataIndex: "",
      render: (_: any, e: any) => (
        <Button size={"small"} onClick={() => jumpToPage("/commentDatail", 4)}>
          查看
        </Button>
      ),
    },
  ]);
  const jumpToPage = (url: string, id: number) => {
    router.push({
      pathname: url,
      search: `?id=${id}`,
    });
  };
  return (
    <div>
      <Card className={classnames(style.w100)}>
        <div className={style.search}>
          <div>
            <p>交易时间</p>
            <RangePicker
              locale={locale}
              placeholder={["开始时间", "结束时间"]}
            />
            <p>交易订单号</p>
            <Input className={style.w200} type="text" />
            <Button type={"primary"}>确定</Button>
            <Button type={"primary"}>重置</Button>
          </div>
        </div>
      </Card>
      <div>
        <Table columns={userColumn} dataSource={userList}></Table>
      </div>
    </div>
  );
}
