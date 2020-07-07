import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import classnames from "classnames";
import { Card, Input, Button, Table } from "antd";
import { useHistory } from "react-router-dom";
import { getTemplateList, delTemplateList } from "@api/template";
import { useTableHook, useDelData } from "@/hooks";
interface HomeList {
  title: string;
  count: number;
}
export default function UserList() {
  let router = useHistory();
  const [dataList, pagination, , getDataList] = useTableHook<any>(
    getTemplateList
  );
  const [showDeleteConfirm, delDataIds, rowSelection] = useDelData<any>(
    delTemplateList,
    getDataList,
    "type_id"
  );
  const jumpToPage = (url: string, id?: number) => {
    router.push({
      pathname: url,
      search: id ? `?id=${id}` : "",
    });
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
  const [userColumn, setuserColumn] = useState([
    {
      title: "模板名称",
      dataIndex: "userName",
    },
    {
      title: "适合尺寸",
      dataIndex: "phone",
    },
    {
      title: "使用中的产品数",
      dataIndex: "dealCount",
    },
    {
      title: "操作",
      dataIndex: "",
      render: (_: any, e: any) => (
        <>
          <Button size={"small"} onClick={() => changes(e)}>
            编辑
          </Button>
          <Button size={"small"} onClick={() => changes(e)}>
            删除
          </Button>
        </>
      ),
    },
  ]);
  const changes = (e: any): void => {
    console.log(e);
  };
  return (
    <div>
      <Card>
        <div className={style.search}>
          <Button
            className={style.mr20}
            type={"primary"}
            onClick={() => showDeleteConfirm(delDataIds)}
          >
            删除
          </Button>
          <Button type={"primary"} onClick={() => jumpToPage("/editTemplate")}>
            新增
          </Button>
        </div>
      </Card>
      <div>
        <Table
          pagination={{ current: pagination.page, total: pagination.total }}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={userColumn}
          dataSource={dataList}
        ></Table>
      </div>
    </div>
  );
}
