import React, { useState, useEffect, useCallback } from "react";
// import style from "./index.module.scss";
// import classnames from "classnames";
import { useHistory } from "react-router-dom";

import { getGoodSpecList as GetGoodSpecList } from "@api/print";
import { GoodSpecDetail, GoodSpecDetailChildren } from "@api/print/api";
import { Card, Button, Table, Input, Form } from "antd";
interface HomeList {
  title: string;
  count: number;
}
interface Obj {
  pathname: string;
  search?: string;
}
let newDataList: GoodSpecDetail[];
export default function SpecsCompose() {
  const router = useHistory();

  const [dataList, SetDataList] = useState<GoodSpecDetail[] | []>([]);
  const mappingEdit = new WeakMap();
  useEffect(() => {
    newDataList = dataList;
  }, [dataList]);
  function editData(row: GoodSpecDetailChildren) {
    let data = mappingEdit.get(row);
    if (!data) {
      mappingEdit.set(row, { ...row });
      data = mappingEdit.get(row);
    }
    let spliceIndex: number = 0;
    const editDataDetail = newDataList.filter((item, index) => {
      if (item.id === row.id) {
        spliceIndex = index;
        return true;
      }
    })[0];
    editDataDetail.children_list.forEach((item) => {
      if (item.children_id === row.children_id) {
        item.edit = true;
      }
    });
    newDataList.splice(spliceIndex, 1, editDataDetail);
    SetDataList([...newDataList]);
  }
  const jumpToPage = (url: string, id?: number) => {
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
  // 印品规格列表
  async function getGoodSpecList() {
    const data = await GetGoodSpecList();
    SetDataList(data);
  }
  useEffect(() => {
    getGoodSpecList();
  }, []);
  const [userColumn, setuserColumn] = useState([
    {
      title: "属性",
      dataIndex: "index",
      render: (_: any, row: GoodSpecDetailChildren, index: number) => (
        <div>属性{index + 1}</div>
      ),
    },
    {
      title: "属性名称",
      dataIndex: "name",
      render: (_: any, row: GoodSpecDetailChildren) =>
        !!row.edit ? (
          <Input
            onChange={(e) => (mappingEdit.get(row).name = e.target.value)}
            value={mappingEdit.get(row).name}
            type="text"
          />
        ) : (
          <div>{row.name}</div>
        ),
    },
    {
      title: "操作",
      dataIndex: "",
      render: (_: any, row: GoodSpecDetailChildren) =>
        !row.edit ? (
          <div key={1}>
            <Button onClick={() => editData(row)}>编辑</Button>,
            <Button>删除</Button>,
          </div>
        ) : (
          <div key={2}>
            <Button>保存</Button>, <Button>取消</Button>
          </div>
        ),
    },
  ]);
  return (
    <div>
      <div>
        <Form>
          {dataList.length &&
            (dataList as GoodSpecDetail[]).map((item, index) => (
              <div key={item.id}>
                <div>
                  <Button>删除</Button>
                  <Button>添加属性</Button>
                </div>
                <Form.Item label={item.name}>
                  <Table
                    rowKey="children_id"
                    pagination={false}
                    rowSelection={{
                      type: "checkbox",
                      ...rowSelection,
                    }}
                    columns={userColumn}
                    dataSource={dataList[index].children_list}
                  ></Table>
                </Form.Item>
              </div>
            ))}
        </Form>
      </div>
    </div>
  );
}
