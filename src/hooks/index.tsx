import React, { useState, useEffect } from "react";
import { message, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;
interface Pagination {
  page: number;
  total: number;
}
export const useTableHook = <K, T = any>(
  GetDataList: Function,
  serachForm?: T
) => {
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
  });
  useEffect(() => {
    getDataList();
  }, []);
  const [dataList, setDataList] = useState<Array<K> | []>([]);
  async function getDataList(flag?: Boolean) {
    if (flag) setPagination({ ...pagination, page: 1 });
    const data = await GetDataList({ ...serachForm, page: pagination.page });
    if (Array.isArray(data)) {
      setDataList(data);
      return;
    }
    const { data: dataList, current_page, total } = data;
    setDataList(dataList);
    setPagination({
      page: current_page,
      total,
    });
  }
  let tuple: [
    Array<K> | [],
    Pagination,
    React.Dispatch<React.SetStateAction<Pagination>>,
    Function
  ];
  tuple = [dataList, pagination, setPagination, getDataList];
  return tuple;
};

interface ShowDeleteConfirm {
  (ids: Array<number>): false | undefined;
}
interface RowSelection<T> {
  onChange: (_selectedRowKeys: React.Key[], selectedRows: Array<T>) => void;
}
interface Id {
  id: string;
}
export function useDelData<T>(
  delFunction: Function,
  callback: Function,
  id = "id" as keyof T,
  tip = "删除"
) {
  const [delDataIds, setDelDataIds] = useState<Array<number> | []>([]);
  const [rowSelection] = useState({
    onChange: (_selectedRowKeys: React.Key[], selectedRows: Array<T>) => {
      setDelDataIds(selectedRows.map((item) => item[id]) as number[] | []);
    },
  });
  // 弹窗确定删除
  const showDeleteConfirm = (ids: Array<number>) => {
    if (!ids.length) {
      message.error("至少选择一条数据");
      return false;
    }
    confirm({
      title: `确定${tip}数据?`,
      icon: <ExclamationCircleOutlined />,
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      async onOk() {
        const result = await delData(ids);
        if (result) callback();
      },
    });
  };
  // 删除列表
  const delData = async (ids: Array<number>) => {
    const data = await delFunction({ id: ids.join(",") });
    if (!data) return false;
    setDelDataIds([]);
    message.success(`${tip}成功`);
    return true;
  };
  let tuple: [ShowDeleteConfirm, number[] | [], RowSelection<T>];
  tuple = [showDeleteConfirm, delDataIds, rowSelection];
  return tuple;
}
