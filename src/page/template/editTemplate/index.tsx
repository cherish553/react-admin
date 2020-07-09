import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import TemplateInfo from "./components/templateInfo";
import TemplateInner from "./components/templateInner";
import { GoodsModel } from "@api/template/api";
import { withRouter, RouteComponentProps } from "react-router-dom";
const { TabPane } = Tabs;
function EditTemplate(props: RouteComponentProps) {
  function callback(key: any) {
    console.log(key);
  }
  const [formData, setFormData] = useState<GoodsModel>({
    name: "",
    size: "",
    numberPages: "",
    pageList: {},
  });
  useEffect(() => {
    console.log(formData);
  }, [formData]);
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
            <TemplateInfo data={{ formData, setFormData }} />
          </TabPane>
          <TabPane tab="编辑板块内容" key="2">
            <TemplateInner data={{ formData, setFormData }} />
          </TabPane>
        </Tabs>
      )) ||
        (!step && (
          <TemplateInfo data={{ formData, setFormData }} next={setStep} />
        )) || <TemplateInner data={{ formData, setFormData }} />}
    </div>
  );
}
export default withRouter(EditTemplate);
