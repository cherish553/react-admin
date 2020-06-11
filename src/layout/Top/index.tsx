import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { withRouter } from "react-router-dom";
import { routerObj } from "@/util/router";
const { Header } = Layout;
function Top(props: any) {
  const [title, setTitle] = useState("");
  useEffect(() => {
    const pathname = props.location.pathname;
    setTitle(routerObj[pathname]);
  }, [props, props.location.pathname]);
  return (
    <Header className="header">
      <div className="logo" />
      <div>{title}</div>
    </Header>
  );
}
export default withRouter(Top);
