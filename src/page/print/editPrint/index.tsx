import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Upload, Card, Table } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import Editor from "./component/editor";
import Dialog from "./component/modal";
import { query } from "@/util/common";
import { UploadFile, UploadChangeParam } from "antd/lib/upload/interface";
import style from "./index.module.scss";
import { withRouter, RouteComponentProps } from "react-router-dom";
import cookie from 'js-cookie'
import {
  postEditGoods as PostEditGoods,
  getGoodsInfo as GetGoodsInfo,
} from "@api/print";
import { ClassList, ModelList, SpecListS } from "@api/print/api";
import { cpuUsage } from "process";
const { Option } = Select;
interface FileList {
  [key: string]: UploadFile<any> | "" | Array<UploadFile<any>>;
}
function judgeSearch(queryData: {} | Id): queryData is Id {
  return !!(queryData as Id).id;
}
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
const EditPrint = (props: RouteComponentProps) => {
  const [id, setId] = useState<number | string>("");
  // const [fileList, setFileList] = useState<FileList>({
  //   index_img: "",
  //   imgList: [],
  //   specList: "",
  // });
  useEffect(() => {
    const queryData = query<Id>(props.location.search);
    if (judgeSearch(queryData)) {
      setId(queryData.id);
      getGoodsInfo(queryData.id);
    } else {
      getGoodsInfo("");
    }
  }, []);
  const [classList, setClassList] = useState<ClassList>([]);
  const [modelList, setModelList] = useState<ModelList>([]);
  const [specList, setSpecList] = useState<SpecListS>([]);
  const getGoodsInfo = async (id?: number | string) => {
    const { classList, goodsInfo, modelList, specList } = await GetGoodsInfo({
      id,
    });
    setClassList(classList);
    setModelList(modelList);
    setSpecList(specList);
    console.log(goodsInfo);
    // console.log(data);
  };
  const [form] = Form.useForm();
  // form.setFieldsValue(data);
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
  const [formData, setFormData] = useState({
    name: "",
    class_id: "",
    index_img: "",
    model_id: "",
    desc: "",
    service_introduction: "",
    imgList: [
      {
        id: "",
        img_url: "",
      },
    ],
    specList: "",
  });
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
  const [fileList, setFileList] = useState<any>([]);
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
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
  // async function postEditGoods() {
  //   await PostEditGoods();
  // }
  // 上传之前的处理
  // const handleChange = (
  //   info: UploadChangeParam<UploadFile<any>>,
  //   type: string,
  //   index?: number
  // ) => {
  //   let url = formData.index_img;
  //   !!url && URL.revokeObjectURL(url);
  //   setFileList({ ...fileList, [type]: { ...fileList[type], ...info.file } });
  //   url = window.URL.createObjectURL(info.file);
  //   setFormData({ ...formData, index_img: url });
  // };
  const handleChange = ({ fileList }: any) => {
    console.log(fileList);
    // setFileList({ fileList });
  };
  return (
    <div>
      <Form
        form={form}
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
          <Input
            className={style.inputWidth}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </Form.Item>

        <Form.Item
          label="印品分类"
          name="password"
          rules={[{ required: true, message: "请输入印品分类" }]}
        >
          <Select
            onChange={(e) => setFormData({ ...formData, class_id: e })}
            value={formData.class_id}
            style={{ width: 120 }}
          >
            {classList.map((item) => (
              <Option value={item.class_id} key={item.class_id}>
                {item.name}
              </Option>
            ))}
          </Select>
          {/* <Button>新增类目</Button> */}
        </Form.Item>
        <Form.Item label="印品缩略图">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={() => false}
            // onChange={(e) => handleChange(e, "index_img")}
          >
            {formData.index_img ? (
              <img
                src={formData.index_img}
                alt="avatar"
                style={{ width: "100%" }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        <Form.Item label="产品图片">
          <Card>
            <div className={style.imageList}>
              <Upload
                name="avatar"
                headers={{
                  Authorization: `Bearer ${cookie.get("token")}`,
                }}
                listType="picture-card"
                className="avatar-uploader"
                fileList={fileList}
                onChange={handleChange}
              >
                {uploadButton}
              </Upload>
              <Button
                onClick={() =>
                  setFormData({
                    ...formData,
                    imgList: [...formData.imgList, { id: "", img_url: "" }],
                  })
                }
                type={"primary"}
              >
                添加更多图片
              </Button>
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
          <Select
            value={formData.model_id}
            onChange={(e) => setFormData({ ...formData, model_id: e })}
            style={{ width: 120 }}
          >
            {modelList.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
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

export default withRouter(EditPrint);
