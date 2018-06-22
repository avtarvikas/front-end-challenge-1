import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import App from "./App.js";
import TaskPage from "./containers/TaskPage";
import Cart from "./containers/Cart";
import MessageBoard from "./containers/MessageBoard"

const RootRouter = () => (
  <BrowserRouter>
    <App>
      <div>
        <Switch>
          <Route exact path="/" component={TaskPage} />
          <Route exact path="/mycart" component={Cart} />
          <Route exact path="/message" component={MessageBoard} />
        </Switch>
      </div>
    </App>
  </BrowserRouter>
);

export default RootRouter;
