import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Refs } from "./declare";
import { Modal,Button } from "antd";
interface Props {
  id: number | string;
}
const CategoryDialog = (props: Props, ref: any) => {
  const { id } = props;
  const [visible, SetVisible] = useState(true);
  const [title, SetTitle] = useState("新增类目");

  useEffect(() => {
    if (typeof id === "number") return SetTitle("编辑类目");
    SetTitle("添加类目");
  }, [id]);
  useImperativeHandle(
    ref,
    (): Refs => ({
      SetVisible,
    })
  );
  const submit =()=>{
    
  }
  return (
    <Modal
      title={title}
      visible={visible}
      footer={[
        <Button key="back" onClick={submit}>
          提交
        </Button>
      ]}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};
export default forwardRef(CategoryDialog);
