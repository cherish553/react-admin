import React from "react";
import { Form, Input, Button } from "antd";
import style from "./index.module.scss";
interface Props {
  next?: React.Dispatch<React.SetStateAction<number>>;
}
export default function TemplateInfo(props: Props) {
  const { next } = props;
  return (
    <Form>
      <Form.Item label="模板名称">
        <Input className={style.w200}></Input>
      </Form.Item>
      <Form.Item label="设置尺寸">
        <Input className={style.w200}></Input> X{" "}
        <Input className={style.w200}></Input>
      </Form.Item>
      <Form.Item label="模板页数">
        <Input className={style.w200}></Input>
      </Form.Item>
      {!next ? (
        <Button>保存</Button>
      ) : (
        <Button onClick={() => next(1)}>下一步</Button>
      )}
    </Form>
  );
}
