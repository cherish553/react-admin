import React, { useState, useRef } from "react";
import style from "./index.module.scss";
import { Button, Table } from "antd";
import CategoryDialog from "./component/modal";
import { Refs } from "./component/modal/declare";
import { useTableHook, useDelData } from "@/hooks";
import { getGoodsClassList, delGoodClass } from "@api/print";
import { GoodClasslistData } from "@api/print/api";
export default function UserList() {
  const [dataList, pagination, , getDataList] = useTableHook<GoodClasslistData>(
    getGoodsClassList
  );
  const [showDeleteConfirm, delDataIds, rowSelection] = useDelData<
    GoodClasslistData
  >(delGoodClass, getDataList, "class_id");
  const Ref = useRef<Refs>();
  const [id, setId] = useState<number | undefined>();
  const [userColumn] = useState([
    {
      title: "类目名称",
      dataIndex: "name",
    },
    {
      title: "操作",
      dataIndex: "",
      render: (_: any, row: GoodClasslistData) => (
        <>
          <Button size={"small"} onClick={() => showModal(row.class_id)}>
            编辑
          </Button>
          <Button
            size={"small"}
            onClick={() => showDeleteConfirm([row.class_id])}
          >
            删除
          </Button>
        </>
      ),
    },
  ]);
  const showModal = (id?: number) => {
    setId(id);
    Ref.current?.SetVisible(true);
  };
  return (
    <div>
      <Button
        className={style.mr20}
        type={"primary"}
        onClick={() => showDeleteConfirm(delDataIds)}
      >
        删除
      </Button>
      <Button type={"primary"} onClick={() => showModal()}>
        新增类目
      </Button>
      <div>
        <Table
          rowKey="class_id"
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          pagination={{ current: pagination.page, total: pagination.total }}
          columns={userColumn}
          dataSource={dataList}
        ></Table>
      </div>
      <CategoryDialog getDataList={getDataList} id={id} ref={Ref} />
    </div>
  );
}
