import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import home from "@/page/home";
import userList from "@/page/userList";
import template from "@/page/template";
import print from "@/page/print";
import category from "@/page/print/category";

import Sider from "@/layout/Sider";
import Top from "@/layout/Top";
import { Layout } from "antd";

const { Content } = Layout;

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
                <Route exact path="/print" component={print} />
                <Route exact path="/category" component={category} />
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
