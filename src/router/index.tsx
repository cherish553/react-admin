import React,{useEffect} from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Home from "@/page/home";
import userList from "@/page/userList";
import Sider from "@/layout/Sider";

import { Layout, Menu } from "antd";

const { Header, Content } = Layout;

const BasicRoute = () => {
  return (
    <HashRouter>
      <Switch>
        <Layout>
          <Layout>
            <Sider></Sider>
            <Layout>
              <Header className="header">
                <div className="logo" />
                <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={["2"]}
                >
                  <Menu.Item key="1">nav 1</Menu.Item>
                  <Menu.Item key="2">nav 2</Menu.Item>
                  <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
              </Header>
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                }}
              >
                <Route exact path="/" component={Home} />
                <Route exact path="/userList" component={userList} />
              </Content>
            </Layout>
          </Layout>
        </Layout>
        ,
      </Switch>
    </HashRouter>
  );
};

export default BasicRoute;
