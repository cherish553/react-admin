import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import style from "./index.module.scss";
import { validate } from "@/util/common";
import {
  getProportion as GetProportion,
  postSettingProportion as PostSettingProportion,
} from "@api/distribution";
export default function Distribution() {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    proportion2: "0",
    proportion3: "0",
  });
  useEffect(() => {
    getProportion();
  }, []);
  const getProportion = async () => {
    const data = await GetProportion();
    form.setFieldsValue(data);
  };
  const onFinish = () => {};
  const onFinishFailed = () => {};
  const postSettingProportion = async () => {
    if (!(await validate(form))) return;
    const data = await PostSettingProportion(formData);
    if (!data) return;
    getProportion();
    message.success("保存成功");
  };
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
          label="二级分销比例"
          name="proportion2"
          rules={[{ required: true, message: "请输入二级分销比例" }]}
        >
          <Input
            onChange={(e) =>
              setFormData({
                ...formData,
                proportion2: e.target.value,
              })
            }
            value={formData.proportion2}
            className={style.inputWidth}
          />
        </Form.Item>
        <Form.Item
          label="三级分销比例"
          name="proportion3"
          rules={[{ required: true, message: "请输入三级分销比例" }]}
        >
          <Input
            value={formData.proportion3}
            onChange={(e) =>
              setFormData({
                ...formData,
                proportion3: e.target.value,
              })
            }
            className={style.inputWidth}
          />
        </Form.Item>
      </Form>
      <Button onClick={postSettingProportion}>完成</Button>
    </div>
  );
}
