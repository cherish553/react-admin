import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import classnames from "classnames";
import { Card, Input, Button, Table } from "antd";
interface HomeList {
  title: string;
  count: number;
}
export default function ShowWorks() {
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
      title: "作品",
      dataIndex: "userName",
    },
    {
      title: "制作者",
      dataIndex: "phone",
    },
    {
      title: "建立时间",
      dataIndex: "dealCount",
    },
    {
      title: "是否在作品展示中",
      dataIndex: "lastLoginDate",
    },
    {
      title: "操作",
      dataIndex: "",
      render: (_: any, e: any) => (
        <>
          <Button size={"small"}>添加到作品展示</Button>
          <Button size={"small"}>移出作品展示</Button>
        </>
      ),
    },
  ]);
  return (
    <div>
      <Card className={classnames(style.w100)}>
        <div className={style.search}>
          <div>
            <p>作品名</p>
            <Input
              onChange={(e) =>
                setSerachForm({ ...serachForm, userName: e.target.value })
              }
              placeholder="请输入用户昵称"
              value={serachForm.userName}
            />
            <p>制作者</p>
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
