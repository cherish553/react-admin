import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import classnames from "classnames";
import { Card, Input, Button, Table, DatePicker, message } from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
import {
  getWithdrawalList,
  getHandleWithdrawalPass,
  getHandleWithdrawalReject,
} from "@api/commission";
import { WithdrawalListData } from "@api/commission/api";
import { useTableHook } from "@/hooks";
import "moment/locale/zh-cn";
const { RangePicker } = DatePicker;
enum Status {
  "审核中",
  "审核通过",
  "驳回",
}
export default function WithdrawlLog() {
  const [serachForm, setSerachForm] = useState({
    userName: "cherish",
    phone: "15628771443",
  });
  const [dataList, pagination, , getDataList] = useTableHook<
    WithdrawalListData
  >(getWithdrawalList);
  const [delDataIds, setDelDataIds] = useState<Array<string> | []>([]);
  const [rowSelection] = useState({
    onChange: (
      _selectedRowKeys: React.Key[],
      selectedRows: Array<WithdrawalListData>
    ) => {
      setDelDataIds(selectedRows.map((item) => item["id"]) as string[] | []);
    },
  });
  const getHandleWithdrawal = async (id: string[], status: Status) => {
    if (!id.length) return message.error("至少选择一条数据");
    if (status === Status["审核通过"]) {
      await getHandleWithdrawalPass({ id });
    } else {
      await getHandleWithdrawalReject({ id });
    }
    getDataList()
    message.success("设置成功");
  };
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
      title: "提现申请金额",
      dataIndex: "money",
    },
    {
      title: "申请时间",
      dataIndex: "lastLoginDate",
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (_: any, row: WithdrawalListData) => <>{Status[row.status]}</>,
    },
    {
      title: "操作",
      dataIndex: "",
      render: (_: any, row: WithdrawalListData) => (
        <>
          <Button
            size={"small"}
            onClick={() => getHandleWithdrawal([row.id], Status["审核通过"])}
          >
            设置为已处理
          </Button>
          <Button
            size={"small"}
            onClick={() => getHandleWithdrawal([row.id], Status["驳回"])}
          >
            设置为未处理
          </Button>
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
        <Button
          onClick={() => getHandleWithdrawal(delDataIds, Status["审核通过"])}
        >
          设置为已处理
        </Button>
        <Button onClick={() => getHandleWithdrawal(delDataIds, Status["驳回"])}>
          设置为未处理
        </Button>
      </div>
      <div>
        <Table
          rowKey="id"
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          pagination={{ current: pagination.page, total: pagination.total }}
          columns={dataColumn}
          dataSource={dataList}
        ></Table>
      </div>
    </div>
  );
}
