import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
// import { Refs } from "./declare";
import { Modal, Button, Form, Select } from "antd";
const { Option } = Select;
interface Props {
  id: number | string;
}
const Diadlog = () => {
  const [visible, SetVisible] = useState(false);
  const [selectList, SetselectList] = useState([
    {
      label: "尺寸",
    },
    {
      label: "款式",
    },
    {
      label: "纸张",
    },
    {
      label: "装订工艺",
    },
    {
      label: "印刷工艺",
    },
  ]);
  // useEffect(() => {
  //   if (typeof id === "number") return SetTitle("编辑类目");
  //   SetTitle("添加类目");
  // }, [id]);
  // useImperativeHandle(
  //   ref,
  //   (): Refs => ({
  //     SetVisible,
  //   })
  // );

  const submit = () => {};
  return (
    <Modal
      title={"添加新规格"}
      visible={visible}
      footer={[
        <Button key="back" onClick={submit}>
          完成
        </Button>,
      ]}
    >
      <Form name="basic" initialValues={{ remember: true }}>
        {selectList.map((item, index) => (
          <Form.Item key={index} label={item.label}>
            <Select defaultValue="lucy" style={{ width: 120 }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
            </Select>
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};
export default forwardRef(Diadlog);
