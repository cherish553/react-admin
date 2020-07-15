import React from "react";
import { Form, Input, Button } from "antd";
import style from "./index.module.scss";
import { GoodsModel } from "@api/template/api";
interface Props {
  next?: React.Dispatch<React.SetStateAction<number>>;
  data: {
    formData: GoodsModel;
    setFormData: React.Dispatch<React.SetStateAction<GoodsModel>>;
  };
}
export default function TemplateInfo(props: Props) {
  const { next, data } = props;
  const { formData, setFormData } = data;
  return (
    <Form>
      <Form.Item label="模板名称">
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={style.w200}
        ></Input>
      </Form.Item>
      <Form.Item label="设置尺寸">
        <Input
          value={formData.size.split("*")[0]}
          className={style.w200}
          onChange={(e) =>
            setFormData({
              ...formData,
              size: `${e.target.value}*${formData.size.split("*")[1] ?? ""}`,
            })
          }
        ></Input>{" "}
        X{" "}
        <Input
          value={formData.size.split("*")[1]}
          onChange={(e) =>
            setFormData({
              ...formData,
              size: `${formData.size.split("*")[0] ?? ""}*${e.target.value}`,
            })
          }
          className={style.w200}
        ></Input>
      </Form.Item>
      <Form.Item label="模板页数">
        <Input
          onChange={(e) =>
            setFormData({
              ...formData,
              numberPages: e.target.value,
            })
          }
          value={formData.numberPages}
          className={style.w200}
        ></Input>
      </Form.Item>
      {!next ? (
        <Button>保存</Button>
      ) : (
        <Button onClick={() => next(1)}>下一步</Button>
      )}
    </Form>
  );
}
