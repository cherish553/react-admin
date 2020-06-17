import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import { useHistory } from "react-router-dom";
import classnames from "classnames";
import { Card, Input, Button, Table, Form } from "antd";
import { getBannerList as GetBannerList } from "@api/systemSetting";
interface HomeList {
  title: string;
  count: number;
}
export default function SystemSetting() {
  let router = useHistory();
  useEffect(() => {
    getBannerList();
  }, []);
  const getBannerList = async () => {
    const data = await GetBannerList();
    console.log(data);
  };
  const [serachForm, setSerachForm] = useState({
    userName: "cherish",
    phone: "15628771443",
  });
  const [userList, setuserList] = useState([
    {
      key: 1,
      userName: "cherish",
      phone: "15628771443",
      dealCount: 100,
      lastLoginDate: "2020-6-5",
    },
  ]);
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
  const jumpToPage = (url: string, id?: number) => {
    router.push({
      pathname: url,
      search: id ? `?id=${id}` : "",
    });
  };
  const [userColumn, setuserColumn] = useState([
    {
      title: "轮播图",
      dataIndex: "userName",
    },
    {
      title: "排序",
      dataIndex: "phone",
    },
    {
      title: "跳转地址",
      dataIndex: "dealCount",
    },
    {
      title: "操作",
      dataIndex: "",
      render: (_: any, e: any) => (
        <>
          <Button onClick={() => jumpToPage("/editBanner", 1)} size={"small"}>
            编辑
          </Button>
          <Button size={"small"}>删除</Button>
        </>
      ),
    },
  ]);
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
            <Button type={"primary"}>删除</Button>
            <Button onClick={() => jumpToPage("/editBanner")} type={"primary"}>
              新增轮播图
            </Button>
          </div>
        </div>
      </Card>
      <div>
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={userColumn}
          dataSource={userList}
        ></Table>
      </div>
    </div>
  );
}
