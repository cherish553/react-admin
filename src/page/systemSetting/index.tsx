import React, { useState } from "react";
import style from "./index.module.scss";
import { useHistory } from "react-router-dom";
import classnames from "classnames";
import { Card, Input, Button, Table, Form} from "antd";
import { getBannerList, delBanner } from "@api/systemSetting";
import { BannerDataDetail } from "@api/systemSetting/api";
import { useTableHook, useDelData } from "@/hooks";

export default function SystemSetting() {
  let router = useHistory();
  const [dataList, , , getDataList] = useTableHook<BannerDataDetail>(
    getBannerList
  );
  const [showDeleteConfirm, delDataIds, rowSelection] = useDelData<
    BannerDataDetail
  >(delBanner, getDataList);
  const jumpToPage = (url: string, id?: number) => {
    router.push({
      pathname: url,
      search: id ? `?id=${id}` : "",
    });
  };
  const [bannerColumn] = useState([
    {
      title: "轮播图",
      dataIndex: "img_url",
      render: (props: string, row: BannerDataDetail) => (
        <>
          <img src={props} alt="" />
          <p>{row.title}</p>
        </>
      ),
    },
    {
      title: "排序",
      dataIndex: "sort",
    },
    {
      title: "跳转地址",
      dataIndex: "jump_link",
    },
    {
      title: "操作",
      dataIndex: "",
      render: (props: any, row: any) => (
        <>
          <Button
            key={1}
            onClick={() => jumpToPage("/editBanner", props.id)}
            size={"small"}
          >
            编辑
          </Button>
          <Button
            key={2}
            size={"small"}
            onClick={() => showDeleteConfirm([props.id])}
          >
            删除
          </Button>
        </>
      ),
    },
  ]);
  return (
    <div>
      <Card className="border-none" title="后台账号密码设置">
        <Form>
          <Form.Item label="账号">
            <Input className={style.w200}></Input>
          </Form.Item>
          <Form.Item label="密码">
            <Input className={style.w200}></Input>
          </Form.Item>
        </Form>
      </Card>
      <Card className={classnames(style.w100)}>
        <div className={style.search}>
          <div>
            <Button
              type={"primary"}
              onClick={() => showDeleteConfirm(delDataIds)}
            >
              删除
            </Button>
            <Button onClick={() => jumpToPage("/editBanner")} type={"primary"}>
              新增轮播图
            </Button>
          </div>
        </div>
      </Card>
      <div>
        <Table
          rowKey="id"
          pagination={false}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={bannerColumn}
          dataSource={dataList}
        ></Table>
      </div>
    </div>
  );
}
