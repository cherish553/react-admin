import React, { useState } from "react";
import style from "./index.module.scss";
import classnames from "classnames";
import { Card, Input, Button, Table, Select, DatePicker } from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import { useTableHook } from "@/hooks";
import { getOrderList } from "@api/order";
const { Option } = Select;
const { RangePicker } = DatePicker;
export default function UserList() {
  const [serachForm, setSerachForm] = useState({
    order_sn: "",
    startTime: "",
    endTime: "",
  });
  const [dataList, pagination, , getDataList] = useTableHook<any>(
    getOrderList,
    serachForm
  );
  const status = [
    "待付款",
    "待发货",
    "待打印",
    "待收货",
    "待评价",
    "纠纷中",
    "交易成功",
  ];

  const [dataColumn] = useState([
    {
      title: "订单号",
      dataIndex: "order_sn",
    },
    {
      title: "买家名称",
      dataIndex: "realname",
    },
    // {
    //   title: "收货人信息",
    //   dataIndex: "dealCount",
    // },
    {
      title: "交易金额",
      dataIndex: "pay_amount",
    },
    {
      title: "交易时间",
      dataIndex: "pay_time",
    },
    // {
    //   title: "订单状态",
    //   dataIndex: "b",
    // },
  ]);
  return (
    <div>
      <Card className={classnames(style.w100)}>
        <div>
          <Select placeholder="所有状态" allowClear className={style.w200}>
            {status.map((item, index) => (
              <Option key={index} value={item}>
                {item}
              </Option>
            ))}
          </Select>
          <Input
            allowClear
            placeholder="交易订单号"
            value={serachForm.order_sn}
            onChange={(e) =>
              setSerachForm({ ...serachForm, order_sn: e.target.value })
            }
            className={style.w200}
          />
        </div>
        <div className={style.search}>
          <div>
            <p>交易时间</p>
            <RangePicker
              value={[
                serachForm.startTime ? moment(serachForm.startTime) : null,
                serachForm.endTime ? moment(serachForm.endTime) : null,
              ]}
              onChange={(_, date) =>
                setSerachForm({
                  ...serachForm,
                  startTime: date[0],
                  endTime: date[1],
                })
              }
              locale={locale}
              placeholder={["开始时间", "结束时间"]}
            />
            <Button onClick={() => getDataList()} type={"primary"}>
              确定
            </Button>
            <Button
              onClick={() =>
                setSerachForm({
                  startTime: "",
                  endTime: "",
                  order_sn: "",
                })
              }
              type={"primary"}
            >
              重置
            </Button>
          </div>
          <div>
            <Button type={"primary"}>导出</Button>
            <Button type={"primary"}>批量发货</Button>
          </div>
        </div>
      </Card>
      <div>
        <Table
          rowKey="order_id"
          pagination={{ current: pagination.page, total: pagination.total }}
          columns={dataColumn}
          dataSource={dataList}
        ></Table>
      </div>
    </div>
  );
}
