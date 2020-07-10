import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import TemplateInfo from "./components/templateInfo";
import TemplateInner from "./components/templateInner";
import { GoodsModel, PageList } from "@api/template/api";
import { withRouter, RouteComponentProps, useHistory } from "react-router-dom";
import { query } from "@/util/common";
import {
  imageList,
  textList,
} from "@page/template/editTemplate/components/templateInner";
import {
  postEditGoodsModel as PostEditGoodsModel,
  getGoodsModel as GetGoodsModel,
} from "@api/template";
const { TabPane } = Tabs;
function EditTemplate(props: RouteComponentProps) {
  const router = useHistory();
  function callback(key: any) {
    console.log(key);
  }
  const [formData, setFormData] = useState<GoodsModel>({
    name: "",
    size: "",
    numberPages: "",
    pageList: [] as Array<PageList>,
  });
  const [pageListData, setPageListData] = useState<
    {
      textList: textList;
      imageList: imageList;
    }[]
  >();
  useEffect(() => {
    if (!formData.pageList.length) return;
    postEditGoodsModel();
  }, [formData.pageList]);
  const [id, setId] = useState("");
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = props.location.search;
    if (!id) return;
    const queryData = query<Id>(props.location.search) as { id: string };
    getGoodsModel(queryData.id);
    setId(queryData.id);
  }, []);
  async function postEditGoodsModel() {
    await PostEditGoodsModel(formData);
    router.push("/template");
  }
  async function getGoodsModel(id: string) {
    const { pageList, ...rest } = await GetGoodsModel({ id });
    setFormData({ ...rest, pageList: [] });
    setPageListData(pageList);
  }
  return (
    <div>
      {(id && (
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="编辑板块信息" key="1">
            <TemplateInfo data={{ formData, setFormData }} />
          </TabPane>
          <TabPane tab="编辑板块内容" key="2">
            <TemplateInner
              pageList={pageListData}
              data={{ formData, setFormData }}
            />
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
