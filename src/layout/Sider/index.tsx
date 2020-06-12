import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const { SubMenu } = Menu;
const { Sider } = Layout;
const Siders = () => {
  let router = useHistory();
  const [selectSub, setSelectSub] = useState(["sub1"]);
  const jumpToPage = (url: string) => {
    router.push(url);
  };
  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        // openKeys={["1"]}
        // selectedKeys={selectSub}
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub2"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <Menu.Item key="1" onClick={() => jumpToPage("/")}>
          首页
        </Menu.Item>
        <Menu.Item key="2" onClick={() => jumpToPage("/userList")}>
          用户列表
        </Menu.Item>
        <Menu.Item key="3" onClick={() => jumpToPage("/template")}>
          模板管理
        </Menu.Item>
        <SubMenu key="sub1" icon={<UserOutlined />} title="印品管理">
          <Menu.Item key="7" onClick={() => jumpToPage("/print")}>
            印品管理
          </Menu.Item>
          <Menu.Item key="8" onClick={() => jumpToPage("/category")}>类目管理</Menu.Item>
          <Menu.Item key="9">新增印品</Menu.Item>
          <Menu.Item key="10">印品规格组合</Menu.Item>
        </SubMenu>
        {/* <SubMenu key="sub3" icon={<UserOutlined />} title="订单管理">
          <Menu.Item key="11">订单管理</Menu.Item>
          <Menu.Item key="12">评价管理</Menu.Item>
          <Menu.Item key="13">批量发货</Menu.Item>
          <Menu.Item key="14">售后管理</Menu.Item>
        </SubMenu>
        <SubMenu key="sub4" icon={<UserOutlined />} title="优惠券">
          <Menu.Item key="15">优惠券</Menu.Item>
          <Menu.Item key="16">添加优惠券</Menu.Item>
          <Menu.Item key="17">新用户优惠券</Menu.Item>
        </SubMenu>
        <Menu.Item key="18">作品管理</Menu.Item>
        <SubMenu key="sub5" icon={<UserOutlined />} title="分佣管理">
          <Menu.Item key="19">分佣管理</Menu.Item>
          <Menu.Item key="20">提现申请记录</Menu.Item>
        </SubMenu> */}
        <Menu.Item key="21">数据统计</Menu.Item>
        <Menu.Item key="22">系统设置</Menu.Item>
      </Menu>
    </Sider>
  );
};
export default Siders;
