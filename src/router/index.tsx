import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import login from "@/page/login";
import Index from "@/layout/index";


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
