import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import TemplateInfo from "./components/templateInfo";
import TemplateInner from "./components/templateInner";
import { withRouter, RouteComponentProps } from "react-router-dom";
const { TabPane } = Tabs;
function EditTemplate(props: RouteComponentProps) {
  function callback(key: any) {
    console.log(key);
  }
  const [id, setId] = useState("");
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = props.location.search;
    if (id) setId(id);
  }, []);
  return (
    <div>
      {(id && (
        <Tabs defaultActiveKey="2" onChange={callback}>
          <TabPane tab="编辑板块信息" key="1">
            <TemplateInfo />
          </TabPane>
          <TabPane tab="编辑板块内容" key="2">
            <TemplateInner />
          </TabPane>
        </Tabs>
      )) ||
        (!step && <TemplateInfo next={setStep} />) || <TemplateInner />}
    </div>
  );
}
export default withRouter(EditTemplate);
