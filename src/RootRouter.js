import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import App from "./App.js";
import TaskPage from "./containers/TaskPage";
import Cart from "./containers/Cart";

const RootRouter = () => (
  <BrowserRouter>
    <App>
      <div>
        <Switch>
          <Route exact path="/" component={TaskPage} />
          <Route exact path="/mycart" component={Cart} />
        </Switch>
      </div>
    </App>
  </BrowserRouter>
);

export default RootRouter;
