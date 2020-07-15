import React, { useState } from "react";
import style from "./index.module.scss";
import { useHistory } from "react-router-dom";
import classnames from "classnames";
import { Card, Input, Button, Table, Select, DatePicker } from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
import { getAfterSaleList } from "@api/afterSaler";
import { AfterSaleListData } from "@api/afterSaler/api";

import { useTableHook } from "@/hooks";
import "moment/locale/zh-cn";
const { Option } = Select;
const { RangePicker } = DatePicker;
export default function AfterSales() {
  let router = useHistory();
  const [dataList, pagination, , getDataList] = useTableHook<any>(
    getAfterSaleList
  );
  const [serachForm, setSerachForm] = useState({
    userName: "cherish",
    phone: "15628771443",
  });
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
  const [dataColumn] = useState([
    {
      title: "订单号",
      dataIndex: ['order_info','order_sn'],
    },
    {
      title: "买家名称",
      dataIndex: "user_name",
    },
    {
      title: "收货人信息",
      dataIndex: "info",
    },
    {
      title: "交易金额",
      dataIndex: ['order_info','pay_amount'],
    },
    {
      title: "交易时间",
      dataIndex: "a",
    },
    {
      title: "工单状态",
      dataIndex: "status",
    },
    {
      title: "操作",
      dataIndex: "",
      render: (_: any, row: AfterSaleListData) => (
        <Button
          size={"small"}
          onClick={() => jumpToPage("/afterSalesDetail", row.id)}
        >
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
          rowKey="id"
          pagination={{ current: pagination.page, total: pagination.total }}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={dataColumn}
          dataSource={dataList}
        ></Table>
      </div>
    </div>
  );
}
