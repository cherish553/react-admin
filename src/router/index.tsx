import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import home from "@/page/home";
import userList from "@/page/userList";
import template from "@/page/template";
import editTemplate from "@/page/template/editTemplate";
import print from "@/page/print";
import category from "@/page/print/category";
import editPrint from "@/page/print/editPrint";
import specsCompose from "@/page/print/specsCompose";
import orderList from "@/page/orderList";
import bulkDelivery from "@/page/orderList/bulkDelivery";
import commentList from "@/page/orderList/commentList";
import commentDatail from "@/page/orderList/commentList/commentDatail";
import afterSales from "@/page/orderList/afterSales";
import afterSalesDetail from "@/page/orderList/afterSales/afterSalesDetail";
import coupon from "@/page/coupon";
import addCoupon from "@/page/coupon/addCoupon";
import newUserCoupon from "@/page/coupon/newUserCoupon";
import showWorks from "@/page/showWorks";
import commission from "@/page/commission";
import withdrawalLog from "@/page/commission/withdrawalLog";
import dataStatistics from "@/page/dataStatistics";
import systemSetting from "@/page/systemSetting";
import editBanner from "@/page/systemSetting/editBanner";
import login from "@/page/login";

import Sider from "@/layout/Sider";
import Top from "@/layout/Top";
import { Layout } from "antd";

const { Content } = Layout;

const BasicRoute = () => {
  return (
    <HashRouter>
      
      <Route exact path="/login" component={login} />
        <Layout>
          <Layout>
            <Sider></Sider>
            <Layout>
              <Top></Top>
              <Content
                className="site-layout-background"
                style={{
                  overflow:'auto',
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                }}
              >
                <Switch>
                <Route exact path="/" component={home} />
                <Route exact path="/userList" component={userList} />
                <Route exact path="/template" component={template} />
                <Route exact path="/editTemplate" component={editTemplate} />
                <Route exact path="/print" component={print} />
                <Route exact path="/category" component={category} />
                <Route exact path="/editPrint" component={editPrint} />
                <Route exact path="/specsCompose" component={specsCompose} />
                <Route exact path="/orderList" component={orderList} />
                <Route exact path="/commentList" component={commentList} />
                <Route exact path="/commentDatail" component={commentDatail} />
                <Route exact path="/bulkDelivery" component={bulkDelivery} />
                <Route exact path="/afterSales" component={afterSales} />
                <Route
                  exact
                  path="/afterSalesDetail"
                  component={afterSalesDetail}
                />
                <Route exact path="/coupon" component={coupon} />
                <Route exact path="/addCoupon" component={addCoupon} />
                <Route exact path="/newUserCoupon" component={newUserCoupon} />
                <Route exact path="/showWorks" component={showWorks} />
                <Route exact path="/commission" component={commission} />
                <Route exact path="/withdrawalLog" component={withdrawalLog} />
                <Route
                  exact
                  path="/dataStatistics"
                  component={dataStatistics}
                />
                <Route exact path="/systemSetting" component={systemSetting} />
                <Route exact path="/editBanner" component={editBanner} />
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
        ,
    </HashRouter>
  );
};

export default BasicRoute;
