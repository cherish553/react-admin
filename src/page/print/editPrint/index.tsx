import React, { useState } from "react";
import { Form, Input, Button, Select, Upload, Card, Table } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import Editor from "./component/editor";
import Dialog from "./component/modal";
import style from "./index.module.scss";
const { Option } = Select;
const layout = {
  // labelCol: { span: 8 },
  // wrapperCol: { span: 8 },
};

function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    // message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    // message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const EditPrint = () => {
  const [userList, setuserList] = useState([
    {
      key: 1,
      userName: "cherish",
      phone: "15628771443",
      dealCount: 100,
      a: "1",
      b: "1",
      c: "1",
      d: "1",
    },
  ]);
  const [userColumn, setuserColumn] = useState([
    {
      title: "尺寸",
      dataIndex: "userName",
    },
    {
      title: "款式",
      dataIndex: "phone",
    },
    {
      title: "纸张",
      dataIndex: "dealCount",
    },
    {
      title: "装订工艺",
      dataIndex: "a",
    },
    {
      title: "印刷工艺",
      dataIndex: "b",
    },
    {
      title: "价格",
      dataIndex: "c",
      render: (_: any, e: any) => <Input></Input>,
    },
    {
      title: "库存",
      dataIndex: "d",
      render: (_: any, e: any) => <Input></Input>,
    },
  ]);
  const [imageUrl, setImageUrl] = useState();
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const handleChange = (info: any) => {
    if (info.file.status === "uploading") {
      // this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: any) => setImageUrl);
    }
  };
  const [rowSelection] = useState({
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  });
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">上传图片</div>
    </div>
  );
  return (
    <div>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="印品名称"
          name="username"
          rules={[{ required: true, message: "请输入印品名称" }]}
        >
          <Input className={style.inputWidth} />
        </Form.Item>

        <Form.Item
          label="印品分类"
          name="password"
          rules={[{ required: true, message: "请输入印品分类" }]}
        >
          <Select defaultValue="lucy" style={{ width: 120 }}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
          </Select>
          <Button>新增类目</Button>
        </Form.Item>

        {/* <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item> */}
        <Form.Item label="印品缩略图">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        <Form.Item label="产品图片">
          <Card>
            <div className={style.imageList}>
              {Array.from({ length: 3 }).map((item, index) => (
                <Upload
                  key={index}
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              ))}
              <Button type={"primary"}>添加更多图片</Button>
            </div>
          </Card>
        </Form.Item>
        <Form.Item label="产品描述">
          <Editor />
        </Form.Item>
        <Form.Item label="制作服务介绍">
          <Editor />
        </Form.Item>
        <Form.Item label="设置模板">
          <Select defaultValue="lucy" style={{ width: 120 }}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
          </Select>
          <Button>模板管理</Button>
        </Form.Item>
        <Form.Item label="价格设置">
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={userColumn}
            dataSource={userList}
          ></Table>
        </Form.Item>
      </Form>
      <Dialog />
    </div>
  );
};

export default EditPrint;
