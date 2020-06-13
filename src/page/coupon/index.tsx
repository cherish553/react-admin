import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import { useHistory } from "react-router-dom";
import {  Button, Table } from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
import "moment/locale/zh-cn";
interface HomeList {
  title: string;
  count: number;
}
export default function Coupon() {
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
      c: "2020-6-5",
    },
  ]);
  const [rowSelection] = useState({
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  });
  const [userColumn, setuserColumn] = useState([
    {
      title: "交易券",
      dataIndex: "userName",
    },
    {
      title: "有效期",
      dataIndex: "phone",
    },
    {
      title: "添加时间",
      dataIndex: "a",
    },
    {
      title: "操作",
      dataIndex: "",
      render: (_: any, e: any) => <Button size={"small"}>删除</Button>,
    },
  ]);
  return (
    <div>
      <div>
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={userColumn}
          dataSource={userList}
        ></Table>
      </div>
    </div>
  );
}
