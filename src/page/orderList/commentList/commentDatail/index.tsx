import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Form, Input, Button, Rate } from "antd";
import style from "./index.module.scss";
import { query } from "@/util/common";
import { getOrderInfo as GetOrderInfo } from "@api/order";
import { orderDetailData } from "@api/order/api";
function judgeSearch(queryData: {} | Id): queryData is Id {
  return !!(queryData as Id).id;
}
function CommentDatail(props: RouteComponentProps) {
  const {
    location: { search },
  } = props;
  const [orderDetail, setOrderDetail] = useState<orderDetailData>(
    {} as orderDetailData
  );
  useEffect(() => {
    const queryData = query<Id>(search);
    if (judgeSearch(queryData)) {
      getOrderInfo(queryData.id);
    }
  }, []);
  const getOrderInfo = async (order_id: number) => {
    const data = await GetOrderInfo({ order_id });
    setOrderDetail(data);
  };
  return (
    <Form name="basic" initialValues={{ remember: true }}>
      <Form.Item label="订单号">{orderDetail.order_sn}</Form.Item>
      <Form.Item label="交易时间">{orderDetail.pay_time}</Form.Item>
      <Form.Item label="买家名称">{orderDetail.realname}</Form.Item>
      <Form.Item label="买家评价">
        {orderDetail.comments?.map((item) => (
          <div key={item.comment_id} className={style.comment}>
            <div>123</div>
            <div>
              <div className={style.rate}>
                <div>cherish</div>
                <Rate disabled defaultValue={2} />
              </div>
              <div>2020-6-6</div>
              <div>{item.remark}</div>
              <div>
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
              </div>
            </div>
          </div>
        ))}
      </Form.Item>
      <Form.Item label="回复评价">
        <Input.TextArea></Input.TextArea>
      </Form.Item>
      <Button type="primary">提交</Button>
    </Form>
  );
}
export default withRouter(CommentDatail);
