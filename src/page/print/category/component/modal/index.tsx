import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Refs } from "./declare";
import { Modal, Button, Form, Input } from "antd";
import { postEditGoodClass, postaddGoodClass } from "@api/print/index";
import { validate } from "@/util/common";
interface Props {
  id: number | undefined;
  getDataList: Function;
}
const CategoryDialog = (props: Props, ref: any) => {
  const [form] = Form.useForm();
  const { id, getDataList } = props;
  const [visible, SetVisible] = useState(false);
  const [title, SetTitle] = useState("新增类目");
  const [formData, setFormData] = useState({
    name: "",
  });
  useEffect(() => {
    if (id) return SetTitle("编辑类目");
    SetTitle("添加类目");
  }, [id]);
  useImperativeHandle(
    ref,
    (): Refs => ({
      SetVisible,
    })
  );
  // 点击提交
  const submit = async () => {
    if (!(await validate(form))) return ;
    let data;
    if (id) data = await postEditGoodClass({ ...formData, id });
    else data = await postaddGoodClass({ ...formData, id });
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
          label="类目名称"
          name="name"
          rules={[
            {
              required: true,
              message: "请填写类目名称",
            },
          ]}
        >
          <Input
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            value={formData.name}
          ></Input>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default forwardRef(CategoryDialog);
