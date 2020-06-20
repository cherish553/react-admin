import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import { useHistory } from "react-router-dom";
import classnames from "classnames";
import { Card, Input, Button, Table, Form, message, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { getBannerList, delBanner as DelBanner } from "@api/systemSetting";
import { BannerDataDetail } from "@api/systemSetting/api";
import { useTableHook } from "@/hooks";
const { confirm } = Modal;

export default function SystemSetting() {
  let router = useHistory();
  const [dataList] = useTableHook<BannerDataDetail>(getBannerList);
  const [delBannerIds, setDelBannerIds] = useState<Array<number>>([]);
  const [serachForm, setSerachForm] = useState({
    userName: "cherish",
    phone: "15628771443",
  });
  const [rowSelection] = useState({
    onChange: (
      _selectedRowKeys: React.Key[],
      selectedRows: Array<BannerDataDetail>
    ) => {
      setDelBannerIds(selectedRows.map((item) => item.id));
    },
  });
  const jumpToPage = (url: string, id?: number) => {
    router.push({
      pathname: url,
      search: id ? `?id=${id}` : "",
    });
  };
  // 弹窗确定删除
  function showDeleteConfirm(ids: Array<number>) {
    if (!ids.length) return message.error("至少选择一条数据");
    confirm({
      title: "确定删除数据?",
      icon: <ExclamationCircleOutlined />,
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk() {
        delBanner(ids);
      },
    });
  }
  const [bannerColumn] = useState([
    {
      title: "轮播图",
      dataIndex: "img_url",
      render: (props: string, row: BannerDataDetail) => (
        <>
          <img src={props} alt="" />
          <p>{row.title}</p>
        </>
      ),
    },
    {
      title: "排序",
      dataIndex: "sort",
    },
    {
      title: "跳转地址",
      dataIndex: "jump_link",
    },
    {
      title: "操作",
      dataIndex: "",
      render: (props: any, row: any) => (
        <>
          <Button
            key={1}
            onClick={() => jumpToPage("/editBanner", props.id)}
            size={"small"}
          >
            编辑
          </Button>
          <Button
            key={2}
            size={"small"}
            onClick={() => showDeleteConfirm([props.id])}
          >
            删除
          </Button>
        </>
      ),
    },
  ]);
  // 删除轮播图列表
  const delBanner = async (ids: Array<number>) => {
    const data = await DelBanner({ id: ids.join(",") });
    if (!data) return;
    setDelBannerIds([]);
    message.success("删除成功");
    getBannerList();
  };
  return (
    <div>
      <Card className="border-none" title="后台账号密码设置">
        <Form>
          <Form.Item label="账号">
            <Input className={style.w200}></Input>
          </Form.Item>
          <Form.Item label="密码">
            <Input className={style.w200}></Input>
          </Form.Item>
        </Form>
      </Card>
      <Card className={classnames(style.w100)}>
        <div className={style.search}>
          <div>
            <Button
              type={"primary"}
              onClick={() => showDeleteConfirm(delBannerIds)}
            >
              删除
            </Button>
            <Button onClick={() => jumpToPage("/editBanner")} type={"primary"}>
              新增轮播图
            </Button>
          </div>
        </div>
      </Card>
      <div>
        <Table
          rowKey="id"
          pagination={false}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={bannerColumn}
          dataSource={dataList}
        ></Table>
      </div>
    </div>
  );
}
