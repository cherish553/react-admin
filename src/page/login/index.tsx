import React, { useState } from "react";
import { Input, Card, Form, Button } from "antd";
import style from "./index.module.scss";
import cookie from "js-cookie";
import {useHistory} from 'react-router-dom'
import { getLogin as GetLogin } from "@api/login";
import classnames from "classnames";
export default function Login() {
  const [form] = Form.useForm();
  const router=useHistory()
  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
  });
  const getLogin = async () => {
    try {
      await form.validateFields();
      const data = await GetLogin(formData);
      if (!data) return;
      const {token} = data
      cookie.set("token", token);
      router.push({
        pathname:'/'
      })
    } catch (_) {}
  };
  return (
    <div className={classnames("site-layout-background", style.login)}>
      <Card className={style.card}>
        <Form
          form={form}
          labelCol={{
            span: 5,
          }}
        >
          <p className={style.title}>管理后台</p>
          <Form.Item
            name="mobile"
            rules={[
              {
                required: true,
                message: "请填写手机号",
                pattern: /^1[3456789]\d{9}$/,
              },
            ]}
            label="手机号"
          >
            <Input
              onChange={(e) =>
                setFormData({ ...formData, mobile: e.target.value })
              }
              value={formData.mobile}
            ></Input>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请填写密码" }]}
            label="密码"
          >
            <Input
              type="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              value={formData.password}
            ></Input>
          </Form.Item>
          <Button type="primary" onClick={getLogin}>
            登录
          </Button>
        </Form>
      </Card>
    </div>
  );
}
