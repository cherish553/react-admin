import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import classnames from "classnames";
import { Card, Input, Button, Table } from "antd";
interface HomeList {
  title: string;
  count: number;
}
export default function UserList() {
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
    },
  ]);
  const [userColumn, setuserColumn] = useState([
    {
      title: "用户昵称",
      dataIndex: "userName",
    },
    {
      title: "手机号",
      dataIndex: "phone",
    },
    {
      title: "成交单数",
      dataIndex: "dealCount",
    },
    {
      title: "最后登录时间",
      dataIndex: "lastLoginDate",
    },
  ]);
  return (
    <div>
      <Card className={classnames(style.w100)}>
        <div className={style.search}>
          <div>
            <p>用户昵称</p>
            <Input
              onChange={(e) =>
                setSerachForm({ ...serachForm, userName: e.target.value })
              }
              placeholder="请输入用户昵称"
              value={serachForm.userName}
            />
            <p>手机号码</p>
            <Input
              maxLength={11}
              type={"tel"}
              onChange={(e) =>
                setSerachForm({ ...serachForm, phone: e.target.value })
              }
              placeholder="请输入手机号"
              value={serachForm.phone}
            />
          </div>
          <div>
            <Button type={"primary"}>重置</Button>
            <Button type={"primary"}>查询</Button>
          </div>
        </div>
      </Card>
      <div>
        <Table columns={userColumn} dataSource={userList}></Table>
      </div>
    </div>
  );
}
