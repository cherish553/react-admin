import React, { useState, useEffect } from "react";
import { Form, Radio, Input, Button, message } from "antd";
import style from "./index.module.scss";
import { validate } from "@/util/common";
import {
  getNewUserActive as GetNewUserActive,
  postAddNewUserActive as PostAddNewUserActive,
} from "@api/coupon";
// import { NewUserDetail } from "@api/coupon/api";

export default function NewUserCoupon() {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    newUserActivity: "",
    newUserCoupon: "",
    newUserCouponMoney: "",
    newUserCouponMinMoney: "",
  });
  useEffect(() => {
    getNewUserActive();
  }, []);
  // 新用户优惠券活动信息接口
  async function getNewUserActive() {
    const data = await GetNewUserActive();
    if (!data) return;
    setFormData(data);
    form.setFieldsValue(data);
  }
  // 新用户优惠券活动设置接口
  async function postAddNewUserActive() {
    if (!(await validate(form))) return;
    const data = await PostAddNewUserActive(formData);
    if (!data) return;
    message.success("保存成功");
  }
  return (
    <Form
      form={form}
      // initialValues={{
      //   newUserCouponMoney: formData.newUserCouponMoney,
      //   newUserCouponMinMoney: formData.newUserCouponMinMoney,
      // }}
    >
      <Form.Item label="是否开启新用户活动">
        <Radio.Group
          onChange={(e) =>
            setFormData({ ...formData, newUserActivity: e.target.value })
          }
          value={formData.newUserActivity}
        >
          <Radio value={"1"}>开启</Radio>
          <Radio value={"2"}>关闭</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="新用户赠送代金券">
        <Radio.Group
          onChange={(e) =>
            setFormData({ ...formData, newUserCoupon: e.target.value })
          }
          value={formData.newUserCoupon}
        >
          <Radio value={"1"}>开启</Radio>
          <Radio value={"2"}>关闭</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="newUserCouponMoney"
        label="优惠券面额"
        rules={
          (formData.newUserCouponMoney.length && [
            {
              required: true,
              message: "请填写优惠券面额",
            },
          ]) ||
          []
        }
      >
        <Input
          className={style.w200}
          onChange={(e) =>
            setFormData({ ...formData, newUserCouponMoney: e.target.value })
          }
        ></Input>
      </Form.Item>
      <Form.Item
        name="newUserCouponMinMoney"
        label="使用门槛金额"
        rules={[
          {
            required: true,
            message: "请填写使用门槛金额",
          },
        ]}
      >
        <Input
          className={style.w200}
          onChange={(e) =>
            setFormData({ ...formData, newUserCouponMinMoney: e.target.value })
          }
        ></Input>
      </Form.Item>
      <Button onClick={postAddNewUserActive}>完成</Button>
    </Form>
  );
}
