import React, { useState } from "react";
import { Form, Input, Button, Upload } from "antd";
import { UploadFile, UploadChangeParam } from "antd/lib/upload/interface";

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import style from "./index.module.scss";
const layout = {
  labelCol: { span: 3 },
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
export default function EditBanner() {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  // 上传之前的处理
  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    // URL.revokeObjectURL() 
    const url = window.URL.createObjectURL(info.file);
    setImageUrl(url);
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">上传图片</div>
    </div>
  );
  const [imageUrl, setImageUrl] = useState<string>();
  return (
    <Form {...layout} labelAlign="left">
      <Form.Item label="轮播图简称">
        <div className={style.flex}>
          <Input></Input>
          <p>留空则不修改</p>
        </div>
      </Form.Item>
      <Form.Item label="轮播图简称">
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={() => false}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
          ) : (
            uploadButton
          )}
        </Upload>
      </Form.Item>
      <Form.Item label="轮播图排序">
        <div className={style.flex}>
          <Input></Input>
          <p>数字越小，排序越前，留空则不修改</p>
        </div>
      </Form.Item>
      <Form.Item label="跳转链接">
        <div className={style.flex}>
          <Input></Input>
          <p>留空则不修改</p>
        </div>
      </Form.Item>
      <Button>完成</Button>
    </Form>
  );
}
