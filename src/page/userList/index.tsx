import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import classnames from "classnames";
import { Card, Input, Button, Table } from "antd";
import { getUserList as GetUserList } from "@api/userList";
import { UserData } from "@api/userList/api";
export default function UserList() {
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
  });
  const [serachForm, setSerachForm] = useState({
    name: "",
    mobile: "",
  });
  const [userList, setuserList] = useState<Array<UserData>>([]);
  const [userColumn] = useState([
    {
      title: "用户昵称",
      dataIndex: "name",
    },
    {
      title: "手机号",
      dataIndex: "mobile",
    },
    {
      title: "成交单数",
      dataIndex: "id",
    },
    {
      title: "最后登录时间",
      dataIndex: "last_login",
    },
  ]);
  useEffect(() => {
    getUserList();
  }, []);
  const getUserList = async (flag?: boolean) => {
    if (flag) setPagination({ ...pagination, page: 1 });
    const data = await GetUserList(serachForm);
    const { data: userList, current_page, total } = data;
    setuserList(userList);
    setPagination({
      page: current_page,
      total,
    });
  };

  return (
    <div>
      <Card className={classnames(style.w100)}>
        <div className={style.search}>
          <div>
            <p>用户昵称</p>
            <Input
              onChange={(e) =>
                setSerachForm({ ...serachForm, name: e.target.value })
              }
              placeholder="请输入用户昵称"
              value={serachForm.name}
            />
            <p>手机号码</p>
            <Input
              maxLength={11}
              type={"tel"}
              onChange={(e) =>
                setSerachForm({ ...serachForm, mobile: e.target.value })
              }
              placeholder="请输入手机号"
              value={serachForm.mobile}
            />
          </div>
          <div>
            <Button
              onClick={() =>
                setSerachForm({
                  name: "",
                  mobile: "",
                })
              }
              type={"primary"}
            >
              重置
            </Button>
            <Button
              onClick={() => {
                setPagination({ ...pagination, page: 1 });
                getUserList();
              }}
              type={"primary"}
            >
              查询
            </Button>
          </div>
        </div>
      </Card>
      <div>
        <Table
          rowKey="id"
          pagination={{ current: pagination.page, total: pagination.total }}
          columns={userColumn}
          dataSource={userList}
        ></Table>
      </div>
    </div>
  );
}
