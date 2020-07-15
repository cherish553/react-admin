import React, {
  useState,
  forwardRef,
} from "react";
// import { Refs } from "./declare";
import { SpecListS, SpecList } from "@api/print/api";
import { Modal, Button, Form, Select, Input } from "antd";
const { Option } = Select;
interface Props {
  specList: SpecListS;
  setSpecList: React.Dispatch<React.SetStateAction<SpecListS>>;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setDataList: React.Dispatch<React.SetStateAction<SpecList[]>>;
  dataList: SpecList[];
}
const Diadlog = (props: Props) => {
  const {
    specList,
    visible,
    setVisible,
    setSpecList,
    setDataList,
    dataList,
  } = props;
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
  const [formData, setFormData] = useState({
    price: "",
    number: "",
  });
  const submit = () => {
    let obj = specList.reduce((pre, now) => {
      pre[`${now.code}_spec_id`] = now.value;
      pre[`${now.code}_spec_name`] = now.names;
      return pre;
    }, {} as any);
    obj = {
      ...obj,
      price: formData.price,
      number: formData.number,
      id: +new Date(),
    };
    console.log(dataList)
    setDataList([...dataList, obj]);
    setVisible(false);
  };
  return (
    <Modal
      onCancel={() => setVisible(false)}
      title={"添加新规格"}
      visible={visible}
      footer={[
        <Button key="back" onClick={submit}>
          完成
        </Button>,
      ]}
    >
      <Form name="basic">
        {specList.map((item, index) => (
          <Form.Item key={item.id} label={item.name}>
            <Select
              onChange={(e) => {
                const arr = [...specList];
                const obj = item.children_list.filter(
                  (item) => String(item.id) === String(e)
                )[0];
                arr.splice(index, 1, {
                  ...arr[index],
                  value: obj.id,
                  names: obj.name!,
                });
                setSpecList(arr);
              }}
              value={item.value}
              style={{ width: 120 }}
            >
              {item.children_list.map((items) => (
                <Option key={items.id} value={items.id}>
                  {items.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        ))}
        <Form.Item label="价格">
          <Input
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          ></Input>
        </Form.Item>
        <Form.Item label="库存">
          <Input
            value={formData.number}
            onChange={(e) =>
              setFormData({ ...formData, number: e.target.value })
            }
          ></Input>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default forwardRef(Diadlog);
