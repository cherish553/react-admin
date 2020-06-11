import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
// import classnames from "classnames";
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
      a: "1",
      b: "1",
      c: "1",
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
      title: "印品",
      dataIndex: "userName",
    },
    {
      title: "属于类目",
      dataIndex: "phone",
    },
    {
      title: "售价",
      dataIndex: "dealCount",
    },
    {
      title: "模板",
      dataIndex: "a",
    },
    {
      title: "添加时间",
      dataIndex: "b",
    },
    {
      title: "是否为添加印品",
      dataIndex: "c",
    },
    {
      title: "操作",
      dataIndex: "",
      render: (_: any, e: any) => (
        <>
          <Button size={"small"} onClick={() => changes(e)}>
            编辑
          </Button>
          <Button size={"small"} onClick={() => changes(e)}>
            删除
          </Button>
          <Button size={"small"} onClick={() => changes(e)}>
            设置推荐
          </Button>
        </>
      ),
    },
  ]);
  const changes = (e: any): void => {
    console.log(e);
  };
  return (
    <div>
      <Card>
        <div className={style.search}>
          <Button className={style.mr20} type={"primary"}>
            新增印品
          </Button>
          <Button type={"primary"}>新增类目</Button>
        </div>
      </Card>
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
