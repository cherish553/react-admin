import React, { useState } from "react";
import style from "./index.module.scss";
import { Card, Button, Table } from "antd";
import { getTemplateList, delTemplateList } from "@api/template";
import { TemplateListData } from "@api/template/api";
import { useTableHook, useDelData } from "@/hooks";
import { useHistory } from "react-router-dom";

function UserList() {
  let router = useHistory();
  const [dataList, pagination, , getDataList] = useTableHook<TemplateListData>(
    getTemplateList
  );
  const [showDeleteConfirm, delDataIds, rowSelection] = useDelData<TemplateListData>(
    delTemplateList,
    getDataList
  );
  const jumpToPage = (url: string, id?: number) => {
    router.push({
      pathname: url,
      search: id ? `?id=${id}` : "",
    });
  };
  const [dataColumn] = useState([
    {
      title: "模板名称",
      dataIndex: "name",
    },
    {
      title: "适合尺寸",
      dataIndex: "size",
    },
    {
      title: "使用中的产品数",
      dataIndex: "goodsNum",
    },
    {
      title: "操作",
      dataIndex: "",
      render: (_: any, row: TemplateListData) => (
        <>
          <Button size={"small"} onClick={() => jumpToPage("/editTemplate",row.id)}>
            编辑
          </Button>
          <Button size={"small"}  onClick={() => showDeleteConfirm([row.id])}>
            删除
          </Button>
        </>
      ),
    },
  ]);
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
          rowKey="id"
          pagination={{ current: pagination.page, total: pagination.total }}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={dataColumn}
          dataSource={dataList}
        ></Table>
      </div>
    </div>
  );
}
export default UserList;
