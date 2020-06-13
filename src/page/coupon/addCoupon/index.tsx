import React, { useState } from "react";
import { Form, DatePicker, Radio, Input } from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
import "moment/locale/zh-cn";
import { RadioChangeEvent } from "antd/lib/radio/interface";
import style from "./index.module.scss";
const { RangePicker } = DatePicker;
export default function AddCoupon() {
  const [preferentialType, setPreferentialType] = useState(1);
  const preferentialTypeChange = (e: RadioChangeEvent) => {
    setPreferentialType(e.target.value);
  };
  return (
    <Form>
      <Form.Item label="使用时间">
        <RangePicker locale={locale} placeholder={["开始时间", "结束时间"]} />
      </Form.Item>
      <Form.Item label="优惠方式">
        <Radio.Group
          onChange={(e) => preferentialTypeChange(e)}
          value={preferentialType}
        >
          <Radio value={1}>满减</Radio>
          <Radio value={2}>定额优惠券</Radio>
        </Radio.Group>
      </Form.Item>
      {preferentialType === 1
        ? [
            <Form.Item label="满">
              <Input className={style.w200}></Input>
            </Form.Item>,
            <Form.Item label="减少">
              <Input className={style.w200}></Input>
            </Form.Item>,
          ]
        : [
            <Form.Item label="优惠券面额">
              <Input className={style.w200}></Input>
            </Form.Item>,
            <Form.Item label="使用门槛金额">
              <Input className={style.w200}></Input>
            </Form.Item>,
          ]}
    </Form>
  );
}
