import React, { useState } from "react";
import style from "./index.module.scss";
import { useTableHook, useDelData } from "@/hooks";
import { useHistory } from "react-router-dom";
import {
  getGoodList,
  delGoods,
  postSetRecommend as PostSetRecommend,
  postDelRecommend as PostDelRecommend,
} from "@api/print";
import { GoodListData } from "@api/print/api";
import { Button, Table, message } from "antd";
interface Obj {
  pathname: string;
  search?: string;
}
export default function Category() {
  const [dataList, pagination, , getDataList] = useTableHook<GoodListData>(
    getGoodList
  );
  const [showDeleteConfirm, delDataIds, rowSelection] = useDelData<
    GoodListData
  >(delGoods, getDataList, "id");
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
      dataIndex: "model_id",
    },
    {
      title: "添加时间",
      dataIndex: "created_time",
    },
    {
      title: "是否为添加印品",
      dataIndex: "is_recommend",
      render: (e) => <div>{!e ? "否" : "是"}</div>,
    },
    {
      title: "操作",
      dataIndex: "",
      render: (_: any, row: GoodListData) => (
        <>
          <Button
            size={"small"}
            onClick={() => jumpToPage("/editPrint", row.id)}
          >
            编辑
          </Button>
          <Button size={"small"} onClick={() => showDeleteConfirm([row.id])}>
            删除
          </Button>
          <Button size={"small"} onClick={() => postSetRecommend([row.id])}>
            设置推荐
          </Button>
          <Button size={"small"} onClick={() => postDelRecommend([row.id])}>
            取消推荐
          </Button>
        </>
      ),
    },
  ]);
  const postSetRecommend = async (id: number[] | []) => {
    if (!id.length) return message.error("至少选择一条数据");
    await PostSetRecommend(id);
    getDataList();
  };
  const postDelRecommend = async (id: number[] | []) => {
    if (!id.length) return message.error("至少选择一条数据");
    await PostDelRecommend(id);
    getDataList();
  };
  return (
    <div>
      <Button
        onClick={() => jumpToPage("/editPrint")}
        className={style.mr20}
        type={"primary"}
      >
        新增印品
      </Button>
      <Button
        className={style.mr20}
        type={"primary"}
        onClick={() => showDeleteConfirm(delDataIds)}
      >
        删除
      </Button>
      <Button type={"primary"} onClick={() => postSetRecommend(delDataIds)}>
        批量设置推荐
      </Button>
      <Button type={"primary"} onClick={() => postDelRecommend(delDataIds)}>
        批量取消推荐
      </Button>
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
