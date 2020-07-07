import React, { useEffect, useState } from "react";

import { Form, Input, Button, Rate } from "antd";
import style from "./index.module.scss";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { query } from "@/util/common";
import { getAfterSaleDetail as GetAfterSaleDetail } from "@api/afterSaler";
function judgeSearch(queryData: {} | Id): queryData is Id {
  return !!(queryData as Id).id;
}
function AfterSalesDetail(props: RouteComponentProps) {
  const [id, setId] = useState<string | number>(0);
  useEffect(() => {
    const queryData = query<Id>(props.location.search);
    if (judgeSearch(queryData)) {
      setId(id);
      getAfterSaleDetail(queryData.id);
    }
  }, []);
  const getAfterSaleDetail = async (id: number) => {
    const data = await GetAfterSaleDetail({ id });
    console.log(data);
  };
  return (
    <div>
      <div className={style.top}>
        <div className={style.flex}>
          <div>图片</div>
          <div>aaaaaaa</div>
        </div>
        <Form name="basic" initialValues={{ remember: true }}>
          <Form.Item label="订单号">123123123</Form.Item>
          <Form.Item label="交易时间">123123123</Form.Item>
          <Form.Item label="买家名称">123123123</Form.Item>
        </Form>
      </div>
      <Form name="basic" initialValues={{ remember: true }}>
        <Form.Item label="申请售后原因">
          申请售后原因申请售后原因申请售后原因申请售后原因
        </Form.Item>
        <Form.Item label="凭证">凭证图片</Form.Item>
        <Form.Item label="处理意见">
          <Input.TextArea></Input.TextArea>
        </Form.Item>
        <Button type="primary">提交</Button>
      </Form>
    </div>
  );
}
export default withRouter(AfterSalesDetail);
