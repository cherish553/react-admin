import React, { useState, useEffect } from "react";
import { Form, Input, Button, Upload, InputNumber } from "antd";
import { UploadFile, UploadChangeParam } from "antd/lib/upload/interface";
import { useHistory } from "react-router-dom";
import { BannerDetail } from "@api/systemSetting/api";
import { postUploadImage, filter } from "@/util/common";
import { postEditBanner as PostEditBanner } from "@api/systemSetting";

import { PlusOutlined } from "@ant-design/icons";
import { validate } from "@/util/common";
import style from "./index.module.scss";
const layout = {
  labelCol: { span: 3 },
};

export default function EditBanner() {
  let router = useHistory();
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<BannerDetail>({
    img_url: "",
    sort: "",
    jump_link: "",
    title: "",
  });
  const [file, setFile] = useState<UploadFile<any>>();
  const [id, setId] = useState("");
  useEffect(() => {
    const id = router.location?.search.split("=")[1];
    setId(id);
  }, [router]);
  // 添加banner
  const bannerDetail = async () => {
    if (!(await validate(form))) return;
    const img_url = await postUploadImage(file);
    if (typeof img_url === "boolean") return;
    await postEditBanner({
      ...formData,
      img_url,
    });
    router.push("/systemSetting");
  };
  //  轮播图接口
  async function postEditBanner(params: BannerDetail) {
    await PostEditBanner(params);
    return true;
  }
  // 编辑banner
  const editBanner = async () => {
    let img_url: string = "";
    if (typeof file === "boolean")
      img_url = (await postUploadImage(file)) || "";
    await postEditBanner(
      filter<BannerDetail, "img_url" | "jump_link" | "title">({
        ...formData,
        img_url,
      })
    );
    router.push("/systemSetting");
  };
  // 点击上传
  const confirm = async () => {
    if (!id) return bannerDetail();
    editBanner();
  };
  // 上传之前的处理
  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    let url = formData.img_url;
    !!url && URL.revokeObjectURL(url);
    setFile(info.file);
    url = window.URL.createObjectURL(info.file);
    setFormData({ ...formData, img_url: url });
  };
  // 上传按钮
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">上传图片</div>
    </div>
  );
  return (
    <Form {...layout} labelAlign="left" form={form}>
      {/* 轮播图简称 */}
      <Form.Item
        label="轮播图简称"
        name="title"
        rules={
          !id
            ? [
                {
                  required: true,
                  message: "请填写标题",
                },
              ]
            : []
        }
      >
        <div className={style.flex}>
          <Input
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          ></Input>
          {id && <p className={style.tip}>留空则不修改</p>}
        </div>
      </Form.Item>
      {/* 图片 */}
      <Form.Item
        label="图片"
        valuePropName="fileList"
        name="img_url"
        rules={
          !id
            ? [
                {
                  required: true,
                  message: "请上传图片",
                },
              ]
            : []
        }
      >
        <Upload
          accept="image/*"
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={() => false}
          onChange={handleChange}
        >
          {formData.img_url ? (
            <img
              src={formData.img_url}
              alt="avatar"
              style={{ width: "100%" }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      </Form.Item>
      {/* 轮播图排序 */}
      <Form.Item
        label="轮播图排序"
        name="sort"
        rules={
          !id
            ? [
                {
                  required: true,
                  message: "请填写轮播图排序",
                },
              ]
            : []
        }
      >
        <div className={style.flex}>
          <InputNumber
            min={0}
            onChange={(e) => setFormData({ ...formData, sort: e })}
            value={formData.sort as number | undefined}
          ></InputNumber>
          {id && <p className={style.tip}>数字越小，排序越前，留空则不修改</p>}
        </div>
      </Form.Item>
      {/* 跳转链接 */}
      <Form.Item label="跳转链接" name="jump_link">
        <div className={style.flex}>
          <Input
            onChange={(e) =>
              setFormData({ ...formData, jump_link: e.target.value })
            }
            value={formData.jump_link}
          ></Input>
          {id && <p className={style.tip}>留空则不修改</p>}
        </div>
      </Form.Item>
      <Button onClick={confirm}>完成</Button>
    </Form>
  );
}
