import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import classnames from "classnames";
import { Card, Input, Button, Table, DatePicker } from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
import { useTableHook } from "@/hooks";
import "moment/locale/zh-cn";
import { getProportionList } from "@api/commission";
import { ProportionListData } from "@api/commission/api";
const { RangePicker } = DatePicker;
interface HomeList {
  title: string;
  count: number;
}
export default function Commission() {
  const [serachForm, setSerachForm] = useState({
    user_name: "",
    mobile: "",
  });
  const [dataList, pagination, , getDataList] = useTableHook<
    ProportionListData
  >(getProportionList, serachForm);
  const [dataColumn] = useState([
    {
      title: "用户昵称",
      dataIndex: "user_name",
    },
    {
      title: "手机号",
      dataIndex: "mobile",
    },
    {
      title: "分佣金额",
      dataIndex: "commission",
    },
    {
      title: "交易时间",
      dataIndex: "commission",
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
                setSerachForm({ ...serachForm, user_name: e.target.value })
              }
              placeholder="请输入用户昵称"
              value={serachForm.user_name}
            />
            <p>手机号</p>
            <Input
              maxLength={11}
              type={"tel"}
              onChange={(e) =>
                setSerachForm({ ...serachForm, mobile: e.target.value })
              }
              placeholder="请输入手机号"
              value={serachForm.mobile}
            />
            <p>交易时间</p>
            <RangePicker
              locale={locale}
              placeholder={["开始时间", "结束时间"]}
            />
          </div>
          <div>
            <Button onClick={() => getDataList()} type={"primary"}>
              确定
            </Button>
            <Button type={"primary"}>重置</Button>
          </div>
        </div>
      </Card>
      <div>
        <Table
          rowKey="user_id"
          pagination={{ current: pagination.page, total: pagination.total }}
          columns={dataColumn}
          dataSource={dataList}
        ></Table>
      </div>
    </div>
  );
}
