import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Upload, Card, Table, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Editor from "./component/editor";
import Dialog from "./component/modal";
import { query, postUploadImage } from "@/util/common";
import style from "./index.module.scss";
import { withRouter, RouteComponentProps, useHistory } from "react-router-dom";
import {
  postEditGoods as PostEditGoods,
  getGoodsInfo as GetGoodsInfo,
} from "@api/print";
import { ClassList, ModelList, SpecListS, SpecList } from "@api/print/api";
const { Option } = Select;
function judgeSearch(queryData: {} | Id): queryData is Id {
  return !!(queryData as Id).id;
}
let dataLists: Array<SpecList> = [];
const EditPrint = (props: RouteComponentProps) => {
  let router = useHistory();
  const [id, setId] = useState<number | string>("");
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
    const {
      name,
      class_id,
      model_id,
      desc,
      service_introduction,
      index_img,
      spec_list,
      img_list,
    } = goodsInfo;
    setDataList(spec_list || []);
    const fileList = img_list.map((item) => ({
      id: item.id,
      url: item.img_url,
      status: "done",
      uid: item.id,
      file: "",
    }));
    setFileList(fileList);
    form.setFieldsValue({
      name,
      class_id,
      model_id,
      desc,
      service_introduction,
    });
    setFormData({
      name,
      class_id,
      model_id,
      desc,
      service_introduction,
      index_img,
    });
  };
  const [form] = Form.useForm();
  const [dataList, setDataList] = useState<Array<SpecList>>([]);
  useEffect(() => {
    dataLists = dataList;
  }, [dataList]);
  const [formData, setFormData] = useState({
    name: "",
    class_id: "",
    index_img: "",
    model_id: "",
    desc: "",
    service_introduction: "",
  });
  const [index_img, setIndex_img] = useState("");
  const setFormDataDesc = (desc: string) => {
    return setFormData({ ...formData, desc });
  };
  const setFormDataService = (service_introduction: string) => {
    return setFormData({ ...formData, service_introduction });
  };

  const [visible, setVisible] = useState(false);
  const [dataColumn] = useState([
    {
      title: "尺寸",
      dataIndex: "size_spec_name",
    },
    {
      title: "款式",
      dataIndex: "style_spec_name",
    },
    {
      title: "纸张",
      dataIndex: "paper_spec_name",
    },
    {
      title: "装订工艺",
      dataIndex: "binding_spec_name",
    },
    {
      title: "印刷工艺",
      dataIndex: "printing_spec_name",
    },
    {
      title: "价格",
      dataIndex: "price",
    },
    {
      title: "库存",
      dataIndex: "number",
    },
    {
      title: "操作",
      dataIndex: "",
      render(_: any, row: SpecList) {
        return (
          <Button
            onClick={() => {
              const data = dataLists.filter((item) => row.id !== item.id);
              setDataList(data);
            }}
          >
            删除
          </Button>
        );
      },
    },
  ]);
  const [fileList, setFileList] = useState<any>([]);
  const [delDataIds, setDelDataIds] = useState<Array<number> | []>([]);
  const [rowSelection] = useState({
    onChange: (_selectedRowKeys: React.Key[], selectedRows: Array<any>) => {
      setDelDataIds(selectedRows.map((item) => item["id"]) as number[] | []);
    },
  });
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">上传图片</div>
    </div>
  );
  const handleChangeIndex = (e: any) => {
    URL.revokeObjectURL(index_img);
    setFormData({ ...formData, index_img: e.file });
    const file = window.URL.createObjectURL(e.file);
    setIndex_img(file);
  };
  const saveData = async () => {
    const specList = dataList.map((item) => ({
      id: id.toString().length === 13 ? "" : id,
      size: item.size_spec_id,
      style: item.style_spec_id,
      paper: item.paper_spec_id,
      binding: item.binding_spec_id,
      printing: item.printing_spec_id,
      price: item.price,
      number: item.number,
    }));
    let {
      name,
      class_id,
      model_id,
      desc,
      service_introduction,
      index_img,
    } = formData;
    let imgList: any[] = (
      await Promise.all(
        fileList
          .filter((item: any) => item.file)
          .map((item: any) => postUploadImage(item.file))
      )
    ).map((item: any) => ({
      id: "",
      img_url: item,
    }));
    const pre = fileList
      .filter((item: any) => !item.file)
      .map((item: any) => ({
        id: item.id,
        img_url: item.url,
      }));
    imgList = [...imgList, ...pre];
    let url: string;
    if (typeof formData.index_img !== "string") {
      url = (await postUploadImage(index_img)) as string;
      index_img = url;
    }
    await PostEditGoods({
      id: (id as string) || "",
      name,
      class_id,
      model_id,
      desc,
      service_introduction,
      imgList,
      specList,
      index_img,
    });
    router.push("/print");
  };
  const handleChange = (e: any) => {
    const fileList = e.fileList.map((item: any) => {
      if (item.originFileObj) {
        const url = window.URL.createObjectURL(item.originFileObj);
        return {
          url,
          status: "done",
          uid: +new Date(),
          file: item.originFileObj,
          id: "",
        };
      }
      return item;
    });
    setFileList(fileList);
  };
  return (
    <div>
      <Form form={form} name="basic" initialValues={{ remember: true }}>
        <Form.Item
          label="印品名称"
          name="name"
          rules={[{ required: true, message: "请输入印品名称" }]}
        >
          <Input
            className={style.inputWidth}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </Form.Item>

        <Form.Item
          label="印品分类"
          name="class_id"
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
        <Form.Item name="index_img" label="印品缩略图">
          <Upload
            accept="image/*"
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleChangeIndex}
          >
            {index_img || formData.index_img ? (
              <img
                src={index_img || formData.index_img}
                alt="avatar"
                style={{ width: "100%" }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        <Form.Item name="imgList" label="产品图片">
          <Card>
            <div className={style.imageList}>
              <Upload
                accept="image/*"
                name="avatar"
                beforeUpload={() => false}
                listType="picture-card"
                className="avatar-uploader"
                fileList={fileList}
                onChange={handleChange}
              >
                {uploadButton}
              </Upload>
            </div>
          </Card>
        </Form.Item>
        <Form.Item name="desc" label="产品描述">
          <Editor
            outputHTML={formData.desc}
            setOutputHTML={setFormDataDesc}
            key={1}
          />
        </Form.Item>
        <Form.Item name="service_introduction" label="制作服务介绍">
          <Editor
            outputHTML={formData.service_introduction}
            setOutputHTML={setFormDataService}
            key={2}
          />
        </Form.Item>
        <Form.Item name="model_id" label="设置模板">
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
        </Form.Item>
        <Form.Item name="specList" label="价格设置">
          <Button
            onClick={() => {
              if (delDataIds.length) {
                const data = dataList.filter(
                  (item) => !delDataIds.includes(item.id as never)
                );
                setDataList(data);
              }
            }}
          >
            删除
          </Button>
          <Button onClick={() => setVisible(true)}>添加新规格</Button>
          <Table
            rowKey="id"
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={dataColumn}
            dataSource={dataList}
          ></Table>
        </Form.Item>
      </Form>
      <Dialog
        dataList={dataList}
        setDataList={setDataList}
        visible={visible}
        setVisible={setVisible}
        specList={specList}
        setSpecList={setSpecList}
      />
      <Button onClick={saveData}>保存</Button>
    </div>
  );
};

export default withRouter(EditPrint);
