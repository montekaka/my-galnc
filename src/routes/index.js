import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {DemoPage} from '../screens'

const MainRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={DemoPage} />
    </Switch>
  )
}

export default MainRoutes;