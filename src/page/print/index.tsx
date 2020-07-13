import React, { useState } from "react";
import style from "./index.module.scss";
import { useTableHook } from "@/hooks";
import { useHistory } from "react-router-dom";
import { getGoodList } from "@api/print";
import { GoodListData } from "@api/print/api";
import { Card, Button, Table } from "antd";
interface Obj {
  pathname: string;
  search?: string;
}
export default function Category() {
  const [dataList, pagination] = useTableHook<GoodListData>(getGoodList);
  const router = useHistory();
  const jumpToPage = (url: string, id?: number) => {
    console.log(id);
    let obj: Obj = {
      pathname: url,
    };
    if (id) {
      obj = { ...obj, search: `?id=${id}` };
    }
    router.push(obj);
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
  const [goodColumn] = useState([
    {
      title: "印品",
      dataIndex: "name",
    },
    {
      title: "属于类目",
      dataIndex: "class_info",
      render: (_props: any, row: GoodListData) => {
        return <>{row?.class_info?.name}</>;
      },
    },
    {
      title: "售价",
      dataIndex: "dealCount",
    },
    {
      title: "模板",
      dataIndex: "a",
    },
    {
      title: "添加时间",
      dataIndex: "created_time",
    },
    {
      title: "是否为添加印品",
      dataIndex: "c",
    },
    {
      title: "操作",
      dataIndex: "",
      render: (_: any, row: GoodListData) => (
        <>
          <Button size={"small"} onClick={() => jumpToPage("/editPrint", row.id)}>
            编辑
          </Button>
          <Button size={"small"} onClick={() => changes(row)}>
            删除
          </Button>
          <Button size={"small"} onClick={() => changes(row)}>
            设置推荐
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
            onClick={() => jumpToPage("/editPrint")}
            className={style.mr20}
            type={"primary"}
          >
            新增印品
          </Button>
          <Button type={"primary"}>新增类目</Button>
        </div>
      </Card>
      <Button className={style.mr20} type={"primary"}>
        删除
      </Button>
      <Button type={"primary"}>批量设置推荐</Button>
      <div>
        <Table
          rowKey="id"
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          pagination={{ current: pagination.page, total: pagination.total }}
          columns={goodColumn}
          dataSource={dataList}
        ></Table>
      </div>
    </div>
  );
}
