import React, { useState } from "react";
import { Button, Form, Table } from "antd";
import { delGoodSpec } from "@api/print";
import { GoodSpecDetail, GoodSpecDetailChildren } from "@api/print/api";
import { useDelData } from "@/hooks";
import { ShowModal } from "../../index";
interface Props {
  data: GoodSpecDetail;
  getGoodSpecList: Function;
  showModal: ShowModal;
}
export default function TableSpec(props: Props) {
  const { data, getGoodSpecList, showModal } = props;
  const [showDeleteConfirm, delDataIds, rowSelection] = useDelData<
    GoodSpecDetailChildren
  >(delGoodSpec, getGoodSpecList, "children_id");
  const [userColumn] = useState([
    {
      title: "属性",
      dataIndex: "index",
      render: (_: any, _row: GoodSpecDetailChildren, index: number) => (
        <div>属性{index + 1}</div>
      ),
    },
    {
      title: "属性名称",
      dataIndex: "name",
    },
    {
      title: "操作",
      dataIndex: "",
      render: (_: any, row: GoodSpecDetailChildren, index: number) => [
        <Button key="edit" onClick={() => showModal(row)}>
          编辑
        </Button>,
        <Button
          key="delete"
          onClick={() => showDeleteConfirm([row.children_id])}
        >
          删除
        </Button>,
      ],
    },
  ]);
  return (
    <div>
      <div>
        <Button onClick={() => showDeleteConfirm(delDataIds)}>删除</Button>
        <Button
          onClick={() => showModal({ id: data.id, children_id: 0, name: "" })}
        >
          添加属性
        </Button>
      </div>
      <Form.Item label={data.name}>
        <Table
          rowKey="children_id"
          pagination={false}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={userColumn}
          dataSource={data.children_list}
        ></Table>
      </Form.Item>
    </div>
  );
}
