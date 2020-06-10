import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Home from "@/page/home";
import Detail from "@/page/detail";

import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const BasicRoute = () => (
  <HashRouter>
    <Switch>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <Menu.Item key="1">首页</Menu.Item>
              <Menu.Item key="2">用户列表</Menu.Item>
              <SubMenu key="sub1" icon={<UserOutlined />} title="模板管理">
                <Menu.Item key="5">模板管理</Menu.Item>
                <Menu.Item key="6">新增模板</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<UserOutlined />} title="印品管理">
                <Menu.Item key="7">印品管理</Menu.Item>
                <Menu.Item key="8">类目管理</Menu.Item>
                <Menu.Item key="9">新增印品</Menu.Item>
                <Menu.Item key="10">印品规格组合</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<UserOutlined />} title="订单管理">
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
              </SubMenu>
              <Menu.Item key="21">数据统计</Menu.Item>
              <Menu.Item key="22">系统设置</Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Route exact path="/" component={Home} />
              <Route exact path="/detail" component={Detail} />
            </Content>
          </Layout>
        </Layout>
      </Layout>
      ,
    </Switch>
  </HashRouter>
);

export default BasicRoute;
