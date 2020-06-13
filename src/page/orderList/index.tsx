import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import classnames from "classnames";
import { Card, Input, Button, Table, Select, DatePicker } from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
const { Option } = Select;
const { RangePicker } = DatePicker;
interface HomeList {
  title: string;
  count: number;
}
export default function UserList() {
  const status = [
    "待付款",
    "待发货",
    "待打印",
    "待收货",
    "待评价",
    "纠纷中",
    "交易成功",
  ];
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
      title: "收货人信息",
      dataIndex: "dealCount",
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
      title: "订单状态",
      dataIndex: "b",
    },
  ]);
  return (
    <div>
      <Card className={classnames(style.w100)}>
        <div>
          <Select className={style.w200}>
            {status.map((item, index) => (
              <Option key={index} value={item}>
                {item}
              </Option>
            ))}
          </Select>
          <Input className={style.w200} />
        </div>
        <div className={style.search}>
          <div>
            <p>交易时间</p>
            <RangePicker
              locale={locale}
              placeholder={["开始时间", "结束时间"]}
            />
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
        <Table columns={userColumn} dataSource={userList}></Table>
      </div>
    </div>
  );
}
