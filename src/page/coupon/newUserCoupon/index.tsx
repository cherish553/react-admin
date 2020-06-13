import React, { useState } from "react";
import { Form, Radio, Input, Button } from "antd";
import { RadioChangeEvent } from "antd/lib/radio/interface";
import style from "./index.module.scss";
export default function NewUserCoupon() {
  const [preferentialType, setPreferentialType] = useState(1);
  const preferentialTypeChange = (e: RadioChangeEvent) => {
    setPreferentialType(e.target.value);
  };
  return (
    <Form>
      <Form.Item label="是否开启新用户活动">
        <Radio.Group
          onChange={(e) => preferentialTypeChange(e)}
          value={preferentialType}
        >
          <Radio value={1}>开启</Radio>
          <Radio value={2}>关闭</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="新用户赠送代金券">
        <Radio.Group
          onChange={(e) => preferentialTypeChange(e)}
          value={preferentialType}
        >
          <Radio value={1}>开启</Radio>
          <Radio value={2}>关闭</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="优惠券面额">
        <Input className={style.w200}></Input>
      </Form.Item>
      <Form.Item label="使用门槛金额">
        <Input className={style.w200}></Input>
      </Form.Item>
      <Button>完成</Button>
    </Form>
  );
}
