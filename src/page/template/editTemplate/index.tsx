import React from "react";
import { Tabs } from "antd";
import TemplateInfo from "./components/templateInfo";
import TemplateInner from "./components/templateInner";
const { TabPane } = Tabs;
export default function EditTemplate() {
  function callback(key: any) {
    console.log(key);
  }
  return (
    <Tabs defaultActiveKey="2" onChange={callback}>
      <TabPane tab="编辑板块信息" key="1">
        <TemplateInfo />
      </TabPane>
      <TabPane tab="编辑板块内容" key="2">
        <TemplateInner />
      </TabPane>
    </Tabs>
  );
}
