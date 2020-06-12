import React, { useState, useEffect } from "react";
// import style from "./index.module.scss";
// import classnames from "classnames";
import { useHistory } from "react-router-dom";
import { Card, Button, Table, Input, Form } from "antd";
interface HomeList {
  title: string;
  count: number;
}
interface Obj {
  pathname: string;
  search?: string;
}
export default function SpecsCompose() {
  const router = useHistory();
  const jumpToPage = (url: string, id?: number) => {
    console.log(id);
    let obj: Obj = {
      pathname: url,
    };
    if (id) {
      obj = { ...obj, search: "?id=4" };
    }
    router.push(obj);
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
      edit: true,
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
      title: "属性",
      dataIndex: "userName",
      render: (_: any, row: any) =>
        !!row.edit ? <Input type="text" /> : <div>属性1</div>,
    },
    {
      title: "属性名称",
      dataIndex: "phone",
      render: (_: any, row: any) =>
        !!row.edit ? <Input type="text" /> : <div>属性1</div>,
    },
  ]);
  const changes = (e: any): void => {
    console.log(e);
  };
  const [selectList, SetselectList] = useState([
    {
      label: "尺寸",
    },
    {
      label: "款式",
    },
    {
      label: "纸张",
    },
    {
      label: "装订工艺",
    },
    {
      label: "印刷工艺",
    },
  ]);
  return (
    <div>
      <div>
        <Form>
          {selectList.map((item) => (
            <>
              <div>
                <Button>删除</Button>
                <Button>添加属性</Button>
              </div>
              <Form.Item label={item.label}>
                <Table
                  rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
                  }}
                  columns={userColumn}
                  dataSource={userList}
                ></Table>
              </Form.Item>
            </>
          ))}
        </Form>
      </div>
    </div>
  );
}
