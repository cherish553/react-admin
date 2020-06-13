import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import classnames from "classnames";
import { Card, Input, Button, Table, DatePicker } from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
import "moment/locale/zh-cn";
const { RangePicker } = DatePicker;
interface HomeList {
  title: string;
  count: number;
}
export default function WithdrawlLog() {
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
      a:'1',
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
      title: "用户昵称",
      dataIndex: "userName",
    },
    {
      title: "手机号",
      dataIndex: "phone",
    },
    {
      title: "提现申请金额",
      dataIndex: "dealCount",
    },
    {
      title: "申请时间",
      dataIndex: "lastLoginDate",
    },
    {
      title: "状态",
      dataIndex: "a",
    },
    {
      title: "操作",
      dataIndex: "",
      render: (_: any, e: any) => (
        <>
          <Button size={"small"}>设置为已处理</Button>
          <Button size={"small"}>设置为未处理</Button>
        </>
      ),
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
            <p>手机号</p>
            <Input
              maxLength={11}
              type={"tel"}
              onChange={(e) =>
                setSerachForm({ ...serachForm, phone: e.target.value })
              }
              placeholder="请输入手机号"
              value={serachForm.phone}
            />
            <p>交易时间</p>
            <RangePicker
              locale={locale}
              placeholder={["开始时间", "结束时间"]}
            />
          </div>
          <div>
            <Button type={"primary"}>确定</Button>
            <Button type={"primary"}>重置</Button>
          </div>
        </div>
      </Card>
      <div>
        <Button>设置为已处理</Button>
        <Button>设置为未处理</Button>
      </div>
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
