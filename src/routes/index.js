import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {DemoPage, ProfilePage} from '../screens'
import {SignIn} from '../auth'

const MainRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={DemoPage} />      
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/:id" component={ProfilePage} />      
    </Switch>
  )
}

export default MainRoutes;