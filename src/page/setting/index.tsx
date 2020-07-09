import React, { useState, useEffect } from "react";
import { Form, Input, message, Button } from "antd";
import style from "./index.module.scss";
import { validate } from "@/util/common";

import {
  getSystem as GetSystem,
  postSettingSystem as PostSettingSystem,
} from "@api/setting";
export default function Setting() {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    app_id: "",
    app_key: "",
    app_secret: "",
    express_key: "",
    mch_id: "",
  });
  useEffect(() => {
    getSystem();
  }, []);
  const getSystem = async () => {
    const data = await GetSystem();
    setFormData(data);
    form.setFieldsValue(data);
  };
  const postSettingSystem = async () => {
    if (!(await validate(form))) return;
    const data = await PostSettingSystem(formData);
    if (!data) return;
    getSystem();
    message.success("保存成功");
  };
  const onFinish = () => {};
  const onFinishFailed = () => {};
  return (
    <div>
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="快速查询秘钥"
          name="express_key"
          rules={[{ required: true, message: "请输入快速查询秘钥" }]}
        >
          <Input
            onChange={(e) =>
              setFormData({
                ...formData,
                express_key: e.target.value,
              })
            }
            className={style.inputWidth}
          />
          阿里云快速查询秘钥
        </Form.Item>
        <p className={style.mb24}>微信支付配置</p>
        <Form.Item
          label="appid"
          name="app_id"
          rules={[{ required: true, message: "请输入appid" }]}
        >
          <Input
            onChange={(e) =>
              setFormData({
                ...formData,
                app_id: e.target.value,
              })
            }
            className={style.inputWidth}
          />
        </Form.Item>
        <Form.Item
          label="Appsecert"
          name="app_secret"
          rules={[{ required: true, message: "请输入Appsecert" }]}
        >
          <Input
            onChange={(e) =>
              setFormData({
                ...formData,
                app_secret: e.target.value,
              })
            }
            className={style.inputWidth}
          />
        </Form.Item>
        <Form.Item
          label="Mchild"
          name="mch_id"
          rules={[{ required: true, message: "请输入Mchild" }]}
        >
          <Input
            onChange={(e) =>
              setFormData({
                ...formData,
                mch_id: e.target.value,
              })
            }
            className={style.inputWidth}
          />
        </Form.Item>
        <Form.Item
          label="key"
          name="app_key"
          rules={[{ required: true, message: "请输入key" }]}
        >
          <Input
            onChange={(e) =>
              setFormData({
                ...formData,
                app_key: e.target.value,
              })
            }
            className={style.inputWidth}
          />
        </Form.Item>
      </Form>
      <Button onClick={postSettingSystem}>完成</Button>
    </div>
  );
}
