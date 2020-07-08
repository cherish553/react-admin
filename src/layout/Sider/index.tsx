import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useHistory, withRouter, RouteComponentProps } from "react-router-dom";
import { routerObj } from "@/util/router";
const { SubMenu } = Menu;
const { Sider } = Layout;
const Siders = (props: RouteComponentProps) => {
  let router = useHistory();
  useEffect(() => {
    const search = !!props.location.search ? "Search" : "";
    const data = `${props.location.pathname}${search}`;
    setSelectSub([routerObj[data].key]);
  }, [props.location]);
  const [selectSub, setSelectSub] = useState(["sub1"]);
  const jumpToPage = (url: string) => {
    router.push(url);
  };
  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        selectedKeys={selectSub}
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
          <Menu.Item key="8" onClick={() => jumpToPage("/category")}>
            类目管理
          </Menu.Item>
          {/* <Menu.Item key="9">新增印品</Menu.Item> */}
          <Menu.Item key="10" onClick={() => jumpToPage("/specsCompose")}>
            印品规格组合
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" icon={<UserOutlined />} title="订单管理">
          <Menu.Item key="11" onClick={() => jumpToPage("/orderList")}>
            订单管理
          </Menu.Item>
          <Menu.Item key="12" onClick={() => jumpToPage("/commentList")}>
            评价管理
          </Menu.Item>
          <Menu.Item key="13" onClick={() => jumpToPage("/bulkDelivery")}>
            批量发货
          </Menu.Item>
          <Menu.Item key="14" onClick={() => jumpToPage("/afterSales")}>
            售后管理
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub4" icon={<UserOutlined />} title="优惠券">
          <Menu.Item key="15" onClick={() => jumpToPage("/coupon")}>
            优惠券
          </Menu.Item>
          <Menu.Item key="16" onClick={() => jumpToPage("/addCoupon")}>
            添加优惠券
          </Menu.Item>
          <Menu.Item key="17" onClick={() => jumpToPage("/newUserCoupon")}>
            新用户优惠券
          </Menu.Item>
          <Menu.Item key="23" onClick={() => jumpToPage("/sendCoupon")}>
            发放优惠券
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="18" onClick={() => jumpToPage("/showWorks")}>
          作品管理
        </Menu.Item>
        <SubMenu key="sub5" icon={<UserOutlined />} title="分佣管理">
          <Menu.Item key="19" onClick={() => jumpToPage("/commission")}>
            分佣管理
          </Menu.Item>
          <Menu.Item key="20" onClick={() => jumpToPage("/withdrawalLog")}>
            提现申请记录
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="21" onClick={() => jumpToPage("/dataStatistics")}>
          数据统计
        </Menu.Item>
        <Menu.Item key="22" onClick={() => jumpToPage("/systemSetting")}>
          系统设置
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
export default withRouter(Siders);
