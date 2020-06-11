import React, { useState, useRef } from "react";
import style from "./index.module.scss";
// import classnames from "classnames";
import { Card, Button, Table } from "antd";
import CategoryDialog from "./component/modal";
import { Refs } from "./component/modal/declare";
interface HomeList {
  title: string;
  count: number;
}
export default function UserList() {
  const Ref = useRef<Refs>();
  const [serachForm, setSerachForm] = useState({
    userName: "cherish",
    phone: "15628771443",
  });
  const [id, setId] = useState<string | number>("");
  const [userList, setuserList] = useState([
    {
      key: 1,
      userName: "cherish",
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
  const [userColumn, setuserColumn] = useState([
    {
      title: "类目名称",
      dataIndex: "userName",
    },
    {
      title: "操作",
      dataIndex: "",
      render: (_: any, e: any) => (
        <>
          <Button size={"small"} onClick={() => showModal(1)}>
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
  const showModal = (id: string | number = "") => {
    setId(id);
    Ref.current?.SetVisible(true);
  };
  return (
    <div>
      <Button className={style.mr20} type={"primary"}>
        删除
      </Button>
      <Button type={"primary"} onClick={() => showModal()}>
        新增类目
      </Button>
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
      <CategoryDialog id={id} ref={Ref} />
    </div>
  );
}
