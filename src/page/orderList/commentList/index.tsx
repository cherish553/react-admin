import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import { useHistory } from "react-router-dom";
import classnames from "classnames";
import { Card, Input, Button, Table, DatePicker } from "antd";
import { useTableHook } from "@/hooks";
import { getCommentsOrderList } from "@api/order";
import { OrderCommentData } from "@api/order/api";
import locale from "antd/es/date-picker/locale/zh_CN";
import "moment/locale/zh-cn";
const { RangePicker } = DatePicker;
export default function CommentList() {
  let router = useHistory();
  const [serachForm, setSerachForm] = useState({
    order_sn: "",
    // phone: "15628771443",
  });
  const [dataList, pagination, , getDataList] = useTableHook<OrderCommentData>(
    getCommentsOrderList,
    serachForm
  );
  const [dataColumn] = useState([
    {
      title: "订单号",
      dataIndex: "order_sn",
    },
    {
      title: "买家名称",
      dataIndex: "realname",
    },
    {
      title: "交易金额",
      dataIndex: "pay_amount",
    },
    {
      title: "交易时间",
      dataIndex: "pay_time",
    },
    {
      title: "操作",
      dataIndex: "",
      render: (_: any, row: OrderCommentData) => (
        <Button
          size={"small"}
          onClick={() => jumpToPage("/commentDatail", row.order_id)}
        >
          查看
        </Button>
      ),
    },
  ]);
  const jumpToPage = (url: string, id: string) => {
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
            <Input
              className={style.w200}
              value={serachForm.order_sn}
              onChange={(e) =>
                setSerachForm({ ...serachForm, order_sn: e.target.value })
              }
              type="text"
            />
            <Button onClick={() => getDataList()} type={"primary"}>
              确定
            </Button>
            <Button type={"primary"}>重置</Button>
          </div>
        </div>
      </Card>
      <div>
        <Table
          pagination={{ current: pagination.page, total: pagination.total }}
          rowKey="order_id"
          columns={dataColumn}
          dataSource={dataList}
        ></Table>
      </div>
    </div>
  );
}
