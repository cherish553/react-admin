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
import Index from "@/layout/index";
import Sider from "@/layout/Sider";
import Top from "@/layout/Top";
import { Layout } from "antd";

const { Content } = Layout;

const BasicRoute = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/login" component={login} />
        <Route path="/" component={Index} />,
      </Switch>
    </HashRouter>
  );
};

export default BasicRoute;
