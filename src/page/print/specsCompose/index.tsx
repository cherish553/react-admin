import React, { useState, useEffect, useRef } from "react";
// import style from "./index.module.scss";
// import classnames from "classnames";
import SpecDialog from "./component/modal";
import { Refs } from "./component/modal/declare";
import TableSpec from "./component/table";
import { getGoodSpecList as GetGoodSpecList } from "@api/print";
import {
  GoodSpecDetail,
  GoodSpecDetailChildren,
  EditGoodSpecParam,
} from "@api/print/api";
import { Form } from "antd";
interface Obj {
  pathname: string;
  search?: string;
}
export interface ShowModal {
  (row: GoodSpecDetailChildren): void;
}
export default function SpecsCompose() {
  const Ref = useRef<Refs>();
  const [row, setRow] = useState<EditGoodSpecParam>();
  const showModal = (row: GoodSpecDetailChildren) => {
    setRow(row);
    Ref.current?.SetVisible(true);
  };
  const [dataList, SetDataList] = useState<GoodSpecDetail[] | []>([]);

  // 印品规格列表
  async function getGoodSpecList() {
    const data = await GetGoodSpecList();
    SetDataList(data);
  }
  useEffect(() => {
    getGoodSpecList();
  }, []);

  return (
    <div>
      <div>
        <Form>
          {dataList.length &&
            (dataList as GoodSpecDetail[]).map((item, index) => (
              <TableSpec
                key={item.id}
                showModal={showModal}
                data={item}
                getGoodSpecList={getGoodSpecList}
              ></TableSpec>
            ))}
        </Form>
      </div>
      <SpecDialog getDataList={getGoodSpecList} row={row} ref={Ref} />
    </div>
  );
}
