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
export default function AfterSales() {
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
      title: "订单号",
      dataIndex: "userName",
    },
    {
      title: "买家名称",
      dataIndex: "phone",
    },
    {
      title: "收货人信息",
      dataIndex: "a",
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
      title: "工单状态",
      dataIndex: "c",
    },
    {
      title: "操作",
      dataIndex: "",
      render: (_: any, e: any) => (
        <Button size={"small"} onClick={() => jumpToPage("/afterSalesDetail", 4)}>
          查看详情
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
            <Select>
              <Option value="待处理">待处理</Option>
            </Select>
            <Button type={"primary"}>确定</Button>
            <Button type={"primary"}>重置</Button>
          </div>
          <div>
            <Button type={"primary"}>导出</Button>
            <Button type={"primary"}>批量发货</Button>
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
