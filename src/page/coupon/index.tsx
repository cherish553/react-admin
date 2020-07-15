import React, { useState } from "react";
import style from "./index.module.scss";
import { Button, Table } from "antd";
import { useTableHook, useDelData } from "@/hooks";
import { getCouponList, delCoupon } from "@api/coupon";
import { CouponDetail } from "@api/coupon/api";
export default function Coupon() {
  const [dataList, pagination, , getDataList] = useTableHook<CouponDetail>(
    getCouponList
  );
  const [showDeleteConfirm, delDataIds, rowSelection] = useDelData<
    CouponDetail
  >(delCoupon, getDataList, "type_id");
  const [dataColumn] = useState([
    {
      title: "交易券",
      dataIndex: "type_name",
    },
    {
      title: "有效期",
      dataIndex: "use_start_date",
      render: (_: any, row: CouponDetail) => (
        <>
          {row.use_start_date} - {row.use_end_date}
        </>
      ),
    },
    {
      title: "添加时间",
      dataIndex: "created_time",
    },
    {
      title: "是否定向发送",
      dataIndex: "created_time",
    },
    {
      title: "操作",
      dataIndex: "",
      render: (_: any, row: CouponDetail) => (
        <Button size={"small"} onClick={() => showDeleteConfirm([row.type_id])}>
          删除
        </Button>
      ),
    },
  ]);
  return (
    <div>
      <div>
        <Button
          className={style.mr20}
          type={"primary"}
          onClick={() => showDeleteConfirm(delDataIds)}
        >
          删除
        </Button>
        <Table
          rowKey="type_id"
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
