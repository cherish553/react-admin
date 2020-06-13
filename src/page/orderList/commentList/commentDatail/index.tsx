import React from "react";

import { Form, Input, Button,Rate } from "antd";
import style from "./index.module.scss";
export default function CommentDatail() {
  return (
    <Form name="basic" initialValues={{ remember: true }}>
      <Form.Item label="订单号">
        123123123
      </Form.Item>
      <Form.Item label="交易时间">123123123</Form.Item>
      <Form.Item label="买家名称">123123123</Form.Item>
      <Form.Item label="买家评价">
        <div className={style.comment}>
          <div>123</div>
          <div>
            <div className={style.rate}>
                <div>cherish</div>
                <Rate disabled defaultValue={2} />
            </div>
            <div>2020-6-6</div>
            <div>asdasdasdadada</div>
            <div>
              <img src="" alt="" />
              <img src="" alt="" />
              <img src="" alt="" />
            </div>
          </div>
        </div>
      </Form.Item>
      <Form.Item label="回复评价">
        <Input.TextArea></Input.TextArea>
      </Form.Item>
      <Button type='primary'>提交</Button>
    </Form>
  );
}
