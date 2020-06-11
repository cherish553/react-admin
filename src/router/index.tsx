import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import home from "@/page/home";
import userList from "@/page/userList";
import template from "@/page/template";
import Sider from "@/layout/Sider";
import Top from "@/layout/Top";
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
              <Top></Top>
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                }}
              >
                <Route exact path="/" component={home} />
                <Route exact path="/userList" component={userList} />
                <Route exact path="/template" component={template} />
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
