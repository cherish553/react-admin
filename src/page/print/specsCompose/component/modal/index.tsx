import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Refs } from "./declare";
import { Modal, Button, Form, Input } from "antd";
import { postEditGoodSpec, postAddGoodSpec } from "@api/print";
import { validate } from "@/util/common";
import { EditGoodSpecParam } from "@api/print/api";
interface Props {
  row: EditGoodSpecParam | undefined;
  getDataList: Function;
}
const SpecDialog = (props: Props, ref: any) => {
  const [form] = Form.useForm();
  const { row, getDataList } = props;
  const [visible, SetVisible] = useState(false);
  const [title, SetTitle] = useState("添加属性");
  const [formData, setFormData] = useState<EditGoodSpecParam>({
    name: "",
    id: 0,
    children_id: 0,
  });
  useEffect(() => {
    if (row?.children_id) {
      SetTitle("编辑属性");
      form.setFieldsValue(row);
      setFormData(row);
      return;
    } else if (row?.children_id === 0) {
      setFormData(row);
      form.setFieldsValue(row);
      SetTitle("添加属性");
    }
  }, [row]);
  useImperativeHandle(
    ref,
    (): Refs => ({
      SetVisible,
    })
  );
  // 点击提交
  const submit = async () => {
    if (!(await validate(form))) return;
    let data;
    if (formData.children_id) {
      data = await postEditGoodSpec(formData);
    } else {
      data = await postAddGoodSpec(formData);
    }
    if (!data) return;
    getDataList();
    SetVisible(false);
  };
  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={() => SetVisible(false)}
      footer={[
        <Button key="back" onClick={submit}>
          提交
        </Button>,
      ]}
    >
      <Form form={form}>
        <Form.Item
          label="属性名称"
          name="name"
          rules={[
            {
              required: true,
              message: "请填写属性名称",
            },
          ]}
        >
          <Input
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            // value={formData.name}
          ></Input>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default forwardRef(SpecDialog);
